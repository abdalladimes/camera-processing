import buildfire from 'buildfire';
import navigationService from './services/navigation.service.js';
import viewsService from './services/views.service.js';

const { push, pop, onPopHandler, goHome } = navigationService;

function init() {
    viewsService.init();
    push({
        template: 'home',
        notifyControl: false
    });
    buildfire.messaging.onReceivedMessage = (message) => {
        console.log('Message received', message);
        switch (message.event) {
            case 'navigation':
                switch (message.type) {
                    case 'push':
                        push({ template: message.options.title, data: message.options.data, notifyControl: false });
                        break;
                    case 'pop':
                        pop({ notifyControl: false, skipPop: true });
                        break;
                    case 'home':
                        goHome();
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