import testsConfigService from '../services/testsConfig.service';

function init(options) {
    let timerDelay = null;
    tinymce.init({
        selector: '#wysiwygContent',
        setup: (testEditor) => {
            testEditor.on('change keyUp', (e) => { // use change and keyUp to cover all cases
                if (e && e.target && e.target.getAttribute && e.target.getAttribute('data-id') === 'wysiwygContent') {
                    if (timerDelay) clearTimeout(timerDelay);
                    timerDelay = setTimeout(() => { // use timer delay to avoid handling too many WYSIWYG updates
                        let wysiwygContent = testEditor.getContent();
                        testsConfigService.save({ parameter: { ...options.parameter, info: wysiwygContent } }, (err, result) => {
                            if (err) {
                                console.error('Error saving data', err);
                            }
                        });
                    }, 500);
                }
            });
            testEditor.on('init', () => {
                testsConfigService.get({ parameter: options.parameter }, (err, result) => {
                    if (err) {
                        console.error('Error fetching data', err);
                        return;
                    }
                    testEditor.setContent(result.data?.info || '');
                });
            });
        }
    });
}

function destroy() {
    tinymce.remove('#wysiwygContent');
}

export default { init, destroy }