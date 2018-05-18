/**
 * Created by Administrator on 2018/5/17.
 */


export const getEchartsOpt = (xData,sData) => {
    return {
        color:["#6FD2F6"],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top:40,
            left: 40,
            right: 20,
            bottom: 40
        },
        xAxis : [
            {
                type : 'category',
                data : xData,
                axisLabel:{
                    rotate :0,
                    textStyle:{
                        color:'#fff'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#888'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{
                    textStyle:{
                        color:'#fff'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#888'
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:'#888'
                    }
                }
            }
        ],
        series : [
            {
                type:'bar',
                barWidth : 20,
                data:sData
            }
        ]
    };
};