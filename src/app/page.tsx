"use client"
import { useState, useEffect } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Busca no Elasticsearch</h1>

      <input
        type="text"
        placeholder="Digite para buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1.2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      />

      {loading && <p>🔎 Buscando...</p>}

      {!loading && results.length === 0 && query && <p>Nenhum resultado encontrado.</p>}

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {results.map((item, index) => (
          <li
            key={index}
            style={{
              padding: '1rem',
              border: '1px solid #eee',
              borderRadius: '8px',
              marginBottom: '0.5rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            }}
          >
            <strong>{item.title}</strong>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
