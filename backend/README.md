# Todo API (FastAPI + MySQL)

## Setup

1. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Create the MySQL database:
   ```sql
   CREATE DATABASE todo_db;
   ```

4. Copy `.env.example` to `.env` and fill in your MySQL credentials:
   ```
   cp .env.example .env
   ```

5. Run the server (tables are auto-created on startup):
   ```
   uvicorn app.main:app --reload --port 8000
   ```

API docs available at http://localhost:8000/docs
