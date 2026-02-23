import React from "react";
import "./ErrorrMessage.css"

function ErrorMessage({message}){
    if(!message) return null;

    return (
        <div className="error-container">
            <div className="error-text">{message}</div>
        </div>
    )
}

export default ErrorMessage;