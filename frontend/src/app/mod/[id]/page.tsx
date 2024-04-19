const temp = `"Athena" is a practical mod for Nine Chronicles, enhancing the game experience by allowing players to craft and modify any piece of equipment available in the game.
This mod empowers players to finely tune the stats and options of their gear, offering a tailored approach to their gaming experience.
With Athena, the creation and enhancement of equipment become a cornerstone of strategy, enabling players to optimize their gear for any situation.
Moreover, Athena's simulation feature stands out by allowing players to test their equipped gear against challenging stages an unlimited number of times.
This functionality enables players to experiment with different strategies and identify the most effective equipment configurations for progressing through the game.

Despite the benefits Athena brings to Nine Chronicles, we recognize there are areas in need of improvement, including the user interface and user experience, and the current constraint that enhancements are applied at their maximum levels automatically.
Our team is committed to addressing these issues and more, with ongoing development to refine and expand the mod's capabilities.

Athena Mod Installation Guide (Windows Only)
Download the zip file. https://github.com/planetarium/NineChronicles.Mods/releases
Press the Windows key + R to open the Run dialog, then type %USERPROFILE%\AppData\Roaming\Nine Chronicles\player\main and press Enter.
In the folder that opens, paste the contents of the zip file (make sure to copy the contents inside the Athena folder).
Launch the game, and after the loading screen finishes, press the Space bar to activate the mod.

We look forward to continuously improving Athena, aiming to make it an essential enhancement for all Nine Chronicles players.`;

const ModDetail = () => {
  return (
    <div>
      <div className="w-full">
        <img
          src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
          className="w-full"
        />
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Users</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">{temp}</div>
      </div>

      <button className="btn btn-primary">
        Download Link 
      </button>
    </div>
  );
};

export default ModDetail;
