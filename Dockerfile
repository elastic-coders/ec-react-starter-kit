FROM mhart/alpine-node:6
# Some npm packages might be installed directly from a source git repository
RUN apk update && apk upgrade && \
    apk add --no-cache git

ENV NODE_ENV production

RUN adduser -D -h /usr/app -S app
WORKDIR /usr/app

COPY dist/package.json /usr/app/package.json
RUN npm install
COPY dist /usr/app

USER app
EXPOSE 5000
ENTRYPOINT ["npm", "start"]
