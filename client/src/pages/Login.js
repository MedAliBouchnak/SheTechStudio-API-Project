import React, { useEffect } from 'react'
import {Button, Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {login } from "../redux/slices/userSlices"


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {errors : error, isAuth} = useSelector(state => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = data => {
    console.log(data);
  dispatch(login(data))
  }
  console.log(errors);

  useEffect(() => {
    if (isAuth) navigate('/')
      },[isAuth])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" 
        {...register("email", {required: true, pattern:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}
      />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
      <p className="errors">{errors.email && "Email is unvalid"}</p>
      <p className="errors">{error && error.msg}</p>

    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password"
      {...register("password", {required: true, minLength: 8})}
      />
    <p className="errors">{errors.password && "Please enter at least 6 characters"}</p>
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default Login