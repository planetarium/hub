from fastapi import APIRouter

from app.models.mod import ModItemDetailPublic, ModItemPublic, ModItemsPublic, ModItemCreate

router = APIRouter(
    prefix="/mod",
    tags=["mod"],
)


@router.get("/", response_model=ModItemsPublic)
def read_mods():
    """
    Retrieve mods

    """

    return ModItemsPublic(
        data=[
            ModItemPublic(title="Ares", id=1, owner_id=1),
            ModItemPublic(title="Athena", id=2, owner_id=2),
        ],
        count=2,
    )


@router.get("/{id}", response_model=ModItemDetailPublic)
def read_mod(id: int):
    """
    Retrieve mods

    """

    return ModItemDetailPublic(
        title="Ares",
        description="""Athena is a practical mod for Nine Chronicles, enhancing the game experience by allowing players to craft and modify any piece of equipment available in the game.
This mod empowers players to finely tune the stats and options of their gear, offering a tailored approach to their gaming experience.
With Athena, the creation and enhancement of equipment become a cornerstone of strategy, enabling players to optimize their gear for any situation.
Moreover, Athena's simulation feature stands out by allowing players to test their equipped gear against challenging stages an unlimited number of times.
This functionality enables players to experiment with different strategies and identify the most effective equipment configurations for progressing through the game.

Despite the benefits Athena brings to Nine Chronicles, we recognize there are areas in need of improvement, including the user interface and user experience, and the current constraint that enhancements are applied at their maximum levels automatically.
Our team is committed to addressing these issues and more, with ongoing development to refine and expand the mod's capabilities.

Athena Mod Installation Guide (Windows Only)
Download the zip file: https://github.com/planetarium/NineChronicles.Mods/releases
Press the Windows key + R to open the Run dialog, then type %USERPROFILE%\\AppData\\Roaming\\Nine Chronicles\\player\\main and press Enter.
In the folder that opens, paste the contents of the zip file (make sure to copy the contents inside the Athena folder).
Launch the game, and after the loading screen finishes, press the Space bar to activate the mod.

We look forward to continuously improving Athena, aiming to make it an essential enhancement for all Nine Chronicles players.""",
        download_link="https://github.com/planetarium/NineChronicles.Mods/releases",
        id=1,
        owner_id=1,
    )

@router.post("/", response_model=ModItemDetailPublic)
def create_mod(mod_in: ModItemCreate):
    """
    Retrieve mods

    """

    return ModItemDetailPublic(
        title="Ares",
        description="""Athena is a practical mod for Nine Chronicles, enhancing the game experience by allowing players to craft and modify any piece of equipment available in the game.
This mod empowers players to finely tune the stats and options of their gear, offering a tailored approach to their gaming experience.
With Athena, the creation and enhancement of equipment become a cornerstone of strategy, enabling players to optimize their gear for any situation.
Moreover, Athena's simulation feature stands out by allowing players to test their equipped gear against challenging stages an unlimited number of times.
This functionality enables players to experiment with different strategies and identify the most effective equipment configurations for progressing through the game.

Despite the benefits Athena brings to Nine Chronicles, we recognize there are areas in need of improvement, including the user interface and user experience, and the current constraint that enhancements are applied at their maximum levels automatically.
Our team is committed to addressing these issues and more, with ongoing development to refine and expand the mod's capabilities.

Athena Mod Installation Guide (Windows Only)
Download the zip file: https://github.com/planetarium/NineChronicles.Mods/releases
Press the Windows key + R to open the Run dialog, then type %USERPROFILE%\\AppData\\Roaming\\Nine Chronicles\\player\\main and press Enter.
In the folder that opens, paste the contents of the zip file (make sure to copy the contents inside the Athena folder).
Launch the game, and after the loading screen finishes, press the Space bar to activate the mod.

We look forward to continuously improving Athena, aiming to make it an essential enhancement for all Nine Chronicles players.""",
        download_link="https://github.com/planetarium/NineChronicles.Mods/releases",
        id=1,
        owner_id=1,
    )
