import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';

const Form = (props) => (
    <form onSubmit={props.handleSubmit}>
        <InputField 
            type        = 'text'
            name        = "passcode"
            placeholder = "passcode"
            label       = "Passcode"
            value       = {props.value}
            error       = {props.error}
            onChange    = {props.handleChange}
            onKeyPress  = {props.handleKeyPress}
        />
        <button className="form-control btn btn-primary ">continue</button>
    </form>
);

Form.propTypes = {
    value          : PropTypes.string.isRequired,
    handleChange   : PropTypes.func.isRequired,
    handleSubmit   : PropTypes.func.isRequired,
    handleKeyPress : PropTypes.func.isRequired,
    error          : PropTypes.string.isRequired
}

export default Form;