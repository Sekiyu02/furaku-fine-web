// microCMS API Client
const MICROCMS_DOMAIN = 'furaku-fine';
const MICROCMS_API_KEY = 'MiW4DiskawDruiBAKvPlV6eg7Pg2wQardEaD';

async function fetchMicroCMS(endpoint, queries = {}) {
  const params = new URLSearchParams(queries);
  const url = `https://${MICROCMS_DOMAIN}.microcms.io/api/v1/${endpoint}?${params}`;

  console.log('[microCMS] Fetching:', url);

  try {
    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': MICROCMS_API_KEY
      }
    });

    console.log('[microCMS] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[microCMS] Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[microCMS] Response data:', data);
    return data;
  } catch (error) {
    console.error('[microCMS] Fetch error:', error);
    return null;
  }
}

// 実績を取得
async function getWorks(limit = 10) {
  console.log('[microCMS] getWorks called, limit:', limit);
  return await fetchMicroCMS('works', { limit });
}

// お客様の声を取得（フィルタ付き）
async function getVoices(target = null, limit = 10) {
  const queries = { limit };
  if (target) {
    queries.filters = `target[equals]${target}`;
  }
  console.log('[microCMS] getVoices called:', { target, queries });
  return await fetchMicroCMS('voices', queries);
}

// お客様の声を全件取得（フィルタなし - デバッグ用）
async function getAllVoices(limit = 10) {
  console.log('[microCMS] getAllVoices called, limit:', limit);
  return await fetchMicroCMS('voices', { limit });
}

// ナレッジ記事を取得
async function getKnowledge(limit = 10) {
  return await fetchMicroCMS('knowledge', { limit, orders: '-publishedAt' });
}

// 単一記事を取得
async function getKnowledgeById(id) {
  return await fetchMicroCMS(`knowledge/${id}`);
}
