/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Input,Tabs,Spin} from 'antd';



import UserBox from './lib/userBox';
import CaseList from './lib/caseList';
import MenuList from './lib/menuList';
import EchartsBox from './lib/echartsBox';
import HomeBox,{NoticeList} from './lib/box';


import * as actions from '@/store/home/action';

const {TabPane} = Tabs;

class Home extends Component{
    render(){
        let {menuList,saspkData,cbakData,mbbrData,zxajData,noticeData,platformData,downData,linkData} = this.props;
        return <div className="home-container fit overflow-auto">
            <div className="bg-div">
                <div className="center-area">
                    <MenuList data={menuList}/>
                    <div className="content mgt25">
                        <div className="home-left">
                            <Tabs animated={false}>
                                <TabPane key="1" tab={<i className="box-header-img icon-saspk"/>}>
                                    <EchartsBox data={saspkData}/>
                                </TabPane>
                                <TabPane key="2" tab={<i className="box-header-img icon-cbak"/>}>
                                    <EchartsBox data={cbakData}/>
                                </TabPane>
                            </Tabs>
                            <div className="m-box">
                                <div className="box-header">
                                    <i className="box-header-img box-header-img-width2 icon-mbbr"/>
                                    <ul className="select-list">
                                        <li>省级</li>
                                        <li>市级</li>
                                        <li>县级</li>
                                    </ul>
                                    <span className="hand-text">更多</span>
                                </div>
                                <div className="box-body">
                                    <CaseList click={this.itemDetail.bind(this,'mbbr')} data={mbbrData} />
                                </div>
                            </div>
                            <div className="m-box">
                                <div className="box-header">
                                    <i className="box-header-img box-header-img-width2 icon-zxaj"/>
                                    <ul className="select-list"/>
                                    <span className="hand-text">更多</span>
                                </div>
                                <div className="box-body">
                                    <CaseList click={this.itemDetail.bind(this,'zxaj')} data={zxajData} />
                                </div>
                            </div>
                        </div>
                        <div className="home-right">
                            <UserBox/>
                            <HomeBox title="通知公告" Content={
                                <NoticeList data={noticeData} url="223"/>
                            } />
                            <HomeBox title="市级平台" data={platformData} />
                            <HomeBox title="相关下载" className="down-box" data={downData}/>
                            <HomeBox title="友情链接" data={linkData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    componentDidMount(){
        this.props.loadData();
    }
    itemDetail(type,item){
    }
}

export default connect(state => state.homeData,actions)(Home);