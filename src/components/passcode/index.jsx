import React, { Component } from 'react';
import axios from 'axios';
import Form from './Form';
import {Redirect} from 'react-router-dom';
import classes from './Passcode.module.css';
import Logo from '../img/magnox-logo.png';
import Alert from './Alert';

class Passcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passcode : '',
            error   : '', 
            isAlert : false,
            errorAlert : '',
        }
    }

    handleChange = (event) =>{
        this.setState({passcode : event.target.value});
    }
    handleSubmit = async (event) =>{
        event.preventDefault();
        const error = this.validate();
        if(!error){
            let passcode = this.state.passcode;
            await axios.post('https://www.apitest45.techmagnox.com/auth_api/',{passcode}).then((res) => {
                sessionStorage.setItem('auth', JSON.stringify(res.data));
                this.setState({isAlert : false});
            }).catch((error) => {
                if(error.response.status === 401){
                    this.setState({isAlert : true, errorAlert: 'This passcode is already used'});
                }else if(error.response.status === 403){
                    this.setState({isAlert : true, errorAlert: 'This passcode is wrong'});
                }
            });
            event.target.reset();
            this.setState({passcode : '', error:''});
            window.location.reload();
        }else{
            this.setState({error});
        }
    }

    handleKeyPress = (event) =>{
        if(event.target.value){
            this.setState({error : ''});
        }else{
            this.setState({error : "Please enter your exam passcode"});
        }
    }

    validate = () => {
        let error = '';
        const passcode = this.state.passcode;
        if(!passcode){
            error = "Please enter your exam passcode";
        }
        return error;
    }

    cancelAlert = () => {
        this.setState({isAlert : false});
    }

    componentWillUnmount() {
        console.log('First Unmount');
    }

    render() {
        if(sessionStorage.getItem('auth')){
            return <Redirect to="/details" />
        }
        return (
            <div className="container">
                <div className={classes.Container_Box}>
                    <div className="row"> 
                        <div className="col-md-5 m-auto"> 
                            {this.state.isAlert && <Alert errorAlert={this.state.errorAlert} cancelAlert={this.cancelAlert}/>}
                            <div className="card p-3"> 
                                <div className="card-title text-center"> 
                                    <img src={Logo} className="image-fluid" alt="" width="50%"/>
                                </div>
                                <div className="card-body"> 
                                    <Form 
                                        value = {this.state.passcode}
                                        error = {this.state.error}
                                        handleChange = {this.handleChange}
                                        handleSubmit = {this.handleSubmit}
                                        handleKeyPress = {this.handleKeyPress}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Passcode;
