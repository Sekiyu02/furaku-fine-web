// api/microcms.js
export default async function handler(req, res) {
  const { endpoint, ...queries } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'endpoint is required' });
  }

  const params = new URLSearchParams(queries);
  const url = `https://furaku-fine.microcms.io/api/v1/${endpoint}?${params}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // CORSヘッダー
    res.setHeader('Access-Control-Allow-Origin', 'https://furakufine.co.jp');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
