let page;

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  }, 7000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 8000);
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com");
  });

  test("Should open Pricing title", async () => {
    const pricingLink = "nav > ul > li > a";
    await page.waitForSelector(pricingLink);
    await page.click(pricingLink);
    await page.waitForTimeout(2000);
    const pricingTitle = await page.title();
    expect(pricingTitle).toContain("Plans for every developer");
  }, 9000);

  test("Should open 'Sign in to GitHub' and Error login", async () => {
    const loginLink = 'a[href="/login"]';
    await page.waitForSelector(loginLink);
    await page.click(loginLink);
    await page.waitForTimeout(2000);
    const emailSel =
      "#login > div.auth-form-body.mt-3 > form > input[type=hidden]:nth-child(1)";
    await page.type(emailSel, "user@mail.com", { delay: 100 });
    await page.click(" input.btn.btn-primary.btn-block.js-sign-in-button");
    const loginError = "#js-flash-container > div > div > div";
    await page.waitForSelector(loginError, {
      visible: true,
    });
    const actual = await page.$eval(loginError, (link) => link.textContent);
    expect(actual.trim()).toContain("Incorrect username or password.");
  }, 10000);
});

test("Should open 'Join GitHub' title", async () => {
  page = await browser.newPage();
  await page.goto(
    "https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"
  );
  const signupTitle = await page.title();
  expect(signupTitle).toContain("Join GitHub");
}, 11000);
