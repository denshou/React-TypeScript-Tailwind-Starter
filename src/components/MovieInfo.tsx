import { useNavigate } from "react-router-dom";
import { useModal } from "../stores/modalStore";
import { useEffect } from "react";
import Close from "../assets/close.svg";

export default function MovieInfo() {
  const navigate = useNavigate();
  const setMovieModalOpen = useModal((state) => state.setMovieModalOpen);
  const handleClose = () => {
    setMovieModalOpen(false);
    document.body.style.overflow = "auto";
    navigate(-1);
  };
  // URL이 변경되었을 때 모달 상태 처리
  useEffect(() => {
    const handlePopState = () => {
      if (!location.pathname.startsWith("/movie/")) {
        setMovieModalOpen(false);
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, setMovieModalOpen]);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-[#181818]/50 flex justify-center z-[9999] overflow-y-auto">
      <div>
        <div className="w-[916px] min-h-[93%] bg-[#181818] rounded-lg relative text-white mt-10 p-10 pt-20">
          <button
            type="button"
            className="absolute top-4 right-4 bg-[#181818] rounded-full p-[5px]"
            onClick={handleClose}
          >
            <img src={Close} className="w-[30px]" alt="close" />
          </button>
          <div className="flex">
            <div className="rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg`}
                className="w-[200px]"
                alt=""
              />
            </div>
            <div>
              <h2>레드 원</h2>
              <h3>
                크리스마스 실종 위기, 사라진 산타를 찾기 위한 대환장 플레이
              </h3>
              <h4>Red One</h4>
              <div>별점</div>
              <div>액션 판타지 코미디</div>
              <ul>
                <li>평점</li>
                <li>개봉일</li>
                <li>런타임</li>
              </ul>
            </div>
          </div>
          <div>공유하기</div>
          <div>영화 설명 전체</div>
          <div>출연진/credits</div>
          <div>영상/videos</div>
          <div>포스터/images</div>
          <div>제작진/credits</div>

          <div>끝</div>
        </div>
      </div>
    </div>
  );
}
