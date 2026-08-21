(() => {
  'use strict';
  const esc = (v='') => String(v).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const wait = ms => new Promise(r=>setTimeout(r,ms));
  let busy = false;

  function styles(){
    if(document.getElementById('search-window-fix-css')) return;
    const s=document.createElement('style'); s.id='search-window-fix-css'; s.textContent=`
      .gsSearchOverlay{position:fixed;inset:0;z-index:10020;background:rgba(5,8,7,.82);backdrop-filter:blur(10px);display:flex;align-items:flex-start;justify-content:center;padding:70px 16px 16px}
      .gsSearchWindow{width:min(1180px,100%);height:min(820px,calc(100vh - 86px));background:var(--panel,#111d1a);border:1px solid rgba(210,174,99,.35);border-radius:24px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 100px rgba(0,0,0,.55)}
      .gsSearchHead{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid rgba(210,174,99,.2)}
      .gsSearchHead h2{margin:0;font-family:Georgia,serif}.gsSearchClose{width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.18);background:transparent;color:inherit;font-size:25px;cursor:pointer}
      .gsSearchControls{display:grid;grid-template-columns:minmax(220px,1fr) 190px 160px 100px;gap:10px;padding:16px 18px;border-bottom:1px solid rgba(210,174,99,.15)}
      .gsSearchControls input,.gsSearchControls select{min-height:46px;width:100%;box-sizing:border-box;border:1px solid rgba(210,174,99,.25);border-radius:12px;background:rgba(255,255,255,.06);color:inherit;padding:0 13px;outline:none}.gsSearchControls option{background:#17211d;color:#fff}
      .gsSearchGo{border:0;border-radius:12px;background:var(--gold,#c8a45f);color:#07110f;font-weight:800;cursor:pointer}.gsSearchMeta{padding:9px 18px;color:var(--muted,#a9b9b2);font-size:.78rem}.gsSearchResults{flex:1;overflow:auto;padding:16px 18px}.gsSearchResults .results{margin:0!important}.gsSearchResults .sectionHead,.gsSearchResults .rule{display:none!important}.gsSearchResults .shelf{margin:0!important}
      .gsSearchEmpty{text-align:center;padding:70px 20px;color:var(--muted,#a9b9b2)}
      body.gs-search-locked{overflow:hidden}
      @media(max-width:700px){.gsSearchOverlay{padding:55px 7px 7px}.gsSearchWindow{height:calc(100vh - 62px);border-radius:18px}.gsSearchHead{padding:13px 15px}.gsSearchControls{grid-template-columns:1fr;padding:12px}.gsSearchResults{padding:10px}.gsSearchGo{min-height:46px}}
    `; document.head.appendChild(s);
  }

  function findMainSearch(){return document.querySelector('form.search') || document.querySelector('.search form') || document.querySelector('input[type="search"]')?.form;}
  function openSearch(){
    if(document.querySelector('.gsSearchOverlay')) return;
    const form=findMainSearch(); if(!form) return;
    const input=form.querySelector('#q,input[type="search"],input[name="q"]'); if(!input) return;
    styles();
    const overlay=document.createElement('div'); overlay.className='gsSearchOverlay';
    overlay.innerHTML=`<section class="gsSearchWindow" role="dialog" aria-modal="true" aria-label="Search GyanSetu"><header class="gsSearchHead"><div><h2>Search GyanSetu</h2></div><button class="gsSearchClose" aria-label="Close search">×</button></header><div class="gsSearchControls"><input class="gsSearchQuery" value="${esc(input.value)}" placeholder="Search book title, author or keyword" autocomplete="off"><select class="gsSearchGenre"><option value="">All genres</option><option>Romance</option><option>Mystery & Detective</option><option>Fiction, Classics & Literature</option><option>Adventure</option><option>Science Fiction & Fantasy</option><option>Storybooks & Children</option><option>Science, Math & Technology</option><option>History, Biography & Travel</option><option>Philosophy, Religion & Ideas</option><option>Indian</option><option>Poetry</option><option>Shayari & Punjabi Poetry</option></select><select class="gsSearchLanguage"><option value="">All languages</option><option>English</option><option>Hindi</option><option>Punjabi</option><option>Urdu</option></select><button class="gsSearchGo">Search</button></div><div class="gsSearchMeta">Search by title, author or keyword, then narrow results by genre and language.</div><div class="gsSearchResults"><div class="gsSearchEmpty">Type something above and press Search.</div></div></section>`;
    document.body.appendChild(overlay); document.body.classList.add('gs-search-locked');
    const close=()=>{overlay.remove();document.body.classList.remove('gs-search-locked');}; overlay.querySelector('.gsSearchClose').onclick=close; overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
    const q=overlay.querySelector('.gsSearchQuery'); const genre=overlay.querySelector('.gsSearchGenre'); const lang=overlay.querySelector('.gsSearchLanguage'); const go=overlay.querySelector('.gsSearchGo'); const results=overlay.querySelector('.gsSearchResults');
    async function execute(){
      if(busy)return; const term=q.value.trim(); busy=true; go.disabled=true; go.textContent='Searching…'; results.innerHTML='<div class="gsSearchEmpty">Finding books…</div>';
      try{
        input.value=term; if(typeof form.requestSubmit==='function') form.requestSubmit(); else form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
        for(let i=0;i<100;i++){await wait(60);const main=document.querySelector('#content .results, #content .shelf .results'); if(main){const clone=main.cloneNode(true); results.innerHTML=''; results.appendChild(clone); break;}}
        if(!results.querySelector('.results') && !results.querySelector('.bookCard')) results.innerHTML='<div class="gsSearchEmpty">No books found. Try another title, author or keyword.</div>';
        const g=genre.value.toLowerCase(), l=lang.value.toLowerCase();
        results.querySelectorAll('.bookCard').forEach(card=>{const text=card.textContent.toLowerCase(); const okG=!g||text.includes(g.split(' & ')[0])||text.includes(g); const okL=!l||text.includes(l); card.style.display=okG&&okL?'':'none';});
        const visible=[...results.querySelectorAll('.bookCard')].filter(c=>c.style.display!=='none'); if(!visible.length) results.innerHTML='<div class="gsSearchEmpty">No books match those filters.</div>';
      }catch(e){results.innerHTML='<div class="gsSearchEmpty">Search could not be completed. Please try again.</div>';}finally{busy=false;go.disabled=false;go.textContent='Search';}
    }
    go.onclick=execute; q.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();execute();}}; q.focus();
  }

  function bind(){
    const form=findMainSearch(); if(!form || form.dataset.gsSearchWindowBound) return;
    const input=form.querySelector('#q,input[type="search"],input[name="q"]'); if(!input)return;
    form.dataset.gsSearchWindowBound='true';
    input.addEventListener('focus',e=>{e.preventDefault();openSearch();});
    input.addEventListener('click',e=>{e.preventDefault();openSearch();});
  }
  function boot(){styles();bind();const mo=new MutationObserver(bind);mo.observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
