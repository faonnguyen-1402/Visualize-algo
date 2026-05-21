import React, { useMemo, useState } from 'react';
import axios from 'axios';
import './verifyOtp.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type OtpFormValues = {
  otp: string;
};

function VerifyOtp() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [sendingLink, setSendingLink] = useState(false);

  const registerData = useMemo(() => {
    const raw = sessionStorage.getItem('register_form');
    return raw ? JSON.parse(raw) : null;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
  });

  const handleVerifyOtp: SubmitHandler<OtpFormValues> = async (data) => {
    try {
      if (!registerData?.email) {
        toast.error('Email not found for verification');
        navigate('/register');
        return;
      }

      setLoading(true);

      await axios.post('http://localhost:3001/email/verify-otp', {
        email: registerData.email,
        otp: data.otp,
      });

      toast.success('OTP verified successfully');
      sessionStorage.removeItem('register_form');
      navigate('/login');
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 'Invalid OTP or OTP has expired',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (!registerData?.email) {
        toast.error('Email not found');
        navigate('/register');
        return;
      }

      setResending(true);

      await axios.post('http://localhost:3001/email/resend-otp', {
        email: registerData.email,
      });

      toast.success('OTP has been resent');
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  const handleSendVerifyLink = async () => {
    try {
      if (!registerData?.email) {
        toast.error('Email not found');
        navigate('/register');
        return;
      }

      setSendingLink(true);

      await axios.post('http://localhost:3001/email/send-link', {
        email: registerData.email,
      });

      toast.success('Verification link has been sent to your email');
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 'Failed to send verification link',
      );
    } finally {
      setSendingLink(false);
    }
  };

  if (!registerData?.email) {
    return (
      <div className='login-page'>
        <div className='background'>
          <img src='/bg3.jpg' alt='background' />
        </div>

        <div className='login-modal'>
          <div className='modal-content'>
            <button
              type='button'
              className='back-button'
              onClick={() => navigate('/register')}
            >
              ←
            </button>

            <h2 className='modal-title'>Verify OTP</h2>

            <p className='verify-desc'>Không có dữ liệu đăng ký.</p>

            <button
              type='button'
              className='login-button'
              onClick={() => navigate('/register')}
            >
              Quay lại Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='login-page'>
      <div className='background'>
        <img src='/bg3.jpg' alt='background' />
      </div>

      <div className='login-modal'>
        <div className='modal-content'>
          <button
            type='button'
            className='back-button'
            onClick={() => navigate('/register')}
          >
            ←
          </button>

          <h2 className='modal-title'>Verify OTP</h2>

          <p className='verify-desc'>Enter the OTP code sent to your email.</p>

          <form onSubmit={handleSubmit(handleVerifyOtp)} className='login-form'>
            <div className='input-group'>
              <label>Email</label>
              <div className='input-with-icon'>
                <input type='text' value={registerData.email} disabled />
              </div>
            </div>

            <div className='input-group'>
              <label>OTP</label>
              <div className='input-with-icon'>
                <input
                  id='otp'
                  type='text'
                  maxLength={6}
                  placeholder='Enter 6-digit OTP'
                  {...register('otp', {
                    required: 'OTP is required',
                    minLength: {
                      value: 6,
                      message: 'OTP must be 6 characters',
                    },
                    maxLength: {
                      value: 6,
                      message: 'OTP must be 6 characters',
                    },
                  })}
                />
              </div>
              {errors.otp && (
                <span className='error'>{errors.otp.message}</span>
              )}
            </div>
            <div className='group-button'>
              {' '}
              <button type='submit' className='login-button' disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type='button'
                className='secondary-button'
                onClick={handleResendOtp}
                disabled={resending}
              >
                {resending ? 'Sending...' : 'Resend OTP'}
              </button>
            </div>

            <p
              className='register-link verify-link-text'
              onClick={handleSendVerifyLink}
              role='button'
            >
              {sendingLink
                ? 'Sending verification link...'
                : "Don't want to enter OTP? Get a verification link instead"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
