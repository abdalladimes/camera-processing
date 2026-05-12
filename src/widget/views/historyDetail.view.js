import testsConfigService from '../services/testsConfig.service';
import resultsService from '../services/results.service';

function init(options) {
    const entry = options?.entry || null;
    if (!entry) return;

    const results = entry.parameters || {};
    const parameters = {};
    Object.keys(results).forEach(name => {
        parameters[name] = testsConfigService.getLocalParameter(name) || {};
    });

    resultsService.renderResults(results, parameters, { showDelete: true, entry });
}

function destroy() {}

export default { init, destroy }
