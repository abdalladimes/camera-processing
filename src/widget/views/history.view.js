import testsConfigService from '../services/testsConfig.service';
import resultsHistoryService from '../services/resultsHistory.service';

let contentSlider = null;
let _chart = null;
let _entries = [];
let _paramName = '';
let _paramData = null;

function init(options) {
    _paramName = options?.paramName || '';

    // Set chart title
    document.querySelector('.history-page__chart-title').textContent = _paramName;

    // Get local parameter data for value ranges
    _paramData = testsConfigService.getLocalParameter(_paramName);

    // Load description from datastore
    testsConfigService.getDatastoreParameter({ parameter: { name: _paramName } }, (err, result) => {
        if (err) return;
        const descEl = document.querySelector('.history-page__description');
        if (result && result.data && result.data.info) {
            descEl.innerHTML = result.data.info;
        }
    });

    // Load history data then build slider and chart
    resultsHistoryService.getByParameter(_paramName, (err, entries) => {
        _entries = entries || [];
        buildSliderFromData('month');
        const currentPeriod = getLastPeriodKey(_entries, 'month');
        if (currentPeriod) renderChartForPeriod(currentPeriod, 'month');
        renderHistoryEntries(_entries);
    });

    // Tab switching
    document.querySelector('.history-page__tabs').addEventListener('click', (e) => {
        const tab = e.target.closest('.history-page__tab');
        if (!tab) return;
        document.querySelectorAll('.history-page__tab').forEach(t => t.classList.remove('history-page__tab--active'));
        tab.classList.add('history-page__tab--active');
        const range = tab.dataset.range;
        buildSliderFromData(range);
        const period = getLastPeriodKey(_entries, range);
        if (period) renderChartForPeriod(period, range);
    });
}

function getValueIndex(value) {
    if (!_paramData || !_paramData.valueRanges) return 0;
    const index = _paramData.valueRanges.findIndex(vr => vr.correspondingValue === value);
    return index >= 0 ? index : 0;
}

function renderChart(entries, range) {
    if (_chart) {
        _chart.destroy();
        _chart = null;
    }

    if (!entries.length || !_paramData) return;

    const canvas = document.getElementById('historyChart');
    const ctx = canvas.getContext('2d');
    const maxIndex = _paramData.valueRanges.length - 1;
    const rangeLabels = _paramData.valueRanges.map(vr => vr.correspondingValue);

    // Build fixed axis labels and group entries by position
    let axisLabels = [];
    let groupedData = [];

    if (range === 'month') {
        // Fixed 1-31 axis, group by day of month
        const refDate = entries.length ? new Date(entries[0].createdOn) : new Date();
        const daysInMonth = new Date(refDate.getFullYear(), refDate.getMonth() + 1, 0).getDate();
        axisLabels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const grouped = {};
        entries.forEach(entry => {
            const d = new Date(entry.createdOn);
            const day = d.getDate();
            const param = entry.parameters[_paramName];
            const vi = getValueIndex(param.value);
            if (!grouped[day]) grouped[day] = [];
            grouped[day].push(vi);
        });
        groupedData = axisLabels.map(day => {
            if (!grouped[day]) return null;
            const avg = grouped[day].reduce((a, b) => a + b, 0) / grouped[day].length;
            return Math.round(avg);
        });
    } else if (range === 'week') {
        // Fixed Mon-Sun axis
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        axisLabels = dayNames;
        const grouped = {};
        entries.forEach(entry => {
            const d = new Date(entry.createdOn);
            const dow = d.getDay() === 0 ? 6 : d.getDay() - 1;
            const param = entry.parameters[_paramName];
            const vi = getValueIndex(param.value);
            if (!grouped[dow]) grouped[dow] = [];
            grouped[dow].push(vi);
        });
        groupedData = dayNames.map((_, i) => {
            if (!grouped[i]) return null;
            const avg = grouped[i].reduce((a, b) => a + b, 0) / grouped[i].length;
            return Math.round(avg);
        });
    } else if (range === 'day') {
        // Fixed 0-23 hours axis
        axisLabels = Array.from({ length: 24 }, (_, i) => i + ':00');
        const grouped = {};
        entries.forEach(entry => {
            const d = new Date(entry.createdOn);
            const hour = d.getHours();
            const param = entry.parameters[_paramName];
            const vi = getValueIndex(param.value);
            if (!grouped[hour]) grouped[hour] = [];
            grouped[hour].push(vi);
        });
        groupedData = axisLabels.map((_, i) => {
            if (!grouped[i]) return null;
            const avg = grouped[i].reduce((a, b) => a + b, 0) / grouped[i].length;
            return Math.round(avg);
        });
    } else if (range === 'year') {
        // Fixed Jan-Dec axis
        const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        axisLabels = monthNamesShort;
        const grouped = {};
        entries.forEach(entry => {
            const d = new Date(entry.createdOn);
            const month = d.getMonth();
            const param = entry.parameters[_paramName];
            const vi = getValueIndex(param.value);
            if (!grouped[month]) grouped[month] = [];
            grouped[month].push(vi);
        });
        groupedData = monthNamesShort.map((_, i) => {
            if (!grouped[i]) return null;
            const avg = grouped[i].reduce((a, b) => a + b, 0) / grouped[i].length;
            return Math.round(avg);
        });
    }

    const annotations = {};
    rangeLabels.forEach((label, idx) => {
        if (idx > 0) {
            annotations[`line${idx}`] = {
                type: 'line',
                yMin: idx,
                yMax: idx,
                borderColor: 'rgba(100, 130, 180, 0.3)',
                borderWidth: 2,
                borderDash: [8, 4]
            };
        }
    });

    _chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: axisLabels,
            datasets: [{
                data: groupedData,
                backgroundColor: 'rgba(100, 130, 180, 0.7)',
                borderRadius: 2,
                barPercentage: 0.8,
                minBarLength: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const vi = context.raw;
                            return vi !== null ? rangeLabels[vi] : '';
                        }
                    }
                },
                annotation: { annotations }
            },
            scales: {
                y: {
                    position: 'left',
                    min: 0,
                    max: maxIndex + 1,
                    ticks: {
                        stepSize: 1,
                        callback: (value) => rangeLabels[value] || '',
                        font: { size: 9 },
                    },
                    grid: { color: 'rgba(0,0,0,0.08)' },
                    border: { display: false }
                },
                y2: {
                    position: 'right',
                    min: 0,
                    max: maxIndex + 1,
                    ticks: {
                        stepSize: 1,
                        callback: (value) => value,
                        font: { size: 9 },
                    },
                    grid: { drawOnChartArea: false },
                    border: { display: false }
                },
                x: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        font: { size: 9 },
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 8,
                    }
                }
            }
        }
    });
}

function buildSliderFromData(range) {
    const items = getSliderItems(_entries, range);
    const startingIndex = items.length > 0 ? items.length - 1 : 0;

    document.getElementById('historySlider').innerHTML = '';

    if (items.length === 0) return;

    contentSlider = new buildfire.components.contentSlider('#historySlider', {
        items: items,
        settings: {
            showSubtitle: false,
            startingIndex: startingIndex,
        }
    });

    contentSlider.onNext = (event) => {
        renderChartForPeriod(event.item.id, getCurrentRange());
    };
    contentSlider.onPrevious = (event) => {
        renderChartForPeriod(event.item.id, getCurrentRange());
    };
}

function getCurrentRange() {
    const activeTab = document.querySelector('.history-page__tab--active');
    return activeTab ? activeTab.dataset.range : 'month';
}

function renderChartForPeriod(periodKey, range) {
    const filtered = _entries.filter(entry => {
        const d = new Date(entry.createdOn);
        let key;
        if (range === 'day') {
            key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        } else if (range === 'week') {
            const weekStart = new Date(d);
            const dayOfWeek = d.getDay() === 0 ? 6 : d.getDay() - 1;
            weekStart.setDate(d.getDate() - dayOfWeek);
            key = weekStart.getFullYear() + '-' + String(weekStart.getMonth() + 1).padStart(2, '0') + '-' + String(weekStart.getDate()).padStart(2, '0');
        } else if (range === 'month') {
            key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        } else if (range === 'year') {
            key = String(d.getFullYear());
        }
        return key === periodKey;
    });
    renderChart(filtered, range);
}

function getLastPeriodKey(entries, range) {
    if (!entries.length) return null;
    const items = getSliderItems(entries, range);
    return items.length ? items[items.length - 1].id : null;
}

function getSliderItems(entries, range) {
    if (!entries.length) return [];

    const uniquePeriods = new Map();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    entries.forEach(entry => {
        const d = new Date(entry.createdOn);
        let key, title, subtitle;

        if (range === 'day') {
            key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
            title = d.getDate() + ' ' + monthNamesShort[d.getMonth()] + ' ' + d.getFullYear();
            subtitle = dayNames[d.getDay()];
        } else if (range === 'week') {
            const weekStart = new Date(d);
            const dayOfWeek = d.getDay() === 0 ? 6 : d.getDay() - 1;
            weekStart.setDate(d.getDate() - dayOfWeek);
            key = weekStart.getFullYear() + '-' + String(weekStart.getMonth() + 1).padStart(2, '0') + '-' + String(weekStart.getDate()).padStart(2, '0');
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            title = weekStart.getDate() + ' ' + monthNamesShort[weekStart.getMonth()] + ' - ' + weekEnd.getDate() + ' ' + monthNamesShort[weekEnd.getMonth()];
        } else if (range === 'month') {
            key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
            title = monthNames[d.getMonth()] + ' ' + d.getFullYear();
        } else if (range === 'year') {
            key = String(d.getFullYear());
            title = String(d.getFullYear());
        }

        if (!uniquePeriods.has(key)) {
            uniquePeriods.set(key, { id: key, title: title, subtitle: subtitle });
        }
    });

    return Array.from(uniquePeriods.values()).sort((a, b) => a.id.localeCompare(b.id));
}

function renderHistoryEntries(entries) {
    if (!entries.length) return;
    const historyDataEl = document.querySelector('.history-page__description');
    let html = historyDataEl.innerHTML;
    html += '<h4 style="margin-top:16px;">History Entries</h4>';
    entries.forEach(entry => {
        const param = entry.parameters[_paramName];
        html += '<div style="padding:8px 0; border-bottom:1px solid #eee;">';
        html += '<span style="color:#555;">' + new Date(entry.createdOn).toLocaleDateString() + '</span> — ';
        html += '<strong>' + (param.value || '') + '</strong> ';
        html += '<span style="color:#777;">(' + (param.interpretation || '') + ')</span>';
        html += '</div>';
    });
    historyDataEl.innerHTML = html;
}

function destroy() {
    if (_chart) {
        _chart.destroy();
        _chart = null;
    }
    contentSlider = null;
    _entries = [];
    _paramName = '';
    _paramData = null;
}

export default { init, destroy }
