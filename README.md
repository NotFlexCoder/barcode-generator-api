# 🧾 Barcode Generator API

A lightweight Node.js (Next.js) API endpoint that generates a **Code 128 barcode** image in PNG format using the powerful [`bwip-js`](https://github.com/metafloor/bwip-js) library. Perfect for inventory systems, e-commerce apps, digital receipts, or any project needing instant barcode generation.

## 🚀 Features

- 🎯 Supports [Code 128](https://en.wikipedia.org/wiki/Code_128) barcode format.
- 🖼️ Returns high-quality PNG images.
- ⚙️ Adjustable scale via query parameters.
- ⚡ Fast, stateless, and easy to integrate.
- 🔧 Built with modern async/await syntax.

## 🛠️ Requirements

- Node.js v14 or higher
- A Next.js project or compatible server that supports API routes (e.g., Vercel, Netlify Functions)

## 📡 Usage

1. **Install `bwip-js`:**
   ```bash
   npm install bwip-js
   ```

2. **Create the API endpoint:**
   - Place the following code in `pages/api/barcode.js`:

     ```js
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
           includetext: false
         });

         res.setHeader('Content-Type', 'image/png');
         res.status(200).send(png);
       } catch (e) {
         res.status(400).json({ error: e.message });
       }
     }
     ```

3. **Run Your Server:**
   ```bash
   npm run dev
   ```

4. **Access the API:**
   - URL format:
     ```
     http://localhost:3000/api/barcode?text=YOUR_TEXT&scale=3
     ```

   - Example:
     ```
     http://localhost:3000/api/barcode?text=HELLO123&scale=2
     ```

   - This will return a barcode image as a PNG.

## 📷 Example Output

You’ll receive a raw PNG image. To preview in browser, just enter a valid URL like:

```
http://localhost:3000/api/barcode?text=EXAMPLE&scale=3
```

## ⚠️ Error Handling

- If `text` or `scale` is missing, it will return:
  ```json
  {
    "error": "Missing required parameters: text and scale"
  }
  ```

- If `bwip-js` encounters an error:
  ```json
  {
    "error": "Detailed error message"
  }
  ```
  
## 📝 License

This project is licensed under the MIT License – see the [LICENSE](https://github.com/NotFlexCoder/NotFlexCoder/blob/main/LICENSE) file for details.
