const ModRegister = () => {
  return (
    <div className="card w-3/6 bg-base-100 shadow-xl">
      <div className="card-body">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Title" />
        </label>
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        ></textarea>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick a image</span>
            <span className="label-text-alt">Alt label</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt">Alt label</span>
            <span className="label-text-alt">Alt label</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ModRegister;
