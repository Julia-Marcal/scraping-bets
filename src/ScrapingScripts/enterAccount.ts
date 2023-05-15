const pup = require('puppeteer')
require('dotenv').config()

const sofascore_login = "https://www.sofascore.com/user/login";

export let browser;

export async function enterAccount() {
  browser = await pup.launch({ headless: false, timeout: 0})
  let loginPage = await browser.newPage()

  await loginPage.goto(sofascore_login)

  const buttonFacebookLog = await loginPage.waitForSelector('button[cursor="pointer"][d="block"][display="flex"].sc-hLBbgP.sc-eDvSVe.dWoFsA.fRddxb', { visible: true });
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
}


