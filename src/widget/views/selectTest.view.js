import navigationService from '../services/navigation.service';
import testsConfigService from '../services/testsConfig.service';
import timer from './timer.view';

const config = {
    selectors: {
        testOptionsGrid: '#testOptionsGrid',
        continueBtn: '#continueBtn',
    }
};

let elements = {};
let selectedTest = null;

function init() {
    Object.keys(config.selectors).forEach(key => {
        elements[key] = document.querySelector(config.selectors[key]);
    });

    selectedTest = null;
    renderTestOptions();

    elements.continueBtn.addEventListener('click', () => {
        if (!selectedTest) return;
        navigationService.push({
            template: 'timer', view: timer, data: {
                test: {
                    name: selectedTest,
                    config: testsConfigService.testsConfig[selectedTest],
                }
            }
        });
    });
}

function renderTestOptions() {
    const tests = Object.keys(testsConfigService.testsConfig);
    elements.testOptionsGrid.innerHTML = '';

    tests.forEach((testName, index) => {
        const btn = document.createElement('button');
        btn.className = 'mdc-button mdc-button--outlined test-option-btn';
        if (tests.length % 2 !== 0 && index === tests.length - 1) {
            btn.classList.add('test-option-btn--full-width');
        }
        btn.innerHTML = `<span class="mdc-button__label">${testName}</span>`;
        btn.addEventListener('click', () => selectTest(testName, btn));
        elements.testOptionsGrid.appendChild(btn);
    });
}

function selectTest(testName, btnElement) {
    selectedTest = testName;
    document.querySelectorAll('.test-option-btn').forEach(btn => {
        btn.classList.remove('test-option-btn--selected');
    });
    btnElement.classList.add('test-option-btn--selected');
    elements.continueBtn.removeAttribute('disabled');
}

export default { init };
