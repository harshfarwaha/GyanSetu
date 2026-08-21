/* GyanSetu expansion: public-domain children's picture books, Hindu classics and devotional texts,
   plus links to Osho's official free eBook catalog. No copyrighted Osho PDFs are mirrored. */
(() => {
  const KIDS = [
    { title: 'The Tale of Peter Rabbit', author: 'Beatrix Potter', tag: 'Picture book · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Peter_Rabbit_1901.djvu', source: 'https://www.gutenberg.org/ebooks/14838', cover: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Peter-rabbit.PNG' },
    { title: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum', tag: 'Illustrated children’s classic · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Wonderful_Wizard_of_Oz.pdf', source: 'https://www.gutenberg.org/ebooks/43936', cover: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Wonderful_Wizard_of_Oz%2C_006.png' },
    { title: 'The Velveteen Rabbit', author: 'Margery Williams', tag: 'Picture book · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_velveteen_rabbit%3B_or%2C_How_toys_become_real_%28IA_velveteenrabbito0bian%29.pdf', source: 'https://www.gutenberg.org/ebooks/11757' },
    { title: 'Alice’s Adventures in Wonderland', author: 'Lewis Carroll', tag: 'Illustrated fantasy · Public domain', pdf: 'https://www.gutenberg.org/files/11/11-pdf.pdf', source: 'https://www.gutenberg.org/ebooks/11' },
    { title: 'The Secret Garden', author: 'Frances Hodgson Burnett', tag: 'Children’s classic · Public domain', pdf: 'https://www.gutenberg.org/files/113/113-pdf.pdf', source: 'https://www.gutenberg.org/ebooks/113' },
    { title: 'The Jungle Book', author: 'Rudyard Kipling', tag: 'Children’s stories · Public domain', pdf: 'https://www.gutenberg.org/files/236/236-pdf.pdf', source: 'https://www.gutenberg.org/ebooks/236' },
    { title: 'Peter Pan', author: 'J. M. Barrie', tag: 'Children’s fantasy · Public domain', pdf: 'https://www.gutenberg.org/files/16/16-pdf.pdf', source: 'https://www.gutenberg.org/ebooks/16' },
    { title: 'Aesop’s Fables', author: 'Aesop', tag: 'Fables · Public domain', pdf: 'https://www.gutenberg.org/files/21/21-pdf.pdf', source: 'https://www.gutenberg.org/ebooks/21' }
  ];

  const HINDU = [
    { title: 'रामचरितमानस (Ramcharitmanas)', author: 'Goswami Tulsidas', tag: 'Hindi · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%9A%E0%A4%B0%E0%A4%BF%E0%A4%A4%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A4%B8.pdf', source: 'https://commons.wikimedia.org/wiki/File:%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%9A%E0%A4%B0%E0%A4%BF%E0%A4%A4%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A4%B8.pdf' },
    { title: 'The Mahabharata — Volume 1', author: 'Kisari Mohan Ganguli', tag: 'English translation · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Mahabharata_(Kishori_Mohan_Gangopadhyay,_First_Edition)_Volume_1.pdf', source: 'https://commons.wikimedia.org/wiki/File:The_Mahabharata_(Kishori_Mohan_Gangopadhyay,_First_Edition)_Volume_1.pdf' },
    { title: 'The Mahabharata — Volume 5', author: 'Kisari Mohan Ganguli', tag: 'English translation · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Mahabharata_(Kishori_Mohan_Gangopadhyay,_First_Edition)_Volume_5.pdf', source: 'https://commons.wikimedia.org/wiki/File:The_Mahabharata_(Kishori_Mohan_Gangopadhyay,_First_Edition)_Volume_5.pdf' },
    { title: 'The Mahabharata — Volume 9', author: 'Kisari Mohan Ganguli', tag: 'English translation · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Mahabharata_(Kishori_Mohan_Gangopadhyay,_First_Edition)_Volume_9.pdf', source: 'https://commons.wikimedia.org/wiki/File:The_Mahabharata_(Kishori_Mohan_Gangopadhyay,_First_Edition)_Volume_9.pdf' },
    { title: 'Rāmāyaṇa', author: 'Valmiki', tag: 'Sanskrit · Public domain edition', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/R%C3%A2m%C3%A2ya%E1%B9%87a.pdf', source: 'https://commons.wikimedia.org/wiki/File:R%C3%A2m%C3%A2ya%E1%B9%87a.pdf' },
    { title: 'Hindu Mythology, Vedic and Purānic', author: 'William Joseph Wilkins', tag: 'Hindu mythology · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hindu_mythology%2C_Vedic_and_Pur%C3%A2nic_(IA_hindumythologyve00wilk).pdf', source: 'https://commons.wikimedia.org/wiki/File:Hindu_Mythology,_Vedic_and_Pur%C4%81nic.djvu' },
    { title: 'Indian Myth and Legend', author: 'Donald A. Mackenzie', tag: 'Indian mythology · Public domain', pdf: 'https://www.gutenberg.org/files/47228/47228-pdf.pdf', source: 'https://www.gutenberg.org/ebooks/47228' },
    { title: 'A Study of the Bhagavata Purana', author: 'B. N. K. Banerji', tag: 'Bhagavata Purana study · Public domain', pdf: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/A_study_of_the_Bhagavata_Purana%3B_or%2C_Esoteric_Hinduism_%28IA_studyofbhagavata00benaiala%29.pdf', source: 'https://commons.wikimedia.org/wiki/File:A_study_of_the_Bhagavata_Purana%3B_or%2C_Esoteric_Hinduism_(IA_studyofbhagavata00benaiala).pdf' }
  ];

  const CHALISA = [
    { title: 'Hanuman Chalisa', author: 'Goswami Tulsidas', tag: 'Hindi devotional text · Free PDF', pdf: 'https://www.nkbashram.org/wp-content/uploads/Hanuman+Chalisa.pdf', source: 'https://nkbashram.org/ashram-news-and-blog/live-chanting-sundays' },
    { title: 'Hanuman Chalisa — official free text', author: 'Goswami Tulsidas', tag: 'Official/ashram resource', pdf: 'https://www.satyanandayoga.com.au/wp-content/uploads/2020/07/Sri-Hanuman-Chalisa.pdf', source: 'https://yogasverige.se/ladda-ner/' },
    { title: 'Shiv Chalisa', author: 'Traditional devotional text', tag: 'Devotional text · source link', pdf: 'https://www.scribd.com/document/405683115/Shiv-Chalisa-pdf', source: 'https://www.scribd.com/document/405683115/Shiv-Chalisa-pdf' },
    { title: 'Durga Chalisa', author: 'Traditional devotional text', tag: 'Devotional text · source link', pdf: 'https://www.scribd.com/document/342539416/Durga-Chalisa-pdf', source: 'https://www.scribd.com/document/342539416/Durga-Chalisa-pdf' }
  ];

  const OSHO = [
    ['A Course in Meditation', 'https://shop.osho.com/en/osho-ebooks/morality-meditation'],
    ['Absolute Tao', 'https://shop.osho.com/en/osho-ebooks'],
    ['Ah, This!', 'https://shop.osho.com/en/osho-ebooks'],
    ['Ancient Music in the Pines', 'https://shop.osho.com/en/osho-ebooks'],
    ['The Book of Understanding', 'https://shop.osho.com/en/osho-ebooks/education-women-ego'],
    ['The Book of Women', 'https://shop.osho.com/en/osho-ebooks/education-women-ego'],
    ['Fear', 'https://shop.osho.com/en/osho-ebooks/death-education-fear-patanjali_yoga-women'],
    ['What is Meditation?', 'https://shop.osho.com/en/osho-ebooks/morality-meditation']
  ];

  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cover = (b) => b.cover ? `<img loading="lazy" src="${b.cover}" alt="">` : `<span class="coverFallback"><strong>${escapeHtml(b.title)}</strong><small>Open PDF</small></span>`;

  function reader(book) {
    const modal = document.createElement('section');
    modal.className = 'reader';
    modal.innerHTML = `<div class="readerShell pdfShell"><div class="readerTop"><div><small>GyanSetu · ${escapeHtml(book.tag)}</small><b>${escapeHtml(book.title)}</b></div><button aria-label="Close reader">×</button></div><div class="pdfToolbar"><span>${escapeHtml(book.author)}</span><a href="${book.pdf}" target="_blank" rel="noopener">Open PDF in new tab</a></div><iframe class="pdfFrame" title="${escapeHtml(book.title)}" src="${book.pdf}#toolbar=1&navpanes=0&view=FitH"></iframe></div>`;
    document.body.appendChild(modal);
    const close = () => modal.remove();
    modal.querySelector('button').onclick = close;
    window.addEventListener('keydown', function escKey(e) { if (e.key === 'Escape') { close(); window.removeEventListener('keydown', escKey); } });
  }

  function cards(items) {
    return items.map((b, i) => `<article class="bookCard"><button class="coverBtn" data-extra-book="${i}">${cover(b)}<em>PDF</em></button><h3>${escapeHtml(b.title)}</h3><p>${escapeHtml(b.author)}</p><button class="read" data-extra-book="${i}">Read book</button></article>`).join('');
  }

  function section(id, title, subtitle, items) {
    if (document.getElementById(id)) return;
    const el = document.createElement('section');
    el.className = 'shelf'; el.id = id;
    el.innerHTML = `<div class="sectionHead"><h2>${title}</h2><span>${subtitle}</span></div><div class="rule"></div><div class="rail extraRail">${cards(items)}</div>`;
    document.querySelector('#content')?.appendChild(el);
    el.querySelectorAll('[data-extra-book]').forEach(btn => btn.onclick = () => reader(items[Number(btn.dataset.extraBook)]));
  }

  function oshoSection() {
    if (document.getElementById('oshoOfficialShelf')) return;
    const el = document.createElement('section'); el.className = 'shelf'; el.id = 'oshoOfficialShelf';
    el.innerHTML = `<div class="sectionHead"><h2>OSHO — Official Free eBooks</h2><span>Official OSHO links · no unauthorized PDFs</span></div><div class="rule"></div><div class="resourceGrid">${OSHO.map(([name,url]) => `<a class="resourceCard" href="${url}" target="_blank" rel="noopener"><small>Official OSHO Shop</small><b>${escapeHtml(name)}</b><span>Open the official page to read/download when OSHO makes the eBook available at no charge.</span></a>`).join('')}</div>`;
    document.querySelector('#content')?.appendChild(el);
  }

  function mount() {
    if (!document.querySelector('#content')) return;
    section('kidsPictureBooksShelf', 'Kids’ Picture Books', 'Illustrated and children’s classics · public domain', KIDS);
    section('hinduMythologyShelf', 'Hindu Mythology & Classics', 'Public-domain editions and open scans', HINDU);
    section('chalisaShelf', 'Chalisa & Devotional PDFs', 'Free devotional resources from identified sources', CHALISA);
    oshoSection();
  }

  let lastContent = null;
  const observer = new MutationObserver(() => {
    const content = document.querySelector('#content');
    if (content && content !== lastContent) { lastContent = content; setTimeout(mount, 150); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(mount, 700);
})();
