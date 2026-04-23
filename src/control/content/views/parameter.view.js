import testsConfigService from '../services/testsConfig.service';
let parameterData = null;
function init(options) {
    parameterData = options.parameter;
    buildfire.spinner.show();


    const iconContainer = document.getElementById('iconContainer');
    iconContainer.addEventListener('click', () => {
        buildfire.imageLib.showDialog({ showIcons: false, multiSelection: false }, (err, result) => {
            if (result && result.selectedFiles && result.selectedFiles.length > 0) {
                const selectedFileUrl = result.selectedFiles[0];
                parameterData.imageUrl = selectedFileUrl.url;
                testsConfigService.save({ parameter: { ...options.parameter, imageUrl: selectedFileUrl } }, (err, result) => {
                    if (err) {
                        console.error('Error saving data', err);
                    }
                });
            }
        });
    });

    let timerDelay = null;
    tinymce.init({
        selector: '#wysiwygContent',
        setup: (testEditor) => {
            testEditor.on('change keyUp', (e) => { // use change and keyUp to cover all cases
                if (e && e.target && e.target.getAttribute && e.target.getAttribute('data-id') === 'wysiwygContent') {
                    if (timerDelay) clearTimeout(timerDelay);
                    timerDelay = setTimeout(() => { // use timer delay to avoid handling too many WYSIWYG updates
                        let wysiwygContent = testEditor.getContent();
                        parameterData.info = wysiwygContent;
                        testsConfigService.save({ parameter: parameterData }, (err, result) => {
                            if (err) {
                                console.error('Error saving data', err);
                            }
                        });
                    }, 500);
                }
            });
            testEditor.on('init', () => {
                testsConfigService.get({ parameter: options.parameter }, (err, result) => {
                    if (result && result.data) {
                        parameterData = { ...parameterData, ...result.data };
                        if (parameterData.imageUrl) {
                            const parameterImage = document.getElementById('parameterImage');
                            parameterImage.src = parameterData.imageUrl;
                            parameterImage.style.display = 'block';
                            document.getElementById('addIcon').style.display = 'none';
                        }
                    }
                    buildfire.spinner.hide();
                    if (err) {
                        console.error('Error fetching data', err);
                        return;
                    }
                    testEditor.setContent(result?.data?.info || '');
                });
            });
        }
    });
}

function destroy() {
    tinymce.remove('#wysiwygContent');
}

export default { init, destroy }