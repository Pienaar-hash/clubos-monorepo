FROM node:18-alpine AS builder
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps ./apps
COPY services ./services
RUN npm install
RUN npx tsc -p services/yoco-sync/tsconfig.json

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /repo/services/yoco-sync/dist ./dist
COPY services/yoco-sync/package.json ./package.json
RUN npm install --omit=dev

CMD ["node", "dist/index.js"]
