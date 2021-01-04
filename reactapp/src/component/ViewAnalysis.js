import React from 'react'
import "./analysis.css"
export default function ViewAnalysis(props) {
    return (
            <div className="row customtable">
                <div className="col-md-1" style={{textAlign:"left"}}>{props.index}</div>
                <div className="col-md-4" style={{overflow:"hidden",textAlign:"left"}}>{props.data[0]}</div>
                <div className="col-md-1" style={{textAlign:"left"}}>{props.data[1]}</div>
                <div className="col-md-2" style={{textAlign:"left"}}>{props.data[2]}</div>
                <div className="col-md-2" style={{textAlign:"left"}}>{props.data[3]}</div>
                <div className="col-md-1" style={{textAlign:"left"}}>{props.data[4]}</div>
                <div className="col-md-1" style={{textAlign:"left"}}>{props.data[5]}</div>
            </div>
    )
}
