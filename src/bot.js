const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const puppeteer = require("puppeteer");

const { Telegraf, Input } = require("telegraf");
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const main = async () => {
  const browser = await puppeteer.launch();
  const [tab] = await browser.pages();

  bot.start((ctx) => {
    const firstName = ctx.message.from.first_name;
    ctx.reply(
      `Hello ${firstName}, type /reel and the URL to download your reel ex: /reel https://www.instagram.com/reel/myReelUrl`,
    );
  });

  bot.command(["Reel", "Reels", "reel", "reels"], async (ctx) => {
    try {
      ctx.reply("Downloading Video ...");
      const url = ctx.message.text.split(" ")[1];
      const src = await getVideoSrc(url, tab);
      await ctx.replyWithVideo(Input.fromURLStream(src));
    } catch (error) {
      console.log({ error });
      ctx.reply("Oops, Something wrong happend, Try again.");
    }
  });
};

const getVideoSrc = async (website, tab) => {
  await tab.goto(website);
  await tab.waitForSelector("video");
  return await tab.evaluate("document.querySelector('video').src");
};

main();
bot.launch();
