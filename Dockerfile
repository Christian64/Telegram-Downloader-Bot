FROM ghcr.io/puppeteer/puppeteer:21.3.6,
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY pnpm*.yaml
RUN pnpm ci

COPY . .
CMD ["node", "src/bot.js"]
