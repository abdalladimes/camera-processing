import buildfire from 'buildfire';
const config = {
    datastoreTag: 'config',
    selectors: {
        timerWysiwyg: '#timerWysiwyg',
    }
}
var elements = {}; // to hold references to DOM elements
function init(options) {
    // register DOM elements
    Object.keys(config.selectors).forEach(selectorKey => {
        const selector = config.selectors[selectorKey];
        elements[selectorKey] = document.querySelector(selector);
    });

    if (options && options.test) {
        document.getElementById('testName').innerText = options.test;
    }
    buildfire.datastore.onUpdate((event) => {
        console.log('Data has been updated ', event);
        if (event && event.tag === config.datastoreTag) {
            const newContent = event.data?.timer || '';
            elements.timerWysiwyg.innerHTML = newContent;
        }
    });


    buildfire.datastore.get(config.datastoreTag, (err, result) => {
        if (err) {
            console.error('Error fetching data', err);
            return;
        }
        elements.timerWysiwyg.innerHTML = result.data?.timer || '';
    });
}


export default { init }