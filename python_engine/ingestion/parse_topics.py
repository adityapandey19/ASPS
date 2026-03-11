def extract_topics(units):
    """
    Extract topics inside each unit
    """

    parsed_units = []

    for unit in units:

        topics = []

        for line in unit["content"]:

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