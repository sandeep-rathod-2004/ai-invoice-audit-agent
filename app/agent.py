import os
import re
import time
from pathlib import Path
from datetime import datetime

from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

from tools.extract_tool import extract_invoice_text
from tools.clean_tool import clean_text
from tools.retrieve_tool import retrieve_rules

# ============================================
# LOAD ENVIRONMENT VARIABLES
# ============================================

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise Exception("GOOGLE_API_KEY not found in .env")

# ============================================
# GEMINI LLM
# ============================================

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=GOOGLE_API_KEY,
    temperature=0,
)

# ============================================
# MAIN AGENT
# ============================================

def run_invoice_agent(file_path, task):

    start_time = time.time()

    current_date = datetime.now().strftime("%d-%m-%Y")

    print("\n========================================")
    print("AGENTIC INVOICE AI SYSTEM STARTED")
    print("========================================\n")

    # ============================================
    # AGENT 1 — PLANNING
    # ============================================

    print("🔹 Agent 1: Planning workflow...")

    planner_prompt = f"""
Generate a short workflow for this task.

Task:
{task}

Return only 5-6 short workflow steps.
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
    # AGENT 4 — RETRIEVE RULES (RAG)
    # ============================================

    print("🔹 Agent 4: Retrieving compliance rules...")

    rules = retrieve_rules.invoke("invoice validation rules")

    print("✅ Rules retrieved\n")

    # ============================================
    # AGENT 5 — GEMINI VALIDATION
    # ============================================

    print("🔹 Agent 5: Validating invoices with Gemini...\n")

    validation_prompt = f"""
You are an expert Invoice Compliance Auditor.

Use ONLY the following compliance rules.

==============================
RULES
==============================

{rules}

==============================
TASK
==============================

{task}

==============================
INVOICE TEXT
==============================

{cleaned_text}

==============================
OUTPUT FORMAT
==============================

Generate a professional audit report.

Today's Date is: {current_date}

The report MUST start exactly like this:

Invoice Compliance Audit Report

Date: {current_date}

Never write "[Current Date]".
Never generate another date.
Always use the provided date exactly.

Then continue with the invoice audit.

For every invoice include:

Invoice Number
Vendor
GST Number
Tax Rate
Validation Status (VALID / INVALID)
Violations
Recommendation

At the end include:

Total Invoices
Valid Invoices
Invalid Invoices

Do not invent rules.
Only use the retrieved rules.
"""

    result = llm.invoke(validation_prompt).content

    execution_time = round(time.time() - start_time, 2)

    print("✅ Validation completed")
    print("🔹 Agent 6: Generating final report...")
    print("✅ Report generation completed\n")

    print("========================================")
    print("AI SYSTEM COMPLETED SUCCESSFULLY")
    print("========================================\n")

    # ============================================
    # ANALYTICS
    # ============================================

    total = 0
    valid = 0
    invalid = 0

    try:

        total_match = re.search(
            r"\*\*Total Invoices:\*\*\s*(\d+)",
            result,
            re.IGNORECASE,
            )

        valid_match = re.search(
            r"\*\*Valid Invoices:\*\*\s*(\d+)",
            result,
            re.IGNORECASE,
            )

        invalid_match = re.search(
            r"\*\*Invalid Invoices:\*\*\s*(\d+)",
            result,
            re.IGNORECASE,
            )

        if total_match:
            total = int(total_match.group(1))

        if valid_match:
            valid = int(valid_match.group(1))

        if invalid_match:
            invalid = int(invalid_match.group(1))

    except Exception:
        pass

    return {
        "task": task,
        "agent_plan": str(plan),
        "retrieved_rules": rules,
        "result": result,
        "execution_time": execution_time,
        "total": total,
        "valid": valid,
        "invalid": invalid,
    }