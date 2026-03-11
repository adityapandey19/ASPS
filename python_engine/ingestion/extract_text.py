import fitz
import os

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


def clean_text(text):
    lines = text.split("\n")
    cleaned = [line.strip() for line in lines if line.strip()]
    return "\n".join(cleaned)

def extract_text_from_pdf(file_path):

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    if os.path.getsize(file_path) > MAX_FILE_SIZE:
        raise ValueError("File too large. Max size is 5MB.")

    try:
        text = ""

        with fitz.open(file_path) as pdf:
            for page in pdf:
                text += page.get_text()

        return clean_text(text)

    except Exception as e:
        raise RuntimeError(f"Failed to extract text from PDF: {e}")


def extract_text_from_txt(file_path):

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()

        return clean_text(text)

    except Exception as e:
        raise RuntimeError(f"Failed to extract text from text file: {e}")