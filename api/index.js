import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { text, scale } = req.query;

  if (!text || !scale) {
    return res.status(400).json({ error: 'Missing required parameters: text and scale' });
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid: 'code128',
      text,
      scale: parseInt(scale),
      height: 10,
      includetext: true,
      textxalign: 'center',
    });

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(png);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
