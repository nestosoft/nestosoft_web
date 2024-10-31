FROM node:22-alpine AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build


FROM base AS nestosoft-web
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci

RUN addgroup -g 1001 -S servicegroup
RUN adduser -S serviceagent -u 1001
USER serviceagent

COPY --from=builder --chown=serviceagent:servicegroup /app/.next ./.next
COPY --from=builder --chown=serviceagent:servicegroup /app/node_modules ./node_modules
COPY --from=builder --chown=serviceagent:servicegroup /app/package.json ./package.json
COPY --from=builder --chown=serviceagent:servicegroup /app/public ./public

CMD npm start

FROM base AS nestosoft-web-dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD npm run dev