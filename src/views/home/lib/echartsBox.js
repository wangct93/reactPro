/**
 * Created by Administrator on 2018/5/18.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

import echarts from 'echarts';

import {getEchartsOpt} from './compute';

export default class EchartsBox extends Component{
    render(){
        return <div className="echarts-box" ref="box"/>
    }
    componentWillUpdate(props){
        let {data} = props;
        if(!wt.equal(data,this.props.data)){
            this.draw(data);
        }
    }
    componentDidMount(){
        this.draw(this.props.data);
    }
    draw(data = []){
        let chart = echarts.init(this.refs.box);
        let xData = [],sData = [];
        data.forEach(({name,value}) => {
            xData.push(name);
            sData.push(value);
        });
        chart.setOption(getEchartsOpt(xData,sData));
    }
}