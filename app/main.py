from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from agent import run_invoice_agent

app = FastAPI()

# CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "invoices"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.post("/invoice-agent")
async def invoice_agent(
    file: UploadFile = File(...),
    task: str = Form(..., example="validate invoice compliance")
):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = run_invoice_agent(file_path, task)

    return result