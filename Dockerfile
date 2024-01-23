FROM node:20

WORKDIR /app

COPY package.json ./

ENV ACCESS_SECRET=665e37bb180fd4149dbc05afca9d4945b2a025ff2bf6ca203a790500e4bcc116
ENV OTHER_SECRET=945b2a025ff2300e4bcc116665e7bb180fd4149dbc05afca9d4bf6ca203a7905
ENV ORIGIN=http://localhost:5173

RUN yarn install

COPY prisma ./prisma

RUN yarn generate

COPY . .

EXPOSE 8000

CMD [ "yarn", "prod" ]