A simple django server for serving ebooks written years ago - now updating for modern technologies.

Uses django-inspectional-registration for user managment

Now Dockerized
Set the following Environmental variables those with defaults are optional:

Database variables currently must be for a mySQL database.

DATABASE_ENGINE - must be a mySQL engine for now - default django.db.backends.mysql

DATABASE_USER - default root

DATABASE_PASSWORD

DATABASE_HOST - Hostname for mysql database default mydb

DATABASE_NAME - default library

DATABASE_PORT - default 3306

DJANGO_SECRET_KEY - Has a default value however that should never be used in production

Email variables are for sending registation emails.

EMAIL_HOST - default smtp.gmail.com

EMAIL_HOST_USER

EMAIL_HOST_PASSWORD 

EMAIL_FROM_ADDRESS

Google variables are needed for OAUTH2 connections to Google Drive and Books.

GOOGLE_OAUTH2_CLIENT_ID 

GOOGLE_OAUTH2_CLIENT_SECRET
