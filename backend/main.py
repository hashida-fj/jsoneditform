from flask import Flask, jsonify, url_for, request
from flask_cors import CORS
import yaml
import json
from jinja2 import Environment, FileSystemLoader

app = Flask(__name__, static_url_path="")
CORS(app)

@app.route("/api/hello")
def hello():
    return "Hello World!"


@app.route("/api/spec")
def getSpeck():

    with open("./formspec.yml", "r") as f:
        spec = yaml.load(f)
    return jsonify(spec)


@app.route("/api/save", methods=["POST"])
def postDict():

    print(request.json)
    env = Environment(loader=FileSystemLoader('./', encoding='utf8'))
    tpl = env.get_template('template.json.j2')

    with open("result.json", "w") as f:
        f.write(tpl.render(request.json))

    return "ok", 200

