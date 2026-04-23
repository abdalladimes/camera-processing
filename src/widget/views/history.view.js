function init(options) {

    const listViewOptions = {
        settings: {
            showSearchBar: false,
            enableReadMore: true,
        }
    };

    const listView = new buildfire.components.listView('#historyListView', listViewOptions);

    listView.append([
        {
            id: '1',
            title: '<div style="color: green;">buildfire</div>',
            subtitle: '<div style="color: red;">The Most Powerful App Maker For iOS & Android </div>',
            description: 'Buildfire’s powerful and easy to use mobile app builder allows you to create an app for your business, organization, or blog without writing a single line of code. With our drag and drop app builder, you can customize your app’s design, layout, and features to create a unique mobile experience for your users.',
        },

        {
            id: '2',
            title: '<div style="color: green;">buildfire</div>',
            subtitle: '<div style="color: blue;">The Most Powerful App Maker For iOS & Android </div>',
            description: 'Buildfire’s powerful and easy to use mobile app builder allows you to create an app for your business, organization, or blog without writing a single line of code. With our drag and drop app builder, you can customize your app’s design, layout, and features to create a unique mobile experience for your users.',
        },
    ]);
}

export default { init }