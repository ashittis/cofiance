import httpx

from .config import settings

RESEND_ENDPOINT = "https://api.resend.com/emails"


def send_application_confirmation(to: str, name: str) -> bool:
    """Send an apply-confirmation email via Resend. No-op (returns False) when
    RESEND_API_KEY is unset, so the apply flow never fails on email."""
    if not settings.resend_api_key or not to:
        return False

    first = name.split(" ")[0] if name else "there"
    html = f"""
      <div style="font-family:system-ui,sans-serif;max-width:480px">
        <h2 style="margin:0 0 12px">Application received 🎉</h2>
        <p>Hi {first}, thanks for applying to <b>Confiance Services</b>.</p>
        <p>You're now in our candidate pool. Our team will reach out about the
        next training batch near you.</p>
        <p style="color:#6b7280;font-size:13px;margin-top:24px">
          Confiance Services · Workforce Solutions</p>
      </div>
    """
    try:
        resp = httpx.post(
            RESEND_ENDPOINT,
            headers={"Authorization": f"Bearer {settings.resend_api_key}"},
            json={
                "from": settings.resend_from,
                "to": [to],
                "subject": "We received your Confiance application",
                "html": html,
            },
            timeout=10,
        )
        return resp.status_code < 300
    except Exception as e:  # network/email failures must not break the apply flow
        print(f"[email] send failed: {e}")
        return False
