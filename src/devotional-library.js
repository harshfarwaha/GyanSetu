(() => {
  const BOOKS = [
    {title:'रामचरितमानस',author:'गोस्वामी तुलसीदास',tag:'Hindi · Public domain edition',url:'https://hi.wikisource.org/wiki/चित्र:रामचरितमानस.pdf'},
    {title:'श्रीमद्भगवद्गीता',author:'Bhagavad Gita',tag:'Hindi · Public-domain edition',url:'https://hi.wikisource.org/wiki/चित्र:श्रीमद्‌भगवद्‌गीता.pdf'},
    {title:'कबीर ग्रंथावली',author:'कबीर',tag:'Hindi · Public-domain source',url:'https://hi.wikisource.org/wiki/कबीर_ग्रंथावली'},
    {title:'Indian Myth and Legend',author:'Donald A. Mackenzie',tag:'Hindu mythology · Public domain',url:'https://www.gutenberg.org/ebooks/47228'},
    {title:'Hindu Gods and Heroes',author:'Lionel D. Barnett',tag:'Hinduism · Public domain',url:'https://www.gutenberg.org/ebooks/23807'},
    {title:'The Rámáyan of Válmíki',author:'Valmiki · trans. Ralph T. H. Griffith',tag:'Ramayana · Public domain · PDF available',url:'https://www.gutenberg.org/ebooks/24869'},
    {title:'Mahabharata — Volume 1',author:'Kisari Mohan Ganguli',tag:'Mahabharata · Public domain',url:'https://www.gutenberg.org/ebooks/15474'},
    {title:'Mahabharata — Adi Parva',author:'Kisari Mohan Ganguli',tag:'Mahabharata · Public domain',url:'https://www.gutenberg.org/ebooks/7864'},
    {title:'The Upanishads',author:'Swami Paramananda',tag:'Upanishads · Public domain',url:'https://www.gutenberg.org/ebooks/3283'},
    {title:'The Song Celestial — Bhagavad-Gîtâ',author:'Sir Edwin Arnold',tag:'Bhagavad Gita · Public domain',url:'https://www.gutenberg.org/ebooks/2388'},
    {title:'Hindu Mythology, Vedic and Purānic',author:'William Joseph Wilkins',tag:'Hindu mythology · Public domain edition',url:'https://commons.wikimedia.org/wiki/File:Hindu_Mythology,_Vedic_and_Pur%C4%81nic.djvu'},
    {title:'Shivarchana Chandrika',author:'Appaya Dikshita',tag:'Shaiva literature · Public domain scan',url:'https://commons.wikimedia.org/wiki/File:%E0%A4%B6%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%9A%E0%A4%A8%E0%A4%BE%E0%A4%9A%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%8D%E0%A4%B0%E0%A4%BF%E0%A4%95%E0%A4%BE.djvu'},
    {title:'Manusmriti',author:'Traditional Sanskrit text · Hindi edition',tag:'Hindi · Public-domain scan',url:'https://hi.wikisource.org/wiki/चित्र:मनुस्मृति.pdf'}
  ];
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const render=()=>{
    if(document.getElementById('devotional-library')) return true;
    const host=document.querySelector('#content')||document.querySelector('main')||document.querySelector('#app');
    if(!host) return false;
    const section=document.createElement('section'); section.className='shelf'; section.id='devotional-library';
    section.innerHTML='<div class="sectionHead"><h2>🕉️ Indian Spiritual & Devotional Classics</h2><span>Verified public-domain/open-source editions</span></div><div class="rule"></div><div class="rail extraRail">'+BOOKS.map(b=>'<article class="bookCard"><a class="coverBtn" href="'+b.url+'" target="_blank" rel="noopener"><span class="coverFallback"><strong>'+esc(b.title)+'</strong><small>OPEN SOURCE</small></span><em>SOURCE</em></a><h3>'+esc(b.title)+'</h3><p>'+esc(b.author)+'</p><a class="read" href="'+b.url+'" target="_blank" rel="noopener">Read book</a></article>').join('')+'</div>';
    host.appendChild(section); return true;
  };
  const boot=()=>{if(!render())setTimeout(boot,300)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
