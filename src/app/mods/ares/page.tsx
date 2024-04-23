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

      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>

      <p className="text-4xl">Ares</p>
      <p>
        Athena is a practical mod for Nine Chronicles, enhancing the game
        experience by allowing players to craft and modify any piece of
        equipment available in the game
      </p>

      <div className="divider">About</div>

      <div className="w-full border rounded-md p-4">
        <div>{temp}</div>
        <button className="btn btn-primary">Download Link</button>
      </div>
    </div>
  );
};

export default ModDetail;
