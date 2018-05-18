/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';

export default props => {
    let {data} = props;
    return <div className="header">
        <nav className="nav-box">
            {
                data.map((item,i) => {
                    let {text,path,iconCls} = item;
                    return <NavLink to={path} className="nav-item" key={i}>
                        <Icon type={iconCls}/>
                        <span>{text}</span>
                    </NavLink>
                })
            }
        </nav>
    </div>
}