import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
        <div>
          <Link href="/" className="btn btn-ghost text-xl">
            Hub
          </Link>
          <Link href="https://github.com/planetarium/hub" className="ml-2 underline text-xs">
            Register your mod
          </Link>
        </div>
        {router.pathname === "/" && (
          <div className="flex gap-4">
            <select
              className="select select-bordered w-full max-w-xs"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
