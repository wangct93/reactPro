/**
 * Created by Administrator on 2018/5/18.
 */

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

import {TreeSelect,Input,Select,DatePicker,Button,Table,Tabs,Radio,Pagination} from 'antd';
import moment from 'moment';

import Loading from '@/components/loading';

import {formatAreaData} from '@/computes/compute';
import originAreaData from '@/json/area.json';

import caseTypeData from '@/json/caseType.json';

import * as actions from '@/store/platform/action';

let areaData = formatAreaData(originAreaData);

const {Option} = Select;
const {RangePicker} = DatePicker;
const {TabPane} = Tabs;
const {Group:RadioGroup} = Radio;

import '../searchFrame.less';

class Cly extends Component{
    render(){
        let {data = [],loading,total = 0} = this.props;
        let {pageNum} = this.state || {};
        return <div className="searchframe-container">
            <div className="sf-header">
                <FormView ref="form"/>
                <Button type="primary" onClick={this.search.bind(this)}>查询</Button>
            </div>
            <div className="body">
                <div className="view-wrap pos-rel">
                    <Loading show={loading} />
                    <Tabs defaultActiveKey="1" tabBarExtraContent={
                        <Pagination showTotal={(total,range) => {
                            return '共' + total + '条数据';
                        }} current={pageNum} total={total} onChange={this.selectPage.bind(this)}/>
                    }>
                        <TabPane key="1" tab="图片">
                            <ImageView data={data}/>
                        </TabPane>
                        <TabPane key="2" tab="列表">
                            <TableView />
                        </TabPane>
                    </Tabs>
                </div>
                <Pagination showTotal={(total,range) => {
                    return '共' + total + '条数据';
                }} current={pageNum} total={total} onChange={this.selectPage.bind(this)}/>
            </div>
        </div>
    }
    componentDidMount(){
        this.loadData();
    }
    componentWillUnmount(){
        this.props.clearClyParams();
    }
    search(){
        let data = this.refs.form.state || {};
        let {ladw} = data;
        if(ladw){
            ladw = this.filterAreaData(ladw);
        }
        this.loadData({
            ...data,ladw
        });
    }
    filterAreaData(node){
        let {props} = node;
        let {children = []} = props;
        let result = children.map(item => this.filterAreaData(item)).reduce((ov,nv) => {
            return ov.concat(nv);
        },[]);
        result.push(props.text);
        return result;
    }
    selectPage(pageNum,size){
        this.loadData({
            pageNum,
            size
        });
    }
    loadData(params = {}){
        let {pageNum = 1,size = 10} = params;
        this.props.loadData('cly',{
            ...params,
            start:(pageNum - 1) * size,
            limit:size
        });
        this.setState({
            pageNum,
        });
    }
}

export default connect(state => state.platformData.cly || {},actions)(Cly);


class FormView extends Component{
    render(){
        let {ladw,lasj,caseId,caseType} = this.state || {};
        return <div className="form-box">
            <div className="form-line">
                <FormItem label="立案单位：">
                    <TreeSelect treeData={areaData} style={{
                        width:300,
                        height:30
                    }} dropdownStyle={{
                        maxHeight:400
                    }} value={ladw && ladw.props.value} onSelect={this.treeChange.bind(this)}/>
                </FormItem>
                <FormItem label="案件编号：">
                    <Input type="text" name="caseId" value={caseId} onChange={this.inputChange.bind(this)}/>
                </FormItem>
            </div>
            <div className="form-line">
                <FormItem label="案件类别：">
                    <Select treeData={areaData} style={{
                        width:300,
                        height:30
                    }} dropdownStyle={{
                        maxHeight:400
                    }} value={caseType} onSelect={this.selectChange.bind(this,'caseType')}>
                        {
                            caseTypeData.map((item,i) => {
                                let {text} = item;
                                return <Option value={text} key={i}>{text}</Option>
                            })
                        }
                    </Select>
                </FormItem>
            </div>
            <div className="form-line">
                <FormItem label="立案时间：">
                    <DateBox value={lasj} name="lasj" onChange={this.setValue.bind(this)}/>
                </FormItem>
            </div>
        </div>
    }
    treeChange(value,node,extra){
        this.setState({
            ladw:node
        });
    }
    selectChange(field,value,node){
        this.setValue(value,field);
    }
    inputChange(e){
        let {value,name} = e.target;
        this.setValue(value,name);
    }
    setValue(data,field){
        this.setState({
            [field]:data
        });
    }
}

class FormItem extends Component{
    render(){
        let {children = '',label,cls = '',style = {}} = this.props;
        return <div className={`form-item ${cls}`} style={style}>
            {
                label ? <div className="form-label">{label}</div> : ''
            }
            <div className="form-component">{children}</div>
        </div>
    }
}

class DateBox extends Component{
    state = {
        selectData:[
            {
                value:'now_d',
                text:'今日'
            },
            {
                value:'d_7',
                text:'近一周'
            },
            {
                value:'m_1',
                text:'近一月'
            }
        ]
    };
    render(){
        let {values:selfValues = [],selectData:selfSelectData} = this.state || {};
        let {selectData = selfSelectData,value = selfValues} = this.props;
        return <div className="date-range-box">
            <RangePicker style={{
                width:300
            }} format="YYYY-MM-DD" value={value.map(item => item && moment(item))} onChange={this.change.bind(this)} placeholder={['开始时间','结束时间']}/>
            <ul className="date-range-list">
                {
                    selectData.map((item,i) => {
                        let {text} = item;
                        return <li key={i} onClick={this.changeRange.bind(this,item)}>{text}</li>
                    })
                }
            </ul>
        </div>
    }
    change(moments,values){
        this.setState({
            values
        });
        wt.execFunc(this.props.onChange,values,this.props.name);
    }
    changeRange(data){
        let v = data.value;
        let {0:type,1:num} = v.split('_');
        let values = [];
        let now = new Date();
        if(type === 'now'){
            switch(num){
                case 'd':
                    let time = now.toFormatString('YYYY-MM-DD');
                    values.push(time);
                    values.push(time);
                    break;
                case 'm':
                    values.push(now.toFormatString('YYYY-MM') + '-01');
                    values.push(now.diffMonths(1).diffDays(-1)).toFormatString('YYYY-MM-DD');
                    break;
                default:
                    break;
            }
        }else{
            let config = {
                y:'diffYears',
                m:'diffMonths',
                d:'diffDays'
            };
            let method = config[type] || 'diffDays';
            values.push(now[method](-num).toFormatString('YYYY-MM-DD'));
            values.push(now.toFormatString('YYYY-MM-DD'));
        }
        this.change(values.map(item => moment(item)),values);
    }
}


class TableView extends Component{
    render(){
        let {data = [],columns = []} = this.props;
        return <Table bordered={true} columns={columns} dataSource={data}/>
    }
}


class ImageView extends Component{
    render(){
        let {data = []} = this.props;
        return <ul className="img-view-list">
            {
                data.map((item,i) => {
                    let {imgSrc = 'img/1.jpg',OLDCASEID,CASENAME,PARENTCATEGORIES,CASETIME_SHOWVALUE,CREATEDATE_SHOWVALUE,VEHICLE,PERSON,VIDEO,RN} = item;
                    return <li key={i}>
                        <div className="img-box-auto">
                            <img src={imgSrc} />
                        </div>
                        <p>{OLDCASEID}</p>
                        <p>{CASENAME}</p>
                        <p>案件类别：{PARENTCATEGORIES}</p>
                        <p>发案时间：{CASETIME_SHOWVALUE}</p>
                        <p>录入时间：{CREATEDATE_SHOWVALUE}</p>
                        <p>图片({RN})，视频({VIDEO})，人({PERSON})，车({VEHICLE})</p>
                        <div className="btn-box">
                            <span className="hand-text mgr5">修改</span>
                            <span className="hand-text">删除</span>
                        </div>
                    </li>
                })
            }
        </ul>
    }
}