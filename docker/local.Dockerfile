# Only build dependencies when needed.
FROM node:22-alpine AS dependencies

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm ci

# Build and run the development server.
FROM node:22-alpine AS development

RUN apk update && \
    apk add --no-cache openssl

WORKDIR /usr/app
COPY --chown=node:node --from=dependencies /usr/app/node_modules ./node_modules
COPY --chown=node:node . .

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

USER node
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "next:dev"]
