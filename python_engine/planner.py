def compute_priority(topic):
    """
    Compute priority score for a study topic.
    """
    return (
        0.4 * topic["weightage"]
        + 0.3 * topic["difficulty"]
        + 0.2 * topic["last_studied_days"]
        - 0.1 * (topic["recent_score"] / 100)
    )


def generate_daily_plan(topics, available_hours):
    """
    Generate a daily study plan based on priority scores.
    """
    scored_topics = []

    for topic in topics:
        score = compute_priority(topic)
        scored_topics.append((score, topic["name"]))

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


if __name__ == "__main__":
    sample_topics = [
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

    plan = generate_daily_plan(sample_topics, available_hours=2)
    print("Today's Plan:", plan)

    update_learning_decay(sample_topics, plan)

    print("\nAfter decay update:")
    for t in sample_topics:
        print(t["name"], "last studied days:", t["last_studied_days"])
