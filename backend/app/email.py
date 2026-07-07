import html
from datetime import datetime

import httpx

from .config import settings

RESEND_ENDPOINT = "https://api.resend.com/emails"

# Brand palette (matches the website: lime accent on ink, off-white grounds).
_INK = "#0a0a0a"
_LIME = "#dfff5e"

# 4-point sparkle (matches the site's StarLogo). Unicode, not SVG, so every
# email client renders it reliably.
_MARK = (
    '<span style="color:#dfff5e;font-size:19px;line-height:1;'
    'vertical-align:middle">&#10022;</span>'
)


# --------------------------------------------------------------------------- #
# Delivery
# --------------------------------------------------------------------------- #

def _deliver(to: list[str], subject: str, html_body: str) -> bool:
    """Send one email via Resend. No-op (returns False) when the key is unset or
    there is no valid recipient, and swallows all errors, so the request path is
    never broken by email."""
    recipients = [t for t in (to or []) if t]
    if not settings.resend_api_key or not recipients:
        return False
    try:
        resp = httpx.post(
            RESEND_ENDPOINT,
            headers={"Authorization": f"Bearer {settings.resend_api_key}"},
            json={
                "from": settings.resend_from,
                "to": recipients,
                "subject": subject,
                "html": html_body,
            },
            timeout=10,
        )
        return resp.status_code < 300
    except Exception as ex:  # network/email failures must not break the flow
        print(f"[email] send failed: {ex}")
        return False


# --------------------------------------------------------------------------- #
# Building blocks (inline styles only — email-client safe)
# --------------------------------------------------------------------------- #

def _h1(text: str) -> str:
    return (
        '<h1 style="margin:0 0 14px;color:#0a0a0a;font-size:21px;font-weight:800;'
        f'letter-spacing:-0.02em">{html.escape(text)}</h1>'
    )


def _p(inner_html: str, color: str = "#3a3a3a") -> str:
    # inner_html is trusted, template-composed markup; callers escape user values.
    return (
        f'<p style="margin:0 0 14px;color:{color};font-size:14.5px;'
        f'line-height:1.62">{inner_html}</p>'
    )


def _button(url: str, label: str) -> str:
    return (
        f'<a href="{url}" style="display:inline-block;margin-top:6px;background:#dfff5e;'
        'color:#0a0a0a;text-decoration:none;font-weight:700;font-size:14px;'
        f'padding:12px 22px;border-radius:10px">{html.escape(label)} &rarr;</a>'
    )


def _row(label: str, value: str | None) -> str:
    safe = html.escape(value) if value else "—"
    return (
        '<tr>'
        '<td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#8a8a8a;'
        f'font-size:12.5px;width:120px;vertical-align:top">{html.escape(label)}</td>'
        '<td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#0a0a0a;'
        f'font-size:14px;font-weight:600;line-height:1.5">{safe}</td>'
        '</tr>'
    )


def _table(rows_html: str) -> str:
    return (
        '<table style="width:100%;border-collapse:collapse;margin:4px 0 18px">'
        f'{rows_html}</table>'
    )


def _steps(items: list[tuple[str, str]]) -> str:
    cells = []
    for i, (title, desc) in enumerate(items, 1):
        cells.append(
            '<tr>'
            '<td style="width:34px;vertical-align:top;padding:0 0 15px">'
            '<div style="width:26px;height:26px;border-radius:50%;background:#dfff5e;'
            'color:#0a0a0a;font-weight:800;font-size:13px;text-align:center;'
            f'line-height:26px">{i}</div>'
            '</td>'
            '<td style="vertical-align:top;padding:0 0 15px">'
            f'<div style="color:#0a0a0a;font-size:14px;font-weight:700">{html.escape(title)}</div>'
            '<div style="color:#6b6b6b;font-size:13.5px;line-height:1.55;'
            f'margin-top:2px">{html.escape(desc)}</div>'
            '</td></tr>'
        )
    return (
        '<table style="width:100%;border-collapse:collapse;margin:2px 0 16px">'
        f'{"".join(cells)}</table>'
    )


def _layout(inner_html: str, preheader: str, footer_note: str = "") -> str:
    year = datetime.now().year
    note = (
        f'<div style="margin-top:8px;color:#bcbcbc;font-size:11px">'
        f'{html.escape(footer_note)}</div>'
        if footer_note
        else ""
    )
    return (
        # hidden inbox-preview text
        '<div style="display:none;max-height:0;overflow:hidden;opacity:0;'
        f'color:#f4f4f1">{html.escape(preheader)}</div>'
        '<div style="background:#f4f4f1;padding:28px 16px;font-family:system-ui,'
        "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif\">"
        '<div style="max-width:560px;margin:0 auto;background:#ffffff;'
        'border-radius:18px;overflow:hidden;border:1px solid #e9e9e6">'
        # brand header
        '<div style="background:#0a0a0a;padding:24px 30px">'
        f'<div>{_MARK}'
        '<span style="color:#ffffff;font-size:17px;font-weight:700;'
        'letter-spacing:-0.01em;vertical-align:middle;margin-left:8px">'
        'Confiance Services</span></div>'
        '<div style="margin-top:9px;color:#8d8d8d;font-size:12px;'
        'letter-spacing:0.04em">Workforce Deployment Platform</div>'
        '</div>'
        # body
        f'<div style="padding:28px 30px">{inner_html}</div>'
        # footer
        '<div style="padding:18px 30px 22px;background:#fafafa;'
        'border-top:1px solid #eeeeee">'
        '<div style="color:#8a8a8a;font-size:12px;line-height:1.6">'
        '<b style="color:#5f5f5f">Confiance Services</b> &nbsp;&middot;&nbsp; '
        'Recruit &middot; Screen &middot; Train &middot; Deploy &middot; Monitor</div>'
        '<div style="color:#a4a4a4;font-size:12px;line-height:1.6;margin-top:2px">'
        'Hyderabad &middot; Mumbai &middot; Pune &middot; Chennai (+10 cities)</div>'
        '<div style="margin-top:7px"><a href="https://confianceservices.in" '
        'style="color:#0a0a0a;font-size:12px;font-weight:600;text-decoration:none">'
        'confianceservices.in</a></div>'
        f'<div style="margin-top:9px;color:#bcbcbc;font-size:11px">'
        f'&copy; {year} Confiance Services. All rights reserved.</div>'
        f'{note}'
        '</div>'
        '</div></div>'
    )


# --------------------------------------------------------------------------- #
# 1. Applicant confirmation  ->  the job-seeker
# --------------------------------------------------------------------------- #

def send_application_confirmation(a: dict) -> bool:
    """Warm, branded confirmation to a candidate who just applied."""
    first = html.escape((a.get("full_name") or "there").split(" ")[0])
    city = a.get("city")
    where = f" for work in <b>{html.escape(city)}</b>" if city else ""

    summary = _table(
        _row("Name", a.get("full_name"))
        + _row("Phone", a.get("phone"))
        + _row("City", a.get("city"))
        + _row("Preferred work", a.get("sector_pref"))
    )
    steps = _steps(
        [
            ("Screening", "Our team reviews your profile and verifies your details."),
            ("Training", "If shortlisted, we invite you to a short, practical training batch near you."),
            ("Deployment", "Once trained, we place you with a trusted client in a role that fits your experience and availability."),
        ]
    )
    inner = (
        _h1("Thank you for applying")
        + _p(f"Dear {first},")
        + _p(
            "Thank you for registering with <b>Confiance Services</b>. We&rsquo;ve "
            f"received your application{where} and added you to our candidate pool."
        )
        + _p("For your records, here&rsquo;s what you submitted:", color="#6b6b6b")
        + summary
        + _p("<b>Here&rsquo;s what happens next</b>")
        + steps
        + _p(
            "We typically reach out within a few working days as new batches open in "
            "your area, so please keep your phone handy &mdash; our team will contact "
            "you on your registered number."
        )
        + _p("Warm regards,<br><b>The Confiance Services Team</b>")
    )
    body = _layout(
        inner,
        "We&rsquo;ve received your application and our team will be in touch as new batches open near you.",
    )
    return _deliver([a.get("email")], "Thank you for applying to Confiance Services", body)


# --------------------------------------------------------------------------- #
# 2. New-applicant notification  ->  the owner (settings.notify_email)
# --------------------------------------------------------------------------- #

def send_application_notification(a: dict) -> bool:
    """Notify the owner of a new job-seeker registration, with full details."""
    name = a.get("full_name") or "Someone"
    city = a.get("city") or "—"
    rows = _table(
        _row("Name", a.get("full_name"))
        + _row("Phone", a.get("phone"))
        + _row("Email", a.get("email"))
        + _row("City", a.get("city"))
        + _row("Industries", a.get("sector_pref"))
        + _row("Experience", a.get("experience"))
        + _row("Availability", a.get("availability"))
    )
    inner = (
        _h1("New applicant registered")
        + _p(
            "A new candidate has registered through <b>confianceservices.in</b>. "
            "Their submitted details are below &mdash; reach out directly, or manage "
            "them in the admin panel."
        )
        + rows
        + _button("https://confianceservices.in/admin/applicants", "View in admin panel")
    )
    body = _layout(
        inner,
        f"{name} just registered - {city}.",
        footer_note="Automated message sent to the site administrator.",
    )
    return _deliver([settings.notify_email], f"New applicant: {name} ({city})", body)


# --------------------------------------------------------------------------- #
# 3. New-enquiry notification  ->  the owner (settings.notify_email)
# --------------------------------------------------------------------------- #

def send_enquiry_notification(e: dict) -> bool:
    """Notify the owner of a new Contact / hire-staff enquiry, with full details."""
    name = e.get("name") or "Someone"
    rows = _table(
        _row("Name", e.get("name"))
        + _row("Company", e.get("company"))
        + _row("Phone", e.get("phone"))
        + _row("City", e.get("city"))
        + _row("Services", e.get("services"))
        + _row("Message", e.get("message"))
    )
    inner = (
        _h1("New staffing enquiry")
        + _p(
            "A business has submitted a staffing requirement through "
            "<b>confianceservices.in</b>. Your site promises a reply within one "
            "business day, so it&rsquo;s best to follow up promptly &mdash; you can "
            "call them on the number below."
        )
        + rows
        + _button("https://confianceservices.in/admin", "Open admin panel")
    )
    body = _layout(
        inner,
        "A business needs staff - respond within one business day.",
        footer_note="Automated message sent to the site administrator.",
    )
    return _deliver([settings.notify_email], f"New staffing enquiry: {name}", body)
