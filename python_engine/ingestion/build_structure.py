import json

from extract_text import extract_text_from_txt
from parse_units import detect_units
from parse_topics import extract_topics


def build_structure(course_name, units):

    structured_units = []

    for unit in units:
        structured_units.append({
            "name": unit["name"],
            "weightage": len(unit["topics"]),
            "topics": unit["topics"]
        })

    return {
        "course": course_name,
        "units": structured_units
    }


def run_pipeline(input_path, output_path):

    text = extract_text_from_txt(input_path)

    detected_units = detect_units(text)

    parsed_units = extract_topics(detected_units)

    if not parsed_units:
        raise ValueError("No units detected in syllabus")

    syllabus = build_structure("Sample Course", parsed_units)

    for unit in syllabus["units"]:
        if not unit["topics"]:
            raise ValueError(f"No topics detected in {unit['name']}")

    with open(output_path, "w") as f:
        json.dump(syllabus, f, indent=4)

    print("JSON saved to:", output_path)

    print("\nGenerated JSON:\n")
    print(json.dumps(syllabus, indent=4))


if __name__ == "__main__":

    input_path = "../../sample_syllabus.txt"
    output_path = "../data_layer/syllabus.json"

    run_pipeline(input_path, output_path)