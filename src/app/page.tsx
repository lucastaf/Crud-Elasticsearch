"use client";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<itemType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data.results);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 500); // ⏳ Delay de 500ms para debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Busca de filmes</h1>

      <input
        type="text"
        placeholder="Digite para buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1.2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      {loading && <p>🔎 Buscando...</p>}

      {!loading && results.length === 0 && query && (
        <p>Nenhum resultado encontrado.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
        {results.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "8px",
              marginBottom: "0.5rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <a href={"https://www.imdb.com/title/" + item.id} target="_blank">
              <Box className="flex gap-3">
                {item.poster && <img className="rounded-2xl" width="100" src={item.poster} />}
                <Box className="w-full">
                  <Box className="flex justify-between">
                    <Typography variant="h6">{item.title}</Typography>
                    <Rating
                      readOnly={true}
                      name="half-rating"
                      value={item.rating}
                      precision={0.5}
                    />
                  </Box>
                  <Typography>{item.release_year}</Typography>
                  <p>{item.genres.join(", ")}</p>
                </Box>
              </Box>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
