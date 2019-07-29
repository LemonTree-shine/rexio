import React, { createContext } from "react"; 

var ContextTheme = createContext();

class Provider extends React.Component{
    render(){
        var {defaultValue} = this.state;
        return <ContextTheme.Provider value={{
            ...defaultValue,
            $dispatch:this.$dispatch
        }}>
            {this.props.children}
        </ContextTheme.Provider>
    }

    constructor(props){
        super(props);
        this.state = {
            defaultValue:this.props.value || {},  //默认数据
        }
    }

    //修改顶层数据
    $dispatch = (data)=>{
        var {defaultValue} = this.state;
        this.setState({
            defaultValue:{...defaultValue,...data}
        });
    }
}

/**
 * @param dataMap:所要接收的数据
 * @param deDispath：不需要需要传递dispath
 */
var connect = (dataMap,deDispath)=>{
    return (Wrap)=>{
        return class extends React.Component{
            render(){
                return <ContextTheme.Consumer>
                    {(context)=>{
                        var propsContext = {};
                        if(dataMap&&dataMap.length){
                            dataMap.forEach((key)=>{
                                propsContext[key] = context[key];
                            });
                            propsContext.$dispatch = context.$dispatch;
                        }else{
                            propsContext = context;
                        }
                        if(deDispath){
                            delete propsContext.$dispatch
                        }

                        return <Wrap $rexioCommonData = {propsContext}/>
                    }}
                </ContextTheme.Consumer>
            }
        }
        
    }
}



module.exports = {
    ContextTheme,
    Provider,
    connect
};