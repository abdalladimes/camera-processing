
const DATASTORE_TAG = 'testParameterInformation';

const testParameters = [
    {
        id: 1, // TODO: remove ids
        name: 'Ascorbate',
        imageUrl: '',
        info: '',
        valueRanges: [
            {
                correspondingValue: '0',
                referenceColor: {
                    hex: '#368295',
                    // rgb: { r: 255, g: 255, b: 255 },
                    // hsv: { h: 60, s: 100, v: 100 },
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {
                    healthy: { color: 'green' },
                    unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
            {
                correspondingValue: '0.6',
                referenceColor: {
                    hex: '#18a185',
                    // rgb: { r: 255, g: 255, b: 255 },
                    // hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
            {
                correspondingValue: '1.4',
                referenceColor: {
                    hex: '#89c765',
                    rgb: { r: 255, g: 255, b: 255 },
                    hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
            {
                correspondingValue: '2.8',
                referenceColor: {
                    hex: '#d0d139',
                    rgb: { r: 255, g: 255, b: 255 },
                    hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
            {
                correspondingValue: '5',
                referenceColor: {
                    hex: '#faf39b',
                    rgb: { r: 255, g: 255, b: 255 },
                    hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
        ],
    },
    {
        id: 2,
        name: 'BHB',
        imageUrl: '',
        info: '',
        valueRanges: [
            {
                correspondingValue: 'Neg.',
                referenceColor: {
                    hex: '#fee0c8'
                },
                interpretation: 'No BHB',
                range: 'Within Range',
                clarification: {}
            },
            {
                correspondingValue: '4(0.4)',
                referenceColor: {
                    hex: '#fbc9bc'
                },
                interpretation: 'Trace BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '12(1.2)',
                referenceColor: {
                    hex: '#e99ba6'
                },
                interpretation: 'Small BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '32(3.2)',
                referenceColor: {
                    hex: '#d16984'
                },
                interpretation: 'Moderate BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '64(6.4)',
                referenceColor: {
                    hex: '#b75676'
                },
                interpretation: 'Large BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '128(12.8)',
                referenceColor: {
                    hex: '#944266'
                },
                interpretation: 'High BHB',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 3,
        name: 'Bilirubin',
        imageUrl: '',
        info: '',
        valueRanges: [
            {
                correspondingValue: 'Neg',
                referenceColor: {
                    hex: '#fffde7'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {
                correspondingValue: 'Small 17',
                referenceColor: {
                    hex: '#ffdaab'
                },
                interpretation: 'Small Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Moderate 50',
                referenceColor: {
                    hex: '#f5c099'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 100',
                referenceColor: {
                    hex: '#eaa790'
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 4,
        name: 'Blood',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: 'Neg',
                referenceColor: {
                    hex: '#ffcc31'
                },
                interpretation: 'Negative (Normal) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Non hemolyzed 10 Trace',
                referenceColor: {
                    hex: '#ffcc31'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Hemolyzed 10 Trace',
                referenceColor: {
                    hex: '#ddbb3c'
                },
                interpretation: 'Very Small Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25 Small ',
                referenceColor: {
                    hex: '#bcb144'
                },
                interpretation: 'Above-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '80 Moderate',
                referenceColor: {
                    hex: '#85a24e'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '200 Large',
                referenceColor: {
                    hex: '#598543'
                },
                interpretation: 'Significant Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 5,
        name: 'Calcium',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '<1',
                referenceColor: {
                    hex: '#fff2d4'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '2.5',
                referenceColor: {
                    hex: '#f3e8e9'
                },
                interpretation: 'Mildly Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '5',
                referenceColor: {
                    hex: '#edd9e1'
                },
                interpretation: 'High Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7.5',
                referenceColor: {
                    hex: '#e0c6d7'
                },
                interpretation: 'Borderline High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '>10',
                referenceColor: {
                    hex: '#bdafce'
                },
                interpretation: 'Excessively High Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 6,
        name: 'Creatinine',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '0.9',
                referenceColor: {
                    hex: '#fff1d2'
                },
                interpretation: 'Low-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '4.4',
                referenceColor: {
                    hex: '#f2ddbd'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '8.8',
                referenceColor: {
                    hex: '#e5d0b9'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '17.7',
                referenceColor: {
                    hex: '#d8c8b7'
                },
                interpretation: 'Reasonable Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '26.5',
                referenceColor: {
                    hex: '#b7a5a9'
                },
                interpretation: 'Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 7,
        name: 'Free Radical',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '0',
                referenceColor: {
                    hex: '#fff7e5'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.002',
                referenceColor: {
                    hex: '#fff1e2'
                },
                interpretation: 'Low-normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.004',
                referenceColor: {
                    hex: '#fee7dc'
                },
                interpretation: 'Semi-low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.008',
                referenceColor: {
                    hex: '#fdddd7'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.02',
                referenceColor: {
                    hex: '#fcd4d2'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.1',
                referenceColor: {
                    hex: '#facacc'
                },
                interpretation: 'Very Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 8,
        name: 'Glucose',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: 'Neg. (0-0.8)',
                referenceColor: {
                    hex: '#a2dadb'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '5 Trace ',
                referenceColor: {
                    hex: '#b6dcae'
                },
                interpretation: 'Small-to-Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '15',
                referenceColor: {
                    hex: '#bec775'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '30',
                referenceColor: {
                    hex: '#c5af25'
                },
                interpretation: 'Above-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '60',
                referenceColor: {
                    hex: '#b68330'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '110',
                referenceColor: {
                    hex: '#a26232'
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 9,
        name: 'Ketone',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: 'Neg',
                referenceColor: {
                    hex: '#fee0c8'
                },
                interpretation: 'No Ketones',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Trace 0.5',
                referenceColor: {
                    hex: '#fbc9bc'
                },
                interpretation: 'Trace Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Small 1.5',
                referenceColor: {
                    hex: '#e99ba6'
                },
                interpretation: 'Small Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Moderate 4.0',
                referenceColor: {
                    hex: '#d16984'
                },
                interpretation: 'Moderate Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 8',
                referenceColor: {
                    hex: '#b75676'
                },
                interpretation: 'Large Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 16',
                referenceColor: {
                    hex: '#944266'
                },
                interpretation: 'Very Large Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 10,
        name: 'Leukocytes',
        imageUrl: '',
        info: '',
        valueRanges: [
            {
                correspondingValue: 'Neg',
                referenceColor: {
                    hex: '#fdfad7',
                    // rgb: { r: 255, g: 255, b: 255 },
                    // hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
            {
                correspondingValue: 'Trace 15',
                referenceColor: {
                    hex: '#f8e9cf',
                    // rgb: { r: 255, g: 255, b: 255 },
                    // hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Trace (Positive) Range',
                range: 'Outside of Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
            {
                correspondingValue: 'Small 70',
                referenceColor: {
                    hex: '#eed9cf',
                    // rgb: { r: 255, g: 255, b: 255 },
                    // hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Small (Positive) Range',
                range: 'Outside of Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
            {
                correspondingValue: 'Moderate 125',
                referenceColor: {
                    hex: '#c6abba',
                    // rgb: { r: 255, g: 255, b: 255 },
                    // hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Moderate (Positive) Range',
                range: 'Outside of Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
            {
                correspondingValue: 'Large 500',
                referenceColor: {
                    hex: '#aa91b2',
                    // rgb: { r: 255, g: 255, b: 255 },
                    // hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Excessive (Positive) Range',
                range: 'Outside of Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
        ],
    },
    {
        id: 11,
        name: 'Magnesium',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '10',
                referenceColor: {
                    hex: '#f3e3c4'
                },
                interpretation: 'Normal (Negative) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '15',
                referenceColor: {
                    hex: '#f3e4e5'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '20',
                referenceColor: {
                    hex: '#eccfd9'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25',
                referenceColor: {
                    hex: '#dfb9cd'
                },
                interpretation: 'Lower Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '>40',
                referenceColor: {
                    hex: '#be9dc1'
                },
                interpretation: 'Lowest Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 12,
        name: 'Micro Albumin',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '10',
                referenceColor: {
                    hex: '#e1f1eb'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '30',
                referenceColor: {
                    hex: '#d1ecea'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '80',
                referenceColor: {
                    hex: '#b6e2e9'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '150',
                referenceColor: {
                    hex: '#a0dbe7'
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 13,
        name: 'Nitrities',
        imageUrl: '',
        info: '',
        valueRanges: [
            {
                correspondingValue: 'Any Degree of Uniform Pink Color',
                referenceColor: {
                    hex: '#fde4e7',
                    // rgb: { r: 255, g: 255, b: 255 },
                    // hsv: { h: 60, s: 100, v: 100 }
                },
                interpretation: 'Excessive (Positive) Range',
                range: 'Outside of Range',
                clarification: {
                    // healthy: { color: 'green' },
                    // unhealthy: { color: 'red' }
                }, // healthy/unhealthy for text color 
            },
        ]
    },
    {
        id: 14,
        name: 'pH',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '5',
                referenceColor: {
                    hex: '#f3d15e'
                },
                interpretation: 'Acidic Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '6',
                referenceColor: {
                    hex: '#babc33'
                },
                interpretation: 'Slightly Acidic Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '6.5',
                referenceColor: {
                    hex: '#9cb33c'
                },
                interpretation: 'Normal (Balanced) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7',
                referenceColor: {
                    hex: '#86a23f'
                },
                interpretation: 'Optimal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7.5',
                referenceColor: {
                    hex: '#739e42'
                },
                interpretation: 'Normal (Balanced) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '8',
                referenceColor: {
                    hex: '#558f45'
                },
                interpretation: 'Mildly Alkaline Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '8.5',
                referenceColor: {
                    hex: '#00769a'
                },
                interpretation: 'Above Alkaline Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 15,
        name: 'Protein',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: 'Neg.',
                referenceColor: {
                    hex: '#fbe960'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Trace',
                referenceColor: {
                    hex: '#f7e761'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.3',
                referenceColor: {
                    hex: '#ebe263'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1',
                referenceColor: {
                    hex: '#c5d568'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '3',
                referenceColor: {
                    hex: '#93c789'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '20',
                referenceColor: {
                    hex: '#78c18a'
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 16,
        name: 'Sodium (Salinity)',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '0',
                referenceColor: {
                    hex: '#c2572e'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '100',
                referenceColor: {
                    hex: '#cb7d81'
                },
                interpretation: 'Slighty High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '200',
                referenceColor: {
                    hex: '#e09288'
                },
                interpretation: 'High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '300',
                referenceColor: {
                    hex: '#e1ada3'
                },
                interpretation: 'Higher Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '400',
                referenceColor: {
                    hex: '#eecec1'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '500',
                referenceColor: {
                    hex: '#efe2dc'
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 17,
        name: 'Specific Gravity',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '1',
                referenceColor: {
                    hex: '#00879e'
                },
                interpretation: 'Low Diluted Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '1.005',
                referenceColor: {
                    hex: '#6d945e'
                },
                interpretation: 'Diluted Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '1.01',
                referenceColor: {
                    hex: '#859e4d'
                },
                interpretation: 'Normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.015',
                referenceColor: {
                    hex: '#b2ae47'
                },
                interpretation: 'Ideal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.02',
                referenceColor: {
                    hex: '#c8bb43'
                },
                interpretation: 'Normal to Slightly Concentrated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.025',
                referenceColor: {
                    hex: '#dcb848'
                },
                interpretation: 'Concentrated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.03',
                referenceColor: {
                    hex: '#f3c736'
                },
                interpretation: 'Very Concentrated Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 18,
        name: 'Uric Acid',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '20',
                referenceColor: {
                    hex: '#eceed2'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '50',
                referenceColor: {
                    hex: '#dddfcc'
                },
                interpretation: 'Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '100',
                referenceColor: {
                    hex: '#d3d6c9'
                },
                interpretation: 'Medium-high Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '300',
                referenceColor: {
                    hex: '#bbc1c1'
                },
                interpretation: 'High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '700',
                referenceColor: {
                    hex: '#a9a9b6'
                },
                interpretation: 'Upper End of High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1100',
                referenceColor: {
                    hex: '#9a9bb0'
                },
                interpretation: 'Significantly High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1500',
                referenceColor: {
                    hex: '#9492ab'
                },
                interpretation: 'Exceptionally High Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },
    {
        id: 19,
        name: 'Urobilinogen',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '3.3',
                referenceColor: {
                    hex: '#fff2d9'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '16',
                referenceColor: {
                    hex: '#fcccb9'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '33',
                referenceColor: {
                    hex: '#f9aea0'
                },
                interpretation: 'Considered Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '66',
                referenceColor: {
                    hex: '#f8a691'
                },
                interpretation: 'Considered Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '131',
                referenceColor: {
                    hex: '#f19982'
                },
                interpretation: 'Considered Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ],
    },
    {
        id: 20,
        name: 'Zinc',
        imageUrl: '',
        info: '',
        valueRanges: [
            {

                correspondingValue: '0',
                referenceColor: {
                    hex: '#f7b7cc'
                },
                interpretation: 'Normal (Negative) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.5',
                referenceColor: {
                    hex: '#eab3cc'
                },
                interpretation: 'Standard Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '1',
                referenceColor: {
                    hex: '#deafcb'
                },
                interpretation: 'High End of Standard Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '2',
                referenceColor: {
                    hex: '#d4bed6'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '5',
                referenceColor: {
                    hex: '#bcc0da'
                },
                interpretation: 'Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '10',
                referenceColor: {
                    hex: '#b0bcda'
                },
                interpretation: 'Highly Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25',
                referenceColor: {
                    hex: '#94c5e3'
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },

]; // all parameters

const testsConfig = {
    'complete 20-n-1': { // used in UI (comes from QR scanner)
        duration: 60, // seconds
        overlayImage: {
            url: '',
            width: 50,
            height: 300,
        },
        parameters: {
            'Ascorbate': { // parameter exact name (string as test name) will be used in datastore also and UI
                locationOnOverlay: {
                    center: { y: 29 }, samplingOffsetRadius: 15 // has the samplingBoxSizePercentage already multiplied in it
                },
            },
        }
    }
}

function save(options, callback) {
    get(options, (error, result) => {
        if (result && result.id) {
            buildfire.datastore.searchAndUpdate(
                { '$json.name': { '$eq': options.parameter.name } },
                options.parameter,
                DATASTORE_TAG,
                callback
            );
        } else {
            buildfire.datastore.insert(options.parameter, DATASTORE_TAG, callback);
        }
    })
}

function get(options, callback) {
    buildfire.datastore.search(
        {
            filter: { '$json.name': { '$eq': options.parameter.name } },
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

function getAll(callback) {
    _getAll((error, results) => {
        if (error) {
            callback(error);
            return;
        }
        let allParameters = _getLocalTestParameters();
        for (let param of allParameters) {
            const matchingParam = results.find(p => p.data?.name === param?.name);
            if (matchingParam) {
                param.imageUrl = matchingParam.data?.imageUrl || '';
                param.info = matchingParam.data?.info || '';
                const savedRanges = matchingParam.data?.valueRanges || [];
                if (param.valueRanges) {
                    param.valueRanges.forEach(range => {
                        const match = savedRanges.find(r => r.correspondingValue === range.correspondingValue);
                        if (match) range.info = match.info || '';
                    });
                }
            }
        }
        console.warn('!!!!!!!!!!getAll merged:',allParameters);
        callback(null, allParameters);
    });
}

function _getLocalTestParameters() {
    return testParameters.slice(); // return a copy of the array to avoid direct mutations
}

function _getAll(callback) {
    let skip = 0;
    let allResults = [];
    const limit = 50;
    function fetchBatch() {
        buildfire.datastore.search(
            {
                fields: ['id', 'name', 'imageUrl', 'info', 'valueRanges'],
                skip: skip,
                limit: limit
            },
            DATASTORE_TAG,
            (error, results) => {
                if (error) {
                    console.error('Error fetching parameters', error);
                    callback(error);
                } else {
                    allResults = allResults.concat(results);
                    if (results.length === limit) {
                        skip += limit;
                        fetchBatch();
                    } else {
                        callback(null, allResults);
                    }
                }
            }
        );
    }
    fetchBatch();
}


export default { save, get, testsConfig, testParameters, getAll };