import os
import json
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
from models import User
from mongoengine.queryset.visitor import Q
from flask_cors import CORS
from flask_mail import Mail, Message


app = Flask(__name__)
load_dotenv()
CORS(app)
mail = Mail(app) # instantiate the mail class
app.config['MONGODB_SETTINGS'] = {
  'db': 'flask_db',
  'host': 'localhost',
  'port': 27017
}

db = MongoEngine()
db.init_app(app)


# configuration of mail
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ.get("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.environ.get("MAIL_PASSWORD")
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)




@app.route("/")
def hello():
  return "Hello World!"

# API to update any of these field
@app.route('/users/<id>', methods=['PATCH'])
def update_user(id):
    data = request.get_json()
    User.objects(id=id).update(**data)
    return jsonify(message="User updated successfully"), 200

# API to create the user.
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    phone = data.get('phone')

    if User.objects(email=email).first() or User.objects(phone=phone).first():
     return jsonify({"error": "User with this email or phone number already exists"}), 400
  
    new_user = User(**data).save()
    return jsonify(id=str(new_user.id))

# API to delete the user..
@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    User.objects(id=id).delete()
    return jsonify(message="User deleted successfully"), 200

# API to fetch users using any of the 4 fields.
@app.route('/users', methods=['GET'])
def get_users():
    first_name = request.args.get('first_name')
    last_name = request.args.get('last_name')
    email = request.args.get('email')
    phone = request.args.get('phone')
    
    users = User.objects(
        Q(first_name=first_name) |
        Q(last_name=last_name) |
        Q(email=email) |
        Q(phone=phone)
    )
    return jsonify(users)


@app.route('/users/email', methods=['POST'])
def email_users():
    try:
        users = User.objects()
        for user in users:
            msg = Message(
                'Welcome',
                sender='your_email@gmail.com',
                recipients=[user.email]
            )
            msg.body = user.message
            mail.send(msg)
        return jsonify(status='success', message='Emails sent to all users')
    except Exception as e:
        return jsonify(status='error', message=str(e))
        


if __name__ == "__main__":
  app.run()