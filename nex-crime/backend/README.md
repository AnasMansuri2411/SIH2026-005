# UNIF-CNA Backend Reference Service

This directory contains the Python **FastAPI** backend service implementing all 13 specified REST APIs for UNIF-CNA.

## Endpoints Implemented:
- `POST /api/auth/login`: Secure access authentication
- `POST /api/ingestion/upload`: Multilingual IndicOCR & NER upload
- `GET /api/entities/{id}`: Entity profile
- `GET /api/entities/{id}/relationships`: Direct edges
- `POST /api/graph/search`: Knowledge graph search
- `POST /api/graph/multihop`: BFS multi-hop traversal
- `POST /api/entity-resolution`: Phonetic & alias candidate matching
- `POST /api/analytics/inter-centrality`: Topological network disruption
- `POST /api/analytics/temporal`: Spatio-temporal event bursts
- `POST /api/xai/explain`: GNNExplainer causal factor breakdown
- `POST /api/dossier/generate`: Section 65B certified evidence brief
- `GET /api/audit/{caseId}`: Tamper-evident hash ledger
- `GET /api/system/health`: Microservice health status

## Quick Start:
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Or with uvicorn:
```bash
uvicorn main:app --reload --port 8000
```
Interactive Swagger API documentation will be available at `http://localhost:8000/docs`.
