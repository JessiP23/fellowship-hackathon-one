from app import create_app, db
from models import User  # Adjust the import according to your project structure

app = create_app()
with app.app_context():
    # Query all users
    users = User.query.all()
    for user in users:
        print(f"ID: {user.id}, Username: {user.username}, Email: {user.email}, Position: {user.position}")
