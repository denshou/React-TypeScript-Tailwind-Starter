import { useNavigate } from "react-router-dom";
import { useModal } from "../stores/modalStore";
import { useEffect, useState } from "react";
import Close from "../assets/close.svg";
import { useParam } from "../stores/paramStore";

import { getPersonDetails, getPersonMovieCredits } from "../apis/getPerson";

export default function DetailInfo() {
  const navigate = useNavigate();

  const setDetailModalOpen = useModal((state) => state.setDetailModalOpen);

  const personId = useParam((state) => state.personIdParam);
  const setPersonId = useParam((state) => state.setPersonIdParam);

  const [currentPerson, setCurrentPerson] = useState<PersonDetailType | null>(
    null
  );
  const [currentPersonCredits, setCurrentPersonCredits] = useState<
    PersonMovieCreditType[] | null
  >(null);

  const handleClose = () => {
    setPersonId(null);
    setDetailModalOpen(false);
    navigate(-1);
  };

  const getCurrentPerson = async () => {
    if (personId) {
      try {
        const current = await getPersonDetails(personId);
        setCurrentPerson(current);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getPersonCredits = async () => {
    if (personId) {
      try {
        const appearances = await getPersonMovieCredits(personId);
        setCurrentPersonCredits(appearances);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePosterClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setDetailModalOpen(false);
  };

  // URL이 변경되었을 때 모달 상태 처리
  useEffect(() => {
    const handlePopState = () => {
      if (!location.pathname.includes("/person/")) {
        setDetailModalOpen(false);
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, setDetailModalOpen]);

  useEffect(() => {
    if (personId) {
      getCurrentPerson();
      getPersonCredits();
    }
  }, [personId]);

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 bg-[#222222]/90 flex justify-center overflow-y-auto z-[200]"
      onClick={handleClose}
    >
      <div>
        <div
          className="w-[916px] min-h-[40%] bg-[#303030] rounded-lg relative text-white mt-[280px] p-10 pt-20"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute top-4 right-4 bg-[#222222] rounded-full p-[5px]"
            onClick={handleClose}
          >
            <img src={Close} className="w-[30px]" alt="close" />
          </button>
          <div className="flex">
            <div className="rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500/${currentPerson?.profile_path}`}
                className="w-[200px]"
                alt=""
              />
            </div>
            <div>
              <h2>{currentPerson?.name}</h2>
              <ul>
                <li>{currentPerson?.birthday}</li>
                <li>{currentPerson?.place_of_birth}</li>
                <li>{currentPerson?.popularity} / 100</li>
              </ul>
            </div>
          </div>
          <div className="overflow-hidden">
            <p>출연작</p>
            <div className="grid grid-cols-4 gap-3">
              {currentPersonCredits ? (
                currentPersonCredits.map((movie) => (
                  <div
                    key={movie.id}
                    className="cursor-pointer"
                    onClick={() => handlePosterClick(movie.id)}
                  >
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        className="object-cover rounded-[4px] max-h-[400px] aspect-[2/3]"
                        alt="movie-poster"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>

          <div>끝</div>
        </div>
      </div>
    </div>
  );
}
