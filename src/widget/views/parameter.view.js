import buildfire from 'buildfire';
import testsConfigService from '../services/testsConfig.service';

function init(options) {
    if (options && options.parameter) {
        document.getElementById('testName').innerText = options.parameter.name;
    }
    buildfire.datastore.onUpdate((event) => {
        testsConfigService.get({ parameter: options.parameter }, (err, result) => {
            if (err) {
                console.error('Error fetching data', err);
                return;
            }
            document.getElementById('wysiwygContent').innerHTML = result.data?.info || '';
        });
    });


    testsConfigService.get({ parameter: options.parameter }, (err, result) => {
        if (err) {
            console.error('Error fetching data', err);
            return;
        }
        document.getElementById('wysiwygContent').innerHTML = result.data?.info || '';
    });
}


export default { init }