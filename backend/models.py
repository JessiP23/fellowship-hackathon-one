from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False) 
    password = db.Column(db.String(120), nullable=False)
    position = db.Column(db.String(20), nullable=False)
    
    
class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.Boolean, default=False)
    
    def __repr__(self):
        return f"Attendance(date={self.date}, location={self.location})"
    
class AttendanceStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean, default=False)