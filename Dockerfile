FROM python:2

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        mysql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY requirements.txt ./
COPY megasdk-2.6.0-py2.py3-none-any.whl ./
RUN pip install -r requirements.txt
COPY . .
# Need to add migration
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
