from fastapi import Header, HTTPException, status

from .config import settings


# Admin endpoints require the shared secret in the X-Admin-Key header. The Next.js
# server attaches it (from env) only after a user passes NextAuth login, so the key
# never reaches the browser.
def require_admin(x_admin_key: str | None = Header(default=None, alias="X-Admin-Key")):
    if not settings.admin_api_key or x_admin_key != settings.admin_api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin key"
        )
    return True
