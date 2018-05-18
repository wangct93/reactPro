/**
 * Created by Administrator on 2018/5/18.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';


export default props => {
    let {data = []} = props;
    return <ul className="menu-list">
        {
            data.map((item,i) => {
                let {iconCls,path,text} = item;
                return <li key={i}>
                    <Link to={path} className={`menu-item ${iconCls}`}>{text}</Link>
                </li>
            })
        }
    </ul>
};