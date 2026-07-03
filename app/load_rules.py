from pathlib import Path

from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# ==========================================
# EMBEDDING MODEL
# ==========================================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ==========================================
# READ RULES
# ==========================================

RULE_FILE = Path(__file__).parent / "data" / "rules.txt"

with open(RULE_FILE, "r", encoding="utf-8") as f:

    rules = [
        line.strip()
        for line in f.readlines()
        if line.strip()
    ]

documents = [
    Document(page_content=rule)
    for rule in rules
]

# ==========================================
# CREATE VECTOR DATABASE
# ==========================================

vectorstore = FAISS.from_documents(
    documents,
    embeddings
)

vectorstore.save_local("faiss_db")

print("=" * 50)
print("FAISS DATABASE CREATED")
print("Rules Loaded :", len(documents))
print("=" * 50)