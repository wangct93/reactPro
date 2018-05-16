/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import Home from '../../views/home';
let defaultState = {
    list:[
        {
            path:'/home',
            component:Home,
            text:'首页',
            iconCls:'user'
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
