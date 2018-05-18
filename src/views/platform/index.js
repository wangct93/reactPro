/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link, withRouter} from 'react-router-dom';
import {Icon,Input,Tabs,Spin,Menu} from 'antd';

import SwitchRouter from '@/components/switchRouter';

import * as actions from '@/store/platform/action';

const {TabPane} = Tabs;
const {SubMenu} = Menu;


let basePath;

class Platform extends Component{
    render(){
        let {navList = [],routerData = [],userTypeList = [],match = {}} = this.props;
        basePath = match.path.replace(/[\\\/]:[\w\W]*$/,'');
        return <div className="platform-container fit">
            <div className="left">
                <Menu mode="inline">
                    {
                        navList.map((item,i) => {
                            let {name,children} = item;
                            return <SubMenu key={i} title={<span><Icon type="mail" /><span>{name}</span></span>}>
                                    {
                                        children.map((item,i) => {
                                            let {name} = item;
                                            return <Menu.Item className="sub-menu-item" key={i}>{name}</Menu.Item>
                                        })
                                    }
                            </SubMenu>
                        })
                    }
                </Menu>
            </div>
            <div className="right">
                <RightHeader data={userTypeList}/>
                <SwitchRouter basename={basePath} data={routerData} />
            </div>
        </div>
    }
}

const RightHeader = withRouter(props => {
    let {location,data = []} = props;
    let {pathname} = location;

    let hasHeader = data.some(item => pathname.indexOf(item.path) !== -1);
    return hasHeader ? <div className="right-header">
        <ul className="tab-list">
            {
                data.map((item,i) => {
                    let {path,text,iconCls} = item;
                    return <li key={i}>
                        <NavLink to={basePath + path} className={iconCls}>{text}</NavLink>
                    </li>
                })
            }
        </ul>
    </div> : ''
});


export default connect(state => state.platformData,actions)(Platform);