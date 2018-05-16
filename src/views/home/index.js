/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Input} from 'antd';

import Header from '../header';

const {Search} = Input;

class Home extends Component{
    render(){
        let {city = '请选择',menuData = [],czyhData = []} = this.props;

        return <div className="page-flex home-container">

        </div>
    }
}

export default connect(state => state.homeData)(Home);