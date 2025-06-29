import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FormEvent } from "react";

export default function MovieDetailsModal(data: {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
  onModalConfirm: (a: itemType) => void;
  defaultValue?: itemType;
  title: string;
}) {
  const { isOpen, setIsOpen, onModalConfirm, defaultValue, title } = data;

  function onConfirm(e: FormEvent<HTMLFormElement>) {
    const data: itemType = {
      title: e.target[0].value,
      id: e.target[2].value,
      poster: e.target[4].value,
      genres: e.target[6].value?.split(",").filter((items) => items != ""),
      release_year: parseInt(e.target[8].value),
      rating: parseFloat(e.target[10].value),
      ...(defaultValue ? { _id: defaultValue._id } : {}),
    };
    onModalConfirm(data);
  }
  return (
    <Dialog fullWidth open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm(e);
          }}
          className="flex flex-col gap-3 w-full"
        >
          <TextField
            defaultValue={defaultValue?.title}
            placeholder="Toy Story"
            label="Titulo"
          />
          <TextField
            defaultValue={defaultValue?.id}
            placeholder="idtt0114709"
            label="Id do IMDB"
          />
          <TextField
            defaultValue={defaultValue?.poster}
            placeholder="https://image.tmdb.org/t/p/w500/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg"
            label="Poster"
          />
          <TextField
            defaultValue={defaultValue?.genres}
            placeholder="Animation, Comedy, Family"
            label="Genêros do filme (Em Inglês e seperados por vírgula)"
          />
          <TextField
            defaultValue={defaultValue?.release_year}
            placeholder="1995"
            label="Ano de lançamento"
          />
          <TextField
            defaultValue={defaultValue?.rating}
            placeholder="3.6"
            label="Nota"
          />

          <Button variant="contained" type="submit">
            {title}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
