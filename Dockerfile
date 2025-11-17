# ==============================
# 1️⃣ Builder stage
# ==============================
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build your Next.js app
RUN npm run build

# Now remove all dev dependencies to shrink node_modules
RUN npm prune --omit=dev


# ==============================
# 2️⃣ Runner stage
# ==============================
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what’s needed for runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Non-root user
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

EXPOSE 3000
CMD ["npm", "run", "start"]
