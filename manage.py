#!/usr/bin/env python

from flask import render_template
from flask import Flask, Blueprint
from flask.ext.script import Manager, prompt, prompt_pass, Shell

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SERVER_NAME'] = 'monetario.local'


bp = Blueprint('lol', __name__)
manager = Manager(app)


@bp.before_request
def before_bp():
    print("****************")


@app.before_request
def before_app():
    print("xxxxxxxx")


# @bp.route("/")
# def hello():
#     return u"<h1>test response</h1>"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@app.route('/p/<path:path>')
def hello2(path):
    # return "welcome from root"
    print('SSSSSS', path)
    return render_template('index.html')


app.register_blueprint(bp, url_prefix='/')
if __name__ == '__main__':
    manager.run()
