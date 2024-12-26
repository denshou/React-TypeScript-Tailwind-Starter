import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="font-bebas text-[44px]">DFLIX</h1>
      </Link>

      <div>
        <button type="button">search</button>
        <button type="button">로그인</button>
      </div>
    </div>
  );
}
