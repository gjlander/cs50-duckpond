import os
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort


load_dotenv()
NEON_URI = os.environ.get("NEON_URI")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = NEON_URI
db = SQLAlchemy(app)
api = Api(app)

class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        first_name = db.Column(db.String(255))
        last_name = db.Column(db.String(255))
        email = db.Column(db.String(255), unique=True)
        password = db.Column(db.String(255))
        created_at = db.Column(db.DateTime, default=datetime.now)

class Duck(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(255))
        img_url = db.Column(db.String(510))
        quote = db.Column(db.String, unique=True)
        created_at = db.Column(db.DateTime, default=datetime.now)

        def __repr__(self):
            return f"Duck(name = {self.name}, quote = {self.quote})"

with app.app_context():
    db.create_all()


user_args = reqparse.RequestParser()
user_args.add_argument('first_name', type=str, required=True, help="First name cannot be blank")
user_args.add_argument('last_name', type=str, required=True, help="Last name cannot be blank")
user_args.add_argument('email', type=str, required=True, help="Email cannot be blank")
user_args.add_argument('password', type=str, required=True, help="Password cannot be blank")

duck_args = reqparse.RequestParser()
duck_args.add_argument('name', type=str, required=True, help="Name cannot be blank")
duck_args.add_argument('img_url', type=str, required=True, help="Image URL cannot be blank")
duck_args.add_argument('quote', type=str, required=True, help="Quote cannot be blank")

userFields = {
      'id':fields.Integer,
      'first_name':fields.String,
      'last_name':fields.String,
      'email':fields.String,
      'password':fields.String,
      'created_at': fields.DateTime,
}
duckFields = {
      'id':fields.Integer,
      'name':fields.String,
      'quote':fields.String,
      'img_url':fields.String,
      'created_at': fields.DateTime,
}

class UsersRoute(Resource):
        @marshal_with(userFields)
        def get(self):
              users = User.query.all()
              return users
        
        @marshal_with(userFields)
        def post(self):
              args = user_args.parse_args()
              user = User(first_name=args["first_name"],
                               last_name=args["last_name"],
                                email=args["email"],
                                password=args["password"])
              db.session.add(user)
              db.session.commit()
              users = User.query.all()
              return users, 201
             
class UserRoute(Resource):
       @marshal_with(userFields)
       def get(self, id):
            user = User.query.filter_by(id=id).first()
            if not user:
                abort(404, message="User not found")
            return user
       @marshal_with(userFields)
       def put(self, id):
            args = user_args.parse_args()
            user = User.query.filter_by(id=id).first()
            if not user:
                abort(404, message="User not found")
            user.first_name =args["first_name"]
            user.last_name = args["last_name"]
            user.email = args["email"]
            user.password = args["password"]
            db.session.commit()
            return user
       @marshal_with(userFields)
       def delete(self, id):
            user = User.query.filter_by(id=id).first()
            if not user:
                abort(404, message="User not found")
            db.session.delete(user)
            db.session.commit()
            users = User.query.all()
            return users

class DuckRoute(Resource):
        @marshal_with(userFields)
        def get(self):
              ducks = Duck.query.all()
              return ducks
        
        @marshal_with(userFields)
        def post(self):
              args = user_args.parse_args()
              duck = Duck(name=args["name"],
                                img_url=args["img_url"],
                                quote=args["quote"])
              db.session.add(duck)
              db.session.commit()
              ducks = Duck.query.all()
              return ducks, 201

api.add_resource(UsersRoute, '/api/users/')
api.add_resource(UserRoute, '/api/users/<int:id>')

api.add_resource(DuckRoute, '/api/ducks')

@app.route("/")
def home():
    return '<h1>Flask REST API </h1>'

if __name__ == '__main__':
    app.run(debug=True)