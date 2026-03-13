import navigationService from '../services/navigation.service';
import testsConfigService from '../services/testsConfig.service';
import timer from './timer.view';
const config = {
    datastoreTag: 'config',
    selectors: {
        introductionWysiwyg: '#introductionWysiwyg',
        timerWysiwyg: '#timerWysiwyg',
        scanQRButton: '#scanQRButton'
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
        buildfire.services.camera.barcodeScanner.scan(
            {
                preferFrontCamera: false,
                showFlipCameraButton: true,
                formats: "QR_CODE,PDF_417",
            },
            (err, result) => {
                if (err) return console.error(err);

                handleQRScanResult(result);
            }
        );
    });
}

function handleQRScanResult(result) {
    if (result && result.text) {
        for (const test of Object.keys(testsConfigService.testsConfig)) {
            if (result.text.toLowerCase().includes(test.toLowerCase())) {
                navigationService.pushToHistory({ template: 'timer', view: timer, data: { test: test } }, (err) => { });
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