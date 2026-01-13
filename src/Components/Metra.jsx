import React, { useState } from 'react';
import '../App.css';

const Metra = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

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
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                    required
                  />
                  <span style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    By checking this box and clicking "Opt In," I consent to receive automated SMS text messages from <strong>Metra Updates</strong> at the phone number provided. Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to unsubscribe or <strong>HELP</strong> for help. I agree to the{' '}
                    <a
                      href="#terms"
                      onClick={(e) => { e.preventDefault(); setShowTerms(true); }}
                      style={{ color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Terms of Service
                    </a>
                    {' '}and{' '}
                    <a
                      href="#privacy"
                      onClick={(e) => { e.preventDefault(); setShowPrivacyPolicy(true); }}
                      style={{ color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Privacy Policy
                    </a>.
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

            </form>
          )}

          {/* Privacy Policy Modal */}
          {showPrivacyPolicy && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                maxWidth: '700px',
                maxHeight: '80vh',
                overflow: 'auto',
                padding: '40px',
                position: 'relative'
              }}>
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  ×
                </button>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  Privacy Policy
                </h2>
                <div style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  lineHeight: '1.8'
                }}>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Information We Collect:</strong> Metra Updates only collects your mobile phone number when you voluntarily opt in to receive SMS notifications about Metra service updates, delays, and alerts.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>How We Use Your Information:</strong> Your phone number is used solely for the purpose of sending you automated SMS text messages related to Metra service information. We do not use your phone number for any other purpose.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>No Third-Party Sharing:</strong> We will not share, sell, rent, or trade your mobile phone number with third parties or affiliates for their marketing or promotional purposes. Your information is kept strictly confidential and will only be used to provide you with the Metra Updates service you subscribed to.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Data Retention:</strong> Your phone number will be stored only as long as you remain subscribed to Metra Updates notifications. You can unsubscribe at any time by texting STOP to any message you receive from us.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Data Security:</strong> We implement reasonable security measures to protect your phone number from unauthorized access, disclosure, or misuse.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Your Rights:</strong> You have the right to opt out at any time by texting STOP. Upon unsubscribing, your phone number will be promptly removed from our system. You may also text HELP to receive assistance.
                  </p>
                  <p style={{ marginBottom: '0' }}>
                    <strong>Message Frequency:</strong> Message frequency varies based on Metra service conditions and updates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Terms of Service Modal */}
          {showTerms && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                maxWidth: '700px',
                maxHeight: '80vh',
                overflow: 'auto',
                padding: '40px',
                position: 'relative'
              }}>
                <button
                  onClick={() => setShowTerms(false)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  ×
                </button>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  Terms of Service
                </h2>
                <div style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  lineHeight: '1.8'
                }}>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>1. Service Description:</strong> Metra Updates provides automated SMS text message notifications regarding Metra train service updates, delays, alerts, and related information.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>2. Consent to Receive Messages:</strong> By opting in, you expressly consent to receive automated SMS text messages from Metra Updates at the mobile phone number you provided. You understand that consent is not a condition of purchase or service.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>3. Message Frequency:</strong> Message frequency varies based on Metra service conditions. You may receive multiple messages per day during service disruptions or as few as zero messages on days with no alerts.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>4. Message and Data Rates:</strong> Standard message and data rates may apply based on your mobile carrier's plan. Please contact your carrier for details about your specific plan.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>5. Opt-Out Instructions:</strong> You may opt out of receiving messages at any time by texting STOP to any message from Metra Updates. You will receive a confirmation message, after which you will no longer receive messages from us.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>6. Help:</strong> For assistance, text HELP to any message from Metra Updates or contact support.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>7. Supported Carriers:</strong> This service is available on major U.S. carriers including AT&T, Verizon, T-Mobile, Sprint, and others. Check with your carrier for availability.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>8. Service Availability:</strong> Metra Updates is provided on an "as-is" basis. We do not guarantee uninterrupted or error-free service. Service may be modified or discontinued at any time without notice.
                  </p>
                  <p style={{ marginBottom: '15px' }}>
                    <strong>9. Privacy:</strong> Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                  </p>
                  <p style={{ marginBottom: '0' }}>
                    <strong>10. Changes to Terms:</strong> We reserve the right to modify these Terms of Service at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Metra;
