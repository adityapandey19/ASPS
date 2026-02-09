def compute_priority(topic):
    """
    Compute priority score for a study topic.

    Required keys in topic:
    - credits (float)              # syllabus weightage
    - complexity (float)           # base difficulty (1–5)
    - last_revised_days (int)      # days since last revision
    - exposure_level (int)         # 0–4

    Optional keys:
    - test_score (0–100)           # mock / PYQ score
    - predicted_difficulty (float)# from ML model
    """

    # 1. Base complexity (ML can override this later)
    difficulty = topic.get(
        "predicted_difficulty",
        topic["complexity"]
    )

    # 2. Exposure penalty (normalized)
    exposure_penalty = topic["exposure_level"] / 4  # 0 → 1

    # 3. Optional test score penalty
    score_penalty = 0
    if "test_score" in topic:
        score_penalty = topic["test_score"] / 100  # 0 → 1

    # 4. Final priority score
    priority = (
        0.4 * topic["credits"]
        + 0.3 * difficulty
        + 0.2 * topic["last_revised_days"]
        - 0.15 * exposure_penalty
        - 0.15 * score_penalty
    )

    return priority


def generate_daily_plan(topics, available_hours):
    """
    Generate a daily study plan based on priority scores.
    """
    scored_topics = []

    for topic in topics:
        score = compute_priority(topic)
        scored_topics.append((score, topic["Name"]))

    scored_topics.sort(reverse=True)

    plan = []
    hours_left = available_hours

    for score, name in scored_topics:
        if hours_left <= 0:
            break
        plan.append(name)
        hours_left -= 1  # assume 1 hour per topic

    return plan


def update_learning_decay(topics, studied_topics):
    """
    Update last_studied_days for each topic based on today's study.
    """
    for topic in topics:
        if topic["name"] in studied_topics:
            topic["last_studied_days"] = 0
        else:
            topic["last_studied_days"] += 1

def run_engine(input_data):
    """
    Entry point for external callers (API, tests, etc.)
    """
    topics = input_data["topics"]
    hours = input_data["available_hours"]

    plan = generate_daily_plan(topics, hours)
    update_learning_decay(topics, plan)

    return {
        "plan": plan,
        "updated_topics": topics
    }


if __name__ == "__main__":
    sample_input = {
        "available_hours": 2,
        "topics": [
            {
                "name": "Arrays",
                "weightage": 0.3,
                "difficulty": 2,
                "last_studied_days": 5,
                "recent_score": 60
            },
            {
                "name": "Linked Lists",
                "weightage": 0.2,
                "difficulty": 3,
                "last_studied_days": 10,
                "recent_score": 40
            },
            {
                "name": "Stacks",
                "weightage": 0.1,
                "difficulty": 1,
                "last_studied_days": 2,
                "recent_score": 80
            }
        ]
    }

    output = run_engine(sample_input)
    print(output)

