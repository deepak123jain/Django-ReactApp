import React from 'react'

export default function errorMessage() {
    return (
         <div style={{textAlign: "center"}} id="invalidtext">
             <span className="text-danger">
                <strong>Invalid Username/Password</strong> </span>
        </div>   
    )
}
