import buildfire from 'buildfire';
import parameter from './views/parameter.view.js';
import home from './views/home.view.js';
import navigationService from './services/navigation.service.js';

const views = {
    parameter: parameter,
    home: home
}

const { pushToHistory, popFromHistory, onPopHandler } = navigationService;

function init() {
    pushToHistory({
        template: 'home',
        view: views['home'],
        notifyControl: false
    });
    buildfire.messaging.onReceivedMessage = (message) => {
        console.log('Message received', message);
        switch (message.event) {
            case 'navigation':
                switch (message.type) {
                    case 'push':
                        pushToHistory({ template: message.options.title, view: views[message.options.title], data: message.options.data, notifyControl: false });
                        break;
                    case 'pop':
                        popFromHistory({ notifyControl: false, skipPop: true });
                        break;
                    default:
                        console.warn('Unknown navigation type:', message.type);
                }
                break;

        }
    };

    buildfire.history.onPop((breadcrumb) => {
        onPopHandler();
    });
}
init();