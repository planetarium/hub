import Link from 'next/link'
 

const ModCard = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Ares</h2>
        <p>
          This site is designed to compute win rates for arena battles and
          allows users to explore arena rankings.
        </p>
        <div className="flex gap-2">
          <div className="badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            +99
          </div>
          <div className="badge badge-outline">Arena</div>
          <div className="badge badge-primary badge-outline">Website</div>
        </div>
        <div className="card-actions justify-end">
          <Link href="/mods/1" className="btn btn-primary">Detail</Link>
        </div>
      </div>
    </div>
  );
};

const ModListPage = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <ModCard />
      <ModCard />
      <ModCard />
      <ModCard />
      <ModCard />
      <ModCard />
      <ModCard />
      <ModCard />
      <ModCard />
    </div>
  );
};

export default ModListPage;
