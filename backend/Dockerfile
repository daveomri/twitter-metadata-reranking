# pull the image
FROM python:3

# set the working directory
WORKDIR /usr/src/app

# create environment
ENV FLASK_APP=app.py

# set the development environment
ENV FLASK_ENV=development

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /usr/src/app/

# add run
CMD ["python", "app.py"]