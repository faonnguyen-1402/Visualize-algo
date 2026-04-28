import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { toast } from 'react-toastify';
type FormLogin = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const password = watch('password');

  const handleSubmitForm: SubmitHandler<FormLogin> = async (data) => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || 'Login failed');
        return;
      }

      // lưu token
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user));

      // 🔥 toast success
      toast.success('Đăng nhập thành công');

      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Không kết nối được server');
    }
  };

  return (
    <div>
      <div className='container-register'>
        <form
          className='register-form'
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <button
            type='button'
            className='back-button'
            onClick={() => navigate('/register')}
          >
            ←
          </button>

          <h1>Sign in</h1>

          <div className='input-group'>
            <label htmlFor='email'>email:</label>
            <input
              id='email'
              type='email'
              {...register('email', {
                required: 'Email is obligate',
                pattern: {
                  value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.com$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <span className='errors'>{errors.email.message}</span>
            )}
          </div>

          <div className='input-group'>
            <label htmlFor='password'>password:</label>
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

          <span className='text-warining'>Forget password?</span>

          <button type='submit' className='submit-button'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
