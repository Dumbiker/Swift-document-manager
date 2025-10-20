from typing import Iterable

def save_document(filename: str, content: str) -> None:
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            file.write(content)
    except Exception as e:
        print(f"Error saving document: {e}")

def import_document(filename: str) -> None:
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
            print(f"Document content:\n{content}")
    except Exception as e:
        print(f"Error importing document: {e}")

def write_document(filename: str, content: str, append: bool = False) -> None:
    mode = 'a' if append else 'w'
    try:
        with open(filename, mode, encoding='utf-8') as file:
            file.write(content)
    except Exception as e:
        print(f"Error writing document: {e}")

def append_document(filename: str, content: str) -> None:
    write_document(filename, content, append=True)

def save_csv(filename: str, rows: Iterable[str]) -> None:
    try:
        with open(filename, 'w', encoding='utf-8', newline='') as f:
            for row in rows:
                f.write(str(row))
                f.write('\n')
    except Exception as e:
        print(f"Error saving CSV: {e}")
