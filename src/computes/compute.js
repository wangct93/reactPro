/**
 * Created by Administrator on 2018/5/14.
 */

const wt = require('@util');
export const formatAreaData = (data,parentKey = '0') => {
    if(!wt.isArray(data)){
        data = [data];
    }
    data.forEach((item,i) => {
        let {children = [],text} = item;
        let value = parentKey + '_' + i;
        wt.extend(item,{
            label:text,
            value,
            key:i
        });
        formatAreaData(children,value);
    });
    return data;
};