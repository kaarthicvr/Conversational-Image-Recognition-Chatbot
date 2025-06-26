# Conversational Image Recognition Chatbot

This project is a conversational chatbot that accepts an image and allows users to ask questions related to its content. It uses a vision-language model to understand the uploaded image and generate context-aware answers to user queries.

The project is built with:
- **Flask (Python)** for the backend
- **React** for the frontend
- **Moondream2** model from Hugging Face for visual question answering (VQA)

---

## Features

- Upload an image and ask context-based questions about it
- Maintains a conversation-like history of Q&A
- React frontend with intuitive and responsive design
- Flask backend with REST API endpoints
- Cross-origin support using Flask-CORS
- Option to reset the session

---

## Technologies Used

**Frontend:**
- React
- Axios (for HTTP requests)
- React Icons
- CSS Modules

**Backend:**
- Flask
- Transformers (Hugging Face)
- Pillow (for image processing)
- Flask-CORS

**Model:**
- [vikhyatk/moondream2](https://huggingface.co/vikhyatk/moondream2) - Vision-Language Transformer

---

## Folder Structure

