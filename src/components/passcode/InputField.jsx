import React from 'react';
import PropTypes from 'prop-types';

const InputField = (props) => (
    <div className="form-group">
        <label>{props.label}</label>
        <input 
            className   = {props.error ? "form-control is-invalid" :  "form-control"}
            type        = {props.type}  
            name        =  {props.name}
            placeholder = {props.placeholder}
            value       = {props.value} 
            onChange     = {props.onChange}
            onKeyPress   = {props.onKeyPress}
        />
        {props.error && <span className="invalid-feedback">{props.error}</span>}
    </div>  
);

InputField.propTypes = {
    label       : PropTypes.string.isRequired,
    type        : PropTypes.string.isRequired,
    name        : PropTypes.string.isRequired,
    placeholder : PropTypes.string.isRequired,
    value       : PropTypes.string.isRequired,
    onChange    : PropTypes.func.isRequired,
    onKeyPress  : PropTypes.func.isRequired,
    errors      : PropTypes.string,
}
InputField.defaultProps = {
    label : '',
    placeholder : '',
    type : 'text'
}

export default InputField;