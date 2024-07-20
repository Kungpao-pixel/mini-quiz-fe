import Link from "next/link";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl" href="/">MiniQuiz<span className="text-info">App</span></a>
    
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <Link href="/login">
    <button className="btn btn-outline btn-info">Login</button>
    </Link>
    </ul>
  </div>
</div>
  );
};

export default Header;
