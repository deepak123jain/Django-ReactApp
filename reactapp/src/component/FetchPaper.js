import React,{useState} from 'react'
import axios from 'axios'
import Paper from './Paper';
import Cookies from 'universal-cookie';
export default function FetchPaper() {
    const [pageType, setPage] = useState("askCourse");
    const [pagedata, setPageData] =useState("");
    
    function selectSubject(subject){
        const sub_URL = "/fetchpaper"
        let data = {"subject":subject}
        axios.post(sub_URL,data).then(response=>{
            if(response.data.status==1){
                setPageData(response.data)
                setPage("viewPaper")
                // console.log(response.data)
            }
            else
                alert("Some error occured!")
        });
    }

    if(pageType=="askCourse"){
        const cookies = new Cookies();
        let Username = cookies.get('username')
        return(
            <div className="selectcourse">
                <span className="mr-2">Hi <span style={{color:"red",fontWeight:"bolder"}}>{Username}</span>, Please choose a Subject</span>
                <br/>
                <strong><a href="#" className="badge badge-primary p-2 mr-2" onClick={()=>selectSubject("C")}>C</a></strong>
                <strong><a href="#" className="badge badge-secondary p-2 mr-2" onClick={()=>selectSubject("C++")}>C++</a></strong>
                <strong><a href="#" className="badge badge-success p-2 mr-2" onClick={()=>selectSubject("Java")}>Java</a></strong>
            </div>
        )
    }
    else if(pageType=="viewPaper"){
        return(
            <div style={{textAlign:"left"}} className="p-3"> 
                 <Paper data={pagedata}></Paper>
            </div>
        )
    }
}
