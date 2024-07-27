from flask_restful import Resource, reqparse
from models import User
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str, required=True, help='Username cannot be blank')
    parser.add_argument('password', type=str, required=True, help='Password cannot be blank')
    parser.add_argument('email', type=str, required=True, help='Email cannot be blank')

    def post(self):
        data = UserRegister.parser.parse_args()
        if User.query.filter_by(username=data['username']).first():
            return {'message': 'User already exists'}, 400

        hashed_password = generate_password_hash(data['password'], method='sha256')
        new_user = User(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return {'message': 'User created successfully'}, 201

class UserLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str, required=True, help='Username cannot be blank')
    parser.add_argument('password', type=str, required=True, help='Password cannot be blank')

    def post(self):
        data = UserLogin.parser.parse_args()
        user = User.query.filter_by(username=data['username']).first()

        if user and check_password_hash(user.password, data['password']):
            access_token = create_access_token(identity={'username': user.username})
            return {'access_token': access_token}, 200

        return {'message': 'Invalid credentials'}, 401