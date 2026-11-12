# FAIR Multi-Assessor

How FAIR is a dataset? The answer often depends on which tool you ask.
FAIR Multi-Assessor runs three well-known FAIR assessment tools, **F-UJI**,
**FAIR-Checker** and **KGHeartBeat**, on the same resource, brings their
results onto a common scale, and shows you where they agree and where they
don't. It also writes a short plain-language explanation of the results, so
you don't have to interpret every metric yourself.

## Demo

🌐 [Try the tool online](https://sanalatif0806.github.io/fair-multi-assessment/)

🎥 [Watch the demo video](demo/FAIR_multi_assessor.webm)

## What you can do

**Explore the LOD Cloud.** The tool comes with ready-made assessments of
2,784 knowledge graphs from all 11 LOD sub-clouds (BLOD, che-cloud, life
sciences, linguistics, government, publications and more), each scored by
all three tools. You can filter by
category, or by source repository for BLOD (Bio2RDF, BioPortal, GitHub,
Wikidata, OBO Foundry, OLS, Ontobee and others), and open any graph to see
its scores, how much the tools agree, and an explanation.

**Assess your own resource.** Paste a URL or upload a CSV/JSON file and the
three tools will run on it live.

**Download snapshots.** A dated archive of the full assessment is created
every month, and you can also create one whenever you like.

**See how the scores are built.** The FAIR Mapping page shows which metric
from each tool feeds into each FAIR principle, along with the formulas
behind the final scores.

You can look at the results in three ways: on a shared 0–1 scale, as each
tool's original score, or as a consensus view showing how closely the tools
agree. Results can be exported as JSON or PDF.

## Getting started

The easiest way to run it is with Docker:

```bash
cp .env.example .env   # add your OPENAI_API_KEY to turn on explanations
docker compose up --build
```

Then open **http://localhost** in your browser. Docker starts three
containers:

| Container | What it does | Port |
|---|---|---|
| `fuji` | The official F-UJI server | `1071` |
| `backend` | The FastAPI backend | `8000` |
| `frontend` | The React interface, served by nginx | `80` |

When you're done, run `docker compose down`.

### Running without Docker

Start the backend:

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # OPENAI_API_KEY, FUJI_API_URL, etc.
uvicorn main:app --reload --port 8000
```

Then the frontend, in a second terminal:

```bash
cd frontend
npm install
cp .env.example .env.local   # set VITE_API_BASE_URL if not localhost:8000
npm run dev
```

## Setting up the tools

- **FAIR-Checker** works out of the box through its public API.
- **F-UJI** needs a running F-UJI server. Docker includes one; otherwise set
  `FUJI_API_URL`, `FUJI_USER` and `FUJI_PASSWORD`.
- **KGHeartBeat** needs your own endpoint, set in `KGHEARTBEAT_API_URL`.
  Without it, KGHeartBeat results show as "not assessed".

If one tool is down, the others still run, and you'll see a clear message
instead of a misleading zero score.

## API

| Endpoint | What it does |
|---|---|
| `GET /health` | Checks that the backend is running |
| `POST /assess` | Assesses a single URL or file |
| `POST /assess/batch` | Assesses every row of a CSV/JSON file |
| `POST /explain` | Writes an explanation of a result |
| `GET /corpus/*` | Returns the precomputed LOD Cloud assessments |
| `GET /snapshots/*` | Lists and downloads snapshots |
| `GET /mapping/reference` | Returns the FAIR mapping and formulas |

You can try the endpoints interactively at `/docs`.

## How the scores are combined

Each tool's metrics are mapped to the FAIR principles they measure. Scores
are then averaged step by step, from metric to principle to dimension (F, A,
I, R) to an overall FAIR score. The consensus compares the tools' mapped
scores and rates their agreement as high, medium or low depending on how
far apart they are. The code lives in `backend/mapping/` and
`aggregation/consensus.py`.
