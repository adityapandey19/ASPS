"""
Schema Validator
Owner: Ayush
Purpose: Validate topic objects before they enter system logic.
This module does NOT modify data. It only validates.
"""


def validate_topic(topic: dict):
    required_fields = [
        "name",
        "credits",
        "complexity",
        "exposure_level",
        "last_revised_days",
        "subtopics"
    ]

    # Required fields check
    for field in required_fields:
        if field not in topic:
            return False, f"Missing required field: {field}"

    # Type validation
    if not isinstance(topic["name"], str):
        return False, "name must be string"

    if not isinstance(topic["credits"], (int, float)):
        return False, "credits must be numeric"

    if not isinstance(topic["complexity"], int):
        return False, "complexity must be integer"

    if not isinstance(topic["exposure_level"], int):
        return False, "exposure_level must be integer"

    if not isinstance(topic["last_revised_days"], int):
        return False, "last_revised_days must be integer"

    if not isinstance(topic["subtopics"], list):
        return False, "subtopics must be list"

    # Range validation
    if not (0 <= topic["exposure_level"] <= 4):
        return False, "exposure_level must be between 0 and 4"

    if not (1 <= topic["complexity"] <= 5):
        return False, "complexity must be between 1 and 5"

    if topic["last_revised_days"] < 0:
        return False, "last_revised_days cannot be negative"

    if topic["credits"] < 0:
        return False, "credits cannot be negative"

    # Subtopic validation
    for sub in topic["subtopics"]:
        if not isinstance(sub, dict):
            return False, "Each subtopic must be an object"

        if "name" not in sub or "completed" not in sub:
            return False, "Subtopic must contain name and completed"

        if not isinstance(sub["name"], str):
            return False, "Subtopic name must be string"

        if not isinstance(sub["completed"], bool):
            return False, "Subtopic completed must be boolean"

    return True, None
def validate_course_structure(course_data: dict):
    """
    Validates full course hierarchy:
    - course
    - units
    - topics
    - subtopics
    """

    if "course" not in course_data:
        return False, "Missing 'course' field"

    if "units" not in course_data:
        return False, "Missing 'units' field"

    if not isinstance(course_data["units"], list):
        return False, "'units' must be list"

    for unit in course_data["units"]:

        if "name" not in unit:
            return False, "Unit missing 'name'"

        if "weightage" not in unit:
            return False, "Unit missing 'weightage'"

        if "topics" not in unit:
            return False, "Unit missing 'topics'"

        if not isinstance(unit["topics"], list):
            return False, "'topics' must be list"

        for topic in unit["topics"]:
            valid, error = validate_topic(topic)
            if not valid:
                return False, f"Topic validation failed: {error}"

    return True, None
