FROM oven/bun:1.2.16-alpine AS base

ENV TZ=America/Lima
ENV HOST=0.0.0.0


FROM base AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --ci --production

COPY . .

RUN bun astro telemetry disable
RUN bun run build
RUN bun scripts/find-dependencies.js


FROM base AS runtime

WORKDIR /app

COPY --from=builder /app/dist /app/dist

RUN mv dist/package.json package.json
RUN bun install --production --ci
RUN bun add react@npm:@preact/compat react-dom@npm:@preact/compat
RUN rm -rf package.json

CMD ["bun", "--bun", "dist/server/entry.mjs"]
