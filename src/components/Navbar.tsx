import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCloudPlus } from "react-icons/bs";

interface NavbarProps {
  tags: string[];
}

const Navbar = ({ tags }: NavbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const updateQueryParams = (newParams: {
    [key: string]: string | undefined;
  }) => {
    const currentQuery: { [key: string]: string | string[] } = {};

    Object.keys(router.query).forEach((key) => {
      const value = router.query[key];
      if (value !== undefined) {
        currentQuery[key] = value;
      }
    });

    Object.keys(newParams).forEach((key) => {
      const value = newParams[key];
      if (value === undefined) {
        delete currentQuery[key];
      } else {
        currentQuery[key] = value;
      }
    });

    const queryString = Object.keys(currentQuery)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            currentQuery[key] as string
          )}`
      )
      .join("&");

    router.push(`/?${queryString}`, undefined, { shallow: true });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const trimmed = event.target.value.trim();

    updateQueryParams({ title: trimmed || undefined });
  };

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const tag = event.target.value;
    updateQueryParams({ tag: tag || undefined });
  };

  return (
    <div className="navbar bg-base-100 border-b justify-center">
      <div className="w-full max-w-screen-xl flex justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">Mods</Link>
              </li>
              <li>
                <Link href="/bounties">Bounties</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost text-xl">
            Hub
          </Link>
        </div>
        <div className="flex gap-4 navbar-end">
          {router.pathname === "/" && (
            <div
              className="tooltip tooltip-bottom content-end mb-1"
              data-tip="Register your mod"
            >
              <Link
                href="https://github.com/planetarium/hub?tab=readme-ov-file#contributing-to-the-mod-hub"
                target="_blank"
              >
                <BsCloudPlus />
              </Link>
            </div>
          )}

          {router.pathname === "/bounties" && (
            <div
              className="tooltip tooltip-bottom content-end mb-1"
              data-tip="Register Bounty"
            >
              <Link
                href="/bounties/register"
              >
                <BsCloudPlus />
              </Link>
            </div>
          )}

          {router.pathname === "/" && (
            <>
              <select
                className="select select-bordered max-w-xs"
                onChange={handleTagChange}
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
