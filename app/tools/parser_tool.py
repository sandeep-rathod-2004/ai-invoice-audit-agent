import re
from langchain.tools import tool


@tool
def parse_invoice(text: str) -> list:
    """Extract multiple invoices from text."""

    text = text.lower()

    invoices = []

    # keep "invoice" when splitting
    blocks = re.split(r"(?=invoice)", text)

    for block in blocks:

        data = {}

        invoice_match = re.search(r"invoice number[: ]+([a-z0-9\-]+)", block)
        if invoice_match:
            data["invoice_number"] = invoice_match.group(1)

        tax_match = re.search(r"tax rate[: ]+(\d+)", block)
        if tax_match:
            data["tax_rate"] = int(tax_match.group(1))

        gst_match = re.search(r"gst[: ]+([a-z0-9]+|missing)", block)
        if gst_match:
            val = gst_match.group(1)
            data["gst"] = False if val == "missing" else True

        if data:
            invoices.append(data)

    return invoices