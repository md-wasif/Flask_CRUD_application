## About
This project is a simple CRUD application that demonstrates the use of Flask and Mongoengine to create a RESTful API for a user management system. The application allows users to create, read, update, and delete user records and also allows for searching and emailing all users. The project also includes a basic React frontend that allows for interaction with the API and send to backend.


# Running the App
1. Clone the repository and navigate to the project directory
https://github.com/md-wasif/Flask_CRUD_application.git
cd Flask_CRUD_applications

2. Install the required packages
pip install -r requirements.txt

3. Start the MongoDB server or connect with mongodb compass
mongod

4. Start the Flask development server
flask run 

5. In a separate terminal, navigate to the client directory and start the React development server
cd client 
npm install (Install all the dependencies list in package.json file)
npm start

6. Last but not the least Open a web browser and navigate to http://localhost:3000 to access the application

## Note 
In order for the email sending functionality to work, you will need to configure the MAIL_USERNAME and MAIL_PASSWORD environment variables in the app.py file with valid email credentials.
And make sure sender mail value 'your_email@gmail.com' should change to your mail Id while sending the email to all the users.

Also, you will need to enable less secure apps option in gmail account which is used to send the email.
You may also need to create an application-specific password for your email account if you have 2-factor authentication enabled.



