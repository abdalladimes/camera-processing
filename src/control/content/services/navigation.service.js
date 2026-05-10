import viewsService from './views.service';

const templates = {};
const historyStack = [];

function getNavigationHistory() {
    return historyStack.slice();
}

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
    const previous = historyStack[historyStack.length - 1];
    historyStack.push({ template: options.template, view: view, data: options.data });
    navigate(options.template, () => {
        if (previous && previous.view && previous.view.destroy) {
            previous.view.destroy();
        }
        if (view && view.init) {
            view.init({ ...options.data });
        }
        if (options.notifyWidget || options.notifyWidget === undefined) {
            navigateWidget({ template: options.template, navigationType: 'push', data: options.data, popToHome: options.popToHome }, () => { });
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
    const current = historyStack[historyStack.length - 1];
    if (current && current.view && current.view.destroy) {
        current.view.destroy();
    }
    historyStack.pop();
    const previous = historyStack[historyStack.length - 1];
    if (previous) {
        navigate(previous.template, () => {
            if (previous.view && previous.view.init) {
                previous.view.init({ ...previous.data });
            }
            if (!options || options.notifyWidget || options.notifyWidget === undefined) {
                buildfire.messaging.sendMessageToWidget({ event: 'navigation', type: 'pop' });
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

function navigateWidget(options, callback) {
    if (options.popToHome || options.popToHome === undefined) {
        buildfire.messaging.sendMessageToWidget({ event: 'navigation', type: 'home', options: { title: 'home' } });
    }
    setTimeout(() => {
        buildfire.messaging.sendMessageToWidget({ event: 'navigation', type: options.navigationType, options: { title: options.template, data: options.data } });
    }, 0);

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
    push,
    pop,
    navigateWidget,
}