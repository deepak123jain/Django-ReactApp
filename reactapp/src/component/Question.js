import React from 'react'
import Options from './Options';

export default function Question(props) {

    function callOptions(arrayData,qid){
        return arrayData.map((data, index) => <Options data={data} index={index} id={qid}/>)
      }
    return (
        <div style={{fontFamily:"Arial, Helvetica, sans-serif"}}>
            <span className="mr-1" style={{fontWeight:"bold"}}>Question{props.index+1}
            :&nbsp;&nbsp;&nbsp;
            {props.data[1]}</span>
            {/* {props.data[0]} */}
            {callOptions(props.data[2], props.data[0])}
        </div>
    )
}
