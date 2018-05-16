/**
 * Created by Administrator on 2018/3/27.
 */
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter} from 'react-router-dom';


import RouterSwitch from '../components/routerSwitch';
import Header from '../views/header';

import './index.less';


export default connect(state => {
    return state.routerData;
})(({list}) => {
    return <HashRouter>
        <React.Fragment>
            <Header />
            <div className="body">
                <RouterSwitch data={list} />
            </div>
        </React.Fragment>
    </HashRouter>
})