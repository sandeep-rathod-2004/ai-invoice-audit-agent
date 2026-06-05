from langchain.tools import tool


@tool
def validate_rules(data: dict) -> list:
    """Validate multiple invoices against rules."""

    invoices = data.get("invoice", [])
    results = []

    for invoice in invoices:

        violations = []

        if invoice.get("tax_rate") != 18:
            violations.append("Tax rate must be 18%")

        if invoice.get("gst") is False:
            violations.append("GST number missing")

        if not invoice.get("invoice_number"):
            violations.append("Invoice number missing")

        results.append({
            "invoice_number": invoice.get("invoice_number", "Unknown"),
            "violations": violations if violations else ["Valid"]
        })

    return results