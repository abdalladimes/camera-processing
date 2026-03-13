
const DATASTORE_TAG = 'testParameterInformation';

const testParameters = [
    {
        id: 1,
        name: 'Ascorbate',
        icon: {},
        info: '',
    },
    {
        id: 2,
        name: 'BHB',
        icon: {},
        info: '',
    },
    {
        id: 3,
        name: 'Bilirubin',
        icon: {},
        info: '',
    },
    {
        id: 4,
        name: 'Blood',
        icon: {},
        info: '',
    },
    {
        id: 5,
        name: 'Calcium',
        icon: {},
        info: '',
    },
    {
        id: 6,
        name: 'Creatinine',
        icon: {},
        info: '',
    },
    {
        id: 7,
        name: 'Free Radical',
        icon: {},
        info: '',
    },
    {
        id: 8,
        name: 'Glucose',
        icon: {},
        info: '',
    },
    {
        id: 9,
        name: 'Ketone',
        icon: {},
        info: '',
    },
    {
        id: 10,
        name: 'Leukocytes',
        icon: {},
        info: '',
    },
    {
        id: 11,
        name: 'Magnesium',
        icon: {},
        info: '',
    },
    {
        id: 12,
        name: 'Micro Albumin',
        icon: {},
        info: '',
    },
    {
        id: 13,
        name: 'Nitrities',
        icon: {},
        info: '',
    },
    {
        id: 14,
        name: 'pH',
        icon: {},
        info: '',
    },
    {
        id: 15,
        name: 'Protein',
        icon: {},
        info: '',
    },
    {
        id: 16,
        name: 'Sodium (Salinity)',
        icon: {},
        info: '',
    },
    {
        id: 17,
        name: 'Specific Gravity',
        icon: {},
        info: '',
    },
    {
        id: 18,
        name: 'Uric Acid',
        icon: {},
        info: '',
    },
    {
        id: 19,
        name: 'Urobilinogen',
        icon: {},
        info: '',
    },
    {
        id: 20,
        name: 'Zinc',
        icon: {},
        info: '',
    },

]; // all parameters

const testsConfig = {
    "complete 20-n-1": { // used in UI (comes from QR scanner)
        duration: 60, // seconds
        overlayImage: {
            url: '',
            width: 50,
            height: 300,
        },
        parameters: {
            "Ascorbate": { // parameter exact name (string as test name) will be used in datastore also and UI
                valueRanges: [
                    {
                        referenceColor: {
                            rgb: { r: 255, g: 255, b: 0 },
                            hsv: { h: 60, s: 100, v: 100 }
                        },
                        correspondingValue: '0.6',
                        interpretation: 'HYDRATED', // test for display
                        clarification: {
                            healthy: { color: 'green' },
                            unhealthy: { color: 'red' }
                        }, // healthy/unhealthy for text color 
                    }
                ],
                locationOnOverlay: {
                    center: { y: 29 }, samplingOffsetRadius: 15 // has the samplingBoxSizePercentage already multiplied in it
                },

            },
        }
    }
}


function save(options, callback) {
    get(options, (error, result) => {
        if (result && result.data && result.data.id) {
            buildfire.datastore.searchAndUpdate(
                { "$json.name": { "$eq": options.parameter.name } },
                options.parameter,
                DATASTORE_TAG,
                callback
            );
        } else {
            buildfire.datastore.insert(options.parameter, DATASTORE_TAG, true, callback);
        }
    })
}

function get(options, callback) {
    buildfire.datastore.search(
        {
            filter: { "$json.name": { "$eq": options.parameter.name } },
        },
        DATASTORE_TAG,
        (error, results) => {
            if (error) {
                console.error('Error fetching parameter', error);
                callback(error);
            } else {
                if (results.length) {
                    callback(null, results[0]);
                } else {
                    callback(null, null);
                }
            }

        }
    );
};

export default { save, get, testsConfig, testParameters };