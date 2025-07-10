FROM oven/bun:1.1 AS deps
WORKDIR /app
COPY . .
RUN bun install

FROM oven/bun:1.1 AS build
WORKDIR /app
COPY --from=deps /app /app
RUN bun run build

FROM oven/bun:1.1 AS prod
WORKDIR /app
COPY --from=deps /app/package.json ./
COPY --from=deps /app/bun.lockb ./
RUN bun install --production

COPY --from=build /app/dist ./dist
COPY --from=build /app/src/swagger.yaml ./src/swagger.yaml
COPY --from=build /app/src/swagger ./src/swagger
CMD ["bun", "run", "start"]
