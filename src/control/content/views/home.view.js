import parameter from './parameter.view';
import navigationService from '../services/navigation.service';
import testsConfigService from '../services/testsConfig.service';

const { push, navigateWidget } = navigationService;
const DATASTORE_TAG = 'config';
const state = {
    data: null,
    homeEditor: null,
    timerEditor: null,
    homeEditorInitialized: false,
    timerEditorInitialized: false,
    allParameters: testsConfigService.testParameters,
}
function init() {
    buildfire.spinner.show();
    buildfire.datastore.get(DATASTORE_TAG, (err, result) => {
        if (err) {
            console.error('Error fetching data', err);
            return;
        }
        state.data = result.data;
        const promises = [];
        promises.push(new Promise((resolve) => {
            initTimerWysiwyg(() => {
                resolve();
            });
        }));
        promises.push(new Promise((resolve) => {
            initHomeWysiwyg(() => {
                resolve();
            });
        }));

        Promise.all(promises).finally(() => {
            buildfire.spinner.hide();
        });
    });


    const testsListViewOptions = {
        appearance: {
            itemImageEditable: false,
            itemImageStyle: 'none'
        },
        settings: {
            allowDragAndDrop: false,
            showAddButton: false,
            showEditButton: true,
            showDeleteButton: false,
            contentMapping: {
                idKey: 'id',
                columns: [
                    { imageKey: 'imageUrl' },
                    { titleKey: 'name' },
                ],
            }
        },
        sortOptions: [
            { title: 'Newest First', },
            { title: 'Oldest Z-A', default: true }
        ]
    }

    let controlListView = new buildfire.components.control.listView('#testsListView', testsListViewOptions);

    controlListView.onDataRequest = (event, callback) => {
        testsConfigService.getAll((error, allParameters) => {
            if (error) {
                console.error('Error fetching all parameters', error);
                resolve();
                return;
            }
            state.allParameters = allParameters;
            callback(state.allParameters);
        });
    };

    controlListView.onItemRender = (event, callback) => {
        let presetOptions = {
            disableDelete: false,
            disableEdit: false
        };

        let actions = [];

        return { actions, presetOptions };
    };

    controlListView.onItemActionClick = (event) => {
        if (event.actionId === 'edit') {
            push({ template: 'parameter', view: parameter, data: { parameter: event.item } }, (err) => {
                if (err) {
                    console.error('Error pushing to history:', err);
                }
            });
        }
    }

    controlListView.onAddButtonClick = () => {
    };

}

function destroy() {
    tinymce.remove('#introductionWysiwyg');
    tinymce.remove('#timerWysiwyg');
}

function saveData(options, callback) {
    const dataToSave = {
        introduction: state.homeEditor ? state.homeEditor.getContent() : '',
        timer: state.timerEditor ? state.timerEditor.getContent() : '',
    };
    buildfire.datastore.save(dataToSave, DATASTORE_TAG, (err, result) => {
        if (callback) callback(err, result);
    });
}

function initHomeWysiwyg(callback) {
    let timerDelay = null;
    tinymce.init({
        selector: '#introductionWysiwyg',
        setup: (homeEditor) => {
            state.homeEditor = homeEditor;
            homeEditor.on('change keyUp', (e) => { // use change and keyUp to cover all cases
                if (e && e.target && e.target.getAttribute && e.target.getAttribute('data-id') === 'introductionWysiwyg') {
                    if (timerDelay) clearTimeout(timerDelay);
                    timerDelay = setTimeout(() => { // use timer delay to avoid handling too many WYSIWYG updates
                        saveData();
                        navigateWidget({ template: 'home', navigationType: 'push' }, (err) => {
                            if (err) {
                                console.error('Error pushing to history:', err);
                            }
                        });
                    }, 500);
                }
            });
            homeEditor.on('init', () => {
                homeEditor.setContent(state.data?.introduction || '');
                callback();
            });
        }
    });
}

function initTimerWysiwyg(callback) {
    let timerDelay = null;
    tinymce.init({
        selector: '#timerWysiwyg',
        setup: (timerEditor) => {
            state.timerEditor = timerEditor;
            timerEditor.on('change keyUp', (e) => { // use change and keyUp to cover all cases
                if (e && e.target && e.target.getAttribute && e.target.getAttribute('data-id') === 'timerWysiwyg') {
                    if (timerDelay) clearTimeout(timerDelay);
                    timerDelay = setTimeout(() => { // use timer delay to avoid handling too many WYSIWYG updates
                        saveData();
                        navigateWidget({ template: 'timer', navigationType: 'push' }, (err) => {
                            if (err) {
                                console.error('Error pushing to history:', err);
                            }
                        });
                    }, 500);
                }
            });
            timerEditor.on('init', () => {
                timerEditor.setContent(state.data?.timer || '');
                callback();
            });
        }
    });
}
export default { init, destroy }