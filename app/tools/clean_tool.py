import re
from langchain.tools import tool


@tool
def clean_text(text: str) -> str:
    """
    Clean invoice text before parsing.
    Use after extract_invoice_text.
    """

    text = text.lower()
    text = re.sub(r"\n+", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()