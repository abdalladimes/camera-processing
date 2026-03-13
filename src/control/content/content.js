import navigationService from './services/navigation.service';
import home from './views/home.view';
import parameter from './views/parameter.view';
const { pushToHistory, popFromHistory } = navigationService;



const views = {
    parameter: parameter,
    home: home
}


function init() {
    pushToHistory({
        template: 'home',
        view: home,
        notifyWidget: false
    });

    buildfire.messaging.onReceivedMessage = (message) => {
        console.log('Message received', message);
        switch (message.event) {
            case 'navigation':
                switch (message.type) {
                    case 'push':
                        pushToHistory({ template: message.data.title, view: views[message.data.title], notifyWidget: false });
                        break;
                    case 'pop':
                        popFromHistory({ notifyWidget: false, skipPop: true });
                        break;
                    default:
                        console.warn('Unknown navigation type:', message.type);
                }
                break;

        }
    };
}

init();