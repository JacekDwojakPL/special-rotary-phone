import os
from flask import Flask, render_template, request, jsonify, redirect,url_for
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
    return render_template("index.html")


@app.route("/description")
def description():

    instrument_type = request.args.get('instrument_type')
    query = Instrument_description.query.filter_by(instrument_type=instrument_type).first()

    if query is None:
        opis = {
                "name" : "nie ma tego instrumentu",
                "opis" : "nie ma takiego opisu"
                }
    else:
        opis = row_to_dict(query)

    return jsonify(opis)


@app.route("/language")
def language():
    table = request.args.get("version")
    type = request.args.get("type")
    query = "SELECT content FROM " + table + " WHERE type = \"" + type + "\";"
    response = db.session.execute(query).fetchall()
    rows = [dict(row) for row in response]
    return jsonify(rows)

@app.route("/add", methods=['GET', 'POST'])
def add():

    if request.method == 'GET':
        query = Instrument_description.query.all()

        return render_template("add.html", rows=query)

    elif request.method == 'POST':

        instrument_type = request.form.get('instrument_type')
        instrument_name = request.form.get('instrument_name')
        instrument_opis = request.form.get('instrument_opis')

        new_instrument = Instrument_description(instrument_type=instrument_type, name=instrument_name, opis=instrument_opis)
        db.session.add(new_instrument)
        db.session.commit()

        return redirect(url_for('add'))


@app.route("/remove", methods=['POST'])
def remove():
    instrument_type = request.form.get("remove")
    to_delete = Instrument_description.query.filter_by(instrument_type=instrument_type).first()

    db.session.delete(to_delete)
    db.session.commit()

    return redirect(url_for('add'))



class Instrument_description(db.Model):
    __tablename__ = 'instrument_description'
    id = db.Column(db.Integer, primary_key = True)
    instrument_type = db.Column(db.String(64), unique = True, nullable = False)
    name = db.Column(db.String(64), unique = True, nullable = False)
    opis = db.Column(db.Text, nullable = False)
