import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './VerifyEmailLink.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

function VerifyEmailLink() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying email...');
  const [loading, setLoading] = useState(true);

  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const token = searchParams.get('token');

    if (!token) {
      setMessage('Invalid token');
      setLoading(false);
      return;
    }

    const verifyLink = async () => {
      try {
        const res = await axios.post(
          'http://localhost:3001/email/verify-link',
          { token },
        );

        setMessage(res.data.message || 'Email verified successfully');
        sessionStorage.removeItem('register_form');

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error: any) {
        setMessage(error?.response?.data?.message || 'Verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyLink();
  }, [searchParams, navigate]);

  return (
    <div className='container-register'>
      <div className='register-form'>
        <h1>Verify Email Link</h1>
        <p>{loading ? 'Processing...' : message}</p>

        {!loading && (
          <button
            type='button'
            className='submit-button'
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailLink;
