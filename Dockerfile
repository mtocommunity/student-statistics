ARG TZ=America/Lima
ARG HOST=0.0.0.0
ARG NODE_ENV=production

FROM oven/bun:1-slim AS builder

WORKDIR /app

ARG TZ
ARG HOST
ARG NODE_ENV

ENV TZ=$TZ
ENV HOST=$HOST
ENV NODE_ENV=$NODE_ENV

COPY package.json bun.lock ./
RUN bun install --ci --production

RUN bun astro telemetry disable

COPY . .

RUN bun run build


FROM oven/bun:1-slim AS runtime

ARG TZ
ARG HOST
ARG NODE_ENV

ENV TZ=$TZ
ENV HOST=$HOST
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY bun.lock ./
COPY package.json ./

RUN bun install --ci

COPY drizzle dist/server/drizzle

COPY --from=builder /app/dist /app/dist

EXPOSE 4321

CMD [ "bun", "--bun", "dist/server/entry.mjs" ]
