import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const trimmed = event.target.value.trim();

    if (trimmed) {
      router.push(`/?title=${encodeURIComponent(trimmed)}`, undefined, {
        shallow: true,
      });
    } else {
      router.push("/", undefined, { shallow: true });
    }
  };

  return (
    <nav className="w-full">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Mod Hub
          </Link>
        </div>

        {router.pathname === "/" && (
          <div className="flex-none gap-2">
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue="Unity"
            >
              <option value="Unity">Unity</option>
              <option>Website</option>
            </select>

            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
