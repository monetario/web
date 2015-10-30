FROM python:3.5
MAINTAINER Sergey Nuzhdin <ipaq.lw@gmail.com>

VOLUME ['/opt/monetario/web']

WORKDIR /opt/monetario/web

ADD ./requirements.txt /opt/requirements-web.txt

RUN pip install -r /opt/requirements-web.txt

EXPOSE 9000
