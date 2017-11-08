FROM python:2
LABEL maintainer="discipleofhoid@gmail.com"
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        mysql-client libc-ares2 libssl1.0.0 libcrypto++9 libsodium13 libfreeimage3 \
    && rm -rf /var/lib/apt/lists/*

COPY "entrypoint.sh" /

WORKDIR /usr/src/app
COPY requirements.txt ./
COPY "megasdk-3.2.6-py2.py3-none-any.whl" ./
RUN pip install -r requirements.txt \
&& ldconfig /usr/local/lib/python2.7/site-packages/mega/
COPY . .
RUN python manage.py collectstatic --noinput

COPY docker-entrypoint.sh /
COPY docker-entrypoint.d/* /docker-entrypoint.d/
EXPOSE 8000
ENTRYPOINT [ "/entrypoint.sh" ]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
