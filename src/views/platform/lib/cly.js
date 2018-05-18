/**
 * Created by Administrator on 2018/5/18.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

import SearchView from './searchView';


export default class Cly extends Component{
    render(){
        return <div>
            <SearchView />
        </div>
    }
}


