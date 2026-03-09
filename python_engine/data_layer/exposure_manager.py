"""
Exposure Manager
Owner: Ayush

Purpose:
Manage exposure lifecycle updates.
This module updates exposure levels based on actions, decay, and test results.

Exposure Levels:
0 = Not Studied
1 = Read
2 = Practiced
3 = Revised
4 = Tested

Rules:

1. Exposure Increase Rules
- "read"      : 0 → 1
- "practice"  : 1 → 2
- "revise"    : 2 → 3
- "test"      : 3 → 4 (only if test_score >= 70)

Exposure must move sequentially.
No skipping levels.

2. Decay Rules
- If last_revised_days > 30 and exposure_level >= 2:
    decrease exposure by 1
- Exposure never drops below 1 automatically.
- Level 4 decays to 3 after 45+ days without revision.

3. Test Score Override
- If exposure_level == 3 and test_score >= 70:
    allow upgrade to 4
- If exposure_level == 4 and test_score < 40:
    downgrade to 2

4. Post Exam Reset (manual trigger only)
- Soft Reset:
    4 → 3
    3 → 2
- Full Reset:
    All exposure → 0

All functions must:
- Be pure
- Not modify original object
- Return updated copy
"""
import copy


def update_exposure_on_action(topic: dict, action: str):
    """
    Updates exposure level based on learning action.
    Returns updated copy of topic.
    """

    updated_topic = copy.deepcopy(topic)
    current_level = updated_topic["exposure_level"]

    if action == "read" and current_level == 0:
        updated_topic["exposure_level"] = 1

    elif action == "practice" and current_level == 1:
        updated_topic["exposure_level"] = 2

    elif action == "revise" and current_level == 2:
        updated_topic["exposure_level"] = 3

    return updated_topic
def apply_decay(topic: dict):
    """
    Applies exposure decay based on last_revised_days.
    Returns updated copy of topic.
    """

    updated_topic = copy.deepcopy(topic)
    level = updated_topic["exposure_level"]
    days = updated_topic["last_revised_days"]

    # Level 4 decays after 45 days
    if level == 4 and days > 45:
        updated_topic["exposure_level"] = 3

    # Levels 2 or 3 decay after 30 days
    elif level >= 2 and days > 30:
        updated_topic["exposure_level"] = level - 1

    # Exposure never drops below 1 automatically
    if updated_topic["exposure_level"] < 1:
        updated_topic["exposure_level"] = 1

    return updated_topic
def apply_test_result(topic: dict, test_score: float):
    """
    Updates exposure level based on test score.
    Returns updated copy of topic.
    """

    updated_topic = copy.deepcopy(topic)
    level = updated_topic["exposure_level"]

    # Upgrade to Tested
    if level == 3 and test_score >= 70:
        updated_topic["exposure_level"] = 4

    # Knowledge unstable — downgrade
    elif level == 4 and test_score < 40:
        updated_topic["exposure_level"] = 2

    return updated_topic
def soft_reset(topic: dict):
    """
    Soft reset after exam.
    4 → 3
    3 → 2
    Others unchanged.
    """

    updated_topic = copy.deepcopy(topic)
    level = updated_topic["exposure_level"]

    if level == 4:
        updated_topic["exposure_level"] = 3
    elif level == 3:
        updated_topic["exposure_level"] = 2

    return updated_topic


def full_reset(topic: dict):
    """
    Full reset after exam.
    All exposure levels → 0
    """

    updated_topic = copy.deepcopy(topic)
    updated_topic["exposure_level"] = 0
    return updated_topic
