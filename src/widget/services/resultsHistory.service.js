const FILE_PATH = '/results_history/';
const FILE_NAME = 'results_history.json';

function getAll(callback) {
    buildfire.services.fileSystem.fileManager.readFileAsText(
        { path: FILE_PATH, fileName: FILE_NAME },
        (err, content) => {
            if (err || !content) {
                callback(null, { results: [] });
                return;
            }
            try {
                const data = JSON.parse(content);
                callback(null, data);
            } catch (e) {
                callback(null, { results: [] });
            }
        }
    );
}

function save(entry, callback) {
    getAll((err, data) => {
        data.results.push(entry);
        const content = JSON.stringify(data);
        buildfire.services.fileSystem.fileManager.writeFileAsText(
            { path: FILE_PATH, fileName: FILE_NAME, content: content },
            (err, isWritten) => {
                if (callback) callback(err, isWritten);
            }
        );
    });
}

function getByParameter(paramName, callback) {
    getAll((err, data) => {
        const filtered = data.results.filter(r => r.parameters && r.parameters[paramName]);
        callback(null, filtered);
    });
}

function updateEntry(options, callback) {
    const { entry, updates } = options;
    getAll((err, data) => {
        const index = data.results.findIndex(r => r.createdOn === entry.createdOn);
        if (index === -1) {
            if (callback) callback('Entry not found');
            return;
        }
        data.results[index] = { ...data.results[index], ...updates };
        const content = JSON.stringify(data);
        if (!buildfire.services?.fileSystem?.fileManager) {
            if (callback) callback(null, true);
            return;
        }
        buildfire.services.fileSystem.fileManager.writeFileAsText(
            { path: FILE_PATH, fileName: FILE_NAME, content: content },
            (err, isWritten) => { if (callback) callback(err, isWritten); }
        );
    });
}

function deleteEntry(entry, callback) {
    getAll((err, data) => {
        data.results = data.results.filter(r => r.createdOn !== entry.createdOn);
        const content = JSON.stringify(data);
        if (!buildfire.services?.fileSystem?.fileManager) {
            if (callback) callback(null, true);
            return;
        }
        buildfire.services.fileSystem.fileManager.writeFileAsText(
            { path: FILE_PATH, fileName: FILE_NAME, content: content },
            (err, isWritten) => { if (callback) callback(err, isWritten); }
        );
    });
}

export default { getAll, save, getByParameter, updateEntry, deleteEntry }
