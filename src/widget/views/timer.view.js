import buildfire from 'buildfire';
import navigationService from '../services/navigation.service';

let _listener = null;

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
        config.test = options.test;
        elements.testName.innerText = 'Urine ' + options.test.name;
        const duration = options.test.config.duration || 60;
        elements.timeDisplay.textContent = formatTime(duration);
        if (!buildfire.isWeb()) {
            startTimer(duration);
        }
    } else {
        elements.testName.innerText = 'Test Title';
    }
    _listener = buildfire.datastore.onUpdate((event) => {
        console.log('Data has been updated ', event);
        if (event && event.tag === config.datastoreTag) {
            const newContent = event.data?.timer || '';
            if (elements.timerWysiwyg) elements.timerWysiwyg.innerHTML = newContent;
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
        if (buildfire.isWeb()) {
            buildfire.dialog.alert({ title: 'Camera Is Not Available', message: 'Camera is not available on web.' });
            return;
        }
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
    if (_listener) {
        _listener.clear();
        _listener = null;
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
    elements.timeDisplay.textContent = formatTime(timeLeft);

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
        elements.timeDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(config.countdownInterval);
            navigateToCameraAnalyze();
        }
    }, 1000);
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}


export default { init, destroy }