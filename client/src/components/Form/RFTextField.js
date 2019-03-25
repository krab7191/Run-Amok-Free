import React from "react";
import PropTypes from "prop-types";
import TextField from "./components/TextField";

const RFTextField = props => {
  const {
    autoComplete,
    input,
    InputProps,
    meta: { touched, error, valid, submitError },
    unamevalid,
    ...other
  } = props;

  return (
    <TextField
      error={Boolean(touched && (error || submitError))}
      valid={unamevalid === undefined ? Boolean(valid) : unamevalid}
      {...input}
      {...other}
      InputProps={{
        inputProps: {
          autoComplete
        },
        ...InputProps
      }}
      helperText={touched ? error || submitError : ""}
    />
  );
};

RFTextField.propTypes = {
  autoComplete: PropTypes.string,
  input: PropTypes.object.isRequired,
  InputProps: PropTypes.object,
  meta: PropTypes.shape({
    error: PropTypes.string,
    valid: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired
  }).isRequired
};

export default RFTextField;
