FROM oven/bun:1-alpine AS base

WORKDIR /app

ENV TZ=America/Lima
ENV HOST=0.0.0.0


FROM base AS builder

COPY package.json bun.lock ./
RUN bun --bun install --ci --production

COPY . .

RUN bun --bun astro telemetry disable
RUN bun run build
RUN bun --bun scripts/find-dependencies.js


FROM base AS runtime

COPY --from=builder /app/dist /app/dist

RUN mv dist/package.json package.json

RUN bun --bun install --production --ci
RUN bun --bun add react@npm:@preact/compat react-dom@npm:@preact/compat

RUN rm -rf package.json

EXPOSE 4321

CMD ["bun", "--bun", "dist/server/entry.mjs"]
