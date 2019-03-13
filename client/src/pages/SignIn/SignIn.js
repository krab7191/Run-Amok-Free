import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../../components/Form/components/Typography';
import AppForm from '../../components/AppForm/AppForm';
import { email, required } from '../../components/Form/validation';
import RFTextField from '../../components/Form/RFTextField';
import FormButton from '../../components/Form/FormButton';
import FormFeedback from '../../components/Form/FormFeedback';

import { MyContext } from '../../components/MyContext/MyContext';

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "blue",
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SignIn extends React.Component {
  state = {
    sent: false,
  };

  validate = values => {
    const errors = required(['email', 'password'], values, this.props);

    if (!errors.email) {
      const emailError = email(values.email, values, this.props);
      if (emailError) {
        errors.email = email(values.email, values, this.props);
      }
    }

    return errors;
  };

  render() {
  
    const { classes } = this.props;
    const { sent } = this.state;

    return (
      <MyContext.Consumer>
        {context => {
          console.log(context);

          return (
            <React.Fragment>
              <AppForm>
                <React.Fragment>
                  <Typography variant="h3" gutterBottom marked="center" align="center">
                    Sign In
                  </Typography>
                  <Typography variant="body2" align="center">
                    {'Not a member yet? '}
                    <Link href="/sign-up" align="center" underline="always">
                      Sign Up here
                    </Link>
                  </Typography>
                </React.Fragment>
                <Form
                  onSubmit={context.handleSubmit}
                  subscription={{ submitting: true }}
                  validate={this.validate}
                >
                  {({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className={classes.form} noValidate>
                      <Field
                        autoComplete="email"
                        autoFocus
                        component={RFTextField}
                        disabled={submitting || sent}
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        required
                        size="large"
                      />
                      <Field
                        fullWidth
                        size="large"
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
                        size="large"
                        fullWidth
                      >
                        {submitting || sent ? 'In progress…' : 'Sign In'}
                      </FormButton>
                    </form>
                  )}
                </Form>
                <Typography align="center">
                  <Link underline="always" href="/premium-themes/onepirate/forgot-password">
                    Forgot password?
                  </Link>
                </Typography>
              </AppForm>
            </React.Fragment>
          );
        }}
      </MyContext.Consumer>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);