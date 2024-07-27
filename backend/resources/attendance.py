from flask_restful import Resource, reqparse
from models import Attendance
from app import db

class AttendanceList(Resource):
    def get(self):
        # obtain existing record
        attendance_records = Attendance.query.all()
        return [{'date': record.date, 'location': record.location} for record in attendance_records]
    
    

class AttendanceRecord(Resource):
    parser = reqparse.RequestParser()
    # date feature
    parser.add_argument('date', type=str, required=True, help="This field cannot be left blank")
    # location feature
    parser.add_argument('location', type=str, required=True, help="This field cannot be left blank")
    
    def post(self):
        data = AttendanceRecord.parser.parse_args()
        new_record = Attendance(date=data['date'], location=data['location'])
        db.session.add(new_record)
        db.session.commit()
        return {'message': 'Attendance recorded successfully'}, 201
    