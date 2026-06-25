"""Seed content (mirrors the frontend's static fallback in src/lib/data.ts)."""
from urllib.parse import quote


def img(keywords: str, w: int = 800, h: int = 600, lock: int = 1) -> str:
    return f"https://loremflickr.com/{w}/{h}/{quote(keywords)}?lock={lock}"


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
        "name": "Construction & Logistics Support",
        "slug": "construction-logistics",
        "blurb": (
            "From moving bulk cable wiring out of storage to transporting firefighting-system "
            "piping and packaging hardware and fasteners, we supply reliable on-site labor that "
            "keeps construction and logistics operations moving — trained on load handling, site "
            "safety and equipment basics."
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
    ("NB Dilsukhnagar", "NB", "Hospitality", "Dilsukhnagar", "Telangana", True),
    ("Kondapur Gismat", "Gismat", "Hospitality", "Kondapur", "Telangana", True),
    ("Bangalore Gismat", "Gismat", "Hospitality", "Bangalore", "Karnataka", True),
    ("BBQ Spice", "BBQ Spice", "Hospitality", "Abids", "Telangana", True),
    ("Kompally Gismat", "Gismat", "Hospitality", "Kompally", "Telangana", True),
    ("Naatu", "Naatu", "Hospitality", "Jubilee Hills", "Telangana", True),
    ("The Funnel Hills", "The Funnel", "Hospitality", "Begumpet", "Telangana", True),
    ("Gismat Chandanagar", "Gismat", "Hospitality", "Chandanagar", "Telangana", True),
    ("Meklas Spice", "Meklas Spice", "Hospitality", "SR Nagar", "Telangana", True),
    ("NB Gachibowli", "NB", "Hospitality", "Gachibowli", "Telangana", True),
    ("Flip Side", "Flip Side", "Hospitality", "Financial District", "Telangana", True),
    ("Dancing Plate", "Dancing Plate", "Hospitality", "Financial District", "Telangana", True),
    ("SR Nagar NB", "NB", "Hospitality", "SR Nagar", "Telangana", True),
    ("Lake Dist", "Lake Dist", "Hospitality", "Necklace Road", "Telangana", True),
    ("Gismat Suncity", "Gismat", "Hospitality", "Suncity", "Telangana", True),
    ("Captains", "Captains", "Hospitality", "KPHB", "Telangana", True),
    ("Guntur Karam", "Guntur Karam", "Hospitality", "Chandanagar", "Telangana", True),
    ("Palace Height", "Palace Height", "Hospitality", "Abids", "Telangana", True),
    ("Prime Rose", "Prime Rose", "Hospitality", "Ameerpet", "Telangana", True),
    ("Amritsari Haveli Abids", "Amritsari Haveli", "Hospitality", "Abids", "Telangana", True),
    ("Pista House Medchal", "Pista House", "Hospitality", "Medchal", "Telangana", True),
    ("Dune Kitchen and Bar", "Dune", "Hospitality", "Jubilee Hills", "Telangana", True),
    ("Pista House Factory", "Pista House", "Hospitality", "Shamshabad", "Telangana", True),
    ("Hiyya Madhapur", "Hiyya", "Hospitality", "Madhapur", "Telangana", True),
    ("Achha Telugu", "Achha Telugu", "Hospitality", "Necklace Road", "Telangana", True),
    ("Pista House Nalgonda", "Pista House", "Hospitality", "Nalgonda", "Telangana", True),
    ("909 Pubs", "909 Pubs", "Hospitality", "Kothapet", "Telangana", True),
    ("Sedhyam KPHB", "Sedhyam", "Hospitality", "KPHB", "Telangana", True),
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
        "title": "Cable-wiring shift for a data centre fit-out",
        "sector": "Construction",
        "location": "Mumbai",
        "metric": "40 tonnes moved",
        "body": (
            "Supplied material-handling crews to move bulk cable reels and conduit from storage "
            "to floor through a tight 3-week fit-out window, on schedule and incident-free."
        ),
        "image": img("construction,cable,site", 800, 600, 83),
    },
    {
        "title": "Firefighting-pipe staging for a tower",
        "sector": "Construction",
        "location": "Chennai",
        "metric": "12 floors staged",
        "body": (
            "Transported and floor-staged firefighting-system piping for a commercial high-rise, "
            "coordinating with MEP contractors to keep installation crews fed with material."
        ),
        "image": img("pipe,construction,worker", 800, 600, 84),
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
