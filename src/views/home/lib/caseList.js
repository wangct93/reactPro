/**
 * Created by Administrator on 2018/5/18.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';


export default props => {
    let {data = [],click} = props;
    return <ul className="case-list">
        {
            data.map((item,i) => {
                let {title,time} = item;
                return <li key={i}>
                    <div className="img-box-auto">
                        <img src="img/1.jpg" />
                    </div>
                    <p className="case-name">
                        <span onClick={click.bind(this,item)} className="hand-text">{title}</span>
                    </p>
                    <p className="case-time">{time}</p>
                </li>
            })
        }
    </ul>
}