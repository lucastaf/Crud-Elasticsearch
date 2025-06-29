import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import MovieDetailsModal from "./movieDetailsModal";

export default function EditMovieModal({
  movieDetails,
  isOpen,
  setIsOpen,
  onMovieEdit,
}: {
  movieDetails: itemType;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onMovieEdit: (data: itemType) => void;
}) {
  async function uploadMovie(data: itemType) {
    const id = data._id;
    delete data._id;
    const resAxios = axios.patch(`/api/update/${id}`, data);
    toast.promise(resAxios, {
      loading: "Editando filme",
      error: "Erro ao editar filme",
      success: () => {
        setIsOpen(false);
        return "Filme editado com sucesso";
      },
    });

    data._id = id;

    onMovieEdit(data);
  }

  return (
    <MovieDetailsModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onModalConfirm={uploadMovie}
      defaultValue={movieDetails}
      title="Editar Filme"
    />
  );
}
