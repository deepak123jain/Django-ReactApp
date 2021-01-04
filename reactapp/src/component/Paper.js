import React, { useState } from 'react'
import Question from './Question';
import axios from 'axios';
import './paper.css';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import ViewAnalysis from './ViewAnalysis';
import TableHead from './tableheader';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"


export default function Paper(props) {
    const [formData, setformData] = useState({});
    const [success, setsuccess] = useState(false);
    const [score, setScore] = useState(-1);
    const [quesresponse, setResponse] = useState({});
    const [checkResponse, setViewResponse] = useState(false);
    const [lastScore, setLastScore] = useState("");
    const history = useHistory();   
    function handleClick(){
        history.push('/');
    }
    function generateResponse(){
        return quesresponse.map((data, index) => <ViewAnalysis data={data} index={index+1}/>)
    }
    function checkResponses(){
        if(checkResponse==true)
            setViewResponse(false)
        else
            setViewResponse(true)
            let element = document.getElementById("tablediv")
            element.scrollIntoView();
            element.scrollTop += 100;

    }
    function generateTableHeader(){
        return <TableHead></TableHead>
    }   
    function changeData(e){
        let qid = e.target.name
        let value = e.target.value
        let cur_data = formData
        cur_data[parseInt(qid)] = value
        setformData(cur_data)
    }
    function callComponents(){
        return props.data.result.map((data, index) => <Question data={data} index={index}/>)
      }
      function submitTest(e){
        e.preventDefault()
        const cookies = new Cookies();
        let data ={"data":formData, "userid":cookies.get('userid')}
        const URL='/testSubmit'
        axios.post(URL,data).then(response=>{
            if(response.data.status=="OK"){
                // console.log(response.data.score)
                setsuccess(true)
                setScore(response.data.score)
                setResponse(response.data.metric)
                setLastScore(response.data.lastScore)
            }
        });

    }

    if(success==false){
        return (
            <div> 
                <form onSubmit={submitTest} onChange={changeData}>
                    {callComponents()}
                <button type="submit" className="btn btn-dark m-3">Submit Test</button>    
                </form>
            </div>
        )
    }
    else if(success==true){
        const cookies = new Cookies();
        let Username = cookies.get('username')
        return(
            <div>
                <div className="row">
                    <div className="col-md-6"  style={{textAlign:"center"}}>
                        <img src="https://cdn.mos.cms.futurecdn.net/e995c162626378ca48a4238390ac9916.gif"></img>
                    </div>
                    <div className="col-md-6">
                        <h1 id="resultbar">Hi {Username},<br /> Your Current Score is: {score}</h1>
                        <h3><code>Out of 100</code></h3>
                        <div style={{textAlign:"center"}}>
                        <button className="btn btn-success" onClick={checkResponses}>View Analysis</button>
                            <button className="btn btn-danger" onClick={handleClick}>Logout</button>
                        </div>
                        <h3><em>Last Assesment Score was: </em><code>{lastScore}</code></h3>
                    </div>
                </div>
                
                
                
                <div className="p-2" style={{backgroundColor:"brown",color:"white"}}  id="tablediv">
                        {(checkResponse)?generateTableHeader():""}
                        {(checkResponse)?generateResponse():""}
                </div>
            </div>    
        )

    }
}

