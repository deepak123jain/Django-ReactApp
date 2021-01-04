import React from 'react'

export default function tableheader() {
    return (
        <div className="row" style={{backgroundColor:"black",color:"white",fontWeight:"bolder"}}>
            <div className="col-md-1" style={{textAlign:"left"}}>S.No</div>
            <div className="col-md-4" style={{overflow:"hidden",textAlign:"left"}}>Question </div>
            <div className="col-md-1" style={{textAlign:"left"}}>Complexity</div>
            <div className="col-md-2" style={{textAlign:"left"}}>Answer Given</div>
            <div className="col-md-2" style={{textAlign:"left"}}>Correct Answer</div>
            <div className="col-md-1" style={{textAlign:"left"}}>Status</div>
            <div className="col-md-1" style={{textAlign:"left"}}>Score</div>
        </div>
    )
}
