import axios from "axios";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import MovieDetailsModal from "./movieDetailsModal";

export default function NewMovieModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
}) {
  async function uploadMovie(data: itemType) {
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
    <MovieDetailsModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onModalConfirm={uploadMovie}
      title="Cadastrar filme"
    />
  );
}
