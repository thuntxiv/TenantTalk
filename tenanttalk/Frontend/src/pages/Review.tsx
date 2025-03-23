import React, { useState } from 'react';

interface LandlordSubmission {
  landlordName: string;
  propertyAddress: string;
  contactEmail: string;
  description: string;
}

const LandlordSubmissionForm: React.FC = () => {
  const [submission, setSubmission] = useState<LandlordSubmission>({
    landlordName: '',
    propertyAddress: '',
    contactEmail: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubmission((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add your submission logic, e.g., sending data to your server.
    console.log('Landlord Submission:', submission);
    setIsSubmitted(true);
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {isSubmitted ? (
        <div>
          <h2>Thank you for your submission!</h2>
          <p>We will review your submission and get in touch with you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Landlord Submission Form</h1>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="landlordName" style={{ display: 'block', marginBottom: '5px' }}>
              Landlord Name:
            </label>
            <input
              type="text"
              id="landlordName"
              name="landlordName"
              value={submission.landlordName}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="propertyAddress" style={{ display: 'block', marginBottom: '5px' }}>
              Property Address:
            </label>
            <input
              type="text"
              id="propertyAddress"
              name="propertyAddress"
              value={submission.propertyAddress}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="contactEmail" style={{ display: 'block', marginBottom: '5px' }}>
              Contact Email:
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={submission.contactEmail}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={submission.description}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
              rows={4}
              required
            ></textarea>
          </div>
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default LandlordSubmissionForm;
