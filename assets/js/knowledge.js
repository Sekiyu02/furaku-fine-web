// ========== Knowledge Page Filter ==========

// カテゴリ名のマッピング
const categoryNames = {
  recruitment: '採用ブランディング',
  philosophy: '理念浸透',
  organization: '組織開発',
  medical: '医療採用',
  case: '事例紹介',
  column: 'COLUMN',
  report: 'REPORT',
  news: 'NEWS'
};

// 記事グリッドを描画する関数
function renderKnowledgeGrid(data) {
  const articleGrid = document.getElementById('articleGrid');
  if (!articleGrid) return;

  if (data && data.contents && data.contents.length > 0) {
    articleGrid.innerHTML = data.contents.map(article => {
      const articleUrl = 'article.html?id=' + encodeURIComponent(article.id);
      return `
      <a href="${articleUrl}" class="article-card" data-category="${article.category || 'column'}" data-article-id="${article.id}">
        <div class="article-card-image">
          ${article.thumbnail ? `<img loading="lazy" src="${article.thumbnail.url}" alt="${article.title}">` : '<div class="article-card-placeholder"></div>'}
          <span class="article-card-category ${article.category || 'column'}">${categoryNames[article.category] || article.category || 'COLUMN'}</span>
        </div>
        <div class="article-card-content">
          <time class="article-card-date">${new Date(article.publishDate || article.publishedAt || article.createdAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')}</time>
          <h3 class="article-card-title">${article.title}</h3>
          <p class="article-card-excerpt">${article.excerpt || ''}</p>
        </div>
      </a>
    `}).join('');
  } else {
    articleGrid.innerHTML = '<p class="no-data">該当する記事がありません。</p>';
  }
}

// ローディング表示
function showLoading() {
  const articleGrid = document.getElementById('articleGrid');
  if (articleGrid) {
    articleGrid.innerHTML = '<p class="loading-text">読み込み中...</p>';
  }
}

// フィルターボタンの初期化
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      // アクティブ状態の切り替え
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      // ローディング表示
      showLoading();

      // microCMSからフィルタリングして取得
      let data;
      if (category === 'all') {
        data = await getKnowledge(20);
      } else {
        data = await getKnowledgeByCategory(category, 20);
      }

      // 記事を再描画
      renderKnowledgeGrid(data);
    });
  });
});
