// TODO: FOR READING FROM COORDS, OPENCV NEEDS (y , x) INSTEAD OF (x, y) SO WE NEED TO FLIP THE COORDS BEFORE PASSING THEM TO OPENCV
window.imageProcessing = {
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
        return isBlurry;
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
    },

    rgbToHex: function (r, g, b) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
    },
}
