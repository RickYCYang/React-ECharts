import React from 'react';
import ReactECharts from 'echarts-for-react';  

const EChart = () => {

    const xAxisData = ['M010', 'M011', 'M012', 'M101', 'M102', 'M103', 'M104', 'M105', 'M106', '3Q21', '4Q21'];
    const yAxisName = ['Gap (%)', 'WPD'];
    const dataSource = {
        WPHAVL: {
            caption: 'WPH+AVL Gap(%)',
            color: '#000000',
            data: [-0.014, -0.002, -0.075, -0.051, -0.024, -0.017, -0.035],
        },
        EffLost: {
            caption: 'Eff/Lost Gap(%)',
            color: '#ffffff',
            data: [-0.084, -0.113, -0.096, -0.091, -0.054, -0.078, -0.097],
        },
        WPDTarget: {
            caption: 'WPD Target',
            color: '#5470C6',
            data: [2000, 2100, 2250, 2200, 2100, 2155, 2205, 2100, 2147, 2210, 2021],
        },
        WPDGap: {
            caption: 'WPD Gap',
            color: '#DC143C',
        },
        ScannerLoss: {
            caption: 'Scanner Loss',
            color: '#565656',
            data: [0.085, 0.104, 0.085, 0.085, 0.055, 0.066, 0.093]
        }
    }

    
    dataSource.WPDGap.data = dataSource.WPHAVL.data.map((value, index) => {
        return dataSource.WPHAVL.data[index] + dataSource.EffLost.data[index];
    });


    const emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
    };
    const barItemStyle = {
        borderColor: '#000000',
        borderWidth: 0.5,
    }

    const options = {
        title: {
            left: 'center',
            text: 'F12AIMM',
            textStyle: {
                color: '#5470c6'
            }
        },
        grid: [
            {width: '80%', height: '70%'},
            {top: '80%', width: '80%', height: '10%'}
        ],
        legend: {
            data: [dataSource.WPHAVL.caption, dataSource.EffLost.caption, dataSource.WPDTarget.caption, dataSource.WPDGap.caption, dataSource.ScannerLoss.caption],
            left: 'center',
            bottom: 0,
            itemStyle: {
                borderWidth: 1,
                borderColor: '#000000'
            }
        },
        color: [dataSource.WPDTarget.color, dataSource.WPDGap.color, dataSource.WPHAVL.color, dataSource.EffLost.color, dataSource.ScannerLoss.color],
        xAxis: [
            {
                gridIndex: 0,
                type: 'category',
                data: xAxisData,
                show: false
            },
            {
                gridIndex: 1,
                type: 'category',
                data: xAxisData,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    fontSize: 14,
                    fontWeight: 'bold'
                },
            }
        ],
        yAxis: [
            {
                gridIndex: 0,
                type: 'value',
                name: yAxisName[0], ///Gap(%)
                max: 0.3,
                min: -0.3,
                position: 'left',
                axisLine: {
                    show: false,
                    onZero: true
                },
                nameTextStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                },
                axisLabel: {
                    interval: 0.1,
                    formatter: (value, index) => {
                        return (value*100) + ' %'
                    },
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                axisPointer: {
                    type: 'shadow'
                },
                splitLine: {
                    onZero: true
                }
            },
            {
                gridIndex: 0,
                type: 'value',
                name: yAxisName[1], ///WPD Target
                max: 2300,
                min: 0,
                interval: 500,
                position: 'right',
                axisLine: {
                    show: false
                },
                nameTextStyle: {
                    fontSize: 16,
                    fontWeight: 'bold'
                },
                axisLabel: {
                    interval: 500,
                    fontSize: 14,
                    fontWeight: 'bold'
                },
                splitLine: {
                    show: false,
                    onZero: true
                }
            },
            {
                gridIndex: 0,
                type: 'value',
                name: yAxisName[0], ///Hide for WPD Gap
                max: 0,
                min: -0.5,
                position: 'left',
                show: false,
                splitLine: {
                    onZero: true
                }
            },
            {
                gridIndex: 1,
                show: false,
                type: 'value',
                name: yAxisName[0],  ///Gap(%)
                max: 0.3,
                min: 0,
                position: 'left',
            },
        ],
        //yAxis End
        tooltip: {
            trigger: 'axis',
        },
        series: [
            {
                name: dataSource.WPDTarget.caption,
                type: 'line',
                emphasis: emphasisStyle,
                data: dataSource.WPDTarget.data,
                xAxisIndex: 0,
                yAxisIndex: 1,
                markPoint: {
                    symbol: 'pin',
                    symbolSize: 0,
                    label:{
                        show: true,
                        position: 'top',
                        color: 'inherit',
                        fontSize: 14
                    },
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                },
            },
            {
                name: dataSource.WPDGap.caption,
                type: 'line',
                emphasis: emphasisStyle,
                data: dataSource.WPDGap.data,
                xAxisIndex: 0,
                yAxisIndex: 2,
                label:{
                    show: true,
                    position: 'bottom',
                    fontSize: 14,
                    color: 'inherit',
                    formatter: (value) => {
                        return (value.value * 100).toFixed(0) + '%'
                    }
                }
            },
            {
                name: dataSource.WPHAVL.caption,
                type: 'bar',
                stack: 'stack',
                emphasis: emphasisStyle,
                data: dataSource.WPHAVL.data,
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: barItemStyle,
                label:{
                    show: true,
                    position: 'top',
                    fontSize: 14,
                    color: '#DC143C',
                    formatter: (value) => {
                        return (value.value * 100).toFixed(1) + '%'
                    }
                } 
            },
            {
                name: dataSource.EffLost.caption,
                type: 'bar',
                stack: 'stack',
                emphasis: emphasisStyle,
                data: dataSource.EffLost.data,
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: barItemStyle,
                label:{
                    show: true,
                    position: 'bottom',
                    fontSize: 14,
                    color: '#DC143C',
                    formatter: (value) => {
                        return (value.value * 100).toFixed(1) + '%'
                    }
                } 
            },
            {
                name: dataSource.ScannerLoss.caption,
                type: 'bar',
                emphasis: emphasisStyle,
                data: dataSource.ScannerLoss.data,
                xAxisIndex: 1,
                yAxisIndex: 3,
                itemStyle: barItemStyle,
                label:{
                    show: true,
                    position: 'top',
                    fontSize: 14,
                    formatter: (value) => {
                        return (value.value * 100).toFixed(1) + '%'
                    }
                } 
            }
        ]
    };


    return (
        <ReactECharts 
            option={options} 
            style={{height: '70%', widht: 'auto' }}
        />
    );
}

export default EChart;