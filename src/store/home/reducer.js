/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import {Url} from './config';
let defaultState = {
    menuList:[
        {
            iconCls:'menu-ajgl',
            text:'案件管理',
            path:'/ajgl'
        },
        {
            iconCls:'menu-cbgl',
            text:'串并管理',
            path:'/cbgl'
        },
        {
            iconCls:'menu-ajxc',
            text:'案件协查',
            path:'/ajxc'
        },
        {
            iconCls:'menu-shgl',
            text:'审核管理',
            path:'/shgl'
        },
        {
            iconCls:'menu-jxkh',
            text:'绩效考核',
            path:'/jxkh'
        },
        {
            iconCls:'menu-rxbz',
            text:'人像比中',
            path:'/rxbz'
        },
        {
            iconCls:'menu-mbxyrk',
            text:'目标嫌疑库',
            path:'/mbxyk'
        },
        {
            iconCls:'menu-wdsc',
            text:'我的收藏',
            path:'/wdsc'
        }
    ]
};

export let homeData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    loadHomeData(state,action){
        state.loadingData = true;
        let props = [];
        wt.forEach(Url,(value,name) => {
            let promise = new Promise((cb,eb) => {
                $.ajax({
                    url:value,
                    success:cb,
                    error:eb
                });
            });
            props.push({
                type:name,
                promise
            });
        });
        Promise.all(props.map(item => item.promise)).then(result => {
            let data = {};
            result.forEach((item,i) => {
                data[props[i].type + 'Data'] = item;
            });
            dispatch({
                type:'loadHomeDataEnd',
                data:data
            });
        },e => {
            dispatch({
                type:'loadHomeDataEnd',
                data:{}
            });
        });
    },
    loadHomeDataEnd(state,action){
        state.loadingData = false;
        wt.extend(state,action.data);
    }
};

