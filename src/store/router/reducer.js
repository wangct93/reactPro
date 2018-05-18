/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import Home from '../../views/home';
import Platform from '../../views/platform';
let defaultState = {
    list:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/platform/:type?',
            component:Platform
        }
    ],
    headerNavData:[
        {
            path:'/home',
            text:'首页'
        },
        {
            path:'/platform',
            text:'我的平台',
            iconCls:'file'
        }
    ]
};

export let routerData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {

};
