import React from 'react';
import {Redirect,Link} from 'react-router-dom';
import classes from './ThankYou.module.css'

function Thankyou() {
    if(!sessionStorage.getItem('auth') && !sessionStorage.getItem('exam')){
        return <Redirect to="/" />
    }else if(sessionStorage.getItem('auth') && !sessionStorage.getItem('exam')){
        return <Redirect to="/test" />
    }
    return (
        <div className="container">
            <div className={classes.Container_Box}>
                <div className="row"> 
                    <div className="col-md-5 m-auto"> 
                        <div className="card"> 
                            <div className="card-header p-3">
                                <div className="card-title text-center"> 
                                    <h3>Thank You</h3>
                                </div>
                            </div>
                            <div className="card-body">
                                <p className="card-text text-justify"><strong>{sessionStorage.getItem('studentName')}</strong>, you have successfully conpleted this <strong>{sessionStorage.getItem('exam')}</strong> examination. Please click th button to make sure to finish this exam</p>
                            </div>
                            <div className="card-footer text-center">
                                <Link className="btn btn-primary" to="/logout">Finished Exam</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thankyou;
