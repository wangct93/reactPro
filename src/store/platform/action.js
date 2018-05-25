/**
 * Created by Administrator on 2018/3/7.
 */




export let loadData = (type,params) => {
    type = 'load' + type.replace(/^[\w\W]{1}/,match => match.toUpperCase()) + 'Data';
    return {
        type,
        params
    }
};

export const clearClyParams = () => {
    return {
        type:'clearClyParams'
    }
};