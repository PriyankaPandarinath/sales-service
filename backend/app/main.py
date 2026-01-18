from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth
from app.routers import attendance



app = FastAPI(title="SSSMS HRMS API")

# ✅ CORS CONFIGURATION
origins = [
    "http://localhost:8080",
    "https://sales-services.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROUTERS
app.include_router(auth.router, prefix="/api/v1")
# OR if you removed versioning:
# app.include_router(auth.router)


app.include_router(attendance.router, prefix="/api/v1")
