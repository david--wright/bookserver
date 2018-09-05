FROM python:2
RUN apt-get update \
    && apt-get install -y \
	   swig libcrypto++-dev zlib1g-dev libc-ares-dev libfreeimage-dev libsodium-dev
RUN git clone https://github.com/meganz/sdk.git /home/sdk
WORKDIR /home/sdk
RUN ./autogen.sh
RUN ./configure --disable-silent-rules --enable-python --disable-examples
RUN make
WORKDIR /home/sdk/bindings/python
RUN python setup.py bdist_wheel

	
FROM python:2
LABEL maintainer="discipleofhoid@gmail.com"
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        mysql-client libc-ares2 libcrypto++ libfreeimage3 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/app
COPY requirements.txt ./
COPY --from=0 "/home/sdk/bindings/python/dist/" ./
RUN ls megasdk* >> requirements.txt \
&& pip install -r requirements.txt \
&& ldconfig /usr/local/lib/python2.7/site-packages/mega/
COPY . .
RUN python manage.py collectstatic --noinput
COPY docker-entrypoint.sh /
COPY docker-entrypoint.d/* /docker-entrypoint.d/
EXPOSE 8000
ENTRYPOINT [ "/docker-entrypoint.sh" ]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
