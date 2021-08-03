import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class Logout extends Component {
    constructor(){
        super()
        // token remove
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('exam');
        sessionStorage.removeItem('studentName')
    }

   
    render(){
        return <Redirect to="/" />
    }
}

export default Logout;