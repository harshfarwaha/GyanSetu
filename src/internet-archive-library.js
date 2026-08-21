(() => {
  const CATEGORIES = [
    ['Love & Romance', 'romance OR love OR courtship'],
    ['Mystery & Detective', 'mystery OR detective OR crime OR thriller'],
    ['Comics & Graphic Novels', 'comics OR comic OR "graphic novel" OR "comic book"'],
    ['Manga & Graphic Stories', 'manga OR manhwa OR "graphic stories"'],
    ['Adventure', 'adventure OR exploration OR travel'],
    ['Science, Math & Technology', 'science OR mathematics OR physics OR engineering OR technology'],
    ['History & Biography', 'history OR biography OR memoir OR civilization'],
    ['Indian & Religion', 'India OR Indian OR Hindu OR Sanskrit OR Gita OR mythology'],
    ['Kids & Picture Books', 'children OR kids OR "picture book" OR fairy tale']
  ];

  const API = 'https://archive.org/advancedsearch.php';
  const cache = new Map();
  let activeCategory = 0;
  let loading = false;

  const esc = (value = '') => String(value).replace(/[&<>\"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[c]));

  function queryFor(term) {
    // Only surface text items with an open/public-domain style license signal.
    return `(mediatype:(texts)) AND (licenseurl:(*creativecommons.org*) OR licenseurl:(*publicdomain*) OR collection:(opensource)) AND (${term})`;
  }

  async function searchArchive(term) {
    if (cache.has(term)) return cache.get(term);
    const params = new URLSearchParams();
    params.set('q', queryFor(term));
    ['identifier','title','creator','description','date','language','downloads','collection','licenseurl'].forEach((field) => params.append('fl[]', field));
    params.set('rows', '12');
    params.set('sort[]', 'downloads desc');
    params.set('output', 'json');
    const response = await fetch(`${API}?${params.toString()}`);
    if (!response.ok) throw new Error('Internet Archive is unavailable right now.');
    const data = await response.json();
    const docs = data?.response?.docs || [];
    cache.set(term, docs);
    return docs;
  }

  function card(item) {
    const id = item.identifier;
    const title = item.title || id;
    const creator = Array.isArray(item.creator) ? item.creator.join(', ') : (item.creator || 'Unknown author');
    const cover = `https://archive.org/services/img/${encodeURIComponent(id)}`;
    const details = `https://archive.org/details/${encodeURIComponent(id)}`;
    const license = Array.isArray(item.licenseurl) ? item.licenseurl.join(', ') : (item.licenseurl || 'Internet Archive open-access item');
    return `<article class="iaBookCard"><a class="iaCover" href="${details}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(title)} on Internet Archive"><img loading="lazy" src="${cover}" alt="" onerror="this.style.display='none'"><span>${esc(title)}</span><em>Internet Archive</em></a><h3>${esc(title)}</h3><p>${esc(creator)}</p><small>${esc(license)}</small><a class="read" href="${details}" target="_blank" rel="noopener noreferrer">Read / Download</a></article>`;
  }

  async function loadCategory(index = activeCategory) {
    if (loading) return;
    activeCategory = index;
    const status = document.getElementById('iaLibraryStatus');
    const grid = document.getElementById('iaLibraryGrid');
    if (!status || !grid) return;
    loading = true;
    status.textContent = 'Finding open-access books…';
    grid.innerHTML = '<div class="iaLoading">Loading books from Internet Archive…</div>';
    document.querySelectorAll('[data-ia-category]').forEach((button) => button.classList.toggle('active', Number(button.dataset.iaCategory) === index));
    try {
      const docs = await searchArchive(CATEGORIES[index][1]);
      if (!docs.length) {
        grid.innerHTML = '<div class="iaEmpty">No clearly open-licensed books were found for this category right now. Try another category.</div>';
      } else {
        grid.innerHTML = docs.map(card).join('');
      }
      status.textContent = `${docs.length} open-access results · Category: ${CATEGORIES[index][0]}`;
    } catch (error) {
      grid.innerHTML = `<div class="iaEmpty">${esc(error.message)}</div>`;
      status.textContent = 'Could not load Internet Archive results.';
    } finally {
      loading = false;
    }
  }

  function mount() {
    const app = document.getElementById('app');
    if (!app) return;
    const actions = app.querySelector('.topActions');
    if (actions && !document.getElementById('internetArchiveBtn')) {
      const button = document.createElement('button');
      button.className = 'navBtn';
      button.id = 'internetArchiveBtn';
      button.textContent = 'Internet Archive';
      button.onclick = () => document.getElementById('iaLibrarySection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      actions.insertBefore(button, actions.children[1] || null);
    }

    const resources = app.querySelector('#resources');
    if (!resources || document.getElementById('iaLibrarySection')) return;
    const section = document.createElement('section');
    section.className = 'iaLibrary shelf';
    section.id = 'iaLibrarySection';
    section.innerHTML = `<div class="sectionHead"><div><p class="eyebrow">✦ Internet Archive</p><h2>Open-access books</h2></div><span id="iaLibraryStatus">Choose a category</span></div><div class="rule"></div><div class="iaCategoryBar">${CATEGORIES.map((category, i) => `<button type="button" data-ia-category="${i}">${esc(category[0])}</button>`).join('')}</div><div class="iaLibraryGrid" id="iaLibraryGrid"></div><p class="iaLegalNote">GyanSetu lists Internet Archive items only when the search metadata provides an open/public-domain style license signal. Books remain hosted by Internet Archive; GyanSetu does not re-upload or mirror copyrighted files.</p></section>`;
    resources.insertAdjacentElement('afterend', section);
    section.querySelectorAll('[data-ia-category]').forEach((button) => button.addEventListener('click', () => loadCategory(Number(button.dataset.iaCategory))));
    loadCategory(0);
  }

  const observer = new MutationObserver(() => mount());
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { mount(); observer.observe(document.getElementById('app') || document.body, { childList: true, subtree: true }); });
  else { mount(); observer.observe(document.getElementById('app') || document.body, { childList: true, subtree: true }); }
})();
