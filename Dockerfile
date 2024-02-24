FROM ghcr.io/puppeteer/puppeteer:latest
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY pnpm*.yaml ./
RUN pnpm install 

COPY . .
CMD ["pnpm", "start"]
