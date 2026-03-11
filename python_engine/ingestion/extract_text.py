import fitz


def extract_text_from_pdf(file_path):
    """
    Extract text from PDF syllabus
    """
    text = ""

    with fitz.open(file_path) as pdf:
        for page in pdf:
            text += page.get_text()

    return clean_text(text)


def extract_text_from_txt(file_path):
    """
    Extract text from plain text syllabus
    """
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    return clean_text(text)


def clean_text(text):
    """
    Remove empty lines and extra spaces
    """
    lines = text.split("\n")
    cleaned = [line.strip() for line in lines if line.strip()]

    return "\n".join(cleaned)