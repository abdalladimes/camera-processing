import buildfire from 'buildfire';
import navigationService from '../services/navigation.service';

const config = {
    datastoreTag: 'config',
    countdownInterval: null,
    test: null,
    selectors: {
        timerWysiwyg: '#timerWysiwyg',
        testName: '#testName',
        timeDisplay: '#timeDisplay',
        progressRingCircle: '#progressRingCircle',
        skipTimerButton: '#skipTimerButton'
    }
}
var elements = {}; // to hold references to DOM elements


function init(options) {
    config.test = options?.test || null;
    // register DOM elements
    Object.keys(config.selectors).forEach(selectorKey => {
        const selector = config.selectors[selectorKey];
        elements[selectorKey] = document.querySelector(selector);
    });
    if (options && options.test) {
        elements.testName.innerText = Object.keys(options.test)[0];
        if (!buildfire.isWeb()) { // only start timer on devices
            const dynamicData = options.test[Object.keys(options.test)[0]];
            startTimer(dynamicData.duration);
        }
    } else {
        elements.testName.innerText = 'Test Title';
    }
    buildfire.datastore.onUpdate((event) => {
        console.log('Data has been updated ', event);
        if (event && event.tag === config.datastoreTag) {
            const newContent = event.data?.timer || '';
            elements.timerWysiwyg.innerHTML = newContent;
        }
    });

    buildfire.datastore.get(config.datastoreTag, (err, result) => {
        if (err) {
            console.error('Error fetching data', err);
            return;
        }
        elements.timerWysiwyg.innerHTML = result.data?.timer || '';
    });

    elements.skipTimerButton.addEventListener('click', () => {
        if (config.countdownInterval) {
            clearInterval(config.countdownInterval);
        }
        navigateToCameraAnalyze();
    });
}


function destroy() {
    if (config.countdownInterval) {
        clearInterval(config.countdownInterval);
    }
}

function navigateToCameraAnalyze() {
    // TODO: for testing only
    navigationService.push({ template: 'analyze', data: { test: config.test } });


    buildfire.services.camera.isAuthorized(null, (err, status) => {
        if (err) {
            console.error(err);
            return;
        }
        if (status) {
            navigationService.push({ template: 'analyze', data: { test: config.test } });
        } else {
            buildfire.services.camera.requestAuthorization(null, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (result == 'DENIED_ONCE' || result == 'DENIED_ALWAYS') {
                    buildfire.dialog.toast({
                        message: 'Camera access is required to use this feature. Please enable camera permissions in your device settings.',
                        type: 'danger',
                    })
                } else {
                    navigateToCameraAnalyze();
                    return;
                }
            });
        }
    });
}

// We set a default of 60 just in case the button doesn't pass a number
function startTimer(timeLeft = 60) {
    // 1. Clear any existing timer immediately
    if (config.countdownInterval) {
        clearInterval(config.countdownInterval);
    }

    // 2. IMMEDIATELY update the text
    let initialSeconds = timeLeft < 10 ? '0' + timeLeft : timeLeft;
    elements.timeDisplay.textContent = `0:${initialSeconds}`;

    // 3. Hard reset the animation AND the visual state
    // Explicitly setting the offset to 0 guarantees it becomes a full ring again
    elements.progressRingCircle.style.animation = 'none';
    elements.progressRingCircle.style.strokeDashoffset = '0';

    // 4. Force the browser to register the reset (Reflow)
    void elements.progressRingCircle.offsetWidth;

    // 5. Apply the new animation safely
    elements.progressRingCircle.style.animation = `drain ${timeLeft}s linear forwards`;

    // 6. Start the fresh countdown
    config.countdownInterval = setInterval(() => {
        timeLeft--;

        let seconds = timeLeft < 10 ? '0' + timeLeft : timeLeft;
        elements.timeDisplay.textContent = `0:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(config.countdownInterval);
            navigateToCameraAnalyze();
        }
    }, 1000);
}


export default { init, destroy }