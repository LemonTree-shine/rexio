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

var connect = (Wrap)=>{
    return class extends React.Component{
        render(){
            return <ContextTheme.Consumer>
                {(context)=>{
                    return <Wrap {...context}/>
                }}
            </ContextTheme.Consumer>
        }
    }
    
}

module.exports = {
    ContextTheme,
    Provider,
    connect
};