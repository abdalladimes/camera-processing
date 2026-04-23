import navigationService from './services/navigation.service';
import viewsService from './services/views.service';
const { push, pop } = navigationService;

function init() {
    viewsService.init();
    push({
        template: 'home',
        notifyWidget: false
    });

    buildfire.messaging.onReceivedMessage = (message) => {
        console.log('Message received', message);
        switch (message.event) {
            case 'navigation':
                switch (message.type) {
                    case 'push':
                        push({ template: message.options.title, notifyWidget: false });
                        break;
                    case 'pop':
                        pop({ notifyWidget: false, skipPop: true });
                        break;
                    default:
                        console.warn('Unknown navigation type:', message.type);
                }
                break;

        }
    };
}

init();