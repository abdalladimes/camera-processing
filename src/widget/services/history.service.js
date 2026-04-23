const HISTORY_STORAGE_KEY = 'testsHistory';

function getHistory(callback) {
    buildfire.localStorage.getItem(HISTORY_STORAGE_KEY, callback);
}

export default { getHistory }