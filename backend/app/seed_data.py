"""Seed content (mirrors the frontend's static fallback in src/lib/data.ts)."""

# Case-study keyword -> local photo served from the frontend's /public/images.
_PHOTO_FILES = {
    "hotel,kitchen,staff": "case-kitchen",
    "cleaning,washroom,facility": "case-washroom",
    "warehouse,packaging,worker": "case-warehouse",
}


def img(keywords: str, w: int = 800, h: int = 600, lock: int = 1) -> str:
    return f"/images/{_PHOTO_FILES.get(keywords, 'services-hero')}.jpg"


VERTICALS = [
    {
        "name": "Hospitality & Facilities",
        "slug": "hospitality-facilities",
        "blurb": (
            "We staff and run the unseen engine of hotels, restaurants and commercial "
            "buildings — commercial kitchen support, deep washroom and facility maintenance, "
            "housekeeping and janitorial crews — with workers screened, uniformed and drilled "
            "on hygiene and safety before they ever reach your floor."
        ),
    },
    {
        "name": "Logistics Support",
        "slug": "logistics-support",
        "blurb": (
            "From bulk material handling to packaging hardware and fasteners and running kitted "
            "lines, we supply reliable on-site labor that keeps warehouse and logistics operations "
            "moving — trained on load handling, safety and equipment basics."
        ),
    },
]

# Live client outlets — Confiance Hospitality Services (deployment list).
# (outlet, company/brand, sector, location, state, active)
OUTLETS = [
    ("By The Bottle", "By The Bottle", "Hospitality", "Jubilee Hills", "Telangana", True),
    ("ECIL Gismat", "Gismat", "Hospitality", "ECIL", "Telangana", True),
    ("Ameerpet Gismat", "Gismat", "Hospitality", "Ameerpet", "Telangana", True),
    ("Dilsukhnagar Gismat", "Gismat", "Hospitality", "Dilsukhnagar", "Telangana", True),
    ("Naidu Biriyani, Dilsukhnagar", "Naidu Biriyani", "Hospitality", "Dilsukhnagar", "Telangana", True),
    ("Kondapur Gismat", "Gismat", "Hospitality", "Kondapur", "Telangana", True),
    ("Bangalore Gismat", "Gismat", "Hospitality", "Bangalore", "Karnataka", True),
    ("BBQ Spice", "BBQ Spice", "Hospitality", "Abids", "Telangana", True),
    ("Kompally Gismat", "Gismat", "Hospitality", "Kompally", "Telangana", True),
    ("Naatu", "Naatu", "Hospitality", "Jubilee Hills", "Telangana", True),
    ("The Funnel Hills", "The Funnel", "Hospitality", "Begumpet", "Telangana", True),
    ("Gismat Chandanagar", "Gismat", "Hospitality", "Chandanagar", "Telangana", True),
    ("Meklas Spice", "Meklas Spice", "Hospitality", "SR Nagar", "Telangana", True),
    ("Naidu Biriyani, Gachibowli", "Naidu Biriyani", "Hospitality", "Gachibowli", "Telangana", True),
    ("Flip Side", "Flip Side", "Hospitality", "Financial District", "Telangana", True),
    ("Dancing Plate", "Dancing Plate", "Hospitality", "Financial District", "Telangana", True),
    ("Naidu Biriyani, SR Nagar", "Naidu Biriyani", "Hospitality", "SR Nagar", "Telangana", True),
    ("Lake Dist", "Lake Dist", "Hospitality", "Necklace Road", "Telangana", True),
    ("Gismat Suncity", "Gismat", "Hospitality", "Suncity", "Telangana", True),
    ("Captains Cuts", "Captains Cuts", "Hospitality", "KPHB", "Telangana", True),
    ("Guntur Karam", "Guntur Karam", "Hospitality", "Chandanagar", "Telangana", True),
    ("Palace Heights", "Palace Heights", "Hospitality", "Abids", "Telangana", True),
    ("Prime Rose", "Prime Rose", "Hospitality", "Ameerpet", "Telangana", True),
    ("Amritsari Haveli Abids", "Amritsari Haveli", "Hospitality", "Abids", "Telangana", True),
    ("Pista House Medchal", "Pista House", "Hospitality", "Medchal", "Telangana", True),
    ("Dune Kitchen and Bar", "Dune", "Hospitality", "Jubilee Hills", "Telangana", True),
    ("Pista House Factory", "Pista House", "Hospitality", "Shamshabad", "Telangana", True),
    ("Hiyya Madhapur", "Hiyya", "Hospitality", "Madhapur", "Telangana", True),
    ("Achha Telugu", "Achha Telugu", "Hospitality", "Necklace Road", "Telangana", True),
    ("Pista House Nalgonda", "Pista House", "Hospitality", "Nalgonda", "Telangana", True),
    ("909 Pubs", "909 Pubs", "Hospitality", "Kothapet", "Telangana", True),
    ("Sedyam Telugu Kitchen, KPHB", "Sedyam Telugu Kitchen", "Hospitality", "KPHB", "Telangana", True),
    ("Hiyya KPHB", "Hiyya", "Hospitality", "KPHB", "Telangana", True),
    ("Hiyya Vizag", "Hiyya", "Hospitality", "Visakhapatnam", "Andhra Pradesh", True),
    ("Hiyya Guntur", "Hiyya", "Hospitality", "Guntur", "Andhra Pradesh", True),
]

CASE_STUDIES = [
    {
        "title": "Stewarding crew for a 5-star kitchen",
        "sector": "Hospitality",
        "location": "Hyderabad",
        "metric": "30 staff in 9 days",
        "body": (
            "Stood up a full commercial-kitchen stewarding and dishwashing crew for a luxury "
            "hotel ahead of peak banquet season, with zero hygiene-audit failures in the first quarter."
        ),
        "image": img("hotel,kitchen,staff", 800, 600, 81),
    },
    {
        "title": "Washroom maintenance across a mall",
        "sector": "Facilities",
        "location": "Pune",
        "metric": "18 washrooms, 24/7",
        "body": (
            "Deployed rotating maintenance teams covering 18 high-traffic washroom blocks, "
            "lifting average cleanliness scores from 3.4 to 4.7 within two months."
        ),
        "image": img("cleaning,washroom,facility", 800, 600, 82),
    },
    {
        "title": "Hardware kitting line for a logistics hub",
        "sector": "Logistics",
        "location": "Pune",
        "metric": "1.2M units/mo",
        "body": (
            "Ran a hardware and fastener packaging line at a distribution centre, hitting a "
            "sustained throughput of over a million kitted units a month with a trained 22-person crew."
        ),
        "image": img("warehouse,packaging,worker", 800, 600, 85),
    },
]
