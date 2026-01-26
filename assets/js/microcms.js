// microCMS API Client（Vercel Functions経由）
const API_BASE = '/api/microcms';

async function fetchMicroCMS(endpoint, queries = {}) {
  const params = new URLSearchParams({ endpoint, ...queries });
  const url = `${API_BASE}?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[microCMS] Error:', error.message);
    return null;
  }
}

// 実績を取得
async function getWorks(limit = 10) {
  return await fetchMicroCMS('works', { limit });
}

// お客様の声を取得（フィルタ付き）
async function getVoices(target = null, limit = 10) {
  const queries = { limit };
  if (target) {
    queries.filters = `target[equals]${target}`;
  }
  return await fetchMicroCMS('voices', queries);
}

// お客様の声を全件取得（フィルタなし）
async function getAllVoices(limit = 10) {
  return await fetchMicroCMS('voices', { limit });
}

// ナレッジ記事を取得
async function getKnowledge(limit = 10) {
  return await fetchMicroCMS('knowledge', { limit, orders: '-publishedAt' });
}

// カテゴリ別ナレッジ記事を取得
async function getKnowledgeByCategory(category, limit = 10) {
  return await fetchMicroCMS('knowledge', {
    limit,
    orders: '-publishedAt',
    filters: `category[equals]${category}`
  });
}

// 単一記事を取得
async function getKnowledgeById(id) {
  return await fetchMicroCMS(`knowledge/${id}`);
}

// 単一のお客様の声を取得
async function getVoiceById(id) {
  return await fetchMicroCMS(`voices/${id}`);
}
