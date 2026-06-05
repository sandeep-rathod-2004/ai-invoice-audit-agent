import pdfplumber
from langchain.tools import tool


@tool
def extract_invoice_text(file_path: str) -> str:
    """
    Extract raw text from invoice PDF.
    Always the first step.
    """

    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            content = page.extract_text()
            if content:
                text += content + "\n"

    return text[:2000]