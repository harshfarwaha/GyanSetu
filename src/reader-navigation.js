// Keep the in-page reader in browser history so Android/desktop Back
// closes the reader instead of leaving the GyanSetu app.
(() => {
  let readerHistoryActive = false;
  let restoring = false;

  const syncReaderHistory = () => {
    const readerOpen = Boolean(document.querySelector('.reader'));

    if (readerOpen && !readerHistoryActive) {
      history.pushState({ ...(history.state || {}), gyansetuReader: true }, '', location.href);
      readerHistoryActive = true;
    }

    if (!readerOpen && readerHistoryActive && !restoring) {
      // The reader was closed by the app itself (Escape/×). Remove the
      // extra history entry without navigating away from the app.
      restoring = true;
      history.back();
    }
  };

  document.addEventListener('click', (event) => {
    const target = event.target;

    // The app opens the reader from the primary "Read" button. Wait one
    // tick so the app's existing handler creates .reader first.
    if (target.closest('.primary')) {
      setTimeout(syncReaderHistory, 0);
      return;
    }

    // If the reader's own close button is used, consume its history entry.
    if (target.closest('#rclose') && readerHistoryActive) {
      setTimeout(() => {
        if (!document.querySelector('.reader')) history.back();
      }, 0);
    }
  }, true);

  window.addEventListener('popstate', () => {
    const reader = document.querySelector('.reader');

    if (readerHistoryActive && reader) {
      restoring = true;
      reader.remove();
      readerHistoryActive = false;
      restoring = false;
      return;
    }

    // Back after an in-app close should simply settle the history state.
    if (restoring) {
      restoring = false;
      readerHistoryActive = false;
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && readerHistoryActive) {
      setTimeout(() => {
        if (!document.querySelector('.reader')) history.back();
      }, 0);
    }
  }, true);
})();
