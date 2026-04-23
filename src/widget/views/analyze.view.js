import testsConfigService from '../services/testsConfig.service';

let state = {
    test: null,
    testName: null,
    overlayImage: {},
    parameters: {},
    selectors: {
        detectionFailedContainer: '#detectionFailedContainer',
        analyzingContainer: '#analyzingContainer',
    }
}
let elements = {};

function init(options) {
    state.test = options?.test || null;
    state.testName = state.test ? Object.keys(state.test)[0] : null;

    if (state.test) {
        state.overlayImage = state.test[state.testName]?.overlayImage || {};
        state.parameters = getTestParameters(state.test);
    }

    // register DOM elements
    Object.keys(state.selectors).forEach(selectorKey => {
        const selector = state.selectors[selectorKey];
        elements[selectorKey] = document.querySelector(selector);
    });

    getImageFromCamera({
        overlayImageUrl: state.overlayImage.url
    }, (error, imageData) => {
        if (error) {
            console.error(error);
            return;
        }
        processCameraImage(imageData, true);
    });

    document.getElementById('retryButton').addEventListener('click', () => {
        getImageFromCamera({
            overlayImageUrl: state.overlayImage.url
        }, (error, imageData) => {
            if (error) {
                console.error(error);
                return;
            }
            processCameraImage(imageData, true);
        });
    });
}

function getTestParameters(test) {
    let parameters = {};
    for (let parameterName of Object.keys(test[state.testName].parameters)) {
        parameters[parameterName] = testsConfigService.getLocalParameter(parameterName);
        parameters[parameterName].locationOnOverlay = test[state.testName].parameters[parameterName].locationOnOverlay;
    }
    return parameters;
}

function getImageFromCamera(options, callback) {
    console.error(new URL(options.overlayImageUrl, window.location.href).href);
    buildfire.services.camera.getPicture({ overlayImageUrl: new URL(options.overlayImageUrl, window.location.href).href, destinationType: 0, quality: 100 }, callback);
}

function processCameraImage(imageSrc, imageAsData) {
    const testResultsDiv = document.getElementById('testResults');
    // 1. Create a new image element in memory
    const imgElement = new Image();
    imgElement.onload = function () {
        const lightingResults = analyzeLighting(imgElement);
        // TODO: reject on poor lighting conditions (e.g. if brightness is too low or saturation is too high)
        testResultsDiv.innerHTML = JSON.stringify(lightingResults, null, 2);

        const isBlurry = isImageBlurrySobel(imgElement);
        // TODO: reject on blurry image
        document.getElementById('isBlurry').innerHTML = (isBlurry ? `(Blurry)` : `(Sharp)`);
        const extractedColors = getParameterColorsFromImage(imgElement);
        const results = getResultsFromExtractedColors(extractedColors, state.parameters);
        document.getElementById('extractedColors').innerHTML = JSON.stringify(extractedColors, null, 2);
        document.getElementById('results').innerHTML = JSON.stringify(results, null, 2);

    };
    if (imageAsData) {
        imgElement.src = `data:image/png;base64,${imageSrc}`;
    } else {
        imgElement.src = imageSrc;
    }
}

function getResultsFromExtractedColors(extractedColors, parameters) {
    const results = {};

    for (const parameterKey in extractedColors) {
        const extractedColor = extractedColors[parameterKey];
        const parameter = parameters[parameterKey];
        console.warn(`Analyzing parameter: `, parameter);
        if (parameter) {
            // 1. Convert the extracted OpenCV color to CIELAB space
            const extractedLab = rgbToLab(extractedColor.r, extractedColor.g, extractedColor.b);

            const parameterValueRanges = parameter.valueRanges;
            let closestMatch = null;
            let lowestDeltaE = Infinity;
            let bestMatchRgb = null;

            // 2. Loop through ALL reference colors to find the absolute closest one
            for (const valueRange of parameterValueRanges) {
                const referenceColorRgb = hexToRgba(valueRange.referenceColor.hex);
                const referenceLab = rgbToLab(referenceColorRgb.r, referenceColorRgb.g, referenceColorRgb.b);

                // Calculate the visual distance
                const currentDeltaE = calculateDeltaE(extractedLab, referenceLab);

                // If this is the lowest distance we've seen, save it
                if (currentDeltaE < lowestDeltaE) {
                    lowestDeltaE = currentDeltaE;
                    closestMatch = valueRange;
                    bestMatchRgb = referenceColorRgb;
                }
            }

            // 3. Evaluate if the absolute closest match is close enough to be valid
            if (closestMatch && lowestDeltaE) {
                results[parameterKey] = {
                    value: closestMatch.correspondingValue,
                    interpretation: closestMatch.interpretation,
                    clarification: closestMatch.clarification,
                    referenceColor: closestMatch.referenceColor.hex,
                    referenceColorRgb: bestMatchRgb,
                    deltaE_Score: lowestDeltaE // Added for debugging and confidence checks
                };
            }
        }
    }

    return results;
}

function analyzeLighting(imgElement) {
    let src = cv.imread(imgElement);
    let hsv = new cv.Mat();
    let mask = new cv.Mat();

    // 1. Convert to HSV
    cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
    cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

    // 2. Define "Background" (Low Saturation)
    // H: 0-180 (Any color hue)
    // S: 0-40  (Very low color intensity - ignores the colored squares)
    // V: 0-255 (Any brightness level)
    let low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [0, 0, 0, 0]);
    let high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [180, 40, 255, 0]);

    // Create a mask where the background is white (255) and colors are black (0)
    cv.inRange(hsv, low, high, mask);

    // 3. Calculate Mean Background Color (RGB)
    // Passing the mask ensures we ONLY average the background pixels
    let meanRgb = cv.mean(src, mask);

    // 4. Calculate Mean Brightness (HSV)
    // We calculate the mean of the HSV image to get the exact 'Value' (Brightness)
    let meanHsv = cv.mean(hsv, mask);

    // 5. Clean up memory
    src.delete(); hsv.delete(); mask.delete(); low.delete(); high.delete();

    // The mean array returns [Channel 1, Channel 2, Channel 3, Alpha]
    const results = {
        backgroundColor: {
            r: Math.round(meanRgb[0]),
            g: Math.round(meanRgb[1]),
            b: Math.round(meanRgb[2])
        },
        // The V channel in HSV represents overall brightness on a 0-255 scale
        brightness: Math.round(meanHsv[2]),
        // The S channel tells you how "pure white/grey" it is (lower is better)
        saturation: Math.round(meanHsv[1])
    };

    return results;
}

function getParameterColorsFromImage(imgElement) {
    const openCvImage = cv.imread(imgElement);
    cv.GaussianBlur(openCvImage, openCvImage, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
    const imageHeight = openCvImage.rows;
    const imageWidth = openCvImage.cols;

    // Calculate scaling factor based on height
    const scaleY = imageHeight / state.overlayImage.height;
    const overlayWidthScaled = state.overlayImage.width * scaleY;
    const imageCenterX = imageWidth / 2;
    const overlayLeftX = imageCenterX - (overlayWidthScaled / 2);

    // Object to store the extracted colors
    const extractedColors = {};

    for (const boxKey in state.parameters) {
        const box = state.parameters[boxKey].locationOnOverlay;

        // 1. Calculate the exact center and radius (matching the drawing function)
        const centerX = (box.center.x * scaleY) + overlayLeftX;
        const centerY = (box.center.y * scaleY);
        const radius = Math.round(box.samplingOffsetRadius * scaleY);

        // 2. Calculate the rectangular bounding box that contains this circle
        const startX = Math.max(0, Math.min(Math.round(centerX - radius), imageWidth - 1));
        const startY = Math.max(0, Math.min(Math.round(centerY - radius), imageHeight - 1));
        const endX = Math.max(0, Math.min(Math.round(centerX + radius), imageWidth - 1));
        const endY = Math.max(0, Math.min(Math.round(centerY + radius), imageHeight - 1));

        const rectWidth = Math.max(1, endX - startX);
        const rectHeight = Math.max(1, endY - startY);

        // 3. Extract the rectangular ROI
        const rect = new cv.Rect(startX, startY, rectWidth, rectHeight);
        const roiMat = openCvImage.roi(rect);

        // 4. Create a 1-channel (grayscale) mask of the same size, filled with black (0)
        const mask = new cv.Mat.zeros(roiMat.rows, roiMat.cols, cv.CV_8UC1);

        // Find where the center of the circle is relative to the small ROI we just cut out
        const maskCenterX = Math.round(centerX) - startX;
        const maskCenterY = Math.round(centerY) - startY;
        const maskCenterPoint = new cv.Point(maskCenterX, maskCenterY);

        // Draw a filled white circle on the mask. 
        // -1 thickness tells OpenCV to fill the shape.
        cv.circle(mask, maskCenterPoint, radius, [255, 0, 0, 0], -1);

        // 5. Get the average color of the region, passing the mask to ignore corners
        // cv.median returns an array-like object: [R, G, B, A]
        const meanColor = cv.median(roiMat, mask);

        // Store the color
        extractedColors[boxKey] = {
            r: Math.round(meanColor[0]),
            g: Math.round(meanColor[1]),
            b: Math.round(meanColor[2]),
            a: Math.round(meanColor[3])
        };

        // 6. Clean up memory for both the ROI and the Mask
        roiMat.delete();
        mask.delete();
    }

    // Clean up the main image memory
    openCvImage.delete();

    console.log('Extracted Colors:', extractedColors);
    return extractedColors;
}

function isImageBlurrySobel(imgElement, threshold = 5000) {
    let src = cv.imread(imgElement);
    let gray = new cv.Mat();

    // 1. Convert to grayscale
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

    // 2. NORMALIZE: Resize to a standard 500px width
    const standardWidth = 500;
    const scale = standardWidth / gray.cols;
    const standardHeight = Math.round(gray.rows * scale);
    cv.resize(gray, gray, new cv.Size(standardWidth, standardHeight), 0, 0, cv.INTER_AREA);

    // 3. CENTER CROP: Only analyze the middle 50% of the image.
    // This stops smooth backgrounds from dragging your score down!
    let cx = Math.floor(gray.cols / 4);
    let cy = Math.floor(gray.rows / 4);
    let cw = Math.floor(gray.cols / 2);
    let ch = Math.floor(gray.rows / 2);
    let rect = new cv.Rect(cx, cy, cw, ch);
    let roi = gray.roi(rect);

    // 4. SOBEL FILTER: Detect strong horizontal and vertical edges
    let sobelX = new cv.Mat();
    let sobelY = new cv.Mat();
    cv.Sobel(roi, sobelX, cv.CV_32F, 1, 0, 3);
    cv.Sobel(roi, sobelY, cv.CV_32F, 0, 1, 3);

    // 5. Calculate the combined magnitude of the edges
    let magnitude = new cv.Mat();
    cv.magnitude(sobelX, sobelY, magnitude);

    // 6. Calculate the variance (sharpness score) of those edges
    let mean = new cv.Mat();
    let stddev = new cv.Mat();
    cv.meanStdDev(magnitude, mean, stddev);

    let stddevVal = stddev.doubleAt(0, 0);
    let variance = stddevVal * stddevVal; // This is the Tenengrad score

    // 7. Clean up memory
    src.delete(); gray.delete(); roi.delete();
    sobelX.delete(); sobelY.delete(); magnitude.delete();
    mean.delete(); stddev.delete();

    // TEMPORARY LOGGING FOR YOUR SCREEN:
    const isBlurry = variance < threshold;

    return isBlurry;
}

function hexToRgba(hex, defaultAlpha = 1) {
    // Remove the hash if it exists
    hex = hex.replace(/^#/, '');

    // Expand shorthand hex (e.g., "03F" -> "0033FF" or "03FA" -> "0033FFaa")
    if (hex.length === 3 || hex.length === 4) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Parse the RGB values
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Parse the Alpha value if it's an 8-digit hex, otherwise use the default
    let a = defaultAlpha;
    if (hex.length === 8) {
        // Convert the hex alpha to a decimal between 0 and 1
        a = parseFloat((parseInt(hex.slice(6, 8), 16) / 255).toFixed(2));
    }

    // Return null if the input was an invalid hex string
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        console.error("Invalid hex color provided.");
        return null;
    }
    return {
        r: r,
        g: g,
        b: b,
        a: a
    };
}

// Converts standard RGB (0-255) to CIELAB color space
function rgbToLab(r, g, b) {
    let rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;

    rNorm = rNorm > 0.04045 ? Math.pow((rNorm + 0.055) / 1.055, 2.4) : rNorm / 12.92;
    gNorm = gNorm > 0.04045 ? Math.pow((gNorm + 0.055) / 1.055, 2.4) : gNorm / 12.92;
    bNorm = bNorm > 0.04045 ? Math.pow((bNorm + 0.055) / 1.055, 2.4) : bNorm / 12.92;

    rNorm *= 100; gNorm *= 100; bNorm *= 100;

    let x = (rNorm * 0.4124 + gNorm * 0.3576 + bNorm * 0.1805) / 95.047;
    let y = (rNorm * 0.2126 + gNorm * 0.7152 + bNorm * 0.0722) / 100.000;
    let z = (rNorm * 0.0193 + gNorm * 0.1192 + bNorm * 0.9505) / 108.883;

    const f = (t) => t > 0.008856 ? Math.pow(t, 1 / 3) : (7.787 * t) + (16 / 116);

    let fx = f(x), fy = f(y), fz = f(z);

    return {
        L: (116 * fy) - 16,
        a: 500 * (fx - fy),
        b: 200 * (fy - fz)
    };
}

// Calculates the Delta E distance between two Lab colors
function calculateDeltaE(lab1, lab2) {
    let deltaL = lab1.L - lab2.L;
    let deltaA = lab1.a - lab2.a;
    let deltaB = lab1.b - lab2.b;
    return Math.sqrt((deltaL * deltaL) + (deltaA * deltaA) + (deltaB * deltaB));
}

export default { init }

let extractedColors = {
    Ascorbate: {
        "r": 4,
        "g": 1,
        "b": 10,
        "a": 255
    }
}

let parameters =
{
    "Ascorbate": {
        "id": 1,
        "name": "Ascorbate",
        "imageUrl": "",
        "info": "",
        "valueRanges": [
            {
                "correspondingValue": "0",
                "referenceColor": {
                    "hex": "#368295"
                },
                "interpretation": "Normal Range",
                "clarification": {
                    "healthy": {
                        "color": "green"
                    },
                    "unhealthy": {
                        "color": "red"
                    }
                }
            },
            {
                "correspondingValue": "0.6",
                "referenceColor": {
                    "hex": "#18a185"
                },
                "interpretation": "Normal Range",
                "clarification": {}
            },
            {
                "correspondingValue": "1.4",
                "referenceColor": {
                    "hex": "#89c765",
                    "rgb": {
                        "r": 255,
                        "g": 255,
                        "b": 255
                    },
                    "hsv": {
                        "h": 60,
                        "s": 100,
                        "v": 100
                    }
                },
                "interpretation": "Excessive Range",
                "clarification": {}
            },
            {
                "correspondingValue": "2.8",
                "referenceColor": {
                    "hex": "#d0d139",
                    "rgb": {
                        "r": 255,
                        "g": 255,
                        "b": 255
                    },
                    "hsv": {
                        "h": 60,
                        "s": 100,
                        "v": 100
                    }
                },
                "interpretation": "Excessive Range",
                "clarification": {}
            },
            {
                "correspondingValue": "5",
                "referenceColor": {
                    "hex": "#faf39b",
                    "rgb": {
                        "r": 255,
                        "g": 255,
                        "b": 255
                    },
                    "hsv": {
                        "h": 60,
                        "s": 100,
                        "v": 100
                    }
                },
                "interpretation": "Extreme Range",
                "clarification": {}
            }
        ],
        "locationOnOverlay": {
            "center": {
                "y": 29,
                "x": 25
            },
            "samplingOffsetRadius": 15
        }
    }
}