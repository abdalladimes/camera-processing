
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
                    hex: '#558ba7',
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
                hex: '#4c978a',
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
                    hex: '#70a446',
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
                    hex: '#c0af26',
                    originalHex: '#d0d139',
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {},
            },
            {
                correspondingValue: '5',
                referenceColor: {
                    hex: '#f3df87',
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
                    hex: '#dfcac1',
                    originalHex: '#fee0c8'
                },
                interpretation: 'No BHB',
                range: 'Within Range',
                clarification: {}
            },
            {
                correspondingValue: '4(0.4)',
                referenceColor: {
                hex: '#d8b7b4',
                    originalHex: '#fbc9bc'
                },
                interpretation: 'Trace BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '12(1.2)',
                referenceColor: {
                    hex: '#c98c9b'
                },
                interpretation: 'Small BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '32(3.2)',
                referenceColor: {
                    hex: '#b9597b',
                    originalHex: '#d16984'
                },
                interpretation: 'Moderate BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '64(6.4)',
                referenceColor: {
                    hex: '#b85b86'
                },
                interpretation: 'Large BHB',
                range: 'Outside of Range',
                clarification: {}
            },
            {
                correspondingValue: '128(12.8)',
                referenceColor: {
                    hex: '#974d75'
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
                    hex: '#e3ded0',
                    originalHex: '#fffde7'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {
                correspondingValue: 'Small 17',
                referenceColor: {
                hex: '#dabba1',
                    originalHex: '#ffdaab'
                },
                interpretation: 'Small Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Moderate 50',
                referenceColor: {
                    hex: '#cca588'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 100',
                referenceColor: {
                hex: '#c18c7a',
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
                    hex: '#db9f2b',
                    originalHex: '#ffcc31'
                },
                interpretation: 'Negative (Normal) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Non hemolyzed 10 Trace',
                referenceColor: {
                hex: '#db9e1f',
                    originalHex: '#ffcc31'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Hemolyzed 10 Trace',
                referenceColor: {
                    hex: '#c79821'
                },
                interpretation: 'Very Small Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25 Small ',
                referenceColor: {
                hex: '#a4861e',
                    originalHex: '#bcb144'
                },
                interpretation: 'Above-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '80 Moderate',
                referenceColor: {
                    hex: '#758925'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '200 Large',
                referenceColor: {
                    hex: '#4f7429'
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
                    hex: '#d7cbba',
                    originalHex: '#fff2d4'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '2.5',
                referenceColor: {
                hex: '#d2c8c6',
                    originalHex: '#f3e8e9'
                },
                interpretation: 'Mildly Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '5',
                referenceColor: {
                    hex: '#c7b4b8'
                },
                interpretation: 'High Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7.5',
                referenceColor: {
                hex: '#b999aa',
                    originalHex: '#e0c6d7'
                },
                interpretation: 'Borderline High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '>10',
                referenceColor: {
                    hex: '#9896b7'
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
                    hex: '#d4c9b7',
                    originalHex: '#fff1d2'
                },
                interpretation: 'Low-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '4.4',
                referenceColor: {
                hex: '#d0beaa',
                    originalHex: '#f2ddbd'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '8.8',
                referenceColor: {
                    hex: '#c2b0a1'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '17.7',
                referenceColor: {
                hex: '#c6b3ae',
                    originalHex: '#d8c8b7'
                },
                interpretation: 'Reasonable Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '26.5',
                referenceColor: {
                    hex: '#9e879d'
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
                    hex: '#d2cbbe',
                    originalHex: '#fff7e5'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.002',
                referenceColor: {
                hex: '#cec7ba',
                    originalHex: '#fff1e2'
                },
                interpretation: 'Low-normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.004',
                referenceColor: {
                    hex: '#c7bab3'
                },
                interpretation: 'Semi-low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.008',
                referenceColor: {
                hex: '#c2afab',
                    originalHex: '#fdddd7'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.02',
                referenceColor: {
                    hex: '#d0b7b4'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.1',
                referenceColor: {
                    hex: '#c9a7aa'
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
                    hex: '#78a6b2',
                    originalHex: '#a2dadb'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '5 Trace ',
                referenceColor: {
                hex: '#7ea483',
                    originalHex: '#b6dcae'
                },
                interpretation: 'Small-to-Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '15',
                referenceColor: {
                    hex: '#8b9633'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '30',
                referenceColor: {
                hex: '#a37512',
                    originalHex: '#c5af25'
                },
                interpretation: 'Above-normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '60',
                referenceColor: {
                    hex: '#9b5715'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '110',
                referenceColor: {
                    hex: '#813a18'
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
                    hex: '#c6b4aa',
                    originalHex: '#fee0c8'
                },
                interpretation: 'No Ketones',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Trace 0.5',
                referenceColor: {
                hex: '#be9b99',
                    originalHex: '#fbc9bc'
                },
                interpretation: 'Trace Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Small 1.5',
                referenceColor: {
                    hex: '#b8687f'
                },
                interpretation: 'Small Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Moderate 4.0',
                referenceColor: {
                    hex: '#aa365d',
                    originalHex: '#d16984'
                },
                interpretation: 'Moderate Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 8',
                referenceColor: {
                    hex: '#a32e63'
                },
                interpretation: 'Large Ketones',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: 'Large 16',
                referenceColor: {
                    hex: '#7d1d54'
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
                    hex: '#cdc4b2',
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
                hex: '#c7b7a7',
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
                    hex: '#bdaca2',
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
                hex: '#996f8e',
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
                    hex: '#7d578d',
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
                    hex: '#e8d8c6',
                    originalHex: '#f3e3c4'
                },
                interpretation: 'Normal (Negative) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '15',
                referenceColor: {
                hex: '#e6dbda',
                    originalHex: '#f3e4e5'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '20',
                referenceColor: {
                    hex: '#d5bcc2'
                },
                interpretation: 'Low Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25',
                referenceColor: {
                hex: '#c39db2',
                    originalHex: '#dfb9cd'
                },
                interpretation: 'Lower Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '>40',
                referenceColor: {
                    hex: '#b18eaf'
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
                    hex: '#c8d3d3',
                    originalHex: '#e1f1eb'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '30',
                referenceColor: {
                hex: '#bacdd3',
                    originalHex: '#d1ecea'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '80',
                referenceColor: {
                    hex: '#93b7c4'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '150',
                referenceColor: {
                hex: '#80b1be',
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
                    hex: '#e1d9c4',
                    originalHex: '#fffde7',
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {},
            },
            {
                correspondingValue: 'Positive (light pink)',
                referenceColor: {
                    hex: '#decfc6',
                    originalHex: '#fee7dc',
                },
                interpretation: 'Moderate (Positive) Range',
                range: 'Outside of Range',
                clarification: {},
            },
            {
                correspondingValue: 'Any Degree of Uniform Pink Color',
                referenceColor: {
                    hex: '#d5c5c5',
                    originalHex: '#fde4e7',
                },
                interpretation: 'Excessive (Positive) Range',
                range: 'Outside of Range',
                clarification: {},
            },
            {
                correspondingValue: 'Positive (dark pink)',
                referenceColor: {
                    hex: '#000000',
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
                    hex: '#dbab33',
                    originalHex: '#f3d15e'
                },
                interpretation: 'Acidic Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '6',
                referenceColor: {
                hex: '#9e950f',
                    originalHex: '#babc33'
                },
                interpretation: 'Slightly Acidic Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '6.5',
                referenceColor: {
                    hex: '#769318'
                },
                interpretation: 'Normal (Balanced) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7',
                referenceColor: {
                hex: '#5f7e16',
                    originalHex: '#86a23f'
                },
                interpretation: 'Optimal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '7.5',
                referenceColor: {
                    hex: '#57841c'
                },
                interpretation: 'Normal (Balanced) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '8',
                referenceColor: {
                    hex: '#477a25'
                },
                interpretation: 'Mildly Alkaline Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '8.5',
                referenceColor: {
                    hex: '#185583'
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
                    hex: '#dbb71e',
                    originalHex: '#fbe960'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: 'Trace',
                referenceColor: {
                hex: '#dcba19',
                    originalHex: '#f7e761'
                },
                interpretation: 'Trace Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '0.3',
                referenceColor: {
                    hex: '#cbb218'
                },
                interpretation: 'Moderate Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1',
                referenceColor: {
                hex: '#919f1b',
                    originalHex: '#c5d568'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '3',
                referenceColor: {
                    hex: '#6ba159'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '20',
                referenceColor: {
                    hex: '#559a5f'
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
                    hex: '#a4401d',
                    originalHex: '#c2572e'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '100',
                referenceColor: {
                hex: '#ad5b67',
                    originalHex: '#cb7d81'
                },
                interpretation: 'Slighty High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '200',
                referenceColor: {
                    hex: '#b56f68'
                },
                interpretation: 'High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '300',
                referenceColor: {
                hex: '#b98382',
                    originalHex: '#e1ada3'
                },
                interpretation: 'Higher Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '400',
                referenceColor: {
                    hex: '#d1b6ab'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '500',
                referenceColor: {
                    hex: '#d5cbc1'
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
                    hex: '#0b5990',
                    originalHex: '#00879e'
                },
                interpretation: 'Low Diluted Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '1.005',
                referenceColor: {
                hex: '#437525',
                    originalHex: '#6d945e'
                },
                interpretation: 'Diluted Range',
                range: 'Below Range',
                clarification: {}
            },
            {

                correspondingValue: '1.01',
                referenceColor: {
                    hex: '#658a0a'
                },
                interpretation: 'Normal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.015',
                referenceColor: {
                hex: '#8d7910',
                    originalHex: '#b2ae47'
                },
                interpretation: 'Ideal Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.02',
                referenceColor: {
                    hex: '#b19511'
                },
                interpretation: 'Normal to Slightly Concentrated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.025',
                referenceColor: {
                    hex: '#c79514'
                },
                interpretation: 'Concentrated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1.03',
                referenceColor: {
                    hex: '#be850d'
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
                    hex: '#bdbfab',
                    originalHex: '#eceed2'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '50',
                referenceColor: {
                hex: '#aeafa6',
                    originalHex: '#dddfcc'
                },
                interpretation: 'Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '100',
                referenceColor: {
                    hex: '#a6a7a3'
                },
                interpretation: 'Medium-high Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '300',
                referenceColor: {
                hex: '#838c9d',
                    originalHex: '#bbc1c1'
                },
                interpretation: 'High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '700',
                referenceColor: {
                    hex: '#8086a3'
                },
                interpretation: 'Upper End of High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1100',
                referenceColor: {
                    hex: '#6a7ba1'
                },
                interpretation: 'Significantly High Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '1500',
                referenceColor: {
                    hex: '#566592'
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
                    hex: '#cabeb0',
                    originalHex: '#fff2d9'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '16',
                referenceColor: {
                hex: '#bea09a',
                    originalHex: '#fcccb9'
                },
                interpretation: 'Normal Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '33',
                referenceColor: {
                hex: '#b57b78',
                    originalHex: '#f9aea0'
                },
                interpretation: 'Considered Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '66',
                referenceColor: {
                    hex: '#b57373'
                },
                interpretation: 'Considered Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '131',
                referenceColor: {
                    hex: '#bb6c5d'
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
                    hex: '#bf87a2',
                    originalHex: '#f7b7cc'
                },
                interpretation: 'Normal (Negative) Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '0.5',
                referenceColor: {
                hex: '#b985a3',
                    originalHex: '#eab3cc'
                },
                interpretation: 'Standard Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '1',
                referenceColor: {
                    hex: '#af7a9c'
                },
                interpretation: 'High End of Standard Range',
                range: 'Within Range',
                clarification: {}
            },
            {

                correspondingValue: '2',
                referenceColor: {
                hex: '#a07d9c',
                    originalHex: '#d4bed6'
                },
                interpretation: 'Excessive Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '5',
                referenceColor: {
                    hex: '#8d9cbb'
                },
                interpretation: 'Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '10',
                referenceColor: {
                    hex: '#7f9aba'
                },
                interpretation: 'Highly Elevated Range',
                range: 'Outside of Range',
                clarification: {}
            },
            {

                correspondingValue: '25',
                referenceColor: {
                    hex: '#4f90b1'
                },
                interpretation: 'Extreme Range',
                range: 'Outside of Range',
                clarification: {}
            },
        ]
    },

]; // all parameters

const testsConfig = {
    "20-n-1": {
        duration: 60,
        overlayImage: {
            url: './resources/height_blank.png',
            width: 185,
            height: 1059,
        },
        parameters: {
            'Ascorbate': { locationOnOverlay: { center: { y: 55, x: 35 }, samplingOffsetRadius: 15 } },
            'BHB': { locationOnOverlay: { center: { y: 135, x: 35 }, samplingOffsetRadius: 15 } },
            'Bilirubin': { locationOnOverlay: { center: { y: 210, x: 35 }, samplingOffsetRadius: 15 } },
            'Blood': { locationOnOverlay: { center: { y: 290, x: 35 }, samplingOffsetRadius: 15 } },
            'Calcium': { locationOnOverlay: { center: { y: 370, x: 35 }, samplingOffsetRadius: 15 } },
            'Creatinine': { locationOnOverlay: { center: { y: 455, x: 35 }, samplingOffsetRadius: 15 } },
            'Free Radical': { locationOnOverlay: { center: { y: 540, x: 35 }, samplingOffsetRadius: 15 } },
            'Glucose': { locationOnOverlay: { center: { y: 630, x: 35 }, samplingOffsetRadius: 15 } },
            'Ketone': { locationOnOverlay: { center: { y: 725, x: 35 }, samplingOffsetRadius: 15 } },
            'Leukocytes': { locationOnOverlay: { center: { y: 820, x: 35 }, samplingOffsetRadius: 15 } },
            'Magnesium': { locationOnOverlay: { center: { y: 55, x: 145 }, samplingOffsetRadius: 15 } },
            'Micro Albumin': { locationOnOverlay: { center: { y: 135, x: 145 }, samplingOffsetRadius: 15 } },
            'Nitrities': { locationOnOverlay: { center: { y: 210, x: 145 }, samplingOffsetRadius: 15 } },
            'pH': { locationOnOverlay: { center: { y: 290, x: 145 }, samplingOffsetRadius: 15 } },
            'Protein': { locationOnOverlay: { center: { y: 370, x: 145 }, samplingOffsetRadius: 15 } },
            'Sodium (Salinity)': { locationOnOverlay: { center: { y: 455, x: 145 }, samplingOffsetRadius: 15 } },
            'Specific Gravity': { locationOnOverlay: { center: { y: 540, x: 145 }, samplingOffsetRadius: 15 } },
            'Uric Acid': { locationOnOverlay: { center: { y: 630, x: 145 }, samplingOffsetRadius: 15 } },
            'Urobilinogen': { locationOnOverlay: { center: { y: 725, x: 145 }, samplingOffsetRadius: 15 } },
            'Zinc': { locationOnOverlay: { center: { y: 820, x: 145 }, samplingOffsetRadius: 15 } },
        }
    },
    // "14-n-1": {
    //     duration: 60,
    //     overlayImage: { url: './resources/height_blank.png', width: 185, height: 1059 },
    //     parameters: {
    //         'Ascorbate': { locationOnOverlay: { center: { y: 55, x: 35 }, samplingOffsetRadius: 15 } },
    //         'BHB': { locationOnOverlay: { center: { y: 135, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Bilirubin': { locationOnOverlay: { center: { y: 210, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Free Radical': { locationOnOverlay: { center: { y: 290, x: 35 }, samplingOffsetRadius: 15 } },
    //         'pH': { locationOnOverlay: { center: { y: 370, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Protein': { locationOnOverlay: { center: { y: 455, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Ketone': { locationOnOverlay: { center: { y: 540, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Leukocytes': { locationOnOverlay: { center: { y: 630, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Magnesium': { locationOnOverlay: { center: { y: 725, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Micro Albumin': { locationOnOverlay: { center: { y: 55, x: 145 }, samplingOffsetRadius: 15 } },
    //         'Nitrities': { locationOnOverlay: { center: { y: 135, x: 145 }, samplingOffsetRadius: 15 } },
    //         'Sodium (Salinity)': { locationOnOverlay: { center: { y: 210, x: 145 }, samplingOffsetRadius: 15 } },
    //         'Uric Acid': { locationOnOverlay: { center: { y: 290, x: 145 }, samplingOffsetRadius: 15 } },
    //         'Urobilinogen': { locationOnOverlay: { center: { y: 370, x: 145 }, samplingOffsetRadius: 15 } },
    //     }
    // },
    // "12-n-1": {
    //     duration: 60,
    //     overlayImage: { url: './resources/height_blank.png', width: 185, height: 1059 },
    //     parameters: {
    //         'Ascorbate': { locationOnOverlay: { center: { y: 55, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Bilirubin': { locationOnOverlay: { center: { y: 135, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Free Radical': { locationOnOverlay: { center: { y: 210, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Leukocytes': { locationOnOverlay: { center: { y: 290, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Magnesium': { locationOnOverlay: { center: { y: 370, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Micro Albumin': { locationOnOverlay: { center: { y: 455, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Nitrities': { locationOnOverlay: { center: { y: 540, x: 35 }, samplingOffsetRadius: 15 } },
    //         'pH': { locationOnOverlay: { center: { y: 630, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Protein': { locationOnOverlay: { center: { y: 725, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Specific Gravity': { locationOnOverlay: { center: { y: 820, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Uric Acid': { locationOnOverlay: { center: { y: 55, x: 145 }, samplingOffsetRadius: 15 } },
    //         'Urobilinogen': { locationOnOverlay: { center: { y: 135, x: 145 }, samplingOffsetRadius: 15 } },
    //     }
    // },
    // "4-n-1": {
    //     duration: 90,
    //     overlayImage: { url: './resources/height_blank.png', width: 185, height: 1059 },
    //     parameters: {
    //         'Leukocytes': { locationOnOverlay: { center: { y: 55, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Nitrities': { locationOnOverlay: { center: { y: 135, x: 35 }, samplingOffsetRadius: 15 } },
    //         'pH': { locationOnOverlay: { center: { y: 210, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Protein': { locationOnOverlay: { center: { y: 290, x: 35 }, samplingOffsetRadius: 15 } },
    //     }
    // },
    // "3-n-1": {
    //     duration: 60,
    //     overlayImage: { url: './resources/height_blank.png', width: 185, height: 1059 },
    //     parameters: {
    //         'BHB': { locationOnOverlay: { center: { y: 55, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Ketone': { locationOnOverlay: { center: { y: 135, x: 35 }, samplingOffsetRadius: 15 } },
    //         'pH': { locationOnOverlay: { center: { y: 210, x: 35 }, samplingOffsetRadius: 15 } },
    //     }
    // },
    // "2-n-1": {
    //     duration: 40,
    //     overlayImage: { url: './resources/height_blank.png', width: 185, height: 1059 },
    //     parameters: {
    //         'BHB': { locationOnOverlay: { center: { y: 55, x: 35 }, samplingOffsetRadius: 15 } },
    //         'Ketone': { locationOnOverlay: { center: { y: 135, x: 35 }, samplingOffsetRadius: 15 } },
    //     }
    // },
    "Free Single Pad Ketone Test": {
        duration: 40,
        overlayImage: { url: './resources/height_blank.png', width: 185, height: 1059 },
        parameters: {
            'Ketone': { locationOnOverlay: { center: { y: 55, x: 35 }, samplingOffsetRadius: 15 } },
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