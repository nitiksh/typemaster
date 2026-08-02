const fs = require('fs');

const xml = fs.readFileSync('d:/main-projects/typemaster/typemaster-nextjs/out/sitemap-0.xml', 'utf8');
const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(m => m[1])
  .filter(url => !url.includes('/stories/page/') && !/\/coding\/\d+/i.test(url));

function formatTitle(url) {
  try {
    const path = new URL(url).pathname;
    if (path === '/' || path === '') return 'Home Page';
    let cleaned = path.replace(/\/$/, '').split('/').pop();
    cleaned = cleaned.replace(/-/g, ' ');
    return cleaned.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  } catch (e) {
    return url;
  }
}

function getCategory(url) {
  if (url.includes('/stories/')) return 'stories';
  if (url.includes('/coding/')) return 'coding';
  if (url.includes('/blog/')) return 'blog';
  return 'core';
}

const urlData = matches.map(url => ({
  url: url,
  title: formatTitle(url),
  category: getCategory(url)
}));

const extraPages = [
  { url: 'https://typemaster.ntxm.org/index.html', title: 'TypeMaster Home Portal', category: 'core' },
  { url: 'https://typemaster.ntxm.org/blogs.html', title: 'TypeMaster Blog Listing', category: 'blog' },
  { url: 'https://typemaster.ntxm.org/pricing.html', title: 'Pricing & Features', category: 'core' },
  { url: 'https://typemaster.ntxm.org/sitemap.html', title: 'HTML Sitemap Index', category: 'core' },
  { url: 'https://typemaster.ntxm.org/blog/typing-classic-stories-literature-mode.html', title: 'Why Typing Classic Literature Boosts Speed & Focus', category: 'blog' },
  { url: 'https://typemaster.ntxm.org/blog/5-classic-books-to-practice-typing-online.html', title: '5 Classic Books to Practice Typing Online', category: 'blog' }
];

extraPages.forEach(p => {
  if (!urlData.some(u => u.url === p.url)) {
    urlData.push(p);
  }
});

const dataJson = JSON.stringify(urlData);

const htmlContent = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">

  <title>TypeMaster HTML Sitemap - All Pages & Practice Links</title>
  <meta name="description"
    content="Complete interactive HTML sitemap for TypeMaster. Easily browse all practice pages, classic literature story modes, coding drills, and tutorials.">
  <meta name="author" content="Nitiksh">
  <link rel="canonical" href="https://typemaster.ntxm.org/sitemap.html">

  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>

<body class="bg-gray-50 text-gray-900 antialiased flex flex-col min-h-screen">

  <!-- Header Navigation -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0 flex items-center">
          <a href="index.html" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
            <span class="font-bold text-xl tracking-tight text-gray-900">TypeMaster</span>
          </a>
        </div>

        <nav class="hidden md:flex space-x-8">
          <a href="index.html" class="text-gray-500 hover:text-gray-900 font-medium transition-colors">Home</a>
          <a href="blogs.html" class="text-gray-500 hover:text-gray-900 font-medium transition-colors">Blog</a>
          <a href="pricing.html" class="text-gray-500 hover:text-gray-900 font-medium transition-colors">Pricing</a>
          <a href="sitemap.html" class="text-blue-600 font-medium transition-colors">Sitemap</a>
        </nav>

        <div class="hidden md:flex items-center">
          <a target="_blank" href="https://typemaster.ntxm.org/download"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Download Now
          </a>
        </div>

        <div class="flex items-center md:hidden">
          <button type="button" class="text-gray-400 hover:text-gray-500 focus:outline-none p-2">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="bg-white border-b border-gray-200 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-blue-600 mb-4">
        <span>🗺️ Interactive Directory</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
        TypeMaster HTML Sitemap
      </h1>
      <p class="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
        Search and explore all pages, classic literature story modes, coding hubs, and blog guides across the TypeMaster platform.
      </p>

      <!-- Search & Filters -->
      <div class="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
        <div class="relative w-full flex-1">
          <input type="text" id="sitemapSearch" placeholder="Search URLs, story titles, coding levels..."
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all">
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select id="categoryFilter" class="w-full sm:w-auto px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Categories</option>
          <option value="core">Core & Main Pages</option>
          <option value="stories">Story Mode (Classic Literature)</option>
          <option value="coding">Coding Practice Hubs</option>
          <option value="blog">Blogs & Guides</option>
        </select>
      </div>

      <!-- Stats Bar -->
      <div class="mt-6 flex justify-center items-center gap-4 text-xs text-gray-500 font-medium">
        <span>Total Indexed URLs: <strong id="totalCount" class="text-blue-600 font-bold">0</strong></span>
        <span>&bull;</span>
        <span>Showing: <strong id="visibleCount" class="text-gray-900 font-bold">0</strong></span>
      </div>
    </div>
  </section>

  <!-- Sitemap Display Area -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
    <div id="sitemapContainer" class="space-y-12">
      <!-- Dynamic Categories Rendered Here -->
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white border-t border-gray-200 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div class="col-span-2 md:col-span-1">
          <a href="index.html" class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <span class="font-bold text-xl text-gray-900">TypeMaster</span>
          </a>
          <p class="text-gray-500 text-sm leading-relaxed">
            TypeMaster is a typing practice software that helps you improve your typing speed and accuracy through literature, code, and speed drills.
          </p>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-4">Product</h4>
          <ul class="space-y-2 text-sm text-gray-500">
            <li><a href="index.html" class="hover:text-blue-600 transition-colors">Home</a></li>
            <li><a href="pricing.html" class="hover:text-blue-600 transition-colors">Pricing</a></li>
            <li><a target="_blank" href="https://typemaster.ntxm.org/download" class="hover:text-blue-600 transition-colors">Download</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-4">Resources</h4>
          <ul class="space-y-2 text-sm text-gray-500">
            <li><a href="blogs.html" class="hover:text-blue-600 transition-colors">Blog</a></li>
            <li><a href="sitemap.html" class="hover:text-blue-600 transition-colors">Sitemap</a></li>
            <li><a target="_blank" href="https://typemaster.ntxm.org/stories" class="hover:text-blue-600 transition-colors">Story Practice</a></li>
            <li><a target="_blank" href="https://typemaster.ntxm.org/coding" class="hover:text-blue-600 transition-colors">Coding Practice</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 mb-4">Legal</h4>
          <ul class="space-y-2 text-sm text-gray-500">
            <li><a target="_blank" href="https://ntxm.org/privacy/" class="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            <li><a target="_blank" href="https://ntxm.org/terms/" class="hover:text-blue-600 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-gray-400">© <span id="current-year"></span> TypeMaster. All rights reserved.</p>
        <script>
          document.getElementById('current-year').textContent = new Date().getFullYear();
        </script>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a target="_blank" href="https://x.com/ntxmofficial" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a target="_blank" href="https://github.com/typemaster-by-ntxm/typemaster" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Embedded Sitemap Data & Renderer -->
  <script>
    const SITEMAP_DATA = ${dataJson};

    document.addEventListener('DOMContentLoaded', function () {
      const searchInput = document.getElementById('sitemapSearch');
      const categoryFilter = document.getElementById('categoryFilter');
      const container = document.getElementById('sitemapContainer');
      const totalCountEl = document.getElementById('totalCount');
      const visibleCountEl = document.getElementById('visibleCount');

      totalCountEl.textContent = SITEMAP_DATA.length.toLocaleString();

      function renderSitemap() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedCat = categoryFilter.value;

        const filtered = SITEMAP_DATA.filter(item => {
          const matchesQuery = item.title.toLowerCase().includes(query) || item.url.toLowerCase().includes(query);
          const matchesCat = selectedCat === 'all' || item.category === selectedCat;
          return matchesQuery && matchesCat;
        });

        visibleCountEl.textContent = filtered.length.toLocaleString();

        const categories = {
          core: { name: '📌 Core Pages & Application Hubs', items: [] },
          stories: { name: '📚 Story Mode — Classic Literature Novels', items: [] },
          coding: { name: '💻 Coding Practice Hubs & Syntax Levels', items: [] },
          blog: { name: '📝 Blogs, Guides & Tutorials', items: [] }
        };

        filtered.forEach(item => {
          if (categories[item.category]) {
            categories[item.category].items.push(item);
          } else {
            categories.core.items.push(item);
          }
        });

        container.innerHTML = '';

        let hasResults = false;

        Object.keys(categories).forEach(catKey => {
          const cat = categories[catKey];
          if (cat.items.length > 0) {
            hasResults = true;
            const section = document.createElement('div');
            section.className = 'bg-white border border-gray-200 rounded-2xl p-6 shadow-sm';

            let linksHtml = cat.items.map(item => \`
              <li>
                <a href="\${item.url}" target="_blank" class="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline transition-colors block truncate" title="\${item.url}">
                  • \${item.title}
                </a>
              </li>
            \`).join('');

            section.innerHTML = \`
              <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <h2 class="text-lg font-bold text-gray-900">\${cat.name}</h2>
                <span class="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">\${cat.items.length} links</span>
              </div>
              <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                \${linksHtml}
              </ul>
            \`;

            container.appendChild(section);
          }
        });

        if (!hasResults) {
          container.innerHTML = \`
            <div class="text-center py-16 bg-white border border-gray-200 rounded-2xl">
              <p class="text-gray-500 text-base font-medium">No sitemap links found matching "\${query}".</p>
              <button onclick="document.getElementById('sitemapSearch').value=''; document.getElementById('categoryFilter').value='all'; this.dispatchEvent(new Event('change', {bubbles:true}));" class="mt-4 text-xs font-bold text-blue-600 hover:underline">Clear Search & Filters</button>
            </div>
          \`;
        }
      }

      searchInput.addEventListener('input', renderSitemap);
      categoryFilter.addEventListener('change', renderSitemap);

      renderSitemap();
    });
  </script>
</body>

</html>
`;

fs.writeFileSync('d:/main-projects/typemaster/typemaster-github-blogs/sitemap.html', htmlContent);
console.log(`Successfully generated sitemap.html with all ${urlData.length} embedded URLs!`);
