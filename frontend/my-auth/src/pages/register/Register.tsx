import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './register.css';
import axios from 'axios';
import { toast } from 'react-toastify';

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const handleSubmitForm: SubmitHandler<FormValues> = async (data) => {
    try {
      await axios.post('http://localhost:3001/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      sessionStorage.setItem(
        'register_form',
        JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      );

      toast.success('OTP has been sent to your email');

      navigate('/verify-otp');
    } catch (error: any) {
      console.error('send otp error:', error);
      toast.error(error?.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className='container-register'>
      <form className='register-form' onSubmit={handleSubmit(handleSubmitForm)}>
        <h1>Sign up</h1>

        <div className='input-group'>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'At least 3 characters',
              },
            })}
          />
          {errors.username && (
            <span className='errors'>{errors.username.message}</span>
          )}
        </div>

        <div className='input-group'>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <span className='errors'>{errors.email.message}</span>
          )}
        </div>

        <div className='input-group'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'At least 8 characters',
              },
            })}
          />
          {errors.password && (
            <span className='errors'>{errors.password.message}</span>
          )}
        </div>

        <div className='input-group'>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input
            id='confirmPassword'
            type='password'
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <span className='errors'>{errors.confirmPassword.message}</span>
          )}
        </div>

        <span
          className='text-warining'
          onClick={() => navigate('/login')}
          style={{ cursor: 'pointer' }}
        >
          Already have an account? Sign in now
        </span>

        <button type='submit' className='submit-button'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
