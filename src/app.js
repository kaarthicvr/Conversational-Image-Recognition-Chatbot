import React, { useState } from 'react';
import axios from 'axios';
import './app.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image || !question) {
      alert('Please provide both an image and a question.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('question', question);

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/recognize_and_answer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setAnswer(response.data.answer);
    } catch (error) {
      setError('Failed to get the answer. Please try again.');
      console.error('Error fetching the answer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <h1>VisionDialog</h1>
        </div>
      </div>
      <div className="main-content">
        <div className="upload-section">
          <h2>Upload your image and ask a question</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageUpload} />
            <input
              type="text"
              placeholder="Ask a question about the image..."
              value={question}
              onChange={handleQuestionChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="result-section">
          {error && <p className="error">{error}</p>}
          {imagePreviewUrl && (
            <div className="image-preview">
              <h3>Uploaded Image:</h3>
              <img src={imagePreviewUrl} alt="Uploaded preview" />
            </div>
          )}
          {answer && (
            <div>
              <h3>Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
