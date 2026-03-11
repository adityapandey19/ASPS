import re


UNIT_PATTERN = re.compile(
    r"(unit\s*\d+|unit\s*[ivx]+|module\s*\d+|chapter\s*\d+)",
    re.IGNORECASE
)


def detect_units(text):

    lines = text.split("\n")

    units = []
    current_unit = None

    for line in lines:

        line = line.strip()

        if not line:
            continue

        # Detect a new unit heading
        if UNIT_PATTERN.search(line):

            if current_unit:
                units.append(current_unit)

            current_unit = {
                "name": line,
                "content": []
            }

        else:
            if current_unit:
                current_unit["content"].append(line)

    if current_unit:
        units.append(current_unit)

    return units