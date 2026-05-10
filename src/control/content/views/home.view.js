import parameter from './parameter.view';
import navigationService from '../services/navigation.service';
import testsConfigService from '../services/testsConfig.service';

const { push, navigateWidget } = navigationService;
const DATASTORE_TAG = 'config';
const state = {
    data: null,
    homeEditor: null,
    timerEditor: null,
    loaded: false,
    allParameters: testsConfigService.testParameters,
}
function init() {
    // Clean up any leftover tinymce instances
    tinymce.remove('#introductionWysiwyg');
    tinymce.remove('#timerWysiwyg');
    state.homeEditor = null;
    state.timerEditor = null;
    state.loaded = false;

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
            state.loaded = true;
            buildfire.spinner.hide();
            document.getElementById('homeContent').classList.remove('hidden');
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

}

function destroy() {
    tinymce.remove('#introductionWysiwyg');
    tinymce.remove('#timerWysiwyg');
    state.homeEditor = null;
    state.timerEditor = null;
    state.loaded = false;
    state.data = null;
}

function saveData(options, callback) {
    const dataToSave = {
        introduction: state.homeEditor ? state.homeEditor.getContent() : '',
        timer: state.timerEditor ? state.timerEditor.getContent() : '',
    };
    if (dataToSave.introduction === (state.data?.introduction || '')
        && dataToSave.timer === (state.data?.timer || '')) {
        return;
    }
    state.data = dataToSave;
    buildfire.datastore.save(dataToSave, DATASTORE_TAG, (err, result) => {
        if (err) return;
        if (callback) callback(null, result);
    });
}

function initHomeWysiwyg(callback) {
    let timerDelay = null;
    tinymce.init({
        selector: '#introductionWysiwyg',
        setup: (homeEditor) => {
            state.homeEditor = homeEditor;
            homeEditor.on('change keyup', () => {
                if (!state.loaded) return;
                if (!homeEditor.hasFocus()) return;
                if (timerDelay) clearTimeout(timerDelay);
                timerDelay = setTimeout(() => {
                    saveData(null, () => {
                        navigateWidget({ template: 'home', navigationType: 'push', popToHome: true }, (err) => {
                            if (err) {
                                console.error('Error pushing to history:', err);
                            }
                        });
                    });
                }, 500);
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
            timerEditor.on('change keyup', () => {
                if (!state.loaded) return;
                if (!timerEditor.hasFocus()) return;
                if (timerDelay) clearTimeout(timerDelay);
                timerDelay = setTimeout(() => {
                    saveData(null, () => {
                        navigateWidget({ template: 'timer', navigationType: 'push', popToHome: false }, (err) => {
                            if (err) {
                                console.error('Error pushing to history:', err);
                            }
                        });
                    });
                }, 500);
            });
            timerEditor.on('init', () => {
                timerEditor.setContent(state.data?.timer || '');
                callback();
            });
        }
    });
}
export default { init, destroy }