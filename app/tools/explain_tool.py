from langchain.tools import tool


@tool
def explain_violations(violations: list) -> str:
    """Explain validation results for multiple invoices."""

    explanation = ""

    for item in violations:

        inv = item["invoice_number"]
        issues = item["violations"]

        if issues == ["Valid"]:
            explanation += f"Invoice {inv} is valid.\n"
        else:
            explanation += f"Invoice {inv} failed:\n"
            for v in issues:
                explanation += f"- {v}\n"

    return explanation