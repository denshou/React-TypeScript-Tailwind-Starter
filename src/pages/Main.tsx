import { useParams } from "react-router-dom";
import MovieListContainer from "../components/MovieListContainer";
import { useParam } from "../stores/paramStore";
import { useEffect } from "react";
import { useModal } from "../stores/modalStore";
import YouTubePlayer from "../components/YouTubePlayer";

export default function Main() {
  const { movieId, personId } = useParams();
  const movieModalOpen = useModal((state) => state.movieModalOpen);
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const setMovieIdParam = useParam((state) => state.setMovieIdParam);

  const detailModalOpen = useModal((state) => state.detailModalOpen);
  const setDetailModalOpen = useModal((state) => state.setDetailModalOpen);
  const setPersonIdParam = useParam((state) => state.setPersonIdParam);

  useEffect(() => {
    if (!movieId) setMovieIdParam(null);
    else setMovieIdParam(Number(movieId));

    if (movieId && !movieModalOpen) {
      document.body.style.overflow = "hidden";
      setMovieModalOpen(true);
    }
  }, [movieId]);

  useEffect(() => {
    if (!personId) setPersonIdParam(null);
    else setPersonIdParam(Number(personId));

    if (personId && !detailModalOpen) setDetailModalOpen(true);
  }, [personId]);
  return (
    <div>
      <div className="mb-10">
        <YouTubePlayer videoId={"dnmA7lKiFsY"} />
      </div>
      <main>
        <MovieListContainer type="trending" />
        <MovieListContainer type="now_playing" />
        <MovieListContainer type="popular" />
      </main>
    </div>
  );
}
