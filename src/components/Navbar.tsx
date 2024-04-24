import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Mod Hub
          </Link>
        </div>
        <div className="flex-none gap-2">
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Categories
            </option>
            <option>Unity</option>
            <option>Website</option>
          </select>

          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
