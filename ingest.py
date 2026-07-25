project_name = "Enterprise Knowledge Agent"
version = "0.1"

print(f"{project_name} — Ingestion Pipeline v{version}")

with open("data/policy1.txt", "r") as f:
    content = f.read()

print("--- File contents ---")
print(content)