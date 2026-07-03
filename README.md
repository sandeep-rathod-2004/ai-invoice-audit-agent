# 🤖 AI Invoice Audit Agent

## 📌 Overview

AI Invoice Audit Agent is a **Multi-Agent RAG-powered Document Intelligence System** that automates invoice extraction, compliance validation, and auditing using **LangChain**, **Google Gemini**, **FAISS**, and **FastAPI**.

The application extracts invoice information from PDF documents, retrieves relevant compliance rules using **Retrieval-Augmented Generation (RAG)**, validates invoices against business rules, and generates a professional AI-powered audit report with invoice analytics.

---

# ✨ Features

- 📄 PDF Invoice Extraction
- 🤖 AI-Powered Invoice Validation
- 🔍 Retrieval-Augmented Generation (RAG)
- 📚 FAISS Vector Database for Semantic Search
- 🧠 Google Gemini Powered Audit Report Generation
- ⚙️ Multi-Agent Workflow
- ✅ Rule-Based Invoice Compliance Validation
- 📊 Invoice Analytics Dashboard
- 📥 Download Audit Report
- ⚡ FastAPI REST APIs
- 🎨 Modern React User Interface

---

# 🏗️ Project Architecture

```
                  +----------------------+
                  |   Upload Invoice PDF |
                  +----------+-----------+
                             |
                             ▼
                  +----------------------+
                  | Extract Invoice Text |
                  +----------+-----------+
                             |
                             ▼
                  +----------------------+
                  |     Clean Text       |
                  +----------+-----------+
                             |
                             ▼
                  +----------------------+
                  | Retrieve Rules (RAG) |
                  |     FAISS Search     |
                  +----------+-----------+
                             |
                             ▼
                  +----------------------+
                  | Google Gemini LLM    |
                  | Invoice Validation   |
                  +----------+-----------+
                             |
                             ▼
                  +----------------------+
                  | Generate Audit Report|
                  +----------+-----------+
                             |
                             ▼
                  +----------------------+
                  | Analytics Dashboard  |
                  +----------------------+
```

---

# 🚀 Technology Stack

## Backend

- Python
- FastAPI
- REST APIs

## Frontend

- React
- Vite
- Tailwind CSS

## Generative AI

- Google Gemini
- LangChain
- Retrieval-Augmented Generation (RAG)
- Prompt Engineering
- Multi-Agent Architecture

## Vector Database

- FAISS
- Sentence Transformers

## PDF Processing

- PDFPlumber

## Tools

- Git
- GitHub

---

# 🤖 Multi-Agent Workflow

### Agent 1

Generate workflow plan.

### Agent 2

Extract invoice text from uploaded PDF.

### Agent 3

Clean and normalize extracted text.

### Agent 4

Retrieve invoice compliance rules from the FAISS vector database using RAG.

### Agent 5

Validate invoices using Google Gemini based on retrieved rules.

### Agent 6

Generate professional audit report and analytics.

---

# 📂 Folder Structure

```text
AI-INVOICE-AUDIT-AGENT
│
├── app
│   │
│   ├── data
│   │   └── rules.txt
│   │
│   ├── faiss_db
│   │   ├── index.faiss
│   │   └── index.pkl
│   │
│   ├── invoices
│   │
│   ├── tools
│   │   ├── clean_tool.py
│   │   ├── extract_tool.py
│   │   ├── retrieve_tool.py
│   │
│   ├── load_rules.py
│   ├── agent.py
│   └── main.py
│
├── frontend
│   │
│   ├── public
│   ├── src
│   └── package.json
│
├── requirements.txt
├── .env.example
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/sandeep-rathod-2004/ai-invoice-audit-agent.git

cd ai-invoice-audit-agent
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Run Backend

```bash
cd app

uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

# ▶️ Run Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📋 Workflow

1. Upload Invoice PDF
2. Extract Invoice Text
3. Clean Extracted Data
4. Retrieve Compliance Rules using FAISS
5. Validate Invoice with Google Gemini
6. Generate AI Audit Report
7. Display Invoice Analytics
8. Download Audit Report

---

# 📊 Sample Output

- Invoice Number
- Vendor Name
- GST Number
- Tax Rate
- Validation Status
- Rule Violations
- Recommendations
- Invoice Summary
- Total Invoices
- Valid Invoices
- Invalid Invoices
- Execution Time

---

# 🔮 Future Enhancements

- OCR Support for Scanned Invoices
- GST API Verification
- Invoice Fraud Detection
- Multi-Document Processing
- User Authentication
- Invoice History
- Cloud Storage Integration
- Real-Time Dashboard
- Email Audit Reports
- Multi-Language Invoice Support

---

# 📷 Screenshots

### Dashboard

Upload invoices and perform AI-powered compliance validation.

### AI Audit Report

Generate professional invoice audit reports with rule violations and recommendations.

### Analytics

Display total invoices, valid invoices, invalid invoices, and execution time.

---

# 👨‍💻 Author

## Sandeep Rathod

**B.Tech Computer Science & Engineering (2026)**

### GitHub

https://github.com/sandeep-rathod-2004

---

# ⭐ If you found this project useful, don't forget to star the repository!
