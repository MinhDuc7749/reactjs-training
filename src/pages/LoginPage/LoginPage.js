import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import './LoginPage.css';
import LanguageContext from '../../shared/contexts/LanguageContext/LanguageContext';
import {useHistory} from "react-router-dom";
import axios from 'axios';

const initialValues = { email: '', password: '', rememberMe: true };

const validateForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  if (values.password.length < 8) {
    errors.password = 'Need at least 8 characters';
  }
  return errors;
}


const TEXTS = {
  LOGIN: {
    en: 'Login',
    vi: 'Đăng nhập'
  },
  PASSWORD: {
    en: 'Password',
    vi: 'Mật khẩu'
  }
}

const getText = (language, TEXT_CODE) => {
  return TEXTS[TEXT_CODE][language]
};


const LoginPage = ({ setToken, setUserId}) => {
  const history = useHistory();
  const language = useContext(LanguageContext);
  const submit = (values, { setSubmitting }) => {
    console.log('values = ', values);
    axios({
      method: 'GET',
      url: 'https://60dff0ba6b689e001788c858.mockapi.io/token',
      data: values
    }).then (response => {
      setSubmitting(false);
      setToken(response.data.token);
      setUserId(response.data.userId);
      axios.defaults.headers.common['Authorization'] = response.data.token;
    });
    history.push("/");
  };
  return (
    <div className="LoginPage">
      <h3 className="page-title">{ getText(language, "LOGIN") }</h3>
      <div className="d-flex justify-content-center">
        <Formik
          initialValues={ initialValues }
          validate={ validateForm }
          onSubmit={ submit }
        >
          {
            ({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form className="loginpage-form" onSubmit={ handleSubmit }>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={ values.email }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    isInvalid={ touched.email && errors.email }
                    name="email"
                  />
                  <Form.Control.Feedback type="invalid">
                    { errors.email }
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{ getText(language, "PASSWORD") }</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    isInvalid={ touched.password && errors.password }
                    value = { values.password }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    name="password"
                  />
                  <Form.Control.Feedback type="invalid">
                    { errors.password }
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={ values.rememberMe }
                    onChange={ handleChange }
                    onBlur={ handleBlur }
                    name="rememberMe"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={ isSubmitting }
                >
                  Submit
                </Button>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
};

export default LoginPage;
