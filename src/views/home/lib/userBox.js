/**
 * Created by Administrator on 2018/5/18.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';



export default props => {
    return <div className="user-box">
        <div className="img-box-fit">
            <img src="img/home/user_logo.png" />
        </div>
        <div className="user-content">
            <p>管理员，欢迎您！</p>
            <p>
                <span className="hand-text">信息修改</span>
                <span className="hand-text">退出</span>
            </p>
            <p>
                <span className="hand-text">进入我的平台</span>
            </p>
        </div>
    </div>
}