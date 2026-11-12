# FAIR Multi-Assessor

A web application that assesses a research resource with three independent
FAIR tools — **F-UJI**, **FAIR-Checker**, **KGHeartBeat** — normalises their
output onto a shared mapping, computes a cross-tool consensus, and generates
an AI-based plain-language explanation.

## Demo

🌐 [Try the tool online](https://sanalatif0806.github.io/fair-multi-assessment/)

🎥 [Watch the demo video](demo/FAIR_multi_assessor.webm)

## Features

- **LOD Cloud** — browse precomputed three-tool FAIR assessments of 2,784
  knowledge graphs across all 11 LOD sub-cloud categories (BLOD, che-cloud,
  life-sciences, linguistic, government, publications, social-networking,
  cross-domain, user-generated, geography, media), filterable by category or
  by BLOD source repository (Bio2RDF, BioPortal, GitHub, Wikidata, OBO
  Foundry, OLS, Ontobee, and more). Each entry expands to per-metric
  detail, consensus, and an AI explanation.
- **New Assessment** — run the three tools live against a URL or an uploaded
  CSV/JSON file.
- **Snapshots** — dated, downloadable `.zip` archives of the corpus
  assessment, generated monthly or on demand.
- **FAIR Mapping** — reference page showing which metric of each tool
  contributes to each FAIR sub-principle, and the formulas used to compute
  the F/A/I/R/FAIR composite and the consensus.

Results can be viewed in three modes — **Mapped** (unified 0–1 scale),
**Native** (each tool's own score), and **Consensus** (cross-tool agreement
per dimension) — and exported as JSON or PDF.

## Quick start (Docker)

```bash
cp .env.example .env   # add OPENAI_API_KEY to enable AI explanations
docker compose up --build
```

Then open **http://localhost**. This starts three containers:

| Container | Description | Port |
|---|---|---|
| `fuji` | Official F-UJI server image | `1071` |
| `backend` | FastAPI app | `8000` |
| `frontend` | React app served by nginx (proxies API calls to the backend) | `80` |

Stop with `docker compose down`.

## Manual setup

**Backend**

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # OPENAI_API_KEY, FUJI_API_URL, etc.
uvicorn main:app --reload --port 8000
```

**Frontend**

```bash
cd frontend
npm install
cp .env.example .env.local   # set VITE_API_BASE_URL if not localhost:8000
npm run dev
```

## Tool configuration

| Tool | Setup |
|---|---|
| **FAIR-Checker** | Public API — no setup needed. |
| **F-UJI** | Requires a running F-UJI server (included in Docker), configured via `FUJI_API_URL` / `FUJI_USER` / `FUJI_PASSWORD`. |
| **KGHeartBeat** | Requires a self-hosted endpoint set in `KGHEARTBEAT_API_URL`; otherwise reported as "not assessed". |

If a tool is unavailable, the other tools still run and its result is shown
as an error rather than a zero score.

## API

| Endpoint | Description |
|---|---|
| `GET /health` | Health check |
| `POST /assess` | Assess a single URL or file |
| `POST /assess/batch` | Assess every row of an uploaded CSV/JSON |
| `POST /explain` | Generate an AI explanation of a result |
| `GET /corpus/*` | Precomputed LOD Cloud assessments |
| `GET /snapshots/*` | Snapshot archives and data-source status |
| `GET /mapping/reference` | FAIR mapping and formulas |

Interactive API docs are available at `/docs`.

## Mapping and consensus

Each tool's metrics are mapped to FAIR sub-principles and aggregated
(metric → principle → dimension → composite, unweighted mean at each step)
in `backend/mapping/`. The cross-tool consensus (`aggregation/consensus.py`)
is computed on mapped scores only and labels agreement as `high`, `medium`,
or `low` based on how far the tools' scores spread apart.
