import buildfire from 'buildfire';
const templates = {};
const historyStack = [];

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
    historyStack.push({ template: options.template, view: options.view, data: options.data });
    buildfire.history.push(options.template, { showLabelInTitlebar: false });
    navigate(options.template, () => {
        if (options.view && options.view.init) {
            options.view.init(options.data || {});
        }
        if (options.notifyControl || options.notifyControl === undefined) {
            buildfire.messaging.sendMessageToControl({ event: 'navigation', type: 'push', options: { title: options.template, data: options.data } });
        }
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
    historyStack.pop();
    if (!options.skipPop) {
        buildfire.history.pop();
    }
    const previous = historyStack[historyStack.length - 1];
    if (previous) {
        navigate(previous.template, () => {
            if (previous.view && previous.view.init) {
                previous.view.init(previous.data || {});
            }
            if (!options || options.notifyControl || options.notifyControl === undefined) {
                buildfire.messaging.sendMessageToControl({ event: 'navigation', type: 'pop', data: { title: previous.template } });
            }
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

function onPopHandler() {
    const current = historyStack[historyStack.length - 1];
    if (current) {
        if (current.view && current.view.destroy) {
            current.view.destroy();

        }
        popFromHistory({ skipPop: true }, () => { });
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

export default {
    getHistory,
    pushToHistory,
    popFromHistory,
    onPopHandler
}