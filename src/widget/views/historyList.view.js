import resultsHistoryService from '../services/resultsHistory.service';
import navigationService from '../services/navigation.service';

function init(options) {
    resultsHistoryService.getAll((err, data) => {
        const results = (data?.results || []).slice().reverse();
        const container = document.getElementById('historyListView');
        container.innerHTML = '<h2 class="history-list__title">History</h2>';

        results.forEach((entry, index) => {
            const isRecent = index === 0;
            const date = new Date(entry.createdOn).toLocaleDateString();
            const card = document.createElement('div');
            card.className = 'history-list__card';
            card.innerHTML =
                '<div class="history-list__card-header">' +
                    '<span class="history-list__card-title">' + (entry.title || '') + '</span>' +
                    (isRecent ? '<span class="history-list__card-badge">Recent Test</span>' : '') +
                '</div>' +
                '<div class="history-list__card-description">' + (entry.description || '') + '</div>' +
                '<div class="history-list__card-date">Created ' + date + '</div>';
            card.addEventListener('click', () => {
                navigationService.push({ template: 'historyDetail', data: { entry } });
            });
            container.appendChild(card);
        });
    });
}

function destroy() {}

export default { init, destroy }