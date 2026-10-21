const QRCode = require('qrcode');
const fs = require('node:fs/promises');
const path = require('node:path');
const { contact } = require('../src/data/cv-data.json');

async function main() {
  const directory = path.join(__dirname, '../public/qr');
  await fs.mkdir(directory, { recursive: true });
  for (const [name, url] of [['website', contact.website], ['linkedin', contact.social.linkedin], ['whatsapp', contact.social.whatsapp]]) {
    if (!url) continue;
    const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'M', margin: 4, width: 240 });
    await fs.writeFile(path.join(directory, `${name}.svg`), svg);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
