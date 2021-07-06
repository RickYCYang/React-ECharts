import dataSource from '../Dataset/TPMP';

function numAdd(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
};

function numDiv(num1, num2) {
    var baseNum1 = 0, baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));
    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
};

function numMulti(num1, num2) {
    var baseNum = 0;
    try {
        baseNum += num1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        baseNum += num2.toString().split(".")[1].length;
    } catch (e) {
    }
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};


/*
const sampleData = [
    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
    [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
    [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
    [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
    [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
];
*/


const xAxisData = ['M009', 'M010', 'M011', 'M012', 'M013', 'M014', 'M015']


const generateGapArray = () => {
    let result = [];
    let rowGap = [];
    for(let i=0; i<dataSource.length; i++){
        rowGap.push(dataSource[i].Gap);
        if((i !== dataSource.length-1 && dataSource[i+1].Month !== dataSource[i].Month) || i === dataSource.length-1){
            result.push(rowGap);
            rowGap = [];
        }
    }
    return result;
}

const generateAverageArray = () => {
    let result = [];
    let monthToolCnt = 0;
    let accuGap = 0;
    for(let i=0; i<dataSource.length; i++){
        accuGap = numAdd(accuGap, dataSource[i].Gap);
        monthToolCnt++;
        if((i !== dataSource.length-1 && dataSource[i+1].Month !== dataSource[i].Month) || i === dataSource.length-1){
            let average = Math.round(numDiv(accuGap, monthToolCnt) * 1000) / 1000; 
            result.push(average);
            accuGap = 0;
            monthToolCnt = 0
        }
    }
    return result;
}

const gapDataSource = generateGapArray();
const averageDataSource = generateAverageArray();
console.log('averageDataSource', averageDataSource);
const option = {
    title: [
        {
            /*
            text: 'Michelson-Morley Experiment',
            left: 'center'
            */
        },
    ],
    legend: {
        data: ['Caption1', 'Caption2'],
        left: 'center',
        bottom: 0,
        itemStyle: {
            borderWidth: 1,
            borderColor: '#000000'
        }
    },
    dataset: [
        ///Dataset 0
        {
            id: "RawData",
            source: gapDataSource
        }, 
        ///Dataset 1
        {
            id: "BoxPlot",
            transform: {
                type: 'boxplot',
                config: { itemNameFormatter: (val) => xAxisData[val.value] },
                print: true
            }
        }, 
        ///Dataset 2
        {
            fromDatasetIndex: 1,
            fromTransformResult: 1
        }
    ],
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        },
        formatter: (val) => {
            console.log(val);
            let tool;
            dataSource.forEach((item) => {
                if(item.Month === val.data[0] && item.Gap === val.data[1]) {
                    tool = item.Tool;
                    return;
                }
            });
            if(val.data.length === 2){
                return `${tool} : ${val.data[1]}` 
            }else {
                let tool;
                dataSource.forEach((item) => {
                    if(item.Month === val.data[0] && item.Gap === val.data[1]) {
                        tool = item.Tool;
                        return;
                    }
                });
                return `
                <p>${val.data[0]}</p>
                <ul>
                    <li>${val.data[1]}</li>
                    <li>${val.data[2]}</li>
                    <li>${val.data[3]}</li>
                    <li>${val.data[4]}</li>
                    <li>${val.data[5]}</li>
                 </ul>
                `;
            }
            return val.data[0] + val.data[1]
        }
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        name: 'WPH Gap',
        min: -0.15,
        max: 0.15,
        splitArea: {
            show: false
        },
        axisLabel: {
            formatter: (val) => {
                return val * 100 + ' %'
            }
        },
        splitLine: {
            show: false,
            onZero: false,
            
        }
    },
    series: [
        {
            name: 'boxplot',
            type: 'boxplot',
            datasetIndex: 1,
            itemStyle: {
                color: '#6495ED'
            }
        },
        {
            name: 'outlier',
            type: 'scatter',
            datasetIndex: 2,
            itemStyle: {
                color: '#0047AB	'
            },
            label: {
                show: true,
                position: 'right',
                formatter: (val) => {
                    let tool;
                    dataSource.forEach((item) => {
                        if(item.Month === val.data[0] && item.Gap === val.data[1]) {
                            tool = item.Tool;
                            return;
                        }
                    });
                    return tool;
                }
            }
        },
        {
            name: 'average',
            type: 'line',
            data: averageDataSource,
            label:{
                show: false,
            },
            itemStyle: {
                color: '#00008B'
            },
            label: {
                show: true,
                formatter: (val) => {
                    console.log(val);
                    return numMulti(val.data, 100) + ' %'
                }
            }
        }
    ]
};

export default option;