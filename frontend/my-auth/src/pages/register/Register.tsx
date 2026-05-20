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
    <div className="login-page">   {/* Dùng chung class với Login */}
      {/* Background */}
      <div className="background">
        <img
          src="/bg3.jpg"
          alt="Register background"
        />
      </div>

      {/* Register Modal */}
      <div className="login-modal">
        <div className="modal-content">
          <button className="close-btn" onClick={() => navigate('/')}>
            ×
          </button>

          <h2 className="modal-title">Sign Up</h2>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="login-form">
            <div className="input-group">
              <label>USERNAME</label>
              <div className="input-with-icon">
                <input
                  id='username'
                  type="text"
                  {...register('username', {
                    required: 'Username is required',
                    minLength: { value: 3, message: 'At least 3 characters' },
                  })}
                />
              </div>
              {errors.username && <span className="error">{errors.username.message}</span>}
            </div>

            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <div className="input-with-icon">
                <input
                  id='email'
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
              </div>
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <label>PASSWORD</label>
              <div className="input-with-icon">
                <input
                  id='password'
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'At least 8 characters' },
                  })}
                />
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <div className="input-group">
              <label>CONFIRM PASSWORD</label>
              <div className="input-with-icon">
                <input
                  id='confirmPassword'
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button type="submit" className="login-button">
              SUBMIT
            </button>

            <p className="register-link">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')}>Sign in</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
