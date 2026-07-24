from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # SQLAlchemy connection string. psycopg (v3) driver.
    database_url: str = "postgresql+psycopg://akashsubramanian@localhost:5432/confiance"

    # Comma-separated origins allowed to call the API (the Next.js frontend).
    cors_origins: str = "http://localhost:3000"

    # Shared secret the frontend sends (X-Admin-Key) on admin/* endpoints.
    admin_api_key: str = "dev-admin-key-change-me"

    # Resend transactional email (optional — emails are skipped if unset).
    resend_api_key: str = ""
    resend_from: str = "Confiance Services <onboarding@resend.dev>"

    # Owner/admin address that receives new-submission notifications
    # (Apply registrations + Contact enquiries). Skipped if empty.
    notify_email: str = ""

    # WhatsApp Cloud API owner alerts (optional — skipped unless token +
    # phone_id + recipient are all set). Secrets live in .env, never in git.
    whatsapp_token: str = ""
    whatsapp_phone_id: str = ""
    notify_whatsapp_to: str = ""
    whatsapp_lang: str = "en"
    whatsapp_template_application: str = "new_job_application"
    whatsapp_template_enquiry: str = "new_client_enquiry"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
