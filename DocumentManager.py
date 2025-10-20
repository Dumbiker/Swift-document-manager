def save_document(filename, content):
    try:
        with open(filename, 'w') as file:
            file.write(content)
    except Exception as e:
        print(f"Error saving document: {e}")

def import_document(filename):
    try:
        with open(filename, 'r') as file:
            content = file.read()
            print(f"Document content: {content}")
    except Exception as e:
        print(f"Error importing document: {e}")
