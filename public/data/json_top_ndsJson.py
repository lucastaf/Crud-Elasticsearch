import json

# Ler o JSON normal (lista)
with open("movies_dataset.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Escrever no formato NDJSON
with open("movies_dataset.ndjson", "w", encoding="utf-8") as f:
    for item in data:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")

print("✅ Arquivo convertido para NDJSON com sucesso!")
