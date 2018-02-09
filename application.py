from flask import Flask, render_template, request, jsonify
from flask_jsglue import JSGlue

app=Flask(__name__)
jsglue = JSGlue(app)


@app.route("/")
def index():
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

    info = request.args.get('name')
    opis = {
        "title": "test title",
        "opis": "test opis"
    }

    return jsonify(opis)
