from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from extensions import db, jwt, migrate
from resources.attendance import AttendanceToggle, AttendanceStatus


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Enable CORS for specific origin
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000/"}}, supports_credentials=True)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app,db)

    @app.route('/', methods=['GET'])
    def index():
        return {"message": "Test route working"}

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    with app.app_context(): 
        from resources.user import UserRegister, UserLogin
        from resources.attendance import AttendanceList, AttendanceRecord

        api = Api(app)
        api.add_resource(UserRegister, '/register')
        api.add_resource(UserLogin, '/login')
        api.add_resource(AttendanceRecord, '/api/attendance')
        api.add_resource(AttendanceList, '/api/attendance/list')
        api.add_resource(AttendanceToggle, '/api/attendance/toggle')
        api.add_resource(AttendanceStatus, '/api/attendance/status')

        db.create_all()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)