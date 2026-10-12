/* Publishing Hub · Book Catalog — sample data layer.
   Every record below is SAMPLE DATA for the prototype. Real catalog entries
   arrive from the Publishing Hub backend / Story Forge manifests. */

const BOOKS = [
  {
    id: 'ninth-bell', title: 'The Ninth Bell', author: 'Sample Author',
    genre: 'Manga', coverClass: 'cv-manga', kicker: 'Vol. 1 · Ongoing',
    rating: 4.8, ratingsCount: 1240, pages: 192,
    blurb: 'A temple apprentice rings a bell that was never meant to sound — and something on the other side answers.',
    priceEbook: 9.99, pricePrint: 19.99,
    retailers: ['KDP', 'IngramSpark', 'Draft2Digital'],
  },
  {
    id: 'salt-cinder', title: 'Salt & Cinder', author: 'Sample Author',
    genre: 'Comic', coverClass: 'cv-comic', kicker: 'Complete Series',
    rating: 4.6, ratingsCount: 860, pages: 144,
    blurb: 'Two rival coastal kitchens. One stolen recipe. A food war drawn in full color.',
    priceEbook: 7.99, pricePrint: 16.99,
    retailers: ['KDP', 'B&N Press'],
  },
  {
    id: 'paper-cranes', title: 'A Court of Paper Cranes', author: 'Sample Author',
    genre: 'Light Novel', coverClass: 'cv-light', kicker: 'Illustrated Edition',
    rating: 4.9, ratingsCount: 2310, pages: 288,
    blurb: 'An origami-folded court where every favor is a crane — and every crane is a debt.',
    priceEbook: 6.99, pricePrint: 14.99,
    retailers: ['KDP', 'Draft2Digital', 'Lulu'],
  },
  {
    id: 'cartographer', title: "The Cartographer's Daughter", author: 'Sample Author',
    genre: 'Novel', coverClass: 'cv-novel', kicker: 'First Edition',
    rating: 4.7, ratingsCount: 1930, pages: 384,
    blurb: 'She inherited her father\u2019s maps — including the one that charts a country that doesn\u2019t exist.',
    priceEbook: 8.99, pricePrint: 18.99,
    retailers: ['KDP', 'IngramSpark', 'B&N Press'],
  },
  {
    id: 'iron-petal', title: 'Iron Petal', author: 'Sample Author',
    genre: 'Manga', coverClass: 'cv-manga', kicker: 'Vol. 3 · Ongoing',
    rating: 4.8, ratingsCount: 1750, pages: 208,
    blurb: 'A swordswoman who grows blades like flowers takes one last commission in the rust districts.',
    priceEbook: 9.99, pricePrint: 19.99,
    retailers: ['KDP', 'Draft2Digital'],
  },
  {
    id: 'ramen-run', title: 'Midnight Ramen Run', author: 'Sample Author',
    genre: 'Comic', coverClass: 'cv-comic', kicker: 'Slice of Life',
    rating: 4.5, ratingsCount: 640, pages: 120,
    blurb: 'Three night-shift friends. One legendary ramen cart. Zero closing time.',
    priceEbook: 5.99, pricePrint: 12.99,
    retailers: ['KDP', 'Lulu'],
  },
  {
    id: 'neo-kobe', title: 'The Last Bookseller of Neo-Kobe', author: 'Sample Author',
    genre: 'Novel', coverClass: 'cv-novel', kicker: 'First Edition',
    rating: 4.9, ratingsCount: 2870, pages: 416,
    blurb: 'In a city that banned paper, one shopkeeper keeps the last library — and the last secret.',
    priceEbook: 9.99, pricePrint: 21.99,
    retailers: ['KDP', 'IngramSpark', 'B&N Press', 'Draft2Digital'],
  },
  {
    id: 'inkbound', title: 'Inkbound: An Artbook', author: 'Sample Author',
    genre: 'Artbook', coverClass: 'cv-artbook', kicker: 'Collector\u2019s Print',
    rating: 5.0, ratingsCount: 410, pages: 160,
    blurb: 'Two hundred pages of ink studies, character design, and world-building from the studio vault.',
    priceEbook: 14.99, pricePrint: 39.99,
    retailers: ['Lulu', 'IngramSpark'],
  },
];

const GENRES = ['All', 'Manga', 'Comic', 'Light Novel', 'Novel', 'Artbook'];

let state = { query: '', genre: 'All', sort: 'featured' };

function stars(r) {
  const full = Math.round(r);
  return '\u2605'.repeat(full) + '\u2606'.repeat(5 - full);
}

function card(b) {
  return `
  <article class="card">
    <div class="cover ${b.coverClass}">
      <div class="kicker">${b.kicker}</div>
      <div>
        <div class="title">${b.title}</div>
        <div class="author">by ${b.author}</div>
      </div>
      <div class="mark">Emporium Press · Sample</div>
    </div>
    <div class="card-body">
      <h3>${b.title}</h3>
      <div class="byline">by ${b.author} · ${b.pages} pages</div>
      <div class="meta-row">
        <span class="genre-tag">${b.genre}</span>
        <span class="stars">${stars(b.rating)} <span>${b.rating.toFixed(1)} (${b.ratingsCount.toLocaleString()})</span></span>
      </div>
      <p class="blurb">${b.blurb}</p>
      <div class="price-row">
        <div class="price"><small>Ebook</small>$${b.priceEbook.toFixed(2)}</div>
        <div class="price"><small>Print</small>$${b.pricePrint.toFixed(2)}</div>
      </div>
      <div class="retailers">${b.retailers.map((r) => `<span class="ret">${r}</span>`).join('')}</div>
    </div>
  </article>`;
}

function filtered() {
  let list = BOOKS.filter((b) => {
    const q = state.query.trim().toLowerCase();
    const hitQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    const hitG = state.genre === 'All' || b.genre === state.genre;
    return hitQ && hitG;
  });
  if (state.sort === 'price-asc') list = [...list].sort((a, b) => a.priceEbook - b.priceEbook);
  if (state.sort === 'price-desc') list = [...list].sort((a, b) => b.priceEbook - a.priceEbook);
  if (state.sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
  return list;
}

function render() {
  const list = filtered();
  const grid = document.getElementById('grid');
  const count = document.getElementById('count');
  count.textContent = `${list.length} title${list.length === 1 ? '' : 's'} · sample data`;
  grid.innerHTML = list.length
    ? list.map(card).join('')
    : `<div class="empty"><div class="big">Nothing on this shelf.</div>Try a different search or genre.</div>`;
  document.querySelectorAll('.pill').forEach((p) =>
    p.classList.toggle('active', p.dataset.genre === state.genre));
}

function init() {
  const pills = document.getElementById('pills');
  pills.innerHTML = GENRES.map((g) =>
    `<button class="pill${g === 'All' ? ' active' : ''}" data-genre="${g}">${g}</button>`).join('');
  pills.addEventListener('click', (e) => {
    const btn = e.target.closest('.pill');
    if (btn) { state.genre = btn.dataset.genre; render(); }
  });
  document.getElementById('search').addEventListener('input', (e) => {
    state.query = e.target.value; render();
  });
  document.getElementById('sort').addEventListener('change', (e) => {
    state.sort = e.target.value; render();
  });
  render();
}

document.addEventListener('DOMContentLoaded', init);
