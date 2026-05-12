import navigationService from '../services/navigation.service';
import resultsHistoryService from '../services/resultsHistory.service';

let _listener = null;

const config = {
    datastoreTag: 'config',
    selectors: {
        introductionWysiwyg: '#introductionWysiwyg',
        timerWysiwyg: '#timerWysiwyg',
        takeTestBtn: '#takeTestBtn',
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


    resultsHistoryService.getAll((error, data) => {
        if (error) {
            console.error('Error fetching tests history from localStorage', error);
            elements.historyBtn.style.display = 'none';
            return;
        }
        const hasHistory = data?.results?.length > 0;
        elements.historyBtn.style.display = hasHistory ? 'block' : 'none';
        document.getElementById('actionButtonsContainer').classList.toggle('action-buttons--stacked', hasHistory);
    });


    _listener = buildfire.datastore.onUpdate((event) => {
        console.log('Data has been updated ', event);
        if (event && event.tag === config.datastoreTag) {
            const newContent = event.data?.introduction || '';
            if (elements.introductionWysiwyg) elements.introductionWysiwyg.innerHTML = newContent;
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

    elements.takeTestBtn.addEventListener('click', () => {
        navigationService.push({ template: 'selectTest' });
    });
    elements.historyBtn.addEventListener('click', () => {
        navigationService.push({ template: 'historyList' });
    });
}


function destroy() {
    if (_listener) {
        _listener.clear();
        _listener = null;
    }
}

export default { init, destroy }