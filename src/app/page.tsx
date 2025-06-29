"use client";
import EditMovieModal from "@/components/editMovieModal";
import MovieItem from "@/components/movieItem";
import NewMovieModal from "@/components/newMovieModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<itemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      <Button
        onClick={() => {
          setIsEditModalOpen(true);
        }}
        variant="contained"
      >
        Adicionar Filme
      </Button>
      <NewMovieModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />
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
          <MovieItem item={item} key={index} setResults={setResults} />
        ))}
      </ul>
    </div>
  );
}
