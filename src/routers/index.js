/**
 * Created by Administrator on 2018/3/27.
 */
import './index.less';
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter,withRouter,Route} from 'react-router-dom';


import SwitchRouter from '../components/switchRouter';

import Header from '../views/header';

export default connect(state => state.routerData)(({list,headerNavData}) => {
    return <HashRouter>
        <React.Fragment>
            <Header data={headerNavData}/>
            <div className="body">
                <SwitchRouter data={list} />
            </div>
        </React.Fragment>
    </HashRouter>
})