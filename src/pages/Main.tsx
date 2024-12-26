
import SlickBannerSlide from "../components/SlickBannerSlide";
import SlickSlide from "../components/SlickSlide";


export default function Main() {
  return (
    <div>
      <div>
        <SlickBannerSlide />
      </div>
      <main>
        <div className="list-container">
          <h2>현재 상영중인 영화</h2>
          <div className="flex flex-col items-center">
            <SlickSlide />
          </div>
        </div>

        <div className="list-container">
          <h2>현재 상영중인 TV</h2>
          <div className="flex flex-col items-center">
            <SlickSlide />
          </div>
        </div>
      </main>
    </div>
  );
}
