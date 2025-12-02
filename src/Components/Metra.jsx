import React, { useState } from 'react';
import '../App.css';

const Metra = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phoneNumber || !agreedToTerms) {
      alert('Please enter a phone number and agree to the terms.');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Phone number submitted:', phoneNumber);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setPhoneNumber('');
      setAgreedToTerms(false);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="metra" style={{ padding: '80px 0', minHeight: '100vh' }}>
      <div className="row" style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        <div className="twelve columns">
          <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Metra Updates</h1>

          {submitted ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #3b82f6'
            }}>
              <h2 style={{ color: '#3b82f6', marginBottom: '10px' }}>Thanks for signing up!</h2>
              <p>You'll receive updates at {phoneNumber}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              backgroundColor: '#fff',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ marginBottom: '25px' }}>
                <label htmlFor="phone" style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '16px',
                  fontWeight: '500'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(555) 123-4567"
                  maxLength="14"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    style={{
                      marginTop: '4px',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}
                    required
                  />
                  <span style={{ fontSize: '14px' }}>
                    I agree to receive SMS notifications
                  </span>
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#fff',
                  backgroundColor: '#3b82f6',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                Opt In
              </button>

              <div style={{
                marginTop: '25px',
                padding: '15px',
                fontSize: '12px',
                color: '#666',
                backgroundColor: '#f9fafb',
                borderRadius: '4px',
                lineHeight: '1.6'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  By opting in, you agree to receive SMS messages from Metra Updates.
                  Message and data rates may apply.
                </p>
                <p style={{ margin: '0' }}>
                  Text <strong>STOP</strong> to unsubscribe at any time. Text <strong>HELP</strong> for help.
                </p>
              </div>
            </form>
          )}

          <div style={{
            marginTop: '60px',
            padding: '30px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              Privacy Policy
            </h2>
            <div style={{
              fontSize: '14px',
              color: '#4b5563',
              lineHeight: '1.8'
            }}>
              <p style={{ marginBottom: '15px' }}>
                <strong>Information We Collect:</strong> We only collect your phone number when you voluntarily opt in to receive SMS notifications about Metra updates.
              </p>
              <p style={{ marginBottom: '15px' }}>
                <strong>How We Use Your Information:</strong> Your phone number is used solely for the purpose of sending you SMS notifications related to Metra service updates, delays, and alerts.
              </p>
              <p style={{ marginBottom: '15px' }}>
                <strong>Data Sharing:</strong> We do not sell, trade, or share your phone number with third parties. Your information is kept confidential and secure.
              </p>
              <p style={{ marginBottom: '15px' }}>
                <strong>Data Retention:</strong> Your phone number will be stored only as long as you remain subscribed to notifications. You can unsubscribe at any time by texting STOP.
              </p>
              <p style={{ marginBottom: '0' }}>
                <strong>Your Rights:</strong> You have the right to opt out at any time by texting STOP. Upon unsubscribing, your phone number will be removed from our system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metra;
