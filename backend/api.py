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


class Duck(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        name = db.Column(db.String(255))
        img_url = db.Column(db.String(510))
        quote = db.Column(db.String)
        created_at = db.Column(db.DateTime, default=datetime.now)

        def __repr__(self):
            return f"Duck(name = {self.name}, quote = {self.quote})"

with app.app_context():
    db.create_all()


duck_args = reqparse.RequestParser()
duck_args.add_argument('name', type=str, required=True, help="Name cannot be blank")
duck_args.add_argument('img_url', type=str, required=True, help="Image URL cannot be blank")
duck_args.add_argument('quote', type=str, required=True, help="Quote cannot be blank")


duckFields = {
      'id':fields.Integer,
      'name':fields.String,
      'quote':fields.String,
      'img_url':fields.String,
      'created_at': fields.DateTime,
}


class DucksRoute(Resource):
        @marshal_with(duckFields)
        def get(self):
              ducks = Duck.query.all()
              return ducks
        
        @marshal_with(duckFields)
        def post(self):
              args = duck_args.parse_args()
              duck = Duck(name=args["name"],
                                img_url=args["img_url"],
                                quote=args["quote"])
              db.session.add(duck)
              db.session.commit()
              ducks = Duck.query.all()
              return ducks, 201

class DuckRoute(Resource):
    @marshal_with(duckFields)
    def put(self, id):
        args = duck_args.parse_args()
        duck = Duck.query.filter_by(id=id).first()
        if not duck:
            abort(404, message="Duck not found")
        duck.name =args["name"]
        duck.img_url = args["img_url"]
        duck.quote = args["quote"]
        db.session.commit()
        return duck
    def delete(self, id):
        duck = Duck.query.filter_by(id=id).first()
        if not duck:
            abort(404, message="Duck not found")
        db.session.delete(duck)
        db.session.commit()
        return {"message": f"Deleted duck with id of: {id}"}


api.add_resource(DucksRoute, '/api/ducks')
api.add_resource(DuckRoute, '/api/ducks/<int:id>')

@app.route("/")
def home():
    return '<h1>Flask REST API </h1>'

if __name__ == '__main__':
    app.run(debug=True)