
const templates = {};
const historyStack = [];
let backButtonElement = null;

function getHistory() {
    return historyStack.slice();
}

function pushToHistory(options, callback) {
    if (!options || !options.template || !options.view) {
        console.warn('Invalid options for pushToHistory:', options);
        if (callback) {
            callback('Invalid options for pushToHistory', null);
        }
        return;
    }
    const previous = historyStack[historyStack.length - 1];
    historyStack.push({ template: options.template, view: options.view, data: options.data });
    buildfire.history.push(options.template, { showLabelInTitlebar: false });
    navigate(options.template, () => {
        if (previous && previous.view && previous.view.destroy) {
            previous.view.destroy();
        }
        if (options.view && options.view.init) {
            options.view.init({ ...options.data });
        }
        if (options.notifyWidget || options.notifyWidget === undefined) {
            buildfire.messaging.sendMessageToWidget({ event: 'navigation', type: 'push', options: { title: options.template, data: options.data } });
        }
        toggleBackButton();
        if (callback) {
            callback();
        }
    });
}

function popFromHistory(options, callback) {
    if (historyStack.length == 1) {
        if (callback) {
            callback('No more history to pop', null);
        }
        return;
    }
    const current = historyStack[historyStack.length - 1];
    if (current && current.view && current.view.destroy) {
        current.view.destroy();
    }
    historyStack.pop();
    if (!options.skipPop) {
        buildfire.history.pop();
    }
    const previous = historyStack[historyStack.length - 1];
    if (previous) {
        navigate(previous.template, () => {
            if (previous.view && previous.view.init) {
                previous.view.init({ ...previous.data });
            }
            if (!options || options.notifyWidget || options.notifyWidget === undefined) {
                buildfire.messaging.sendMessageToWidget({ event: 'navigation', type: 'pop', options: { title: previous.template, data: previous.data } });
            }

            toggleBackButton();
            if (callback) {
                callback();
            }
        });
    } else {
        if (callback) {
            callback('No more history to pop', null);
        }
    }
}

/** template management start */
function fetchTemplate(template, callback) {
    if (templates[template]) {
        console.warn(`template ${template} already exist.`);
        callback(null, template);
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        const content = xhr.responseText;
        templates[template] = new DOMParser().parseFromString(content, 'text/html');
        callback(null, template);
    };
    xhr.onerror = (err) => {
        console.error(`fetching template ${template} failed.`);
        callback(err, template);
    };
    xhr.open('GET', `./templates/${template}.html`);
    xhr.send(null);
};

function injectTemplate(template) {
    if (!templates[template]) {
        console.warn(`template ${template} not found.`);
        return;
    }
    const createTemplate = document.importNode(templates[template].querySelector('template').content, true);
    document.querySelector(`#main`).innerHTML = '';
    document.querySelector(`#main`).appendChild(createTemplate);
};

function navigate(template, callback) {
    fetchTemplate(template, () => {
        injectTemplate(template);
        if (callback) {
            callback();
        }
    });
    /** template management end */
};




function toggleBackButton() {
    if (!backButtonElement) {
        backButtonElement = document.getElementById('backButton');
        backButtonElement.addEventListener('click', () => {
            popFromHistory({});
        });
    }
    if (getHistory().length > 1) {
        backButtonElement.style.display = 'block';
    } else {
        backButtonElement.style.display = 'none';
    }
};

export default {
    getHistory,
    pushToHistory,
    popFromHistory,
}