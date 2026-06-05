from langchain.tools import tool
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma


embeddings = OllamaEmbeddings(
    model="phi3"
)

vectorstore = Chroma(
    persist_directory="vectordb",
    embedding_function=embeddings
)


@tool
def retrieve_rules(query: str) -> str:
    """
    Retrieve invoice compliance rules from vector database.
    """

    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    docs = retriever.invoke(query)

    rules = [d.page_content for d in docs]

    return "\n".join(rules)