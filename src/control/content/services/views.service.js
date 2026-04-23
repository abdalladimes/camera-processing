let allViews = {};

function getAllViews() {
    if (Object.keys(allViews).length === 0) {
        console.warn('Views Service have not been initialized yet.');
        return {};
    }
    return allViews;
}

function init() {
    // 1. Create a context for the target folder
    // Arguments: (directory path, include subdirectories?, regex for file extension)
    const requireContext = require.context('../views', false, /\.js$/);

    const modules = {};

    // 2. Iterate over the keys (file paths) found in the context
    requireContext.keys().forEach((key) => {

        // 3. Extract a clean module name to use as the object key
        // This regex removes the './' at the start and the '.js' at the end
        // e.g., './myModule.js' becomes 'myModule'
        const moduleName = key.replace(/^\.\/(.*)\.view\.js$/, '$1');

        // 4. Require the module and attach it to your object
        // Note: We check for `.default` to handle ES6 modules properly
        modules[moduleName] = requireContext(key).default || requireContext(key);
    });

    // Now `modules` is an object where keys are filenames and values are the modules
    console.log(modules);
    allViews = modules;
}


export default { init, getAllViews }