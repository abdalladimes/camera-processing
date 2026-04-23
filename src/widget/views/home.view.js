import navigationService from '../services/navigation.service';
import testsConfigService from '../services/testsConfig.service';
import historyService from '../services/history.service';
import timer from './timer.view';
const config = {
    datastoreTag: 'config',
    selectors: {
        introductionWysiwyg: '#introductionWysiwyg',
        timerWysiwyg: '#timerWysiwyg',
        scanQRButton: '#scanQRButton',
        historyBtn: '#historyBtn',
    }
}
var elements = {}; // to hold references to DOM elements
function init() {
    buildfire.spinner.show();
    // register DOM elements
    Object.keys(config.selectors).forEach(selectorKey => {
        const selector = config.selectors[selectorKey];
        elements[selectorKey] = document.querySelector(selector);
    });


    historyService.getHistory((error, value) => {
        if (error) {
            console.error('Error fetching tests history from localStorage', error);
            elements.historyBtn.style.display = 'none';
            return;
        }
        // elements.historyBtn.style.display = value && value.length > 0 ? 'block' : 'none';
    });


    applyBodyMarginBottom();
    buildfire.datastore.onUpdate((event) => {
        console.log('Data has been updated ', event);
        if (event && event.tag === config.datastoreTag) {
            const newContent = event.data?.introduction || '';
            elements.introductionWysiwyg.innerHTML = newContent;
        }
    }, false);

    buildfire.datastore.get(config.datastoreTag, (err, result) => {
        if (!err) {
            elements.introductionWysiwyg.innerHTML = result?.data?.introduction || '';
        } else {
            console.error('Error fetching data', err);
        }
        buildfire.spinner.hide();
    });

    elements.scanQRButton.addEventListener('click', () => {
        navigationService.push({
            template: 'timer', view: timer, data: {
                test: {
                    [Object.keys(testsConfigService.testsConfig)[0]]: testsConfigService.testsConfig[Object.keys(testsConfigService.testsConfig)[0]],
                }
            }
        }, (err) => { });
    });
    elements.historyBtn.addEventListener('click', () => {
        navigationService.push({ template: 'history' }, (err) => { });
    });
}

function handleQRScanResult(result) { // TODO: for QR
    if (result && result.text) {
        for (const test of Object.keys(testsConfigService.testsConfig)) {
            if (result.text.toLowerCase().includes(test.toLowerCase())) {
                navigationService.push({ template: 'timer', data: { test: test } }, (err) => { });
            }
        }
    }
}

function applyBodyMarginBottom() {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const scanButtonMArginBottom = rootStyles.getPropertyValue('--scan-btn-margin-bottom');
    const scanBttonHeight = elements.scanQRButton.offsetHeight;
    document.body.style.height = `calc(100% - (${scanButtonMArginBottom} + ${scanBttonHeight}px))`;
}

export default { init }