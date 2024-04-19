import typing

from pydantic import Field
from pydantic_settings import BaseSettings


Environment = typing.Literal["local", "test", "development", "production"]


class Settings(BaseSettings):
    #: Service Name
    SERVICE_NAME: str

    #: Environment
    ENV: Environment = "local"

    #: Server Domain
    SERVER_NAME: typing.Optional[str] = "localhost"

    # redoc, swagger ui Access
    DOCS_UI_ALLOW: bool = False

    #: CORS
    CORS_ORIGIN: str = "*"

    class Config:
        env_prefix = "BACKEND_"

        env_file = ".env"
        env_file_encoding = "utf-8"


config = Settings()
