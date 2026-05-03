import testsConfigService from '../services/testsConfig.service';

let parameterData = null;
let rangeEditors = [];
let loaded = false;
let timerDelay = null;

function init(options) {
    parameterData = options.parameter;
    loaded = false;
    buildfire.spinner.show();

    const iconContainer = document.getElementById('iconContainer');
    iconContainer.addEventListener('click', () => {
        buildfire.imageLib.showDialog({ showIcons: false, multiSelection: false }, (err, result) => {
            if (result && result.selectedFiles && result.selectedFiles.length > 0) {
                parameterData.imageUrl = result.selectedFiles[0];
                const img = document.getElementById('parameterImage');
                img.src = parameterData.imageUrl;
                img.style.display = 'block';
                document.getElementById('addIcon').style.display = 'none';
                _collectAndSave();
            }
        });
    });

    // Build range WYSIWYG textareas dynamically
    const container = document.getElementById('rangeClarificationsContainer');
    rangeEditors = [];
    if (parameterData.valueRanges) {
        parameterData.valueRanges.forEach((range, i) => {
            const id = `rangeEditor_${i}`;
            rangeEditors.push({ id, correspondingValue: range.correspondingValue });

            const label = document.createElement('h4');
            label.textContent = `${parameterData.name} - ${range.correspondingValue}`;
            container.appendChild(label);

            const textarea = document.createElement('textarea');
            textarea.id = id;
            container.appendChild(textarea);
        });
    }

    const allSelectors = ['#wysiwygContent', ...rangeEditors.map(r => `#${r.id}`)].join(',');
    let readyCount = 0;
    const totalEditors = 1 + rangeEditors.length;

    tinymce.init({
        selector: allSelectors,
        setup: (editor) => {
            editor.on('change keyUp', () => {
                if (!loaded) return;
                if (timerDelay) clearTimeout(timerDelay);
                timerDelay = setTimeout(() => _collectAndSave(), 500);
            });
            editor.on('init', () => {
                readyCount++;
                if (readyCount < totalEditors) return;

                testsConfigService.get({ parameter: parameterData }, (err, result) => {
                    buildfire.spinner.hide();
                    if (err) {
                        console.error('Error fetching data', err);
                        loaded = true;
                        return;
                    }
                    if (result?.data) {
                        const saved = result.data;
                        if (saved.imageUrl) {
                            parameterData.imageUrl = saved.imageUrl;
                            const img = document.getElementById('parameterImage');
                            img.src = saved.imageUrl;
                            img.style.display = 'block';
                            document.getElementById('addIcon').style.display = 'none';
                        }

                        const mainEditor = tinymce.get('wysiwygContent');
                        if (mainEditor) mainEditor.setContent(saved.info || '');

                        const savedRanges = saved.valueRanges || [];
                        rangeEditors.forEach(({ id, correspondingValue }) => {
                            const match = savedRanges.find(r => r.correspondingValue === correspondingValue);
                            const rangeEditor = tinymce.get(id);
                            if (rangeEditor && match) rangeEditor.setContent(match.info || '');
                        });
                    }
                    loaded = true;
                });
            });
        }
    });
}

function _collectAndSave() {
    if (!loaded) return;
    const mainEditor = tinymce.get('wysiwygContent');
    const info = mainEditor ? mainEditor.getContent() : '';

    const valueRanges = rangeEditors.map(({ id, correspondingValue }) => {
        const editor = tinymce.get(id);
        return { correspondingValue, info: editor ? editor.getContent() : '' };
    });

    testsConfigService.save({
        parameter: {
            name: parameterData.name,
            imageUrl: parameterData.imageUrl || '',
            info,
            valueRanges,
        }
    }, (err) => {
        if (err) console.error('Error saving data', err);
    });
}

function destroy() {
    if (timerDelay) {
        clearTimeout(timerDelay);
        timerDelay = null;
    }
    loaded = false;
    tinymce.remove('#wysiwygContent');
    rangeEditors.forEach(({ id }) => tinymce.remove(`#${id}`));
    rangeEditors = [];
}

export default { init, destroy }
