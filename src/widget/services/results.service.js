import testsConfigService from './testsConfig.service';
import navigationService from './navigation.service';
import resultsHistoryService from './resultsHistory.service';

/**
 * Renders result cards into #readableResults
 * @param {object} results - parameter results map
 * @param {object} parameters - parameter config map
 * @param {{showAddNotes?: boolean, historyEntry?: object, showDelete?: boolean, entry?: object}} options
 */
function renderResults(results, parameters, options = {}) {
    var container = document.getElementById('readableResults');
    if (!container) return;

    // Header
    var headerHtml = '<div class="results-list__header"><h2 class="results-list__title">Urine Data</h2>';
    if (options.showDelete) {
        headerHtml += '<button id="deleteEntryBtn" class="results-list__delete-btn"><img src="resources/bin.png" alt="Delete" class="results-list__delete-icon"></button>';
    }
    headerHtml += '</div>';
    container.innerHTML = headerHtml;

    // Cards
    for (var name in results) {
        var r = results[name];
        var range = r.range || 'Unknown';
        var rangeColor = '#f5a623';
        if (range === 'Within Range') rangeColor = '#4caf50';
        else if (range === 'Outside of Range') rangeColor = '#e53935';
        else if (range === 'Below Range') rangeColor = '#f5a623';

        var iconUrl = (parameters[name] && parameters[name].imageUrl) || 'resources/drop.png';

        var card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML =
            '<div class="result-card__row">' +
                '<div class="result-card__name-row">' +
                    '<img class="result-card__icon" src="' + iconUrl + '" alt="">' +
                    '<span class="result-card__name">' + name + '</span>' +
                '</div>' +
                '<span class="result-card__link result-card__history" data-param="' + name + '">View History</span>' +
            '</div>' +
            '<div class="result-card__range" style="color:' + rangeColor + '">' + range + '</div>' +
            '<div class="result-card__clarification"></div>' +
            '<div class="result-card__recommendations"><span class="result-card__recommendations-label">Recommendations</span></div>' +
            '<div class="result-card__see-more">' +
                '<span class="result-card__link result-card__toggle" data-param="' + name + '" data-value="' + r.value + '">See More</span>' +
            '</div>';
        container.appendChild(card);
    }

    // Add Notes button
    if (options.showAddNotes) {
        var addNotesBtn = document.createElement('div');
        addNotesBtn.className = 'results-list__add-notes';
        addNotesBtn.innerHTML = '<button class="mdc-button mdc-button--raised results-list__add-notes-btn">Add Notes</button>';
        container.appendChild(addNotesBtn);
        addNotesBtn.querySelector('button').addEventListener('click', () => {
            navigationService.push({ template: 'addNotes', data: { historyEntry: options.historyEntry } });
        });
    }

    // Delete button
    if (options.showDelete) {
        document.getElementById('deleteEntryBtn').addEventListener('click', () => {
            buildfire.dialog.confirm(
                {
                    title: 'Delete Results',
                    message: 'Are you sure you want to delete this test results? This action is not reversible.',
                    confirmButton: { text: 'Delete', type: 'default' },
                    cancelButtonText: 'Cancel',
                },
                (err, isConfirmed) => {
                    if (!isConfirmed) return;
                    resultsHistoryService.deleteEntry(options.entry, (err) => {
                        if (err) { console.error('Error deleting entry', err); return; }
                        navigationService.pop({});
                    });
                }
            );
        });
    }

    // Card interactions
    container.addEventListener('click', function(e) {
        var historyLink = e.target.closest('.result-card__history');
        if (historyLink) {
            navigationService.push({ template: 'history', data: { paramName: historyLink.dataset.param } });
            return;
        }

        var toggle = e.target.closest('.result-card__toggle');
        if (!toggle) return;

        var card = toggle.closest('.result-card');
        var clarificationEl = card.querySelector('.result-card__clarification');
        var isOpen = toggle.textContent === 'See Less';

        if (isOpen) {
            clarificationEl.innerHTML = '';
            clarificationEl.classList.remove('active');
            toggle.textContent = 'See More';
            return;
        }

        testsConfigService.getDatastoreParameter({ parameter: { name: toggle.dataset.param } }, function(err, result) {
            var text = '';
            if (result && result.data) {
                var matchedRange = (result.data.valueRanges || []).find(function(vr) {
                    return vr.correspondingValue === toggle.dataset.value;
                });
                text = (matchedRange && matchedRange.info) || result.data.info || '';
            }
            clarificationEl.innerHTML = text || '<p>No additional information available.</p>';
            clarificationEl.classList.add('active');
            toggle.textContent = 'See Less';
        });
    });
}

export default { renderResults };
