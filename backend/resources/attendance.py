from flask_restful import Resource, reqparse
from models import Attendance
from app import db
from flask import request, jsonify
from flask_jwt_extended import jwt_required

class AttendanceStatus(Resource):
    def get(self):
        try:
            attendance = Attendance.query.order_by(Attendance.id.desc()).first()
            if attendance:
                return {'status': attendance.status}, 200

            return {'status': False}, 200

        except Exception as e:
            return {'message': str(e)}, 500

class AttendanceToggle(Resource):
    def post(self):
        try:
            attendance = Attendance.query.order_by(Attendance.id.desc()).first()
            if attendance and attendance.status:
                attendance.status = False
            else:
                new_attendance = Attendance(status=True)
                db.session.add(new_attendance)
            db.session.commit()
            return {'message': 'Attendance status toggled'}, 200
        except Exception as e:
            return {'message': str(e)}, 500

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
    