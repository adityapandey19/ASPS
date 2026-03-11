IGNORE_WORDS = ["reference", "book", "objective", "evaluation"]
def extract_topics(units):

    parsed_units = []

    for unit in units:

        topics = []

        for line in unit["content"]:

            if not any(word in line.lower() for word in IGNORE_WORDS):

                topic = {
                    "name": line.strip(),
                    "credits": 0,
                    "complexity": 1,
                    "exposure_level": 0,
                    "last_revised_days": 0,
                    "subtopics": []
                }

                topics.append(topic)

        parsed_units.append({
            "name": unit["name"],
            "topics": topics
        })

    return parsed_units