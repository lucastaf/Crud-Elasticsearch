import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function NewMovieModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
}) {
  async function uploadMovie(e: FormEvent<HTMLFormElement>) {
    console.log(e);
    const data = {
      title: e.target[0].value,
      id: e.target[2].value,
      poster: e.target[4].value,
      genres: e.target[6].value?.split(",").filter((items) => items != ""),
      release_year: parseInt(e.target[8].value),
      rating: parseFloat(e.target[10].value),
    };

    const resAxios = axios.post("/api/create", data);
    toast.promise(resAxios, {
      loading: "Cadastrando filme",
      error: "Erro ao cadastrar filme",
      success: () => {
        setIsOpen(false);
        return "Filme cadastrado com sucesso";
      },
    });
  }
  return (
    <Dialog fullWidth open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent>
        <DialogTitle>Cadastro de filme</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadMovie(e);
          }}
          className="flex flex-col gap-3 w-full"
        >
          <TextField placeholder="Toy Story" label="Titulo" />
          <TextField placeholder="idtt0114709" label="Id do IMDB" />
          <TextField
            placeholder="https://image.tmdb.org/t/p/w500/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg"
            label="Poster"
          />
          <TextField
            placeholder="Animation, Comedy, Family"
            label="Genêros do filme (Em Inglês e seperados por vírgula)"
          />
          <TextField placeholder="1995" label="Ano de lançamento" />
          <TextField placeholder="3.6" label="Nota" />

          <Button variant="contained" type="submit">
            Cadastrar Filme{" "}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
