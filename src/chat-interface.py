import requests

BASE = input("Enter your ngrok URL: ").strip()

print("[Health check]", requests.get(f"{BASE}/health").json())
print("Type your question (or 'exit' to quit)")

while True:
    q = input("> ")
    if q.lower() in {"exit", "quit"}:
        break
    res = requests.post(f"{BASE}/chat", json={"query": q}).json()
    print("Answer:", res.get("answer", ""))
    print("Sources:", res.get("sources", ""))

