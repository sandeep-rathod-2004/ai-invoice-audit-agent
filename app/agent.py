import re
import time

from langchain_ollama import ChatOllama

from tools.extract_tool import extract_invoice_text
from tools.clean_tool import clean_text


# ============================================
# LIGHTWEIGHT LOCAL LLM
# ============================================

llm = ChatOllama(
    model="phi3",
    temperature=0,
    num_predict=50
)


# ============================================
# MAIN AGENT
# ============================================

def run_invoice_agent(file_path, task):

    start_time = time.time()

    print("\n========================================")
    print("AGENTIC INVOICE AI SYSTEM STARTED")
    print("========================================\n")

    # ============================================
    # AGENT 1 — PLANNING
    # ============================================

    print("🔹 Agent 1: Planning workflow...")

    planner_prompt = f"""
    Generate short workflow steps for invoice validation.
    Task: {task}
    """

    plan = llm.invoke(planner_prompt).content

    print("✅ Workflow planning completed\n")

    # ============================================
    # AGENT 2 — EXTRACT TEXT
    # ============================================

    print("🔹 Agent 2: Extracting invoice text...")

    text = extract_invoice_text.invoke(file_path)

    print("✅ Invoice text extracted\n")

    # ============================================
    # AGENT 3 — CLEAN TEXT
    # ============================================

    print("🔹 Agent 3: Cleaning invoice text...")

    cleaned_text = clean_text.invoke(text)

    print("✅ Text cleaning completed\n")

    # ============================================
    # AGENT 4 — PARSE INVOICE
    # ============================================

    print("🔹 Agent 4: Parsing invoice details...")

    pattern = r"""
    Vendor:\s*(.*?)\s*
    Invoice\s*Number:\s*(.*?)\s*
    Tax\s*Rate:\s*(.*?)\s*
    GST:\s*(.*?)
    (?=Vendor:|$)
    """

    matches = re.findall(
        pattern,
        text,
        re.IGNORECASE | re.DOTALL | re.VERBOSE
    )

    print(f"✅ Parsed {len(matches)} invoice(s)\n")

    # ============================================
    # AGENT 5 — VALIDATION
    # ============================================

    print("🔹 Agent 5: Validating invoices...\n")

    result = """
========================================
MULTI INVOICE VALIDATION REPORT
========================================
"""

    invoice_count = 0
    total_valid = 0
    total_invalid = 0

    for match in matches:

        invoice_count += 1

        vendor = match[0].strip()
        invoice_number = match[1].strip()
        tax_rate = match[2].strip()
        gst_number = match[3].strip()

        validation_checks = []
        violations = []

        is_valid = True

        # ============================================
        # RULE 1 — INVOICE NUMBER
        # ============================================

        if invoice_number:

            validation_checks.append(
                f"✔ Invoice Number Present : {invoice_number}"
            )

        else:

            validation_checks.append(
                "✘ Invoice Number Missing"
            )

            violations.append(
                "Invoice number missing"
            )

            is_valid = False

        # ============================================
        # RULE 2 — GST VALIDATION
        # ============================================

        if gst_number and gst_number.lower() != "missing":

            validation_checks.append(
                f"✔ GST Number Present : {gst_number}"
            )

        else:

            validation_checks.append(
                "✘ GST Number Missing"
            )

            violations.append(
                "GST number missing"
            )

            is_valid = False

        # ============================================
        # RULE 3 — TAX RATE
        # ============================================

        if "18" in tax_rate:

            validation_checks.append(
                "✔ Tax Rate is 18%"
            )

        else:

            validation_checks.append(
                f"✘ Invalid Tax Rate : {tax_rate}"
            )

            violations.append(
                "Tax rate must be 18%"
            )

            is_valid = False

        # ============================================
        # STATUS
        # ============================================

        status = "VALID" if is_valid else "INVALID"

        if is_valid:
            total_valid += 1
        else:
            total_invalid += 1

        # ============================================
        # REPORT
        # ============================================

        result += f"""

----------------------------------------
INVOICE {invoice_count}
----------------------------------------

Validation Status : {status}

Vendor Name     : {vendor}
Invoice Number  : {invoice_number}
GST Number      : {gst_number}
Tax Rate        : {tax_rate}

----------------------------------------
VALIDATION CHECKS
----------------------------------------
"""

        for item in validation_checks:
            result += f"\n{item}"

        if violations:

            result += """

----------------------------------------
VIOLATIONS
----------------------------------------
"""

            for item in violations:
                result += f"\n• {item}"

        else:

            result += """

----------------------------------------
STATUS
----------------------------------------

Invoice passed all compliance checks.
"""

    # ============================================
    # NO INVOICE FOUND
    # ============================================

    if invoice_count == 0:

        result += """

No valid invoice structure detected.
"""

    # ============================================
    # FINAL SUMMARY
    # ============================================

    execution_time = round(time.time() - start_time, 2)

    print("✅ Validation completed")
    print("🔹 Agent 6: Generating final report...")
    print("✅ Report generation completed\n")

    result += f"""

========================================
FINAL SUMMARY
========================================

Total Invoices Processed : {invoice_count}
Valid Invoices           : {total_valid}
Invalid Invoices         : {total_invalid}

========================================
EXECUTION DETAILS
========================================

Execution Time           : {execution_time} seconds

========================================
AI AGENT WORKFLOW
========================================

1. Planning Agent
2. Extraction Agent
3. Cleaning Agent
4. Parsing Agent
5. Validation Agent
6. Reporting Agent

========================================
"""

    print("========================================")
    print("AI SYSTEM COMPLETED SUCCESSFULLY")
    print("========================================\n")

    return {
        "task": task,
        "agent_plan": str(plan),
        "result": result
    }