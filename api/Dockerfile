FROM python:alpine3.6
RUN mkdir -p /app
WORKDIR /app
COPY requirements.txt .
RUN apk update
RUN apk add --no-cache --virtual .build-deps gcc musl-dev \
 && pip install cython
RUN pip install -r requirements.txt
RUN apk del .build-deps
COPY assets/nltk_data /root/nltk_data
COPY . .
ENTRYPOINT [ "python" ]
CMD [ "app.py" ]

