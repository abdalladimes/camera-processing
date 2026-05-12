import testsConfigService from '../services/testsConfig.service';
import navigationService from '../services/navigation.service';
import resultsHistoryService from '../services/resultsHistory.service';
import resultsService from '../services/results.service';

// ═══════════════════════════════════════════════════════════════
// Toggle this to enable auto-capture with frame validation
const USE_AUTO_CAPTURE = false;
// ═══════════════════════════════════════════════════════════════

const MIN_BRIGHTNESS = 120;
const MAX_BRIGHTNESS = 220;
const MAX_SATURATION = 40;

let state = {
    test: null,
    testName: null,
    overlayImage: {},
    parameters: {},
    lastResults: null,
    lastHistoryEntry: null,
    selectors: {
        detectionFailedContainer: '#detectionFailedContainer',
        analyzingContainer: '#analyzingContainer',
        resultsContainer: '#resultsContainer',
    }
}
let elements = {};

let _isProcessing = false;
let _lastValidation = null;
let _frameAccepted = false;
let _captureTimeout = null;
let _hasResults = false;
const CAPTURE_TIMEOUT_MS = 10000;

function init(options) {
    state.test = options?.test || null;
    state.testName = state.test ? state.test.name : null;

    if (state.test) {
        state.overlayImage = state.test.config?.overlayImage || {};
        state.parameters = getTestParameters(state.test);
    }

    // register DOM elements
    Object.keys(state.selectors).forEach(selectorKey => {
        const selector = state.selectors[selectorKey];
        elements[selectorKey] = document.querySelector(selector);
    });

    if (!_hasResults) {
        startCameraCapture();
    } else {
        showResults();
        resultsService.renderResults(state.lastResults, state.parameters, { showAddNotes: true, historyEntry: state.lastHistoryEntry });
    }

    document.getElementById('retryButton').addEventListener('click', () => {
        if (USE_AUTO_CAPTURE) {
            if (_captureTimeout) { clearTimeout(_captureTimeout); _captureTimeout = null; }
            _frameAccepted = false;
            _lastValidation = null;
            _isProcessing = false;
        }
        hideAllContainers();
        startCameraCapture();
    });

    document.getElementById('goHomeBtn').addEventListener('click', () => {
        navigationService.goHome();
    });

    document.getElementById('debugToggle').addEventListener('change', (e) => {
        document.getElementById('debugContainer').classList.toggle('active', e.target.checked);
    });
}

function startCameraCapture() {
    if (USE_AUTO_CAPTURE) {
        startAutoCameraCapture();
    } else {
        startManualCameraCapture();
    }
}

function startManualCameraCapture() {
    getImageFromCamera({
        overlayImageUrl: state.overlayImage.url
    }, (error, imageData) => {
        if (error) {
            console.error('Camera closed/cancelled:', error);
            return;
        }
        processCameraImage(imageData, true);
    });
}

function startAutoCameraCapture() {
    _frameAccepted = false;
    _lastValidation = null;
    _isProcessing = false;

    if (_captureTimeout) clearTimeout(_captureTimeout);
    _captureTimeout = setTimeout(() => {
        if (!_frameAccepted) {
            console.log('!!!!!!!!!!!⏰ Capture timeout — no valid frame in ' + CAPTURE_TIMEOUT_MS/1000 + 's. Stopping.');
            _frameAccepted = true;
            buildfire.services.camera.stopAutoCapture({}, () => {});
        }
    }, CAPTURE_TIMEOUT_MS);

    // Register continuous frame handler (event-based, fires repeatedly)
    buildfire.services.camera.onFrame((err, imageData) => {
        if (_frameAccepted) return;
        if (_isProcessing) return;
        _isProcessing = true;
        console.log('!!!!!!!!!!!📸 Frame received, validating...');
        validateAndProcess(imageData);
    });

    // Open camera — callback only fires for cancel/error
    getImageFromCamera({
        overlayImageUrl: state.overlayImage.url
    }, (error, imageData) => {
        if (error) {
            console.error('Camera closed/cancelled:', error);
            _frameAccepted = true;
            if (_captureTimeout) { clearTimeout(_captureTimeout); _captureTimeout = null; }
        }
    });
}

function validateAndProcess(imageSrc) {
    const imgElement = new Image();
    imgElement.onload = function () {
        const validation = validateFrame(imgElement);
        console.log('!!!!!!!!!!!🔍 Frame validation:', JSON.stringify(validation));

        if (validation.valid) {
            _frameAccepted = true;
            if (_captureTimeout) { clearTimeout(_captureTimeout); _captureTimeout = null; }
            console.log('!!!!!!!!!!!✅ Frame accepted! Stopping screenshots and processing...');
            buildfire.services.camera.stopAutoCapture({}, () => {});
            processCameraImage(imageSrc, true);
        } else {
            _isProcessing = false;
        }
    };
    imgElement.onerror = function () {
        console.log('!!!!!!!!!!!❌ Image failed to load');
        _isProcessing = false;
    };
    imgElement.src = `data:image/jpeg;base64,${imageSrc}`;
}

function getTestParameters(test) {
    let parameters = {};
    for (let parameterName of Object.keys(test.config.parameters)) {
        const param = testsConfigService.getLocalParameter(parameterName);
        if (!param) continue;
        parameters[parameterName] = param;
        parameters[parameterName].locationOnOverlay = test.config.parameters[parameterName].locationOnOverlay;
    }
    return parameters;
}

function getImageFromCamera(options, callback) {
    buildfire.services.camera.getPicture({ overlayImageUrl: new URL(options.overlayImageUrl, window.location.href).href, destinationType: 0, quality: 100 }, callback);
}

function hideAllContainers() {
    elements.detectionFailedContainer.classList.remove('active');
    elements.resultsContainer.classList.remove('active');
}

function showDetectionFailed() {
    hideAllContainers();
    elements.detectionFailedContainer.classList.add('active');
}

function showResults() {
    hideAllContainers();
    elements.resultsContainer.classList.add('active');
}

function processCameraImage(imageSrc, imageAsData) {
    const testResultsDiv = document.getElementById('testResults');
    // 1. Create a new image element in memory
    const imgElement = new Image();
    imgElement.onload = function () {
        const lightingResults = analyzeLighting(imgElement);
        const isBlurry = isImageBlurrySobel(imgElement);

        if (lightingResults.brightness < MIN_BRIGHTNESS
            || lightingResults.brightness > MAX_BRIGHTNESS
            || lightingResults.saturation > MAX_SATURATION
            || isBlurry) {
            let reasons = [];
            if (lightingResults.brightness < MIN_BRIGHTNESS) reasons.push('Too dark (brightness: ' + lightingResults.brightness + ')');
            if (lightingResults.brightness > MAX_BRIGHTNESS) reasons.push('Too bright (brightness: ' + lightingResults.brightness + ')');
            if (lightingResults.saturation > MAX_SATURATION) reasons.push('High saturation (' + lightingResults.saturation + ')');
            if (isBlurry) reasons.push('Image is blurry');
            document.querySelector('.detection-failed__reason').textContent = reasons.join(', ');
            showDetectionFailed();
            return;
        }

        showResults();
        _hasResults = true;
        testResultsDiv.innerHTML = JSON.stringify(lightingResults, null, 2);

        document.getElementById('isBlurry').innerHTML = '(Sharp)';
        const extractedColors = getParameterColorsFromImage(imgElement);
        drawSamplingPoints(imgElement);
        const results = getResultsFromExtractedColors(extractedColors, state.parameters);
        state.lastResults = results;
        document.getElementById('extractedColors').innerHTML = JSON.stringify(extractedColors, null, 2);
        document.getElementById('results').innerHTML = JSON.stringify(results, null, 2);
        resultsService.renderResults(results, state.parameters, { showAddNotes: true, historyEntry: state.lastHistoryEntry });
        saveResultsToHistory(results);
    };
    if (imageAsData) {
        imgElement.src = `data:image/png;base64,${imageSrc}`;
    } else {
        imgElement.src = imageSrc;
    }
}

function drawSamplingPoints(imgElement) {
    var src = cv.imread(imgElement);
    var imageHeight = src.rows;
    var imageWidth = src.cols;
    var scaleY = imageHeight / state.overlayImage.height;
    var overlayWidthScaled = state.overlayImage.width * scaleY;
    var imageCenterX = imageWidth / 2;
    var overlayLeftX = imageCenterX - (overlayWidthScaled / 2);

    for (var boxKey in state.parameters) {
        var box = state.parameters[boxKey].locationOnOverlay;
        var centerX = Math.round((box.center.x * scaleY) + overlayLeftX);
        var centerY = Math.round(box.center.y * scaleY);
        var radius = Math.round(box.samplingOffsetRadius * scaleY);
        var center = new cv.Point(centerX, centerY);
        cv.circle(src, center, radius, [0, 255, 0, 255], 2);
        cv.putText(src, boxKey.substring(0, 4), new cv.Point(centerX + radius + 5, centerY + 5), cv.FONT_HERSHEY_SIMPLEX, 0.5, [0, 255, 0, 255], 1);
    }

    var canvas = document.getElementById('canvasOutput');
    cv.imshow(canvas, src);
    src.delete();
}

// Validates a frame by checking Ascorbate + Zinc match known colors and brightness is acceptable
// Uses consistency check — two consecutive frames must agree
function validateFrame(imgElement) {
    const DELTA_E_THRESHOLD = 10;
    const MIN_BRIGHTNESS = 120;
    const MAX_BRIGHTNESS = 220;

    // 1. Check brightness
    const lighting = analyzeLighting(imgElement);
    if (lighting.brightness < MIN_BRIGHTNESS || lighting.brightness > MAX_BRIGHTNESS) {
        _lastValidation = null;
        return { valid: false, reason: 'brightness', brightness: lighting.brightness };
    }

    // 2. Extract colors for Ascorbate and Zinc only
    const checkParams = ['Ascorbate', 'Zinc'];
    const extractedColors = extractColorsForParameters(imgElement, checkParams);

    // 3. Check each against all its calibrated levels
    const currentMatches = {};
    for (const paramName of checkParams) {
        const color = extractedColors[paramName];
        if (!color) {
            _lastValidation = null;
            return { valid: false, reason: 'missing_' + paramName };
        }

        const parameter = state.parameters[paramName];
        if (!parameter) {
            _lastValidation = null;
            return { valid: false, reason: 'no_param_' + paramName };
        }

        const extractedLab = rgbToLab(color.r, color.g, color.b);
        let lowestDeltaE = Infinity;
        let bestMatch = null;

        for (const valueRange of parameter.valueRanges) {
            const refHex = valueRange.referenceColor.hex;
            if (refHex === '#000000') continue;
            const refRgb = hexToRgba(refHex);
            const refLab = rgbToLab(refRgb.r, refRgb.g, refRgb.b);
            const dE = calculateDeltaE(extractedLab, refLab);
            if (dE < lowestDeltaE) {
                lowestDeltaE = dE;
                bestMatch = valueRange.correspondingValue;
            }
        }

        if (lowestDeltaE > DELTA_E_THRESHOLD) {
            _lastValidation = null;
            return { valid: false, reason: paramName + '_no_match', deltaE: lowestDeltaE };
        }

        currentMatches[paramName] = bestMatch;
    }

    // 4. Consistency check — compare with previous frame
    if (_lastValidation
        && _lastValidation.Ascorbate === currentMatches.Ascorbate
        && _lastValidation.Zinc === currentMatches.Zinc) {
        _lastValidation = null;
        return { valid: true, brightness: lighting.brightness, matches: currentMatches };
    }

    // Store for next frame comparison
    _lastValidation = currentMatches;
    return { valid: false, reason: 'waiting_for_consistency', matches: currentMatches };
}

// Extracts colors for specific parameter names only (faster than all 20)
function extractColorsForParameters(imgElement, paramNames) {
    const openCvImage = cv.imread(imgElement);
    cv.GaussianBlur(openCvImage, openCvImage, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
    const imageHeight = openCvImage.rows;
    const imageWidth = openCvImage.cols;
    const scaleY = imageHeight / state.overlayImage.height;
    const overlayWidthScaled = state.overlayImage.width * scaleY;
    const imageCenterX = imageWidth / 2;
    const overlayLeftX = imageCenterX - (overlayWidthScaled / 2);
    const extractedColors = {};

    for (const boxKey of paramNames) {
        const param = state.parameters[boxKey];
        if (!param) continue;
        const box = param.locationOnOverlay;
        const centerX = (box.center.x * scaleY) + overlayLeftX;
        const centerY = (box.center.y * scaleY);
        const radius = Math.round(box.samplingOffsetRadius * scaleY);
        const startX = Math.max(0, Math.min(Math.round(centerX - radius), imageWidth - 1));
        const startY = Math.max(0, Math.min(Math.round(centerY - radius), imageHeight - 1));
        const endX = Math.max(0, Math.min(Math.round(centerX + radius), imageWidth - 1));
        const endY = Math.max(0, Math.min(Math.round(centerY + radius), imageHeight - 1));
        const rect = new cv.Rect(startX, startY, Math.max(1, endX - startX), Math.max(1, endY - startY));
        const roiMat = openCvImage.roi(rect);
        const mask = new cv.Mat.zeros(roiMat.rows, roiMat.cols, cv.CV_8UC1);
        cv.circle(mask, new cv.Point(Math.round(centerX) - startX, Math.round(centerY) - startY), radius, [255, 0, 0, 0], -1);
        const meanColor = cv.mean(roiMat, mask);
        extractedColors[boxKey] = {
            r: Math.round(meanColor[0]),
            g: Math.round(meanColor[1]),
            b: Math.round(meanColor[2]),
            a: Math.round(meanColor[3])
        };
        roiMat.delete();
        mask.delete();
    }

    openCvImage.delete();
    return extractedColors;
}

function getResultsFromExtractedColors(extractedColors, parameters) {
    const results = {};

    for (const parameterKey in extractedColors) {
        const extractedColor = extractedColors[parameterKey];
        const parameter = parameters[parameterKey];
        if (!parameter) continue;

        const extractedLab = rgbToLab(extractedColor.r, extractedColor.g, extractedColor.b);
        let closestMatch = null;
        let lowestDeltaE = Infinity;
        let bestMatchRgb = null;

        for (const valueRange of parameter.valueRanges) {
            const referenceColorRgb = hexToRgba(valueRange.referenceColor.hex);
            const referenceLab = rgbToLab(referenceColorRgb.r, referenceColorRgb.g, referenceColorRgb.b);
            const currentDeltaE = calculateDeltaE(extractedLab, referenceLab);
            if (currentDeltaE < lowestDeltaE) {
                lowestDeltaE = currentDeltaE;
                closestMatch = valueRange;
                bestMatchRgb = referenceColorRgb;
            }
        }

        if (closestMatch && lowestDeltaE) {
            results[parameterKey] = {
                value: closestMatch.correspondingValue,
                interpretation: closestMatch.interpretation,
                range: closestMatch.range || 'Unknown',
                clarification: closestMatch.clarification,
                referenceColor: closestMatch.referenceColor.hex,
                referenceColorRgb: bestMatchRgb,
                extractedColor: extractedColor,
                deltaE_Score: lowestDeltaE
            };
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

        const centerX = (box.center.x * scaleY) + overlayLeftX;
        const centerY = (box.center.y * scaleY);
        const radius = Math.round(box.samplingOffsetRadius * scaleY);

        const startX = Math.max(0, Math.min(Math.round(centerX - radius), imageWidth - 1));
        const startY = Math.max(0, Math.min(Math.round(centerY - radius), imageHeight - 1));
        const endX = Math.max(0, Math.min(Math.round(centerX + radius), imageWidth - 1));
        const endY = Math.max(0, Math.min(Math.round(centerY + radius), imageHeight - 1));

        const rect = new cv.Rect(startX, startY, Math.max(1, endX - startX), Math.max(1, endY - startY));
        const roiMat = openCvImage.roi(rect);

        const mask = new cv.Mat.zeros(roiMat.rows, roiMat.cols, cv.CV_8UC1);
        cv.circle(mask, new cv.Point(Math.round(centerX) - startX, Math.round(centerY) - startY), radius, [255, 0, 0, 0], -1);

        const meanColor = cv.mean(roiMat, mask);
        extractedColors[boxKey] = {
            r: Math.round(meanColor[0]),
            g: Math.round(meanColor[1]),
            b: Math.round(meanColor[2]),
            a: Math.round(meanColor[3])
        };

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

// CIE76 Delta E — Euclidean distance in CIELAB (L weight reduced to prioritize hue over brightness)
function calculateDeltaE(lab1, lab2) {
    let deltaL = lab1.L - lab2.L;
    let deltaA = lab1.a - lab2.a;
    let deltaB = lab1.b - lab2.b;
    return Math.sqrt((deltaL * deltaL) + (deltaA * deltaA) + (deltaB * deltaB));
}

function saveResultsToHistory(results) {
    resultsHistoryService.getAll((err, data) => {
        const existingResults = data?.results || [];
        let maxCount = 0;
        existingResults.forEach(r => {
            const match = r.title && r.title.match(/^Test (\d+)$/);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxCount) maxCount = num;
            }
        });
        const entry = {
            title: 'Test ' + (maxCount + 1),
            description: '',
            parameters: results,
            createdOn: new Date().toISOString(),
        };
        resultsHistoryService.save(entry, (err) => {
            if (err) console.error('Error saving results to history', err);
            else state.lastHistoryEntry = entry;
        });
    });
}

function destroy() {
    if (_captureTimeout) {
        clearTimeout(_captureTimeout);
        _captureTimeout = null;
    }
    _hasResults = false;
    state.lastResults = null;
    state.lastHistoryEntry = null;
}

export default { init, destroy, validateFrame }