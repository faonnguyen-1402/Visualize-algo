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
      <div className='container-register'>
        <div className='register-form'>
          <h1>Verify OTP</h1>
          <p>Không có dữ liệu đăng ký.</p>
          <button
            type='button'
            className='submit-button'
            onClick={() => navigate('/register')}
          >
            Quay lại Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='container-register'>
      <form className='register-form' onSubmit={handleSubmit(handleVerifyOtp)}>
        <button
          type='button'
          className='back-button'
          onClick={() => navigate('/register')}
        >
          &lt;
        </button>

        <h1>Verify OTP</h1>

        <div className='input-group'>
          <label>Email:</label>
          <input type='text' value={registerData.email} disabled />
        </div>

        <div className='input-group'>
          <label htmlFor='otp'>OTP:</label>
          <input
            id='otp'
            type='text'
            maxLength={6}
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
          {errors.otp && <span className='errors'>{errors.otp.message}</span>}
        </div>

        <button type='submit' className='submit-button' disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <button
          type='button'
          className='submit-button'
          onClick={handleResendOtp}
          disabled={resending}
          style={{ marginTop: '10px' }}
        >
          {resending ? 'Sending...' : 'Resend OTP'}
        </button>

        <span
          className='verify-link-text'
          onClick={handleSendVerifyLink}
          role='button'
        >
          {sendingLink
            ? 'Sending verification link...'
            : "Don't want to enter OTP? Get a verification link instead"}
        </span>
      </form>
    </div>
  );
}

export default VerifyOtp;
