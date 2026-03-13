import buildfire from 'buildfire';
import imageProcessingService from './services/imageProcessing.service';

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


    const listViewOptions = {
        settings: {
            showSearchBar: false,
            enableReadMore: true,
        }
    };

    const listView = new buildfire.components.listView('#testsListView', listViewOptions);

    listView.append([
        {
            id: '1',
            title: '<div style="color: green;">buildfire</div>',
            subtitle: '<div style="color: red;">The Most Powerful App Maker For iOS & Android </div>',
            description: 'Buildfire’s powerful and easy to use mobile app builder allows you to create an app for your business, organization, or blog without writing a single line of code. With our drag and drop app builder, you can customize your app’s design, layout, and features to create a unique mobile experience for your users.',
        },

        {
            id: '2',
            title: '<div style="color: green;">buildfire</div>',
            subtitle: '<div style="color: blue;">The Most Powerful App Maker For iOS & Android </div>',
            description: 'Buildfire’s powerful and easy to use mobile app builder allows you to create an app for your business, organization, or blog without writing a single line of code. With our drag and drop app builder, you can customize your app’s design, layout, and features to create a unique mobile experience for your users.',
        },
    ]);

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
            const lightingResults = imageProcessingService.analyzeLighting(img);
            // TODO: for testing
            const testResultsDiv = document.getElementById('testResults');
            testResultsDiv.innerHTML = JSON.stringify(lightingResults, null, 2);

            // TEMPORARY LOGGING FOR YOUR SCREEN:
            const { isBlurry, variance } = imageProcessingService.isImageBlurrySobel(img);
            document.getElementById('isBlurry').innerHTML =
                `Sobel Score: <b>${Math.round(variance)}</b> <br> ` +
                (isBlurry ? `(Blurry)` : `(Sharp)`);


            imageProcessingService.displayOverlayBoxes(img, overlayImageMeasurements);
            const extractedColors = imageProcessingService.getSamplesColors(img, overlayImageMeasurements);
            console.error(extractedColors);
            imageProcessingService.renderSamplesColors(extractedColors);
        };
        if (imageAsData) {
            img.src = `data:image/png;base64,${imageSrc}`;
        } else {
            img.src = imageSrc;
        }
        document.getElementById('originalImage').innerHTML = ''; // Clear any previous image
        document.getElementById('originalImage').appendChild(img);
    }

    let countdownInterval;

    // We set a default of 60 just in case the button doesn't pass a number
    function startTimer(timeLeft = 60) {
        // 1. Clear any existing timer immediately
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        const display = document.getElementById('timeDisplay');
        const progressCircle = document.getElementById('progressRingCircle');

        // 2. IMMEDIATELY update the text
        let initialSeconds = timeLeft < 10 ? '0' + timeLeft : timeLeft;
        display.textContent = `0:${initialSeconds}`;

        // 3. Hard reset the animation AND the visual state
        // Explicitly setting the offset to 0 guarantees it becomes a full ring again
        progressCircle.style.animation = 'none';
        progressCircle.style.strokeDashoffset = '0';

        // 4. Force the browser to register the reset (Reflow)
        void progressCircle.offsetWidth;

        // 5. Apply the new animation safely
        progressCircle.style.animation = `drain ${timeLeft}s linear forwards`;

        // 6. Start the fresh countdown
        countdownInterval = setInterval(() => {
            timeLeft--;

            let seconds = timeLeft < 10 ? '0' + timeLeft : timeLeft;
            display.textContent = `0:${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    document.getElementById('startTimer').addEventListener('click', function () {
        const timeInSec = parseInt(document.getElementById('timeInSec').value, 10);
        if (!isNaN(timeInSec) && timeInSec > 0) {
            startTimer(timeInSec);
        }
    });
    document.getElementById('timeInSec').addEventListener('input', function (e) {
        const inputVal = parseInt(e.target.value, 10);
        if (!isNaN(inputVal) && inputVal > 0) {
            timeLeft = inputVal;
            document.getElementById('timeDisplay').textContent = `0:${inputVal < 10 ? '0' + inputVal : inputVal}`;
        }
    });
});