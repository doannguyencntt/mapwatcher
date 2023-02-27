FROM node:latest

WORKDIR /app

COPY ./docker_compose/start.sh /start.sh
RUN chmod +x /start.sh

COPY ./package.json package.json

COPY . .
RUN npm install

EXPOSE 5000
ENTRYPOINT [ "/start.sh" ]
CMD []
# RUN CMD
