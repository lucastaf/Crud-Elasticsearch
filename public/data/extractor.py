#Fonte dos arquivos CSV usado para gerar o JSON: https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset

import pandas as pd
import json
from ast import literal_eval

# 🔥 Carregar os CSVs
print("Importando metadata")
movies = pd.read_csv("movies_metadata.csv", low_memory=False)
print("Importando creditos")
credits = pd.read_csv("credits.csv")
print("Importando ratings")
ratings = pd.read_csv("ratings.csv")
print("Importando links")
links = pd.read_csv("links.csv")

# 🔗 Preparar dados de links para obter IMDb ID
links = links[["movieId", "imdbId"]].dropna()

# 🔧 Ajustar tipos
movies["id"] = pd.to_numeric(movies["id"], errors="coerce")
links["movieId"] = pd.to_numeric(links["movieId"], errors="coerce")
ratings["movieId"] = pd.to_numeric(ratings["movieId"], errors="coerce")
credits["id"] = pd.to_numeric(credits["id"], errors="coerce")

# 🔥 Merge dos dados
df = movies.merge(links, left_on="id", right_on="movieId", how="inner")
df = df.merge(credits, left_on="id", right_on="id", how="left")
df = df.merge(
    ratings.groupby("movieId").mean().reset_index(),
    left_on="id",
    right_on="movieId",
    how="left",
)


# 📦 Função para extrair gêneros
def parse_genres(genre_str):
    try:
        genres = literal_eval(genre_str)
        return [g["name"] for g in genres] if isinstance(genres, list) else []
    except:
        return []


# 🎥 Função para extrair criadores (diretores, roteiristas, etc.)
def parse_creators(crew_str):
    try:
        crew = json.loads(crew_str.replace("'", '"'))
        creators = [
            member["name"]
            for member in crew
            if member.get("job") in ["Director", "Writer", "Screenplay"]
        ]
        return list(set(creators))
    except:
        return []


# 🖼️ Função para gerar URL da imagem
def get_poster_url(poster_path):
    if pd.isna(poster_path):
        return None
    return f"https://image.tmdb.org/t/p/w500{poster_path}"


# 🚀 Montagem do JSON final
output = []

for _, row in df.iterrows():
    belongs_to_collection = row["belongs_to_collection"]
    poster = None
    if(isinstance(belongs_to_collection, str)):
        belongs_to_collection = literal_eval(belongs_to_collection)
        poster = belongs_to_collection["poster_path"]
        poster = get_poster_url(poster)
    movie = {
        "id": (
            f"tt{int(row['imdbId']):07}" if pd.notna(row["imdbId"]) else str(row["id"])
        ),
        "title": row["title"],
        "genres": parse_genres(row["genres"]),
        "release_year": (
            str(row["release_date"])[:4] if pd.notna(row["release_date"]) else None
        ),
        "poster": poster,
        "creators": parse_creators(row["crew"]) if pd.notna(row["crew"]) else [],
        "rating": round(row["rating"], 2) if pd.notna(row["rating"]) else None,
    }
    print("Apeding movie: " + movie["title"])
    output.append(movie)

# 💾 Exportar para JSON
with open("movies_dataset.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=4)

print(f"✅ Exportado {len(output)} filmes para movies_dataset.json")
