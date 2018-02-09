import os
from flask import Flask, render_template, request, jsonify
from flask_jsglue import JSGlue
from flask_sqlalchemy import SQLAlchemy
from helpers import row_to_dict

basedir = os.path.dirname(__file__)
database_dir = os.path.join(basedir, 'data2.sqlite')

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + database_dir
app.config["SQLALCHEMY_COMMIT_ON_TEARDOWN"] = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
jsglue = JSGlue(app)

db = SQLAlchemy(app)


@app.route("/")
def index():
    print(basedir)
    print(database_dir)
    return render_template("index.html")

@app.route("/instrument/<name>")
def product(name):
    products = [{'name': 'majestic 1', 'opis': 'dupa1'},
                {'name': 'majestic 2', 'opis': 'dupa2'},
                {'name': 'majestic 3', 'opis': 'dupa3'},
                {'name': 'majestic 4', 'opis': 'dupa4'},
                {'name': 'majestic 5', 'opis': 'dupa5'},
                {'name': 'majestic 6', 'opis': 'dupa6'},
                {'name': 'majestic 7', 'opis': 'dupa7'},]

    return render_template("product.html", products=products)


@app.route("/description")
def description():

    instrument_type = request.args.get('instrument_type')
    query = Instrument_description.query.filter_by(instrument_type=instrument_type).first()
    opis =  row_to_dict(query)

    return jsonify(opis)



class Instrument_description(db.Model):
    __tablename__ = 'instrument_description'
    id = db.Column(db.Integer, primary_key = True)
    instrument_type = db.Column(db.String(64), unique = True, nullable = False)
    name = db.Column(db.String(64), unique = True, nullable = False)
    opis = db.Column(db.Text, nullable = False)
