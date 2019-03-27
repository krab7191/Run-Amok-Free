import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "../../components/Form/components/Typography";
import AppForm from "../../components/AppForm/AppForm";
import { email, required } from "../../components/Form/validation";
import RFTextField from "../../components/Form/RFTextField";
import FormButton from "../../components/Form/FormButton";
import FormFeedback from "../../components/Form/FormFeedback";

import { MyContext } from "../../components/MyContext/MyContext";

import API from "../../utils/API";

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "blue"
  },
  feedback: {
    marginTop: theme.spacing.unit * 2
  }
});

class SignUp extends React.Component {
  state = {
    sent: false,
    usernameValid: null
  };

  validate = values => {
    const { username } = values;
    if (username === undefined) {
      this.setState({ usernameValid: false });
    } else {
      this.validateUsernameUnique(username);
    }

    const errors = required(
      ["firstName", "lastName", "email", "username", "password"],
      values,
      this.props
    );

    if (!errors.email) {
      const emailError = email(values.email, values, this.props);
      if (emailError) {
        errors.email = email(values.email, values, this.props);
      }
    }

    return errors;
  };

  validateUsernameUnique = uname => {
    if (uname) {
      API.checkUsername(uname)
        .then(resp => {
          const { unique } = resp.data;
          if (unique) {
            this.setState({
              usernameValid: true
            });
          } else {
            this.setState({
              usernameValid: false
            });
          }
        })
        .catch(err => console.error(`Error checking username: `, err));
    }
  };

  render() {
    const { classes, email, token } = this.props;
    const { sent } = this.state;

    return (
      <MyContext.Consumer>
        {context => {
          return (
            <React.Fragment>
              <AppForm>
                <React.Fragment>
                  <Typography
                    variant="h3"
                    gutterBottom
                    marked="center"
                    align="center"
                  >
                    Sign Up
                  </Typography>
                  <Typography variant="body2" align="center">
                    <Link href="/sign-in" underline="always">
                      Already have an account?
                    </Link>
                  </Typography>
                </React.Fragment>
                <Form
                  onSubmit={context.handleRegisterSubmit}
                  subscription={{ submitting: true }}
                  validate={this.validate}
                >
                  {({ handleSubmit, submitting }) => (
                    <form
                      onSubmit={handleSubmit}
                      className={classes.form}
                      noValidate
                    >
                      <Grid container spacing={16}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            autoFocus
                            component={RFTextField}
                            autoComplete="fname"
                            fullWidth
                            label="First name"
                            name="firstName"
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            component={RFTextField}
                            autoComplete="lname"
                            fullWidth
                            label="Last name"
                            name="lastName"
                            required
                          />
                        </Grid>
                      </Grid>
                      <Field
                        autoComplete="email"
                        component={RFTextField}
                        disabled={submitting || sent}
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        required
                      />
                      <Field
                        autoComplete="username"
                        component={RFTextField}
                        disabled={submitting || sent}
                        fullWidth
                        label="Username"
                        margin="normal"
                        name="username"
                        type="username"
                        unamevalid={this.state.usernameValid}
                        required
                      />
                      <Field
                        fullWidth
                        component={RFTextField}
                        disabled={submitting || sent}
                        required
                        name="password"
                        autoComplete="current-password"
                        label="Password"
                        type="password"
                        margin="normal"
                      />
                      <FormSpy subscription={{ submitError: true }}>
                        {({ submitError }) =>
                          submitError ? (
                            <FormFeedback className={classes.feedback} error>
                              {submitError}
                            </FormFeedback>
                          ) : null
                        }
                      </FormSpy>
                      <FormButton
                        className={classes.button}
                        disabled={submitting || sent}
                        color="secondary"
                        fullWidth
                      >
                        {submitting || sent ? "In progress…" : "Sign Up"}
                      </FormButton>
                    </form>
                  )}
                </Form>
              </AppForm>
            </React.Fragment>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
