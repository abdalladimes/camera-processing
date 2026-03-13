// TODO: FOR READING FROM COORDS, OPENCV NEEDS (y , x) INSTEAD OF (x, y) SO WE NEED TO FLIP THE COORDS BEFORE PASSING THEM TO OPENCV
export default {
    displayOverlayBoxes: function (imgElement, overlayImageMeasurements) {
        let openCvImage = cv.imread(imgElement);
        cv.GaussianBlur(openCvImage, openCvImage, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
        const imageHeight = openCvImage.rows;
        const imageWidth = openCvImage.cols;

        // Calculate scaling factor based on height
        const scaleY = imageHeight / overlayImageMeasurements.height;

        for (const boxKey in overlayImageMeasurements.sampleBoxes) {
            const box = overlayImageMeasurements.sampleBoxes[boxKey];
            const overlayImageCenter = (imageWidth / 2);

            const sampleBoxX = (overlayImageCenter - ((box.width * overlayImageMeasurements.samplingBoxSizePercentage * scaleY) / 2));
            const sampleBoxY = (box.center.y * scaleY) - ((box.height * overlayImageMeasurements.samplingBoxSizePercentage * scaleY) / 2);

            const x = sampleBoxX;
            const y = sampleBoxY; // FIX: Removed the extra * scaleY here

            const width = box.width * scaleY * overlayImageMeasurements.samplingBoxSizePercentage;
            const height = box.height * scaleY * overlayImageMeasurements.samplingBoxSizePercentage;

            const point1 = new cv.Point(x, y);
            const point2 = new cv.Point(x + width, y + height);

            // FIX: Added Math.round to ensure thickness is a valid integer
            const thickness = Math.round(Math.max(1, 2 * scaleY));

            cv.rectangle(openCvImage, point1, point2, [255, 0, 0, 255], thickness);
        }

        // Show the image with boxes in a canvas
        cv.imshow('canvasOutput', openCvImage);

        // Clean up memory
        openCvImage.delete();
    },
    getSamplesColors: function (imgElement, overlayImageMeasurements) {
        const openCvImage = cv.imread(imgElement);
        const imageHeight = openCvImage.rows;
        const imageWidth = openCvImage.cols;

        // Calculate scaling factor based on height
        const scaleY = imageHeight / overlayImageMeasurements.height;

        // Object to store the extracted colors
        const extractedColors = {};

        for (const boxKey in overlayImageMeasurements.sampleBoxes) {
            const box = overlayImageMeasurements.sampleBoxes[boxKey];
            const overlayImageCenter = (imageWidth / 2);

            const sampleBoxX = (overlayImageCenter - ((box.width * overlayImageMeasurements.samplingBoxSizePercentage * scaleY) / 2));
            const sampleBoxY = (box.center.y * scaleY) - ((box.height * overlayImageMeasurements.samplingBoxSizePercentage * scaleY) / 2);

            const rawWidth = box.width * scaleY * overlayImageMeasurements.samplingBoxSizePercentage;
            const rawHeight = box.height * scaleY * overlayImageMeasurements.samplingBoxSizePercentage;

            // 1. Convert to integers and clamp to image boundaries (crucial to prevent Wasm errors)
            const x = Math.max(0, Math.min(Math.round(sampleBoxX), imageWidth - 1));
            const y = Math.max(0, Math.min(Math.round(sampleBoxY), imageHeight - 1));
            const width = Math.max(1, Math.min(Math.round(rawWidth), imageWidth - x));
            const height = Math.max(1, Math.min(Math.round(rawHeight), imageHeight - y));

            // 2. Create the Rectangle and extract the ROI (Region of Interest)
            const rect = new cv.Rect(x, y, width, height);
            const roiMat = openCvImage.roi(rect);

            // 3. Get the average color of that region
            // cv.mean returns an array-like object: [R, G, B, A]
            const meanColor = cv.mean(roiMat);

            // Store the color (rounding the floating point averages to standard 0-255 RGB values)
            extractedColors[boxKey] = {
                r: Math.round(meanColor[0]),
                g: Math.round(meanColor[1]),
                b: Math.round(meanColor[2]),
                a: Math.round(meanColor[3])
            };

            // 4. Clean up the ROI memory immediately after use
            roiMat.delete();
        }

        // Clean up the main image memory
        openCvImage.delete();

        // Return or log your colors
        console.log('Extracted Colors:', extractedColors);
        return extractedColors;
    },

    isImageBlurrySobel: function (imgElement, threshold = 5000) {
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
        const isBlurry = variance < threshold;
        return { isBlurry, variance };
    },

    // TODO: this is for UI only
    renderSamplesColors: function (extractedColors) {
        const container = document.getElementById('extractedColors');

        // Clear out any previous swatches if the function runs multiple times
        container.innerHTML = '';

        // Optional: Add some flexbox styling directly to the container for a nice layout
        container.style.display = 'flex';
        container.style.flexWrap = 'wrap';
        container.style.gap = '15px';

        for (const boxKey in extractedColors) {
            const color = extractedColors[boxKey];

            // CSS expects alpha between 0 and 1, so we divide the OpenCV alpha (0-255) by 255
            const cssAlpha = (color.a / 255).toFixed(2);
            const rgbaString = `rgba(${color.r}, ${color.g}, ${color.b}, ${cssAlpha})`;
            const hexString = window.imageProcessing.rgbToHex(color.r, color.g, color.b);

            // Create a wrapper card for each color
            const cardDiv = document.createElement('div');
            cardDiv.style.border = '1px solid #ddd';
            cardDiv.style.padding = '10px';
            cardDiv.style.borderRadius = '8px';
            cardDiv.style.textAlign = 'center';
            cardDiv.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            cardDiv.style.minWidth = '80px';

            // Create the visual color box (swatch)
            const swatchDiv = document.createElement('div');
            swatchDiv.style.width = '60px';
            swatchDiv.style.height = '60px';
            swatchDiv.style.backgroundColor = rgbaString;
            swatchDiv.style.margin = '0 auto 10px auto';
            swatchDiv.style.border = '1px solid #aaa';
            swatchDiv.style.borderRadius = '4px';

            // Create the text label (showing Box Key and Hex Code)
            const labelDiv = document.createElement('div');
            labelDiv.style.fontFamily = 'monospace';
            labelDiv.style.fontSize = '12px';
            labelDiv.innerHTML = `<strong>${boxKey}</strong><br>${hexString}`;

            // Assemble the card and append it to the container
            cardDiv.appendChild(swatchDiv);
            cardDiv.appendChild(labelDiv);
            container.appendChild(cardDiv);
        }
    },

    analyzeLighting: function (imgElement) {
        let src = cv.imread(imgElement);
        let hsv = new cv.Mat();
        let mask = new cv.Mat();

        // 1. Convert to HSV
        cv.cvtColor(src, hsv, cv.COLOR_RGBA2RGB);
        cv.cvtColor(hsv, hsv, cv.COLOR_RGB2HSV);

        // 2. Define 'Background' (Low Saturation)
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
            // The S channel tells you how 'pure white/grey' it is (lower is better)
            saturation: Math.round(meanHsv[1])
        };
        return results;
    },

    rgbToHex: function (r, g, b) {
        return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
    },
}



// TODO: 
/**
 The Solution: Euclidean DistanceThink of your colors as points on a 3D graph (where X, Y, and Z are R, G, and B).
 To find the closest match, we calculate the straight-line distance between your target color and each of your range colors using this formula:
 $Distance = \sqrt{(R_1 - R_2)^2 + (G_1 - G_2)^2 + (B_1 - B_2)^2}$
 The range with the lowest distance is your match.Here is how to implement this in code.
 Since your data structure looks like JavaScript/JSON, here is the JS approach (and the Python equivalent, since OpenCV is heavily used there).
 */

// using RGB
function findClosestRange(opencvColorBGR, ranges) {
    // 1. Convert OpenCV BGR array to RGB object
    const targetColor = {
        r: opencvColorBGR[2],
        g: opencvColorBGR[1],
        b: opencvColorBGR[0]
    };

    let closestRange = null;
    let minDistance = Infinity;

    // 2. Loop through your ranges to find the closest match
    for (const [key, data] of Object.entries(ranges)) {
        const refColor = data.color;

        // Calculate Euclidean distance
        const distance = Math.sqrt(
            Math.pow(targetColor.r - refColor.r, 2) +
            Math.pow(targetColor.g - refColor.g, 2) +
            Math.pow(targetColor.b - refColor.b, 2)
        );

        // Update if this is the closest one we've seen
        if (distance < minDistance) {
            minDistance = distance;
            closestRange = data;
        }
    }

    return closestRange;
}

// Example usage:
// const myOpenCVColor = [0, 200, 255]; // A BGR color (Yellow-ish)
// const result = findClosestRange(myOpenCVColor, ranges);
// console.log(`The color is in the ${result.interpretation} range.`);


// using HSV

// 1. Helper function: Convert RGB to HSV
function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h = 0;
    let s = max === 0 ? 0 : d / max;
    let v = max;

    if (max !== min) {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // Return h in 0-360, s and v in 0-1
    return { h: h * 360, s: s, v: v };
}

// 2. Main function: Find the closest range using HSV
function findClosestRangeHSV(opencvColorBGR, ranges) {
    // Convert OpenCV BGR array to RGB, then to HSV
    const targetHSV = rgbToHsv(
        opencvColorBGR[2], // R
        opencvColorBGR[1], // G
        opencvColorBGR[0]  // B
    );

    let closestRange = null;
    let minDistance = Infinity;

    for (const [key, data] of Object.entries(ranges)) {
        // Convert the reference color from your ranges to HSV
        const refHSV = rgbToHsv(data.color.r, data.color.g, data.color.b);

        // Calculate Circular Hue Difference (and normalize it to 0-1 so it matches S and V)
        let diffH = Math.abs(targetHSV.h - refHSV.h);
        diffH = Math.min(diffH, 360 - diffH) / 360;

        // Calculate Saturation and Value differences
        const diffS = targetHSV.s - refHSV.s;
        const diffV = targetHSV.v - refHSV.v;

        // Calculate 3D Euclidean distance in the normalized HSV space
        // We multiply diffH by 2 to give the actual color (Hue) slightly more importance 
        // than brightness/shadows (Value) for the final match.
        const distance = Math.sqrt(
            Math.pow(diffH * 2, 2) +
            Math.pow(diffS, 2) +
            Math.pow(diffV, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestRange = data;
        }
    }

    return closestRange;
}

// Example usage:
// const myOpenCVColor = [30, 150, 10]; // Darkish green BGR from a real photo
// const result = findClosestRangeHSV(myOpenCVColor, ranges);
// console.log(`The closest HSV color is in the ${result.interpretation} range.`);