from pathlib import Path

from langchain.tools import tool
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# ==========================================
# EMBEDDINGS
# ==========================================

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ==========================================
# LOAD VECTOR DATABASE
# ==========================================

BASE_DIR = Path(__file__).resolve().parent.parent

vectorstore = FAISS.load_local(
    str(BASE_DIR / "faiss_db"),
    embeddings,
    allow_dangerous_deserialization=True
)

retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}
)

# ==========================================
# RAG TOOL
# ==========================================

@tool
def retrieve_rules(query: str) -> str:
    """
    Retrieve invoice compliance rules using FAISS.
    """

    docs = retriever.invoke(query)

    if not docs:
        return "No compliance rules found."

    return "\n".join(
        doc.page_content
        for doc in docs
    )