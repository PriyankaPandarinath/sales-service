from app.core.database import engine, SessionLocal
from app.models.user import User
from app.core.security import hash_password
from app.core.database import Base

Base.metadata.create_all(bind=engine)

db = SessionLocal()

users = [
    ("superadmin@ssspl.com","superadmin123", "SUPERADMIN"),
    ("admin@ssspl.com", "admin123", "ADMIN"),
    ("employee@ssspl.com", "employee123", "EMPLOYEE"),
]

for email, pwd, role in users:
    if not db.query(User).filter(User.email == email).first():
        db.add(
            User(
                email=email,
                hashed_password=hash_password(pwd),
                role=role
            )
        )

db.commit()
db.close()

print("✅ Demo users seeded successfully")
