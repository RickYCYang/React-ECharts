import React from 'react';
import ReactECharts from 'echarts-for-react';  
import ZebraOption from './Options/Zebra';
import BoxPlotOption from './Options/BoxPlot'

const EChart = () => {
    return (
        <ReactECharts 
            option={BoxPlotOption} 
            style={{height: '70%', widht: 'auto' }}
        />
    );
}

export default EChart;