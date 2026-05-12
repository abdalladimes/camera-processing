import navigationService from '../services/navigation.service';
import resultsHistoryService from '../services/resultsHistory.service';

function init(options) {
    const historyEntry = options?.historyEntry || null;
    const titleInput = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const addBtn = document.getElementById('addNoteBtn');

    if (historyEntry && historyEntry.title) {
        titleInput.value = historyEntry.title;
    }

    document.querySelectorAll('.mdc-text-field').forEach(el => new mdc.textField.MDCTextField(el));

    addBtn.addEventListener('click', () => {
        if (!historyEntry) return;
        const title = titleInput.value.trim() || historyEntry.title;
        const description = noteContent.value.trim();

        resultsHistoryService.updateEntry({ entry: historyEntry, updates: { title, description } }, (err) => {
            if (err) {
                console.error('Error saving note', err);
                return;
            }
            navigationService.push({ template: 'historyList' });
        });
    });
}

function destroy() {}

export default { init, destroy }
