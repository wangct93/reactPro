/**
 * Created by Administrator on 2018/5/18.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Form,Select} from 'antd';

const FormItem = Form.Item;
const {Option} = Select;

const selectData = [
    {
        value:'1',
        text:'wangct'
    },
    {
        value:'2',
        text:'chuitong'
    }
];

export default class View extends Component{
    render(){
        return <div>
            <FormView/>
        </div>
    }
}

const FormView = Form.create()(props => {
    let {getFieldDecorator} = props.form;
    return <Form>
        <FormItem label="立案单位" layout="vertical">
            <Select>
                {
                    selectData.map((item,i) => {
                        let {text} = item;
                        return <Option key={i}>{text}</Option>
                    })
                }
            </Select>
        </FormItem>
    </Form>
})

