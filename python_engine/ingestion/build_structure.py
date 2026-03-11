import json

from extract_text import extract_text_from_txt
from parse_units import detect_units
from parse_topics import extract_topics


def build_structure(course_name, units):

    structured_units = []

    for unit in units:
        structured_units.append({
            "name": unit["name"],
            "weightage": 0,
            "topics": unit["topics"]
        })

    return {
        "course": course_name,
        "units": structured_units
    }


def run_pipeline():

    file_path = "../../sample_syllabus.txt"

    text = extract_text_from_txt(file_path)

    detected_units = detect_units(text)

    parsed_units = extract_topics(detected_units)

    syllabus = build_structure("Sample Course", parsed_units)

    topic_count = sum(len(u["topics"]) for u in parsed_units)

    print("Units detected:", len(parsed_units))
    print("Topics detected:", topic_count)

    output_path = "../data_layer/syllabus.json"

    with open(output_path, "w") as f:
        json.dump(syllabus, f, indent=4)

    print("JSON saved to:", output_path)

    print("\nGenerated JSON:\n")
    print(json.dumps(syllabus, indent=4))


if __name__ == "__main__":
    run_pipeline()