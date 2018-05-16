/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';

export default connect(state => state.routerData)(props => {
    let {list} = props;
    return <div className="header">
        <nav className="nav-list">
            {
                list.map(({path,text,iconCls},i) => {
                    return <NavLink key={i} to={path}>
                        <Icon type={iconCls} />
                        <span>{text}</span>
                    </NavLink>
                })
            }
        </nav>
    </div>;
});