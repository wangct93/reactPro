/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import Cly from '@/views/platform/lib/cly';
import Shy from '@/views/platform/lib/shy';
import Ypy from '@/views/platform/lib/ypy';
import Asjlb from '@/views/platform/lib/asjlb';

import CaseData from '@/json/caseData.json';


let defaultState = {
    navList:[
        {
            name:'案事件库',
            children:[
                {
                    iconCls:'icon-shu1',
                    name:'我的案事件',
                    path:'/wdasj'
                },
                {
                    iconCls:'icon-shu1',
                    name:'案事件列表',
                    path:'/asjlb'
                },
                {
                    iconCls:'icon-shu1',
                    name:'新建案事件',
                    path:'/xjasj'
                },
                {
                    iconCls:'icon-shu1',
                    name:'案事件回收站',
                    path:'/wdhsz'
                }
            ]
        },
        {
            name:'串并案库',
            children:[
                {
                    iconCls:'icon-shu1',
                    name:'我的串并案',
                    path:'/wdcba'
                },
                {
                    iconCls:'icon-shu1',
                    name:'串并案列表',
                    path:'/cbalb'
                },
                {
                    iconCls:'icon-shu1',
                    name:'其他技术串并案',
                    path:'/qtjscba'
                }
            ]
        }
    ],
    routerData:[
        {
            path:'/cly',
            component:Cly
        },
        {
            path:'/shy',
            component:Shy
        },
        {
            path:'/ypy',
            component:Ypy
        },
        {
            path:'/asjlb',
            component:Asjlb
        }
    ],
    userTypeList:[
        {
            path:'/cly',
            iconCls:'icon-cly',
            text:'采录员'
        },
        {
            path:'/shy',
            iconCls:'icon-shy',
            text:'审核员'
        },
        {
            path:'/ypy',
            iconCls:'icon-ypy',
            text:'研判员'
        }
    ]
};

export let platformData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    loadClyData(state,action){
        let clyState = wt.getValue(state,'cly',{});
        clyState.loading = true;
        setTimeout(() => {
            let params = wt.getValue(clyState,'params',{});
            wt.extend(params,action.params);
            let {start,limit,ladw,caseType,caseId,lasj} = params;
            let rows = CaseData.rows.filter(item => {
                let {CATEGORIES,CREATEDEPTNAME,OLDCASEID,CREATEDATE_SHOWVALUE} = item;
                if((ladw && ladw.indexOf(CREATEDEPTNAME) === -1)){
                    return false;
                }
                if(caseType && CATEGORIES !== caseType){
                    return false;
                }
                if(caseId && OLDCASEID !== caseId){
                    return false;
                }
                if(lasj){
                    let itemTime = +new Date(CREATEDATE_SHOWVALUE);
                    if(lasj[0]){
                        let startTime = +new Date(lasj[0]);
                        if(itemTime < startTime){
                            return false;
                        }
                    }
                    if(lasj[1]){
                        let endTime = +new Date(lasj[1]);
                        if(itemTime > endTime){
                            return false;
                        }
                    }
                }
                return true;
            });
            dispatch({
                type:'loadClyDataEnd',
                data:{
                    total:rows.length,
                    rows:rows.slice(start,start + limit)
                }
            });
        },1000);
    },
    loadClyDataEnd(state,action){
        let {data} = action;
        let clyState = wt.getValue(state,'cly',{});
        wt.extend(clyState,{
            data:data.rows,
            total:data.total
        });
        clyState.loading = false;
    },
    clearClyParams(state,action){
        let clyState = wt.getValue(state,'cly',{});
        delete clyState.params;
    }
};
