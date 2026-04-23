import buildfire from 'buildfire';
import viewsService from './views.service.js';
const templates = {};
const historyStack = [];

function getHistory() {
    return historyStack.slice();
}

/**
 * 
 * @param {{
 *   template: string,
 *   data?: object,
 *   notifyControl?: boolean
 * }} options 
 * @param {*} callback 
 * @returns 
 */

function push(options, callback) {
    if (!options || !options.template) {
        console.warn('Invalid options for push:', options);
        if (callback) {
            callback('Invalid options for push', null);
        }
        return;
    }
    const view = viewsService.getAllViews()[options.template];
    if (!view) {
        console.warn('No view found for template:', options.template);
        if (callback) {
            callback('No view found for template', null);
        }
        return;
    }
    const current = historyStack[historyStack.length - 1];

    if (current && current.template === options.template) {
        console.warn('Already on the requested template:', options.template);
        if (callback) {
            callback();
        }
        return;
    }
    historyStack.push({ template: options.template, view: view, data: options.data });
    buildfire.history.push(options.template, { showLabelInTitlebar: false });
    navigate(options.template, () => {
        if (view && view.init) {
            view.init(options.data || {});
        }
        if (options.notifyControl || options.notifyControl === undefined) {
            buildfire.messaging.sendMessageToControl({ event: 'navigation', type: 'push', options: { title: options.template, data: options.data } });
        }
        if (callback) {
            callback();
        }
    });
}

function pop(options, callback) {
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

function goHome() {
    historyStack.length = 0;
    push({ template: 'home', notifyControl: false });
}

function onPopHandler() {
    const current = historyStack[historyStack.length - 1];
    if (current) {
        if (current.view && current.view.destroy) {
            current.view.destroy();

        }
        pop({ skipPop: true }, () => { });
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
    push,
    pop,
    goHome,
    onPopHandler
}