FROM oven/bun:1.1 AS deps
WORKDIR /app
COPY . .
RUN bun install --production

FROM oven/bun:1.1 AS build
WORKDIR /app
COPY . .
RUN bun run build

FROM oven/bun:1.1
WORKDIR /app
ENV NODE_ENV=production
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
CMD ["bun", "run", "start"]
