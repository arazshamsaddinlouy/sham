const { chromium } = require("playwright");

async function HandleCrawler(req, res) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://digikala.com", {
    waitUntil: "networkidle",
  });
  await page.waitForSelector("[data-cro-id]", { timeout: 5000 });
  const elements = await page.$$eval("[data-cro-id]", (elements) =>
    elements.map((el) => ({
      croId: el.getAttribute("data-cro-id"), // Get the data-cro-id value
      text: el.textContent.trim(), // Get the text content
    }))
  );

  const filteredElements = "hp-categories-icons";
  const mainCats = elements.filter((el) => el.croId === filteredElements);
  // await page.goto("https://torob.com", {
  //   waitUntil: "networkidle",
  // });
  // const elements2 = await page.$$eval(
  //   "a.dropdown__trigger.droptrigger-index",
  //   (elements) =>
  //     elements.map((el) => ({
  //       croId: "", // Get the data-cro-id value
  //       text: el.textContent.trim(), // Get the text content
  //     }))
  // );
  // await page.goto("https://achareh.co", {
  //   waitUntil: "networkidle",
  // });
  // const elements3 = await page.$$eval(
  //   "a.base-link.main-category-item.main-cat-box.main-category",
  //   (elements) =>
  //     elements.map((el) => ({
  //       croId: "", // Get the data-cro-id value
  //       text: el.getAttribute("title").trim(), // Get the text content
  //     }))
  // );
  // //await browser.close();
  res.json({ achareh: mainCats });
}

module.exports = { HandleCrawler };
