import React,{useState} from 'react'
import './login.css'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"

export default function Login() {
    const history = useHistory();

    function handleClick(){
        history.push('/fetchpapermodule');
    }
    function ajaxLogin(e){
        e.preventDefault()
        let email = document.getElementById("username").value
        let password = document.getElementById("password").value
        let data = {"email":email, "password": password}
        const URL='/userlogin'
        axios.post(URL,data).then(response=>{
            if(response.data.status==0){
                alert("No Such User Exists")
            }
            else if(response.data.status==1){
                alert("Invalid Credentials")
            }
            else{
                const cookies = new Cookies();
                cookies.set('userid', response.data.userid, { path: '/' });
                cookies.set('username', response.data.username, { path: '/' });
                handleClick()
            }
        });
    }

    
    return (
            <div>
               
                <div className="container-fluid" style={{backgroundColor:"aliceblue"}}>
                    <div className="row" style={{margin:3+"rem"}}>
                        <div className="col-lg-8" style={{textAlign: "left"}}>         
                            <img src="https://mitrefinch.com/wp-content/uploads/2016/08/Employee-Management-Software-for-Small-Business.jpg" width="100%"/>
                        </div>
                    <div className="col-lg-4" style={{border:"2px black solid", padding: "5%"}}>  
                        <form onSubmit={ajaxLogin}>
                            <h1 style={{color:"blue", textAlign: "center"}}><strong>USER LOGIN</strong></h1>
                            <div className="form-group">
                                <input type="email" className="form-control form-field"  id='username' name="username" placeholder="Username" autocomplete="off" required="required" />     
                            </div>
                            <br />
                            <div className="form-group">
                                <input type="password" className="form-control form-field"  id="password" name="password" placeholder="Password" required="required"  /> 
                            </div>
                            <div style={{textAlign: "center"}}>
                                <button className="btn btn-success submit-btn mr-2" type="submit">Login</button>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
        )
}
