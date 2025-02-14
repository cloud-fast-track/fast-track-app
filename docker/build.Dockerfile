######################
#        Base        #
######################
FROM node:22-alpine AS base

######################
#       Install      #
######################
FROM base AS install
WORKDIR /usr/src

# Update and upgrade the system
RUN apk update && \
    apk upgrade --no-cache libcrypto3 libssl3 \
    && apk add --no-cache libc6-compat

# Install dependencies
COPY package*.json /usr/src/
RUN npm ci

######################
#        Build       #
######################
FROM base AS build

WORKDIR /usr/src

COPY --from=install /usr/src/node_modules /usr/src/node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

######################
#       Runner       #
######################
FROM base AS runner
WORKDIR /usr/src

ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /usr/src/public /usr/src/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nextjs:nodejs /usr/src/.next/standalone /usr/src
COPY --from=build --chown=nextjs:nodejs /usr/src/.next/static /usr/src/.next/static

USER nextjs

EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl -f http://localhost:3000 || exit 1" ]
