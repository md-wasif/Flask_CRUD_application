from mongoengine import Document, StringField, EmailField, EmbeddedDocument, EmbeddedDocumentField

# class Message(EmbeddedDocument):
#     message = StringField()

class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    phone = StringField(required=True, unique=True)
    # message = EmbeddedDocumentField(Message)
    message = StringField(required=True)