ARG TZ=America/Lima
ARG HOST=0.0.0.0
ARG NODE_ENV=production

FROM oven/bun:1-slim AS base

WORKDIR /app

ARG TZ
ARG HOST
ARG NODE_ENV

ENV TZ=$TZ
ENV HOST=$HOST
ENV NODE_ENV=$NODE_ENV


FROM base AS builder

COPY package.json bun.lock ./
RUN bun --bun install --ci --production

COPY . .

RUN bun --bun astro telemetry disable
RUN bun --bun run build
RUN bun --bun scripts/find-dependencies.js


FROM oven/bun:1-distroless AS runtime

ARG TZ
ARG HOST
ARG NODE_ENV

ENV TZ=$TZ
ENV HOST=$HOST
ENV NODE_ENV=$NODE_ENV

COPY drizzle drizzle
COPY scripts/migrate.ts scripts/migrate.ts

COPY --from=builder /app/dist /app/dist

RUN mv dist/package.json package.json

RUN bun install --production --ci

RUN rm -rf package.json

EXPOSE 4321

CMD [ "bun", "--bun", "dist/server/entry.mjs" ]
