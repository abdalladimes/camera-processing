let allViews = {};
function getAllViews() {
    if (Object.keys(allViews).length === 0) {
        console.warn('Views Service have not been initialized yet.');
        return {};
    }
    return allViews;
}

function init() {
    const requireContext = require.context('../views', false, /\.js$/);
    const modules = {};

    requireContext.keys().forEach((key) => {
        const moduleName = key.replace(/^\.\/(.*)\.view\.js$/, '$1');
        modules[moduleName] = requireContext(key).default || requireContext(key);
    });
    allViews = modules;
}


export default { init, getAllViews }