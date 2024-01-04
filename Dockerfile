FROM node:18-alpine as deps

WORKDIR /opt/app-root/src

COPY package.json ./
COPY yarn.lock ./

RUN yarn

FROM node:18-alpine as builder

# ENV API_LINK $API_LINK

WORKDIR /opt/app-root/src
COPY . .
COPY --from=deps /opt/app-root/src/node_modules ./node_modules
RUN yarn build

FROM node:18-alpine AS runner

WORKDIR /opt/app-root/src
# ENV API_LINK $API_LINK
ENV NODE_ENV production
ENV TZ Asia/Ho_Chi_Minh
COPY --from=builder /opt/app-root/src/public ./public
COPY --from=builder /opt/app-root/src/.next ./.next
COPY --from=builder /opt/app-root/src/node_modules ./node_modules
COPY --from=builder /opt/app-root/src/package.json ./package.json
COPY --from=builder /opt/app-root/src/next.config.js ./next.config.js
COPY --from=builder /opt/app-root/src/yarn.lock ./yarn.lock
COPY --from=builder /opt/app-root/src/tsconfig.json ./tsconfig.json
COPY --from=builder /opt/app-root/src/.env ./.env
COPY --from=builder /opt/app-root/src/src ./src


EXPOSE 3000

CMD ["yarn", "start"]

