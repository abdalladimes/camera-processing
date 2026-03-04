const overlayImageMeasurements = {
    width: 50,
    height: 300,
    samplingBoxSizePercentage: 0.7,
    sampleBoxes: {
        box1: { center: { y: 29 }, width: 39, height: 30 },
        box2: { center: { y: 64 }, width: 39, height: 30 },
        box3: { center: { y: 99 }, width: 39, height: 30 },
        box4: { center: { y: 134 }, width: 39, height: 30 },
        box5: { center: { y: 169 }, width: 39, height: 30 },
        box6: { center: { y: 204 }, width: 39, height: 30 },
        box7: { center: { y: 239 }, width: 39, height: 30 },
        box8: { center: { y: 274 }, width: 39, height: 30 },
    }
};

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('openCameraBtn').addEventListener('click', function () {
        buildfire.services.camera.getPicture({ overlayImageUrl: new URL('./height_blank.png', window.location.href).href, destinationType: 0 }, (err, imageData) => {
            if (err) return console.error(err);
            imageUrl = imageData;
            console.log("Image src is" + imageData);

            processCameraImage(imageData, true);
        });
    });

    function processCameraImage(imageSrc, imageAsData) {
        const img = new Image();
        img.onload = function () {
            const lightingResults = window.imageProcessing.analyzeLighting(img);
            // TODO: for testing
            const testResultsDiv = document.getElementById('testResults');
            testResultsDiv.innerHTML = JSON.stringify(lightingResults, null, 2);

            // TEMPORARY LOGGING FOR YOUR SCREEN:
            const isBlurry = window.imageProcessing.isImageBlurrySobel(img);
            document.getElementById('isBlurry').innerHTML =
                `Sobel Score: <b>${Math.round(variance)}</b> <br> ` +
                (isBlurry ? `(Blurry)` : `(Sharp)`);


            window.imageProcessing.displayOverlayBoxes(img, overlayImageMeasurements);
            const extractedColors = window.imageProcessing.getSamplesColors(img, overlayImageMeasurements);
            console.error(extractedColors);
            window.imageProcessing.renderSamplesColors(extractedColors);
        };
        if (imageAsData) {
            img.src = `data:image/png;base64,${imageSrc}`;
        } else {
            img.src = imageSrc;
        }
        document.getElementById('originalImage').innerHTML = ''; // Clear any previous image
        document.getElementById('originalImage').appendChild(img);
    }


});