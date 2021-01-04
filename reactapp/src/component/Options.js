import React from 'react'
import './options.css'

export default function Options(props) {
    if(props.index==0){
        return (<div  className="col-md-6 options"><div className="badge badge-success">
            <input type="radio" id={props.id+props.index.toString()} name={props.id} value={props.data}></input>
            <label for={props.id+props.index.toString()}>{props.data}</label></div></div>)
    }
    else if(props.index==1){
        return (<div className="col-md-6 options"><div className="badge badge-info">
            <input type="radio" id={props.id+props.index.toString()} name={props.id} value={props.data}></input>
            <label for={props.id+props.index.toString()}>{props.data}</label></div><br /></div>)
    }
    else if(props.index==2){
        return (<div  className="col-md-6 options"><div className="badge badge-warning">
            <input type="radio"   id={props.id+props.index.toString()} name={props.id} value={props.data}></input>
            <label for={props.id+props.index.toString()}>{props.data}</label></div></div>)
    }
    else if(props.index==3){
        return (<div className="col-md-6 options"><div className="badge badge-danger">
            <input type="radio" id={props.id+props.index.toString()} name={props.id} value={props.data}></input>
            <label for={props.id+props.index.toString()}>{props.data}</label></div><br /></div>)
    }
    else{
        return (<div  className="col-md-6 options"><div className="badge badge-secondary">
            <input type="radio" id={props.id+props.index.toString()} name={props.id} value={props.data}></input>
            <label for={props.id+props.index.toString()}>{props.data}</label></div><br /></div>)
    }
    
}

