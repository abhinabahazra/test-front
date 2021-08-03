import React from 'react';

const Alert = (props) => (
    <div className="alert alert-danger">
        <div className="d-flex justify-content-around align-items-baseline">
            <strong>{props.errorAlert}</strong>
            <button className="btn" onClick={props.cancelAlert}>x</button>
        </div>
    </div>
)

export default Alert;