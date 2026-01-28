FROM node:22-alpine3.21 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm ci --omit=dev


FROM node:22-alpine3.21 AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN adduser -D -H -s /bin/false userApplication
USER userApplication

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
