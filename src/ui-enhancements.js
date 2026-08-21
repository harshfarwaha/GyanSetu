(() => {
  'use strict';

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function injectStyles() {
    if (document.getElementById('gyansetu-ui-enhancement-styles')) return;
    const style = document.createElement('style');
    style.id = 'gyansetu-ui-enhancement-styles';
    style.textContent = `
      .uiOverlay { position:fixed; inset:0; z-index:9998; display:flex; align-items:flex-start; justify-content:center; padding:88px 18px 18px; background:rgba(5,8,7,.72); backdrop-filter:blur(8px); }
      .uiWindow { width:min(1180px,100%); max-height:calc(100vh - 106px); overflow:hidden; border:1px solid rgba(210,174,99,.35); border-radius:24px; background:var(--surface,#0d1210); box-shadow:0 24px 80px rgba(0,0,0,.45); display:flex; flex-direction:column; }
      .uiWindowHead { flex:0 0 auto; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:18px 22px; border-bottom:1px solid rgba(210,174,99,.2); }
      .uiWindowHead h2 { margin:0; } .uiWindowHead p { margin:4px 0 0; opacity:.7; font-size:.9rem; }
      .uiClose { flex:0 0 auto; width:42px; height:42px; border:1px solid rgba(255,255,255,.16); border-radius:50%; background:transparent; color:inherit; font-size:25px; cursor:pointer; }
      .uiWindowBody { min-height:0; overflow:auto; padding:18px; } .uiWindowBody > #content { width:100%; } .uiWindowBody .shelf { margin:0; } .uiWindowBody .sectionHead,.uiWindowBody .rule { display:none; }
      body.gyansetu-ui-locked { overflow:hidden; }
      @media (max-width:700px) { .uiOverlay { padding:64px 8px 8px; } .uiWindow { max-height:calc(100vh - 72px); border-radius:18px; } .uiWindowHead { padding:14px 16px; } .uiWindowBody { padding:10px; } }
    `;
    document.head.appendChild(style);
  }

  function waitForApp() { return new Promise((resolve) => { const check=()=>{ if(document.querySelector('.topbar')&&document.querySelector('#content')) return resolve(); setTimeout(check,50); }; check(); }); }
  function createTemporaryContent(container) { const original=document.getElementById('content'); if(!original)return null; original.id='gyansetu-content-backup'; original.setAttribute('aria-hidden','true'); original.style.display='none'; const temp=document.createElement('div'); temp.id='content'; container.appendChild(temp); return {original,temp}; }
  function restoreContent(state) { if(!state)return; state.temp.remove(); state.original.id='content'; state.original.removeAttribute('aria-hidden'); state.original.style.display=''; }
  function makeCloseButton() { const b=document.createElement('button'); b.className='uiClose'; b.type='button'; b.setAttribute('aria-label','Close'); b.textContent='×'; return b; }
  function closeWindow(overlay,state){ restoreContent(state); overlay.remove(); document.body.classList.remove('gyansetu-ui-locked'); }
  async function waitForResults(temp){ for(let i=0;i<100;i+=1){ if(temp.querySelector('.results')||temp.querySelector('.loader')===null)return; await sleep(50); } }
  function escapeHtml(value){ return String(value).replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  async function openWindow(title, runAction) {
    if(document.querySelector('.uiOverlay')) return;
    const overlay=document.createElement('div'); overlay.className='uiOverlay'; overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true');
    const windowEl=document.createElement('section'); windowEl.className='uiWindow';
    const head=document.createElement('header'); head.className='uiWindowHead'; head.innerHTML=`<div><h2>${escapeHtml(title)}</h2><p>Browse available books</p></div>`;
    const close=makeCloseButton(); head.appendChild(close); const body=document.createElement('div'); body.className='uiWindowBody'; windowEl.append(head,body); overlay.appendChild(windowEl); document.body.appendChild(overlay); document.body.classList.add('gyansetu-ui-locked');
    const state=createTemporaryContent(body); if(!state){overlay.remove();return;}
    close.onclick=()=>closeWindow(overlay,state); overlay.onclick=(e)=>{if(e.target===overlay)closeWindow(overlay,state);};
    await Promise.resolve(runAction(state.temp)); await waitForResults(state.temp);
  }

  async function openGenreWindow(button, originalClick, event){ event.preventDefault(); const title=button.closest('.shelf')?.querySelector('h2')?.textContent?.trim()||'Genre'; await openWindow(title,()=>originalClick.call(button,event)); }
  async function openSearchWindow(form, originalSubmit, event){
    event.preventDefault(); const input=form.querySelector('#q'); const query=input?.value?.trim(); if(!query)return;
    await openWindow(`Search results for “${escapeHtml(query)}”`,()=>originalSubmit.call(form,event));
    input?.focus();
  }

  function enhance(){
    injectStyles();
    const form=document.querySelector('.search');
    if(form&&!form.dataset.uiEnhanced){ const originalSubmit=form.onsubmit; if(typeof originalSubmit==='function'){ form.onsubmit=(event)=>openSearchWindow(form,originalSubmit,event); form.dataset.uiEnhanced='true'; } }
    document.querySelectorAll('[data-shelf]').forEach((button)=>{ if(button.dataset.uiEnhanced)return; const originalClick=button.onclick; if(typeof originalClick!=='function')return; button.onclick=(event)=>openGenreWindow(button,originalClick,event); button.dataset.uiEnhanced='true'; });
  }
  function boot(){ waitForApp().then(()=>{ enhance(); const observer=new MutationObserver(()=>enhance()); observer.observe(document.getElementById('app'),{childList:true,subtree:true}); }); }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
