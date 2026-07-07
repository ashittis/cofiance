import html

import httpx

from .config import settings

RESEND_ENDPOINT = "https://api.resend.com/emails"


def send_application_confirmation(to: str, name: str) -> bool:
    """Send an apply-confirmation email via Resend. No-op (returns False) when
    RESEND_API_KEY is unset, so the apply flow never fails on email."""
    if not settings.resend_api_key or not to:
        return False

    first = name.split(" ")[0] if name else "there"
    body = f"""
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
                "html": body,
            },
            timeout=10,
        )
        return resp.status_code < 300
    except Exception as e:  # network/email failures must not break the apply flow
        print(f"[email] send failed: {e}")
        return False


# --------------------------------------------------------------------------- #
# Owner notifications (new applicant / new enquiry) -> settings.notify_email
# --------------------------------------------------------------------------- #

def _send(subject: str, html_body: str) -> bool:
    """Send a notification to the owner. No-op (returns False) unless BOTH a
    Resend key and a notify address are configured, so submissions never fail
    on email."""
    if not settings.resend_api_key or not settings.notify_email:
        return False
    try:
        resp = httpx.post(
            RESEND_ENDPOINT,
            headers={"Authorization": f"Bearer {settings.resend_api_key}"},
            json={
                "from": settings.resend_from,
                "to": [settings.notify_email],
                "subject": subject,
                "html": html_body,
            },
            timeout=10,
        )
        return resp.status_code < 300
    except Exception as e:  # never break the request path on email failure
        print(f"[email] notify failed: {e}")
        return False


def _row(label: str, value: str | None) -> str:
    safe = html.escape(value) if value else "—"
    return (
        '<tr>'
        '<td style="padding:9px 0;border-bottom:1px solid #f0f0f0;color:#8a8a8a;'
        f'font-size:13px;width:130px;vertical-align:top">{html.escape(label)}</td>'
        '<td style="padding:9px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;'
        f'font-size:14px;font-weight:600">{safe}</td>'
        '</tr>'
    )


def _shell(title: str, subtitle: str, rows_html: str, cta_url: str) -> str:
    return (
        '<div style="background:#f4f4f1;padding:24px 0;font-family:system-ui,'
        '-apple-system,Segoe UI,sans-serif">'
        '<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;'
        'overflow:hidden;border:1px solid #eaeaea">'
        '<div style="background:#0a0a0a;padding:22px 28px">'
        '<div style="height:4px;width:44px;background:#dfff5e;border-radius:2px;'
        'margin-bottom:14px"></div>'
        f'<h1 style="margin:0;color:#fff;font-size:18px;font-weight:700">{title}</h1>'
        f'<p style="margin:5px 0 0;color:#9a9a9a;font-size:13px">{subtitle}</p>'
        '</div>'
        '<div style="padding:22px 28px">'
        f'<table style="width:100%;border-collapse:collapse">{rows_html}</table>'
        f'<a href="{cta_url}" style="display:inline-block;margin-top:22px;'
        'background:#dfff5e;color:#0a0a0a;text-decoration:none;font-weight:700;'
        'font-size:14px;padding:11px 20px;border-radius:10px">Open admin panel &rarr;</a>'
        '</div>'
        '<div style="padding:14px 28px;background:#fafafa;border-top:1px solid #eee;'
        'color:#aaa;font-size:12px">Confiance Services &middot; automated notification</div>'
        '</div></div>'
    )


def send_application_notification(a: dict) -> bool:
    """Email the owner the full details of a new job-seeker registration."""
    name = a.get("full_name") or "Someone"
    rows = (
        _row("Name", a.get("full_name"))
        + _row("Phone", a.get("phone"))
        + _row("Email", a.get("email"))
        + _row("City", a.get("city"))
        + _row("Industries", a.get("sector_pref"))
        + _row("Experience", a.get("experience"))
        + _row("Availability", a.get("availability"))
    )
    body = _shell(
        "New applicant registered",
        "A candidate just applied on confianceservices.in",
        rows,
        "https://confianceservices.in/admin/applicants",
    )
    return _send(f"New applicant: {name} ({a.get('city') or '—'})", body)


def send_enquiry_notification(e: dict) -> bool:
    """Email the owner the full details of a new Contact / hire-staff enquiry."""
    name = e.get("name") or "Someone"
    rows = (
        _row("Name", e.get("name"))
        + _row("Company", e.get("company"))
        + _row("Phone", e.get("phone"))
        + _row("City", e.get("city"))
        + _row("Services", e.get("services"))
        + _row("Message", e.get("message"))
    )
    body = _shell(
        "New staffing enquiry",
        "A business just sent a requirement on confianceservices.in",
        rows,
        "https://confianceservices.in/admin",
    )
    return _send(f"New staffing enquiry: {name}", body)
