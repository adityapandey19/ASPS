"""
ML Dataset Builder
Owner: Ayush

Purpose:
Prepare ML-ready structured dataset rows.

This module:
- Does NOT train model
- Does NOT modify schema
- Only prepares feature dictionary
"""
def build_training_row(topic: dict, test_score: float, time_spent: int):
    """
    Builds ML training row.

    Label:
    1 = struggled
    0 = mastered

    Rules:
    - If test_score < 50 → struggled
    - If exposure >= 3 AND test_score < 60 → struggled
    - If test_score >= 70 AND exposure >= 3 → mastered
    - Otherwise → return None (ambiguous case)
    """

    if test_score is None:
        return None

    exposure = topic["exposure_level"]

    label = None

    if test_score < 50:
        label = 1

    elif exposure >= 3 and test_score < 60:
        label = 1

    elif test_score >= 70 and exposure >= 3:
        label = 0

    else:
        return None  # ambiguous data not useful for training

    return {
        "credits": topic["credits"],
        "complexity": topic["complexity"],
        "exposure_level": exposure,
        "last_revised_days": topic["last_revised_days"],
        "test_score": test_score,
        "time_spent": time_spent,
        "label": label
    }
def build_dataset_from_course(course_data: dict, test_results: dict):
    """
    Builds ML dataset from entire course.

    test_results format:
    {
        "Topic Name": {
            "test_score": 75,
            "time_spent": 120
        }
    }

    Returns:
    List of training rows
    """

    dataset = []

    for unit in course_data["units"]:
        for topic in unit["topics"]:
            topic_name = topic["name"]

            if topic_name in test_results:
                result = test_results[topic_name]

                row = build_training_row(
                    topic,
                    test_score=result["test_score"],
                    time_spent=result["time_spent"]
                )

                if row is not None:
                    dataset.append(row)

    return dataset
