const pup = require('puppeteer')
require('dotenv').config()


const sofascore_login = "https://www.sofascore.com/user/login";

export async function enterAccount() {
  const browser = await pup.launch({ headless: false})
  const page = await browser.newPage()

  await page.goto(sofascore_login)

  const buttonFacebookLog = await page.$('button[cursor="pointer"][d="block"][display="flex"].sc-hLBbgP.sc-eDvSVe.dWoFsA.fRddxb');
  await buttonFacebookLog.click();

  const popupTarget = await browser.waitForTarget(target => target.url().includes('facebook.com'));
  const popupPage = await popupTarget.page();

  //Email
  await popupPage.waitForSelector('input[type="text"].inputtext._55r1.inputtext.inputtext[name="email"]');
  const logInfoSelector = 'input[type="text"].inputtext._55r1.inputtext.inputtext[name="email"]';
  await popupPage.type(logInfoSelector, process.env.FACE_EMAIL);

  //Password
  await popupPage.waitForSelector('input[type="password"].inputtext._55r1.inputtext.inputtext[name="pass"]')
  const passInfoSelector = 'input[type="password"].inputtext._55r1.inputtext.inputtext[name="pass"]'
  await popupPage.type(passInfoSelector, process.env.FACE_PASSWORD);

  //Click to log
  const loginButton = await popupPage.$('input[value="Entrar"][name="login"]');
  await loginButton.click();

  await popupPage.close()
  await page.close()
}

