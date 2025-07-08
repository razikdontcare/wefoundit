FROM oven/bun:1.1 AS development-dependencies-env
WORKDIR /app
COPY . .
RUN bun install

FROM oven/bun:1.1 AS production-dependencies-env
WORKDIR /app
COPY . .
RUN bun install

FROM oven/bun:1.1 AS build-env
WORKDIR /app
COPY . .
RUN bun run build

FROM oven/bun:1.1
WORKDIR /app
COPY . .
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
CMD ["bun", "start"]
