FROM node:10.24

RUN node -v

RUN mkdir /opt/source
COPY source.zip /opt/source
WORKDIR /opt/source
RUN apt install unzip 
RUN unzip source.zip
WORKDIR /opt/source/source
RUN npm install

CMD [ "npm", "start" ]