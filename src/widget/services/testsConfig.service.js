
const DATASTORE_TAG = 'testParameterInformation';

const testParameters = [
    {
        id: 1,
        name: 'Ascorbate',
        imageUrl: '',
        info: '',
        valueRanges: [
            {
                correspondingValue: '0',
                referenceColor: {
                    hex: '#556e7e',
                    originalHex: '#368295',
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
                hex: '#397d67',
                    originalHex: '#18a185',
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
                    hex: '#000000',
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
                    hex: '#b3a01f',
                    originalHex: '#d0d139',
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {},
            },
            {
                correspondingValue: '5',
                referenceColor: {
                    hex: '#000000',
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
                    hex: '#beada2',
                    originalHex: '#fee0c8'
                },
                interpretation: 'No BHB',
                range: 'Within Range',
                clarification: {}
            },
            {
                correspondingValue: '4(0.4)',
                referenceColor: {
                hex: '#bc9993',
                    originalHex: '#fbc9bc'
                },
                interpretation: 'Trace BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '12(1.2)',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Small BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '32(3.2)',
                referenceColor: {
                    hex: '#ae4e69',
                    originalHex: '#d16984'
                },
                interpretation: 'Moderate BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '64(6.4)',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Large BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '128(12.8)',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#c3bfb0',
                    originalHex: '#fffde7'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {
                correspondingValue: 'Small 17',
                referenceColor: {
                hex: '#c1a07c',
                    originalHex: '#ffdaab'
                },
                interpretation: 'Small Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Moderate 50',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 100',
                referenceColor: {
                hex: '#b77e67',
                    originalHex: '#eaa790'
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
                    hex: '#bd9241',
                    originalHex: '#ffcc31'
                },
                interpretation: 'Negative (Normal) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Non hemolyzed 10 Trace',
                referenceColor: {
                hex: '#be841a',
                    originalHex: '#ffcc31'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Hemolyzed 10 Trace',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Very Small Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25 Small ',
                referenceColor: {
                hex: '#96771e',
                    originalHex: '#bcb144'
                },
                interpretation: 'Above-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '80 Moderate',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '200 Large',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#bdb3a2',
                    originalHex: '#fff2d4'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '2.5',
                referenceColor: {
                hex: '#b7afaf',
                    originalHex: '#f3e8e9'
                },
                interpretation: 'Mildly Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '5',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'High Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7.5',
                referenceColor: {
                hex: '#b191a0',
                    originalHex: '#e0c6d7'
                },
                interpretation: 'Borderline High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '>10',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#bbb1a0',
                    originalHex: '#fff1d2'
                },
                interpretation: 'Low-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '4.4',
                referenceColor: {
                hex: '#bba68d',
                    originalHex: '#f2ddbd'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '8.8',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '17.7',
                referenceColor: {
                hex: '#bca9a3',
                    originalHex: '#d8c8b7'
                },
                interpretation: 'Reasonable Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '26.5',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#bab5a8',
                    originalHex: '#fff7e5'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.002',
                referenceColor: {
                hex: '#b9b0a5',
                    originalHex: '#fff1e2'
                },
                interpretation: 'Low-normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.004',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Semi-low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.008',
                referenceColor: {
                hex: '#b9a49f',
                    originalHex: '#fdddd7'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.02',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.1',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#76979a',
                    originalHex: '#a2dadb'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '5 Trace ',
                referenceColor: {
                hex: '#7b9562',
                    originalHex: '#b6dcae'
                },
                interpretation: 'Small-to-Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '15',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '30',
                referenceColor: {
                hex: '#946c10',
                    originalHex: '#c5af25'
                },
                interpretation: 'Above-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '60',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '110',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#b09d90',
                    originalHex: '#fee0c8'
                },
                interpretation: 'No Ketones',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Trace 0.5',
                referenceColor: {
                hex: '#ae8c83',
                    originalHex: '#fbc9bc'
                },
                interpretation: 'Trace Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Small 1.5',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Small Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Moderate 4.0',
                referenceColor: {
                    hex: '#9c374f',
                    originalHex: '#d16984'
                },
                interpretation: 'Moderate Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 8',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Large Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 16',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#b6ae9a',
                    originalHex: '#fdfad7',
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
                hex: '#b8a792',
                    originalHex: '#f8e9cf',
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
                    hex: '#000000',
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
                hex: '#8b667c',
                    originalHex: '#c6abba',
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
                    hex: '#000000',
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
                    hex: '#c2b3a3',
                    originalHex: '#f3e3c4'
                },
                interpretation: 'Normal (Negative) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '15',
                referenceColor: {
                hex: '#c5b8b8',
                    originalHex: '#f3e4e5'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '20',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25',
                referenceColor: {
                hex: '#bd99aa',
                    originalHex: '#dfb9cd'
                },
                interpretation: 'Lower Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '>40',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#afb6b3',
                    originalHex: '#e1f1eb'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '30',
                referenceColor: {
                hex: '#a5b3b6',
                    originalHex: '#d1ecea'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '80',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '150',
                referenceColor: {
                hex: '#84adb4',
                    originalHex: '#a0dbe7'
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
                correspondingValue: 'Neg',
                referenceColor: {
                    hex: '#c1bba7',
                    originalHex: '#fffde7',
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {},
            },
            {
                correspondingValue: 'Positive (light pink)',
                referenceColor: {
                    hex: '#fee7dc',
                    originalHex: '#fee7dc',
                },
                interpretation: 'Moderate (Positive) Range',
                range: 'Outside of Range',
                clarification: {},
            },
            {
                correspondingValue: 'Positive (dark pink)',
                referenceColor: {
                    hex: '#fcdee1',
                    originalHex: '#fcdee1',
                },
                interpretation: 'Extreme (Positive) Range',
                range: 'Outside of Range',
                clarification: {},
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
                    hex: '#bc9b4e',
                    originalHex: '#f3d15e'
                },
                interpretation: 'Acidic Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '6',
                referenceColor: {
                hex: '#907e15',
                    originalHex: '#babc33'
                },
                interpretation: 'Slightly Acidic Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '6.5',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Normal (Balanced) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7',
                referenceColor: {
                hex: '#586e15',
                    originalHex: '#86a23f'
                },
                interpretation: 'Optimal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7.5',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Normal (Balanced) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '8',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Mildly Alkaline Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '8.5',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#bea441',
                    originalHex: '#fbe960'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Trace',
                referenceColor: {
                hex: '#c0a425',
                    originalHex: '#f7e761'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.3',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1',
                referenceColor: {
                hex: '#8c9425',
                    originalHex: '#c5d568'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '3',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '20',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#925141',
                    originalHex: '#c2572e'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '100',
                referenceColor: {
                hex: '#974050',
                    originalHex: '#cb7d81'
                },
                interpretation: 'Slighty High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '200',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '300',
                referenceColor: {
                hex: '#ad7f7a',
                    originalHex: '#e1ada3'
                },
                interpretation: 'Higher Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '400',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '500',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#2f5a71',
                    originalHex: '#00879e'
                },
                interpretation: 'Low Diluted Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '1.005',
                referenceColor: {
                hex: '#43622f',
                    originalHex: '#6d945e'
                },
                interpretation: 'Diluted Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '1.01',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.015',
                referenceColor: {
                hex: '#806917',
                    originalHex: '#b2ae47'
                },
                interpretation: 'Ideal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.02',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Normal to Slightly Concentrated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.025',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Concentrated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.03',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#aeab96',
                    originalHex: '#eceed2'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '50',
                referenceColor: {
                hex: '#9e978d',
                    originalHex: '#dddfcc'
                },
                interpretation: 'Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '100',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Medium-high Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '300',
                referenceColor: {
                hex: '#808188',
                    originalHex: '#bbc1c1'
                },
                interpretation: 'High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '700',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Upper End of High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1100',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Significantly High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1500',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#b5a99a',
                    originalHex: '#fff2d9'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '16',
                referenceColor: {
                hex: '#ac8c82',
                    originalHex: '#fcccb9'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '33',
                referenceColor: {
                hex: '#000000',
                    originalHex: '#f9aea0'
                },
                interpretation: 'Considered Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '66',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Considered Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '131',
                referenceColor: {
                    hex: '#000000'
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
                    hex: '#ab7e90',
                    originalHex: '#f7b7cc'
                },
                interpretation: 'Normal (Negative) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.5',
                referenceColor: {
                hex: '#a56e8f',
                    originalHex: '#eab3cc'
                },
                interpretation: 'Standard Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '1',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'High End of Standard Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '2',
                referenceColor: {
                hex: '#91768d',
                    originalHex: '#d4bed6'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '5',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '10',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Highly Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25',
                referenceColor: {
                    hex: '#000000'
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },

]; // all parameters

const testsConfig = {
    "complete 20-n-1": { // used in UI (comes from QR scanner)
        duration: 60, // seconds
        overlayImage: {
            url: './resources/height_blank.png',
            width: 185,
            height: 1059,
        },
        parameters: {
            'Ascorbate': { // parameter exact name (string as test name) will be used in datastore also and UI
                locationOnOverlay: {
                    center: { y: 55, x: 35 }, samplingOffsetRadius: 15 // has the samplingBoxSizePercentage already multiplied in it
                },
            },
            'BHB': {
                locationOnOverlay: {
                    center: { y: 135, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Bilirubin': {
                locationOnOverlay: {
                    center: { y: 210, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Blood': {
                locationOnOverlay: {
                    center: { y: 290, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Calcium': {
                locationOnOverlay: {
                    center: { y: 370, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Creatinine': {
                locationOnOverlay: {
                    center: { y: 455, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Free Radical': {
                locationOnOverlay: {
                    center: { y: 540, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Glucose': {
                locationOnOverlay: {
                    center: { y: 630, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Ketone': {
                locationOnOverlay: {
                    center: { y: 725, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Leukocytes': {
                locationOnOverlay: {
                    center: { y: 820, x: 35 }, samplingOffsetRadius: 15
                },
            },
            'Magnesium': {
                locationOnOverlay: {
                    center: { y: 55, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'Micro Albumin': {
                locationOnOverlay: {
                    center: { y: 135, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'Nitrities': {
                locationOnOverlay: {
                    center: { y: 210, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'pH': {
                locationOnOverlay: {
                    center: { y: 290, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'Protein': {
                locationOnOverlay: {
                    center: { y: 370, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'Sodium (Salinity)': {
                locationOnOverlay: {
                    center: { y: 455, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'Specific Gravity': {
                locationOnOverlay: {
                    center: { y: 540, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'Uric Acid': {
                locationOnOverlay: {
                    center: { y: 630, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'Urobilinogen': {
                locationOnOverlay: {
                    center: { y: 725, x: 145 }, samplingOffsetRadius: 15
                },
            },
            'Zinc': {
                locationOnOverlay: {
                    center: { y: 820, x: 145 }, samplingOffsetRadius: 15
                },
            },
        }
    }
}

function getTag() {
    return DATASTORE_TAG;
}


function getDatastoreParameter(options, callback) {
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

function getLocalParameter(parameterName) {
    return testParameters.find(param => param.name === parameterName);
}

export default { getDatastoreParameter, getTag, testsConfig, testParameters, getLocalParameter };