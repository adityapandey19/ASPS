"""
Metrics Module
Owner: Ayush

Purpose:
Compute evaluation metrics from structured course JSON.

This module:
- Does NOT modify data
- Does NOT manage exposure
- Only computes analytics
"""
def syllabus_coverage(course_data: dict):
    total_topics = 0
    covered_topics = 0

    for unit in course_data["units"]:
        for topic in unit["topics"]:
            total_topics += 1
            if topic["exposure_level"] >= 1:
                covered_topics += 1

    if total_topics == 0:
        return 0

    return (covered_topics / total_topics) * 100
def average_exposure(course_data: dict):
    total_exposure = 0
    total_topics = 0

    for unit in course_data["units"]:
        for topic in unit["topics"]:
            total_exposure += topic["exposure_level"]
            total_topics += 1

    if total_topics == 0:
        return 0

    return total_exposure / total_topics
def topic_backlog(course_data: dict):
    backlog_count = 0

    for unit in course_data["units"]:
        for topic in unit["topics"]:
            if topic["exposure_level"] <= 1 or topic["last_revised_days"] > 30:
                backlog_count += 1

    return backlog_count
