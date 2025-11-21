FROM node:18-alpine AS builder
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps ./apps
COPY services ./services
RUN npm install
RUN npx tsc -p apps/api-server/tsconfig.json

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /repo/apps/api-server/dist ./dist
COPY apps/api-server/package.json ./package.json
RUN npm install --omit=dev

EXPOSE 3001
CMD ["node", "dist/index.js"]
