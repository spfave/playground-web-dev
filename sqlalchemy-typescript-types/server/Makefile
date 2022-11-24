venv:
	python3 -m venv .venv

activate:
	.\.venv\scripts\activate

setup: requirements.txt
	pip install -r requirements.txt

req:
	pip freeze > requirements.txt

run:
	python run.py

ts-types:
	py-ts-interfaces .\apisql\models.py -o ..\client\types\sql-interface.ts

