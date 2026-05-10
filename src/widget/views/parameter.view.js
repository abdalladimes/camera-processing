import testsConfigService from '../services/testsConfig.service';

let _listener = null;

function init(options) {
    if (options && options.parameter) {
        document.getElementById('testName').innerText = options.parameter.name;
    }

    _listener = buildfire.datastore.onUpdate((event) => {
        const el = document.getElementById('wysiwygContent');
        if (!el) return;
        testsConfigService.getDatastoreParameter({ parameter: options.parameter }, (err, result) => {
            if (err) return;
            el.innerHTML = result?.data?.info || '';
        });
    });

    testsConfigService.getDatastoreParameter({ parameter: options.parameter }, (err, result) => {
        if (err) return;
        const el = document.getElementById('wysiwygContent');
        if (el) el.innerHTML = result?.data?.info || '';
    });
}

function destroy() {
    if (_listener) {
        _listener.clear();
        _listener = null;
    }
}

export default { init, destroy }
