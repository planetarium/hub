from pydantic import BaseModel


class ModItemBase(BaseModel):
    title: str


class ModItemPublic(ModItemBase):
    id: int
    owner_id: int


class ModItemDetailPublic(ModItemPublic):
    description: str
    download_link: str


class ModItemsPublic(BaseModel):
    data: list[ModItemPublic]
    count: int


class ModItemCreate(ModItemDetailPublic):
    owner_id: int
