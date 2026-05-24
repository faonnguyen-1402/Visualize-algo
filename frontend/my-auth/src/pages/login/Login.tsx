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
      console.log("Cấu trúc JSON server trả về:", JSON.stringify(result, null, 2));
      if (!res.ok) {
        toast.error(result.message || 'Login failed');
        return;
      }

      // lưu token
      localStorage.setItem('accessToken', result.access_token);
      const profileRes = await fetch('http://localhost:3001/users/profile', {
        headers: { Authorization: `Bearer ${result.access_token}` }
      });

      if (profileRes.ok) {
        const fullProfile = await profileRes.json();
        // 3. Lưu profile đầy đủ vào localStorage
        localStorage.setItem('user', JSON.stringify(fullProfile));
      } else {
        // Nếu không lấy được profile, dùng tạm dữ liệu từ Login
        localStorage.setItem('user', JSON.stringify(result.user));
      }    

      // localStorage.setItem('user', JSON.stringify(result.user));

      window.dispatchEvent(new Event('authChange'));

      // 🔥 toast success
      toast.success('Đăng nhập thành công');

      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error('Không kết nối được server');
    }
  };

  return (
    <div className="login-page">
      <div className="background">
        <img src="/bg3.jpg"/>
      </div>

      <div className="login-modal">
        <div className="modal-content">
          <button
            type='button'
            className='back-button'
            onClick={() => navigate('/home')}
          >
            ←
          </button>

          <h2 className="modal-title">Login</h2>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="login-form">
            <div className="input-group">
              <label>Email</label>
              <div className="input-with-icon">
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is obligate',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
              </div>
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-with-icon">
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'At least 8 characters' },
                  })}
                />
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <div className="options">
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

            <p className="register-link">
              Don't have an account?{' '}
              <span onClick={() => navigate('/register')}>Register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
