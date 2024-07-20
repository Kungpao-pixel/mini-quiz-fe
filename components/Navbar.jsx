import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          MiniQuiz<span className="text-info">App</span>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">
          <button className="btn btn-outline btn-error" >Logout</button>
            </Link>

          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
