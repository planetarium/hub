from fastapi import APIRouter

from app.models.status import Status

router = APIRouter(
    prefix="",
    tags=["status"],
)


@router.get("/", response_model=Status)
def health_check():
    """
    Health Check API

    """

    return Status(status="OK")
