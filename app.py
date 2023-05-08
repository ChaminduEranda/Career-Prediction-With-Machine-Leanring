import numpy as np
from flask import Flask, request, render_template, redirect, url_for, session
import pickle
from joblib import load
from sklearn.preprocessing import LabelEncoder
import json
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re

# Create an app object using the Flask class
app = Flask(__name__)

# https://www.geeksforgeeks.org/login-and-registration-project-using-flask-and-mysql/
# assign mysql connection values
app.secret_key = 'your secret key'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'finalproject'

mysql = MySQL(app)

# Load the trained career prediction model
model = pickle.load(open('models/career_prediction_model.pkl', 'rb'))

# Load the label encoder
obj1 = load('models/label_encoder_career.joblib')

# Load the data set of career values
career_convertion_result = load('models/career_convertion_dataset.joblib')

# Register, Login, Logout functions (Webdamn, 2023)
# https://webdamn.com/login-and-registration-with-python-flask-mysql/
@app.route('/')
@app.route('/login', methods =['GET', 'POST'])
def login():
	msg = ''
	if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
		username = request.form['username']
		password = request.form['password']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE username = % s AND password = % s', (username, password, ))
		account = cursor.fetchone()
		if account:
			session['loggedin'] = True
			session['id'] = account['id']
			session['username'] = account['username']
			msg = 'Logged in successfully !'
			return render_template('index.html', msg = msg)
		else:
			msg = 'Incorrect username / password !'
	return render_template('login.html', msg = msg)

@app.route('/logout')
def logout():
	session.pop('loggedin', None)
	session.pop('id', None)
	session.pop('username', None)
	return redirect(url_for('login'))

@app.route('/register', methods =['GET', 'POST'])
def register():
	msg = ''
	if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form :
		username = request.form['username']
		password = request.form['password']
		email = request.form['email']
		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
		account = cursor.fetchone()
		if account:
			msg = 'Account already exists !'
		elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
			msg = 'Invalid email address !'
		elif not re.match(r'[A-Za-z0-9]+', username):
			msg = 'Username must contain only characters and numbers !'
		elif not username or not password or not email:
			msg = 'Please fill out the form !'
		else:
			cursor.execute('INSERT INTO accounts VALUES (NULL, % s, % s, % s)', (username, password, email, ))
			mysql.connection.commit()
			msg = 'You have successfully registered !'
	elif request.method == 'POST':
		msg = 'Please fill out the form !'
	return render_template('register.html', msg = msg)

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/questionnaire')
def questionnaire():
    return render_template('questionnaire.html')

@app.route('/questions')
def questions():
    return render_template('questions.html')

""""
@app.route('/predict',methods=['GET','POST'])
def predict():    
    
    x=[[6,2]]
    print(x)
    predicted_value = model.predict(x)
    print(predicted_value)
    result1 = obj1.inverse_transform(predicted_value)
    result = result1[0]
    print(result)
    
    return render_template('results.html', result=result)
"""

@app.route('/predict',methods=['GET','POST'])
def predict():    
    obj1.fit_transform(career_convertion_result)    
    output = request.get_json()
    x = json.loads(output)
    x = [x]
    print(x)
    predicted_value = model.predict(x)
    result1 = obj1.inverse_transform(predicted_value)
    result1 = result1[0]
    print(result1)
    result = json.dumps(result1)
    
    return render_template('results.html', result=result)

if __name__ == "__main__":
    app.run(debug=True)

# 'flask run' to run the application