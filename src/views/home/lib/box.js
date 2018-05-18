/**
 * Created by Administrator on 2018/5/18.
 */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';


export default props => {
    let {title,Content = '',url,data = [],className = ''} = props;
    return <div className={`home-box ${className}`}>
        <div className="h-header">
            <span className="h-title">{title}</span>
            {
                url ? <span className="hand-text">更多</span> : ''
            }
        </div>
        <div className="h-body">
            {
                Content ? Content : <List data={data}/>
            }
        </div>
    </div>
}

const List = props => {
    let {data} = props;
    return <ul className="home-list">
        {
            data.map((item,i) => {
                let {text} = item;
                return <li key={i}>
                    <span className="hand-text">{text}</span>
                </li>
            })
        }
    </ul>
};



export const NoticeList = props => {
    let {data = []} = props;
    return <ul className="notice-list">
        {
            data.map((item,i) => {
                let {content = '',time = ''} = item;
                return <li key={i}>
                    <span className="notice-title">
                        <span className="hand-text">{content}</span>
                    </span>
                    <span className="notice-time">{new Date(time).toFormatString('MM-DD')}</span>
                </li>
            })
        }
    </ul>
};