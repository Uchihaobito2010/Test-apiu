import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.json({
      success: false,
      error: "Instagram URL required"
    });
  }

  try {
    const r = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const html = r.data;

    // video url nikaalo
    const match = html.match(/"video_url":"([^"]+)"/);

    if (!match) {
      return res.json({
        success: false,
        error: "Video not found / private"
      });
    }

    const video = match[1].replace(/\\u0026/g, "&");

    return res.json({
      success: true,
      video
    });

  } catch (e) {
    return res.json({
      success: false,
      error: "Instagram blocked request"
    });
  }
}
