# Build dependencies
FROM oven/bun:1.1 AS deps
WORKDIR /app
COPY . .
RUN bun install

# Build project
FROM oven/bun:1.1 AS build
WORKDIR /app
COPY --from=deps /app /app
RUN bun run build

# Production pake Node.js
FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=deps /app/package.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
CMD ["npm", "run", "start"]
