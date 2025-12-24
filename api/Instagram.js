import axios from "axios";

const C = "\x1b[96m";
const R = "\x1b[0m";

console.log(`
${C}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   dev - @Aotpy / Paras
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${R}
`);

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.json({ success: false, error: "URL required" });
  }

  try {
    const r = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const match = r.data.match(/"video_url":"([^"]+)"/);
    if (!match) {
      return res.json({ success: false });
    }

    const video = match[1].replace(/\\u0026/g, "&");
    res.json({ success: true, video });

  } catch (e) {
    res.json({ success: false, error: "Blocked" });
  }
}
