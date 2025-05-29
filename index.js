import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { text = '123456789012', bcid = 'code128', scale = 3, height = 10 } = req.query;

  try {
    const png = await bwipjs.toBuffer({
      bcid,
      text,
      scale: parseInt(scale),
      height: parseInt(height),
      includetext: true,
      textxalign: 'center',
    });

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(png);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
