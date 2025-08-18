from langchain_gigachat import GigaChat
llm = GigaChat(
    verify_ssl_certs=False,
    credentials="ZTk3ZjdmYjMtNmMwOC00NGE1LTk0MzktYzA3ZjU4Yzc2YWI3OjFkZTNhNzQxLTFlNTktNDNjYi04NzJlLTA3YzhiNzcxODZjMg==",
    model="GigaChat-2",
    temperature=0.1
)
