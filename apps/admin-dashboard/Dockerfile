FROM node:18-alpine AS builder
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps ./apps
COPY services ./services
RUN npm install

WORKDIR /repo/apps/admin-dashboard
RUN npx next build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY apps/admin-dashboard/package.json ./package.json
RUN npm install --omit=dev
COPY --from=builder /repo/apps/admin-dashboard/.next ./.next
COPY --from=builder /repo/apps/admin-dashboard/public ./public

EXPOSE 3000
CMD ["npm", "start"]
