(() => {
  'use strict';

  const FAV_KEY = 'gyansetu.favorites.v2';
  const RECENT_KEY = 'gyansetu.recent.v2';
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let pendingBook = null;

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>\"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[c]));
  const readJson = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
  const writeJson = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const favorites = () => readJson(FAV_KEY, []);
  const recent = () => readJson(RECENT_KEY, []);

  function saveRecord(key, record, limit = 40) {
    if (!record?.id) return;
    const list = readJson(key, []);
    writeJson(key, [record, ...list.filter((item) => item.id !== record.id)].slice(0, limit));
  }
  function isFavorite(id) { return favorites().some((item) => item.id === id); }
  function toggleFavorite(record) {
    const list = favorites();
    if (isFavorite(record.id)) writeJson(FAV_KEY, list.filter((item) => item.id !== record.id));
    else saveRecord(FAV_KEY, { ...record, savedAt: Date.now() });
    refreshFavoriteButtons();
  }

  function cardRecord(card) {
    if (!card) return null;
    const id = card.dataset.id || card.closest('[data-id]')?.dataset.id;
    const article = card.closest('.bookCard');
    const title = article?.querySelector('h3')?.textContent?.trim() || card.getAttribute('aria-label')?.replace(/^View (?:details for |)/i, '') || '';
    const author = article?.querySelector('p')?.textContent?.trim() || '';
    const image = article?.querySelector('.coverBtn img')?.getAttribute('src') || card.querySelector('img')?.getAttribute('src') || '';
    const source = article?.querySelector('.coverBtn em')?.textContent?.trim() || '';
    if (!id || !title) return null;
    return { id, title, author, cover: image, source };
  }

  function fallbackReadUrl(id) {
    if (/^gb-\d+$/.test(id)) return `https://www.gutenberg.org/ebooks/${id.slice(3)}.html.images`;
    return '';
  }

  function injectStyles() {
    if (document.getElementById('gyansetu-ui-enhancement-styles')) return;
    const style = document.createElement('style'); style.id = 'gyansetu-ui-enhancement-styles';
    style.textContent = `
      .uiOverlay{position:fixed;inset:0;z-index:9998;display:flex;align-items:flex-start;justify-content:center;padding:76px 18px 18px;background:rgba(5,8,7,.78);backdrop-filter:blur(10px)}
      .uiWindow{width:min(1240px,100%);max-height:calc(100vh - 94px);overflow:hidden;border:1px solid rgba(210,174,99,.35);border-radius:26px;background:var(--panel,#111d1a);box-shadow:0 30px 100px rgba(0,0,0,.55);display:flex;flex-direction:column}
      .uiWindowHead{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 22px;border-bottom:1px solid rgba(210,174,99,.2)}
      .uiWindowHead h2{margin:0;font-family:var(--serif,Georgia,serif);font-size:clamp(25px,3vw,36px)}.uiWindowHead p{margin:4px 0 0;color:var(--muted,#a9b9b2);font-size:.88rem}
      .uiClose{flex:0 0 auto;width:42px;height:42px;border:1px solid rgba(255,255,255,.16);border-radius:50%;background:transparent;color:inherit;font-size:25px;cursor:pointer}
      .uiWindowBody{min-height:0;overflow:auto;padding:18px}.uiWindowBody #content{width:100%}.uiWindowBody .shelf{margin:0}.uiWindowBody .sectionHead,.uiWindowBody .rule{display:none}
      .uxSearchTools{display:grid;grid-template-columns:minmax(240px,1fr) 170px 170px auto;gap:10px;margin-bottom:16px}.uxSearchTools input,.uxSearchTools select{width:100%;min-height:44px;border-radius:13px;border:1px solid rgba(198,164,95,.25);background:rgba(255,255,255,.06);color:inherit;padding:0 13px;outline:none}.uxSearchTools button{min-height:44px;border:0;border-radius:13px;background:var(--gold,#c8a45f);color:#07110f;font-weight:800;padding:0 18px}.uxSearchHint{color:var(--muted,#a9b9b2);font-size:12px;margin:-7px 0 14px}
      .uxCollectionTools{display:flex;gap:10px;align-items:center;margin-bottom:14px}.uxCollectionTools input{flex:1;min-height:42px;border-radius:12px;border:1px solid rgba(198,164,95,.25);background:rgba(255,255,255,.06);color:inherit;padding:0 13px}
      .uxFavorite{border:1px solid rgba(198,164,95,.4);border-radius:12px;background:rgba(198,164,95,.09);color:var(--gold,#c8a45f);padding:10px 15px;font-weight:800;margin-top:12px}.uxFavorite.isSaved{background:var(--gold,#c8a45f);color:#07110f}
      .modal .details{width:min(1080px,100%);min-height:min(620px,calc(100vh - 48px))}.modal .details>div:last-child{display:flex;flex-direction:column;justify-content:center}.modal .details .primary{margin-top:8px}
      body.gyansetu-ui-locked{overflow:hidden}.uxBottomNav{display:none}.uxCollectionGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:24px 18px}.uxCollectionCard{min-width:0;display:flex;flex-direction:column;gap:7px}.uxCollectionCard img,.uxCollectionCover{width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:14px;background:linear-gradient(145deg,#244c42,#0d1a17);border:0;display:grid;place-items:center;padding:12px;color:var(--gold,#c8a45f);font-family:var(--serif,Georgia,serif);text-align:center}.uxCollectionCard b{font-family:var(--serif,Georgia,serif);line-height:1.1;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.uxCollectionCard small{color:var(--muted,#a9b9b2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.uxCollectionCard button{border:0;background:var(--gold,#c8a45f);color:#07110f;border-radius:9px;padding:8px;font-weight:800}.uxEmpty{padding:40px 16px;text-align:center;color:var(--muted,#a9b9b2);border:1px dashed rgba(198,164,95,.35);border-radius:18px}.uxShelfReady{content-visibility:auto;contain-intrinsic-size:360px}
      @media(max-width:900px){.uxSearchTools{grid-template-columns:1fr 1fr}.uxSearchTools input{grid-column:1/-1}.uxSearchTools button{width:100%}}
      @media(max-width:700px){.uiOverlay{padding:62px 7px 7px}.uiWindow{max-height:calc(100vh - 69px);border-radius:18px}.uiWindowHead{padding:13px 15px}.uiWindowBody{padding:10px}.uxSearchTools{grid-template-columns:1fr}.uxSearchTools input{grid-column:auto}.uxCollectionGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 12px}.modal .details{min-height:auto}.uxBottomNav{position:fixed;left:8px;right:8px;bottom:8px;z-index:9997;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:7px;border:1px solid rgba(198,164,95,.28);border-radius:18px;background:rgba(9,18,15,.94);backdrop-filter:blur(14px);box-shadow:0 12px 40px rgba(0,0,0,.4)}.uxBottomNav button{border:0;background:transparent;color:var(--muted,#a9b9b2);min-height:42px;border-radius:12px;font-size:11px;font-weight:800}.uxBottomNav button:active,.uxBottomNav button.isActive{background:rgba(198,164,95,.16);color:var(--gold,#c8a45f)}main{padding-bottom:92px!important}}
    `;
    document.head.appendChild(style);
  }

  function makeCloseButton(){const b=document.createElement('button');b.className='uiClose';b.type='button';b.setAttribute('aria-label','Close');b.textContent='×';return b;}
  function createTemporaryContent(container){const original=document.getElementById('content');if(!original)return null;original.id='gyansetu-content-backup';original.setAttribute('aria-hidden','true');original.style.display='none';const temp=document.createElement('div');temp.id='content';container.appendChild(temp);return{original,temp};}
  function restoreContent(state){if(!state)return;state.temp.remove();state.original.id='content';state.original.removeAttribute('aria-hidden');state.original.style.display='';}
  function closeWindow(overlay,state){restoreContent(state);overlay.remove();document.body.classList.remove('gyansetu-ui-locked');}
  async function waitForResults(temp){for(let i=0;i<140;i+=1){if(temp.querySelector('.results')||!temp.querySelector('.loader'))return;await sleep(50);}}

  async function openWindow(title,setup){
    if(document.querySelector('.uiOverlay'))return null;
    const overlay=document.createElement('div');overlay.className='uiOverlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');const windowEl=document.createElement('section');windowEl.className='uiWindow';const head=document.createElement('header');head.className='uiWindowHead';const titleWrap=document.createElement('div');titleWrap.innerHTML=`<h2>${escapeHtml(title)}</h2><p>Browse GyanSetu's available open books</p>`;const close=makeCloseButton();head.append(titleWrap,close);const body=document.createElement('div');body.className='uiWindowBody';windowEl.append(head,body);overlay.appendChild(windowEl);document.body.appendChild(overlay);document.body.classList.add('gyansetu-ui-locked');
    const state=createTemporaryContent(body);if(!state){overlay.remove();document.body.classList.remove('gyansetu-ui-locked');return null;}overlay.__gyansetuState=state;close.onclick=()=>closeWindow(overlay,state);overlay.onclick=(event)=>{if(event.target===overlay)closeWindow(overlay,state);};
    body.addEventListener('click',(event)=>{const card=event.target.closest('[data-id]');if(!card)return;const original=state.original.querySelector(`[data-id="${CSS.escape(card.dataset.id)}"]`);if(original){closeWindow(overlay,state);original.click();return;}const fallback=fallbackReadUrl(card.dataset.id);if(fallback){window.open(fallback,'_blank','noopener');}});
    await Promise.resolve(setup(body,state.temp));return{overlay,body,state};
  }

  function runOriginalSearch(originalSubmit,query){const form=document.querySelector('.search');const input=form?.querySelector('#q');if(!form||!input||typeof originalSubmit!=='function')return;input.value=query;originalSubmit.call(form,{preventDefault(){}});}
  function openSearchWindow(form,originalSubmit,event){event.preventDefault();if(document.querySelector('.uiOverlay'))return;const query=form.querySelector('#q')?.value?.trim();if(!query){form.querySelector('#q')?.focus();return;}openWindow(`Search: ${query}`,async(body)=>{const tools=document.createElement('div');tools.className='uxSearchTools';tools.innerHTML=`<input id="uxSearchInput" value="${escapeHtml(query)}" aria-label="Search books" placeholder="Search titles, authors, or genres"><select id="uxGenre"><option value="">All genres</option><option>Romance</option><option>Mystery & Detective</option><option>Fiction, Classics & Literature</option><option>Adventure</option><option>Science Fiction & Fantasy</option><option>Storybooks & Children</option><option>Science, Math & Technology</option><option>History, Biography & Travel</option><option>Philosophy, Religion & Ideas</option><option>Indian</option><option>Poetry</option><option>Shayari & Punjabi Poetry</option></select><select id="uxLanguage"><option value="">All languages</option><option value="English">English</option><option value="Hindi">Hindi</option><option value="Punjabi">Punjabi</option><option value="Urdu">Urdu</option></select><button id="uxSearchButton" type="button">Search</button>`;body.prepend(tools);const hint=document.createElement('p');hint.className='uxSearchHint';hint.textContent='Search results stay directly below the search controls.';body.insertBefore(hint,document.getElementById('content'));const execute=()=>{const q=document.getElementById('uxSearchInput').value.trim();if(!q)return;const genre=document.getElementById('uxGenre').value;const language=document.getElementById('uxLanguage').value;runOriginalSearch(originalSubmit,[q,genre,language].filter(Boolean).join(' '));};document.getElementById('uxSearchButton').onclick=execute;document.getElementById('uxSearchInput').addEventListener('keydown',(e)=>{if(e.key==='Enter')execute();});execute();});}

  function openGenreWindow(button,originalClick,event){event.preventDefault();const title=button.closest('.shelf')?.querySelector('h2')?.textContent?.trim()||'Genre';openWindow(title,async(body)=>{const tools=document.createElement('div');tools.className='uxCollectionTools';const input=document.createElement('input');input.placeholder=`Search within ${title}…`;input.setAttribute('aria-label',`Search within ${title}`);const label=document.createElement('span');label.className='muted';tools.append(input,label);body.prepend(tools);await Promise.resolve(originalClick.call(button,{preventDefault(){}}));const temp=document.getElementById('content');await waitForResults(temp);const results=temp.querySelector('.results');if(!results)return;const count=()=>{const visible=[...results.querySelectorAll('.bookCard')].filter(c=>c.style.display!=='none').length;label.textContent=`${visible} shown`;};input.oninput=()=>{const term=input.value.trim().toLowerCase();results.querySelectorAll('.bookCard').forEach(card=>{card.style.display=!term||card.textContent.toLowerCase().includes(term)?'':'none';});count();};count();});}

  function enhanceDetails(){const details=document.querySelector('.modal .details');if(!details||details.querySelector('.uxFavorite'))return;const title=details.querySelector('h2')?.textContent?.trim()||pendingBook?.title||'';const author=details.querySelector('.byline')?.textContent?.trim()||pendingBook?.author||'';const cover=details.querySelector('.detailCover img')?.getAttribute('src')||pendingBook?.cover||'';const sourceLink=details.querySelector('.sourceLink')?.getAttribute('href')||fallbackReadUrl(pendingBook?.id||'');const id=pendingBook?.id||`detail-${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;const record={id,title,author,cover,source:pendingBook?.source||'',readUrl:sourceLink};const button=document.createElement('button');button.type='button';button.className='uxFavorite';button.dataset.favoriteId=id;button.textContent=isFavorite(id)?'♥ Saved to My Library':'♡ Save to My Library';if(isFavorite(id))button.classList.add('isSaved');button.onclick=()=>toggleFavorite(record);const primary=details.querySelector('.primary');if(primary)primary.insertAdjacentElement('afterend',button);else details.appendChild(button);pendingBook={...record};}
  function refreshFavoriteButtons(){document.querySelectorAll('.uxFavorite').forEach((button)=>{const saved=isFavorite(button.dataset.favoriteId);button.textContent=saved?'♥ Saved to My Library':'♡ Save to My Library';button.classList.toggle('isSaved',saved);});}

  function collectionCard(record){const cover=record.cover?`<img loading="lazy" decoding="async" src="${escapeHtml(record.cover)}" alt="">`:`<div class="uxCollectionCover">${escapeHtml(record.title)}</div>`;return `<article class="uxCollectionCard"><button class="coverBtn uxOpenSaved" data-saved-id="${escapeHtml(record.id)}" style="padding:0;border:0;box-shadow:none;aspect-ratio:2/3">${cover}</button><b>${escapeHtml(record.title)}</b><small>${escapeHtml(record.author||'Open edition')}</small><button class="uxReadSaved" data-saved-id="${escapeHtml(record.id)}">Read book</button></article>`;}
  function openCollection(title,key,emptyText){const records=key==='favorites'?favorites():recent();openWindow(title,async(body)=>{if(!records.length){body.querySelector('#content').innerHTML=`<div class="uxEmpty">${escapeHtml(emptyText)}</div>`;return;}const toolbar=document.createElement('div');toolbar.className='uxCollectionTools';const info=document.createElement('span');info.className='muted';info.textContent=`${records.length} book${records.length===1?'':'s'} saved`;toolbar.append(info);body.prepend(toolbar);const content=body.querySelector('#content');content.innerHTML=`<div class="uxCollectionGrid">${records.map(collectionCard).join('')}</div>`;content.addEventListener('click',(event)=>{const target=event.target.closest('[data-saved-id]');if(!target)return;const record=records.find((item)=>item.id===target.dataset.savedId);if(!record)return;const overlay=body.closest('.uiOverlay');const original=overlay?.__gyansetuState?.original?.querySelector(`[data-id="${CSS.escape(record.id)}"]`);if(original){closeWindow(overlay,overlay.__gyansetuState);original.click();return;}const url=record.readUrl||fallbackReadUrl(record.id);if(url)window.open(url,'_blank','noopener');});});}

  function addBottomNav(){if(document.querySelector('.uxBottomNav'))return;const nav=document.createElement('nav');nav.className='uxBottomNav';nav.setAttribute('aria-label','Library navigation');nav.innerHTML='<button data-ux-nav="home">⌂<br>Home</button><button data-ux-nav="search">⌕<br>Search</button><button data-ux-nav="favorites">♥<br>Saved</button><button data-ux-nav="recent">◷<br>History</button>';document.body.appendChild(nav);nav.addEventListener('click',(event)=>{const action=event.target.closest('[data-ux-nav]')?.dataset.uxNav;if(!action)return;if(action==='home')window.scrollTo({top:0,behavior:'smooth'});if(action==='search')document.querySelector('.search')?.dispatchEvent(new Event('submit',{cancelable:true}));if(action==='favorites')openCollection('My Saved Books','favorites','You have not saved any books yet. Open a book and tap “Save to My Library”.');if(action==='recent')openCollection('Recently Read','recent','Your recently opened books will appear here.');});}
  function enhanceTopActions(){const actions=document.querySelector('.topActions');if(!actions||actions.querySelector('#uxSavedBtn'))return;const button=document.createElement('button');button.id='uxSavedBtn';button.className='navBtn';button.type='button';button.textContent='Saved';button.onclick=()=>openCollection('My Saved Books','favorites','You have not saved any books yet. Open a book and tap “Save to My Library”.');const history=actions.querySelector('#historyBtn');if(history)history.insertAdjacentElement('afterend',button);else actions.prepend(button);}
  function enhanceInteractions(){document.addEventListener('click',(event)=>{const card=event.target.closest('[data-id]');if(card)pendingBook=cardRecord(card);if(event.target.closest('.primary')&&pendingBook)setTimeout(()=>saveRecord(RECENT_KEY,{...pendingBook,openedAt:Date.now()}),120);},true);const observer=new MutationObserver(()=>{enhanceDetails();addBottomNav();enhanceTopActions();});observer.observe(document.body,{childList:true,subtree:true});}
  function enhance(){injectStyles();addBottomNav();enhanceTopActions();enhanceDetails();document.querySelectorAll('.shelf').forEach((shelf)=>shelf.classList.add('uxShelfReady'));const form=document.querySelector('.search');if(form&&!form.dataset.uiEnhanced){const originalSubmit=form.onsubmit;if(typeof originalSubmit==='function'){form.onsubmit=(event)=>openSearchWindow(form,originalSubmit,event);form.dataset.uiEnhanced='true';}}document.querySelectorAll('[data-shelf]').forEach((button)=>{if(button.dataset.uiEnhanced)return;const originalClick=button.onclick;if(typeof originalClick!=='function')return;button.onclick=(event)=>openGenreWindow(button,originalClick,event);button.dataset.uiEnhanced='true';});}
  function boot(){const wait=()=>{if(document.querySelector('.topbar')&&document.querySelector('#content')){enhance();enhanceInteractions();return;}setTimeout(wait,50);};wait();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
