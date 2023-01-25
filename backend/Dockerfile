FROM python:3.8-slim-buster

WORKDIR /backend/

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

WORKDIR /backend/src/

CMD ["flask", "run", "--host", "0.0.0.0"]
