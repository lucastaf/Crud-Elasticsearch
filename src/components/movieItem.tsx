import { Box, Button, Rating, Typography } from "@mui/material";
import axios from "axios";
import { CircleX, PencilLine } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import EditMovieModal from "./editMovieModal";

export default function MovieItem(data: {
  item: itemType;
  setResults: Dispatch<SetStateAction<itemType[]>>;
}) {
  const { item, setResults } = data;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <li
      style={{
        padding: "1rem",
        border: "1px solid #eee",
        borderRadius: "8px",
        marginBottom: "0.5rem",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <EditMovieModal
        movieDetails={item}
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        onMovieEdit={(data) => {
          setResults((prev) => {
            const index = prev.findIndex((movie) => movie._id == item._id);
            if (index > -1) {
              prev[index] = data;
              return [...prev];
            }
            return prev;
          });
        }}
      />
      <a href={"https://www.imdb.com/title/" + item.id} target="_blank">
        <Box className="flex gap-3">
          {item.poster && (
            <img className="rounded-2xl" width="100" src={item.poster} />
          )}
          <Box className="w-full flex flex-col justify-between">
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
            <Box className="flex justify-end">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditModalOpen(true);
                }}
                className="ml-auto"
              >
                <PencilLine />
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  const resAxios = axios.delete(`/api/delete/${item._id}`);

                  toast.promise(resAxios, {
                    loading: "Excluindo filme",
                    success: () => {
                      setResults((prev) => {
                        return prev.filter((items) => items._id != item._id);
                      });
                      return "Filme excluido com sucesso";
                    },
                    error: "Erro ao excluir o filme",
                  });
                }}
                className="ml-auto"
              >
                <CircleX color="red" />
              </Button>
            </Box>
          </Box>
        </Box>
      </a>
    </li>
  );
}
