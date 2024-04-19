const ModCard = () => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Ares</h2>
        <p>
          This site is designed to compute win rates for arena battles and
          allows users to explore arena rankings.
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Arena</div>
          <div className="badge badge-outline">Website</div>
        </div>
      </div>
    </div>
  );
};

const ModListPage = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_16.666666%)] gap-6 w-full justify-center">
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
