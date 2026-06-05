# AI Invoice Audit Agent

## Overview

AI Invoice Audit Agent is a Generative AI-powered document intelligence system that automates invoice extraction, validation, and auditing. The application leverages Retrieval-Augmented Generation (RAG) techniques to analyze invoice documents, identify inconsistencies, and provide intelligent insights while reducing manual effort.

## Features

* Automated invoice data extraction
* Invoice validation and auditing
* AI-powered document understanding
* Semantic document retrieval using vector databases
* FastAPI-based backend APIs
* Scalable document processing workflow
* Rule-based invoice compliance checking

## Technology Stack

### Backend

* Python
* FastAPI
* REST APIs

### Generative AI

* LangChain
* RAG (Retrieval-Augmented Generation)
* Prompt Engineering

### Database & Storage

* MongoDB
* FAISS Vector Database

### Tools & Technologies

* Git
* GitHub

## Project Architecture

1. Upload invoice documents.
2. Extract invoice information from PDF files.
3. Generate embeddings and store them in a vector database.
4. Retrieve relevant document context using RAG.
5. Validate invoice details against business rules.
6. Generate audit results and explanations.
7. Return responses through FastAPI APIs.

## Folder Structure

```text
app/
├── data/
│   └── rules.txt
├── invoices/
├── tools/
│   ├── clean_tool.py
│   ├── explain_tool.py
│   ├── extract_tool.py
│   ├── parser_tool.py
│   ├── retrieve_tool.py
│   └── validate_tool.py
├── vectordb/
├── agent.py
└── main.py

frontend/
├── src/
├── public/
└── package.json
```

## Installation

```bash
git clone https://github.com/sandeep-rathod-2004/ai-invoice-audit-agent.git
cd ai-invoice-audit-agent
pip install -r requirements.txt
```

## Run Backend

```bash
python app/main.py
```

or

```bash
uvicorn app.main:app --reload
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## Future Enhancements

* OCR integration for scanned invoices
* Multi-document invoice processing
* Fraud detection and anomaly analysis
* Dashboard for invoice analytics
* Multi-agent workflow orchestration

## Author

**Sandeep Rathod**
B.Tech Computer Science Engineering (2026)
GitHub: https://github.com/sandeep-rathod-2004
