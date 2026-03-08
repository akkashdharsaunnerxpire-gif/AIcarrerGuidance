import random
import pandas as pd

# ==============================
# CORE (HIGH SKILL) CAREERS
# ==============================
CORE_CAREER_SKILLS = {
    "AI / ML Engineer": {
        "programming": (6, 9),
        "ai_ml": (7, 10),
        "data_science": (6, 9),
        "web": (2, 5),
        "communication": (4, 7),
        "leadership": (3, 6),
        "creativity": (3, 6),
        "management": (2, 5)
    },
    "Data Scientist": {
        "programming": (5, 8),
        "ai_ml": (6, 9),
        "data_science": (7, 10),
        "web": (2, 5),
        "communication": (4, 7),
        "leadership": (3, 6),
        "creativity": (3, 6),
        "management": (2, 5)
    },
    "Full Stack Developer": {
        "programming": (6, 9),
        "ai_ml": (2, 5),
        "data_science": (3, 6),
        "web": (7, 10),
        "communication": (4, 7),
        "leadership": (3, 6),
        "creativity": (4, 7),
        "management": (3, 6)
    },
    "Cyber Security Analyst": {
        "programming": (6, 9),
        "ai_ml": (3, 6),
        "data_science": (3, 6),
        "web": (3, 6),
        "communication": (4, 7),
        "leadership": (3, 6),
        "creativity": (2, 5),
        "management": (2, 5)
    },
    "Project Manager": {
        "programming": (2, 5),
        "ai_ml": (1, 4),
        "data_science": (2, 5),
        "web": (2, 5),
        "communication": (7, 10),
        "leadership": (7, 10),
        "creativity": (3, 6),
        "management": (7, 10)
    }
}

# ==============================
# ENTRY (LOW SKILL) CAREERS
# ==============================
ENTRY_CAREER_SKILLS = {
    "Junior Web Developer": {
        "programming": (1, 4),
        "ai_ml": (0, 2),
        "data_science": (0, 2),
        "web": (3, 6),
        "communication": (3, 6),
        "leadership": (1, 3),
        "creativity": (3, 6),
        "management": (1, 3)
    },
    "Software Tester (QA)": {
        "programming": (1, 3),
        "ai_ml": (0, 2),
        "data_science": (1, 3),
        "web": (1, 3),
        "communication": (4, 7),
        "leadership": (2, 4),
        "creativity": (2, 5),
        "management": (1, 3)
    },
    "Digital Marketing Executive": {
        "programming": (0, 2),
        "ai_ml": (0, 1),
        "data_science": (0, 2),
        "web": (1, 3),
        "communication": (5, 8),
        "leadership": (2, 4),
        "creativity": (5, 8),
        "management": (2, 4)
    },
    "HR Executive": {
        "programming": (0, 1),
        "ai_ml": (0, 1),
        "data_science": (0, 1),
        "web": (0, 2),
        "communication": (6, 9),
        "leadership": (4, 7),
        "creativity": (3, 6),
        "management": (5, 8)
    }
}

FIELDS = [
    "programming", "ai_ml", "data_science", "web",
    "communication", "leadership", "creativity", "management"
]

def generate_rows(career_map, total_rows):
    rows = []
    for _ in range(total_rows):
        career = random.choice(list(career_map.keys()))
        ranges = career_map[career]

        row = {}
        for field in FIELDS:
            low, high = ranges[field]
            row[field] = random.randint(low, high)

        row["career"] = career
        rows.append(row)
    return rows


# 🔥 Generate datasets
core_rows = generate_rows(CORE_CAREER_SKILLS, 800)
entry_rows = generate_rows(ENTRY_CAREER_SKILLS, 400)

# 🔗 Merge datasets
final_df = pd.DataFrame(core_rows + entry_rows)
final_df.to_csv("career_dataset.csv", index=False)

print("✅ Final dataset generated")
print("Core careers:", len(core_rows))
print("Entry careers:", len(entry_rows))
print("Total rows:", len(final_df))
