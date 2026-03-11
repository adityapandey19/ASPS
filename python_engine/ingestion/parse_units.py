import re


UNIT_PATTERN = re.compile(r"(unit\s*\d+|module\s*\d+|chapter\s*\d+)", re.IGNORECASE)


def detect_units(text):
    """
    Detect syllabus units
    """

    lines = text.split("\n")

    units = []
    current_unit = None

    for line in lines:

        if UNIT_PATTERN.search(line):

            if current_unit:
                units.append(current_unit)

            current_unit = {
                "name": line.strip(),
                "content": []
            }

        else:
            if current_unit:
                current_unit["content"].append(line)

    if current_unit:
        units.append(current_unit)

    return units