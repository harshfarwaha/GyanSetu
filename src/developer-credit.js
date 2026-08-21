(() => {
  'use strict';
  function addDeveloperCredit() {
    if (document.getElementById('developerCredit')) return;
    const app = document.getElementById('app');
    if (!app) return;
    const footer = document.createElement('footer');
    footer.id = 'developerCredit';
    footer.setAttribute('aria-label', 'Developer credit');
    footer.innerHTML = '<span>What you see?</span> <strong>Developed by HARSH</strong>';
    document.body.appendChild(footer);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addDeveloperCredit, { once: true });
  else addDeveloperCredit();
  new MutationObserver(addDeveloperCredit).observe(document.body, { childList: true, subtree: true });
})();
