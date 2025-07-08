# Build dependencies (WITH devDeps)
FROM oven/bun:1.1 AS deps
WORKDIR /app
COPY . .
RUN bun install

# Build project (build script butuh devDeps)
FROM oven/bun:1.1 AS build
WORKDIR /app
COPY --from=deps /app /app
RUN bun run build

# Production stage (only prod deps)
FROM oven/bun:1.1 AS prod
WORKDIR /app
COPY --from=deps /app/package.json ./
COPY --from=deps /app/bun.lockb ./
RUN bun install --production

# Copy final build result
COPY --from=build /app/build ./build
CMD ["bun", "start"]
