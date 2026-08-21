const FREE_PDF_BOOKS = [
  {
    id: 'gutenberg-gitanjali', title: 'Gitanjali', authors: [{ name: 'Rabindranath Tagore' }],
    subjects: ['Poetry', 'Indian literature', 'Public domain', 'Project Gutenberg'], genre: 'Poetry', download_count: 32500,
    pdfUrl: 'https://www.gutenberg.org/files/7164/7164-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/7164', readUrl: 'https://www.gutenberg.org/ebooks/7164.html.images', language: 'English',
    desc: 'Tagore’s Nobel-winning poems from Project Gutenberg as a direct public-domain PDF.'
  },
  {
    id: 'gutenberg-hind-swaraj', title: 'Hind Swaraj or Indian Home Rule', authors: [{ name: 'M. K. Gandhi' }],
    subjects: ['Indian thought', 'Freedom movement', 'Political philosophy', 'Public domain'], genre: 'Philosophy, Religion & Ideas', download_count: 24800,
    pdfUrl: 'https://www.gutenberg.org/files/10366/10366-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/10366', readUrl: 'https://www.gutenberg.org/ebooks/10366.html.images', language: 'English',
    desc: 'Gandhi’s influential political text from Project Gutenberg, not Internet Archive.'
  },
  {
    id: 'gutenberg-bhagavad-gita', title: 'The Bhagavad-Gita', authors: [{ name: 'Translated by Sir Edwin Arnold' }],
    subjects: ['Sacred texts', 'Indian classics', 'Philosophy', 'Public domain'], genre: 'Philosophy, Religion & Ideas', download_count: 37200,
    pdfUrl: 'https://www.gutenberg.org/files/2388/2388-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2388', readUrl: 'https://www.gutenberg.org/ebooks/2388.html.images', language: 'English',
    desc: 'A public-domain verse translation available directly from Project Gutenberg.'
  },
  {
    id: 'gutenberg-pride-prejudice', title: 'Pride and Prejudice', authors: [{ name: 'Jane Austen' }],
    subjects: ['Fiction', 'Classics', 'Romance', 'Public domain'], genre: 'Fiction, Classics & Literature', download_count: 65000,
    pdfUrl: 'https://www.gutenberg.org/files/1342/1342-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/1342', readUrl: 'https://www.gutenberg.org/ebooks/1342.html.images', language: 'English', desc: 'A classic novel provided as a Project Gutenberg PDF.'
  },
  {
    id: 'gutenberg-sherlock', title: 'The Adventures of Sherlock Holmes', authors: [{ name: 'Arthur Conan Doyle' }],
    subjects: ['Mystery', 'Detective fiction', 'Short stories', 'Public domain'], genre: 'Mystery & Detective', download_count: 59000,
    pdfUrl: 'https://www.gutenberg.org/files/1661/1661-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/1661', readUrl: 'https://www.gutenberg.org/ebooks/1661.html.images', language: 'English', desc: 'Detective stories from Project Gutenberg in direct PDF form.'
  },
  {
    id: 'gutenberg-treasure-island', title: 'Treasure Island', authors: [{ name: 'Robert Louis Stevenson' }],
    subjects: ['Adventure', 'Sea stories', 'Classics', 'Public domain'], genre: 'Adventure', download_count: 51000,
    pdfUrl: 'https://www.gutenberg.org/files/120/120-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/120', readUrl: 'https://www.gutenberg.org/ebooks/120.html.images', language: 'English', desc: 'A public-domain adventure classic in PDF.'
  },
  {
    id: 'gutenberg-frankenstein', title: 'Frankenstein', authors: [{ name: 'Mary Wollstonecraft Shelley' }],
    subjects: ['Science fiction', 'Horror', 'Classics', 'Public domain'], genre: 'Science Fiction & Fantasy', download_count: 62000,
    pdfUrl: 'https://www.gutenberg.org/files/84/84-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/84', readUrl: 'https://www.gutenberg.org/ebooks/84.html.images', language: 'English', desc: 'Mary Shelley’s landmark science-fiction novel as a free PDF.'
  },
  {
    id: 'gutenberg-alice', title: "Alice's Adventures in Wonderland", authors: [{ name: 'Lewis Carroll' }],
    subjects: ['Children', 'Fantasy', 'Classics', 'Public domain'], genre: 'Storybooks & Children', download_count: 57000,
    pdfUrl: 'https://www.gutenberg.org/files/11/11-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/11', readUrl: 'https://www.gutenberg.org/ebooks/11.html.images', language: 'English', desc: 'A beloved public-domain children’s fantasy in PDF.'
  },
  {
    id: 'openstax-biology-2e', title: 'Biology 2e', authors: [{ name: 'OpenStax' }], subjects: ['Biology', 'Science', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 44000,
    pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Biology2e-WEB_ICOFkGu.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/biology-2e', language: 'English', desc: 'An openly licensed college biology textbook from OpenStax.'
  },
  {
    id: 'openstax-chemistry-2e', title: 'Chemistry 2e', authors: [{ name: 'OpenStax' }], subjects: ['Chemistry', 'Science', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 39000,
    pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Chemistry2e-WEB_0o9L4pn.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/chemistry-2e', language: 'English', desc: 'A free, peer-reviewed chemistry textbook from OpenStax.'
  },
  {
    id: 'openstax-us-history', title: 'U.S. History', authors: [{ name: 'OpenStax' }], subjects: ['History', 'Textbook', 'CC BY'], genre: 'History, Biography & Travel', download_count: 34000,
    pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/U.S.History-WEB.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/us-history', language: 'English', desc: 'An openly licensed U.S. history textbook.'
  },
  {
    id: 'openstax-psychology-2e', title: 'Psychology 2e', authors: [{ name: 'OpenStax' }], subjects: ['Psychology', 'Social science', 'Textbook', 'CC BY'], genre: 'Philosophy, Religion & Ideas', download_count: 36000,
    pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Psychology2e-WEB_0eRvAre.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/psychology-2e', language: 'English', desc: 'A free introductory psychology textbook from OpenStax.'
  }
];


const EXTRA_OPEN_BOOKS = [
  { id: 'gutenberg-moby-dick', title: 'Moby-Dick; or, The Whale', authors: [{ name: 'Herman Melville' }], subjects: ['Fiction', 'Adventure', 'Sea stories', 'Classics', 'Public domain'], genre: 'Adventure', download_count: 61000, readUrl: 'https://www.gutenberg.org/ebooks/2701.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/2701', language: 'English', desc: 'Melville’s sea-adventure classic in Project Gutenberg’s reliable online reader.' },
  { id: 'gutenberg-dracula', title: 'Dracula', authors: [{ name: 'Bram Stoker' }], subjects: ['Horror', 'Gothic fiction', 'Classics', 'Public domain'], genre: 'Science Fiction & Fantasy', download_count: 55000, readUrl: 'https://www.gutenberg.org/ebooks/345.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/345', language: 'English', desc: 'The Gothic vampire novel in Project Gutenberg’s browser-readable edition.' },
  { id: 'gutenberg-jane-eyre', title: 'Jane Eyre', authors: [{ name: 'Charlotte Brontë' }], subjects: ['Fiction', 'Romance', 'Classics', 'Public domain'], genre: 'Romance', download_count: 53000, readUrl: 'https://www.gutenberg.org/ebooks/1260.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1260', language: 'English', desc: 'A classic romance and coming-of-age novel from Project Gutenberg.' },
  { id: 'gutenberg-wuthering-heights', title: 'Wuthering Heights', authors: [{ name: 'Emily Brontë' }], subjects: ['Fiction', 'Romance', 'Gothic fiction', 'Classics'], genre: 'Romance', download_count: 50000, readUrl: 'https://www.gutenberg.org/ebooks/768.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/768', language: 'English', desc: 'Emily Brontë’s intense Gothic romance in an open-web edition.' },
  { id: 'gutenberg-war-peace', title: 'War and Peace', authors: [{ name: 'Leo Tolstoy' }], subjects: ['Fiction', 'History', 'Classics', 'Public domain'], genre: 'History, Biography & Travel', download_count: 47000, readUrl: 'https://www.gutenberg.org/ebooks/2600.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/2600', language: 'English', desc: 'Tolstoy’s historical epic in Project Gutenberg’s online reader.' },
  { id: 'gutenberg-tale-two-cities', title: 'A Tale of Two Cities', authors: [{ name: 'Charles Dickens' }], subjects: ['Fiction', 'History', 'Classics', 'French Revolution'], genre: 'History, Biography & Travel', download_count: 52000, readUrl: 'https://www.gutenberg.org/ebooks/98.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/98', language: 'English', desc: 'Dickens’s French Revolution novel in a reliable Gutenberg reader page.' },
  { id: 'gutenberg-dorian-gray', title: 'The Picture of Dorian Gray', authors: [{ name: 'Oscar Wilde' }], subjects: ['Fiction', 'Classics', 'Philosophy', 'Public domain'], genre: 'Fiction, Classics & Literature', download_count: 49000, readUrl: 'https://www.gutenberg.org/ebooks/174.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/174', language: 'English', desc: 'Oscar Wilde’s philosophical novel in Project Gutenberg’s online edition.' },
  { id: 'gutenberg-metamorphosis', title: 'Metamorphosis', authors: [{ name: 'Franz Kafka' }], subjects: ['Fiction', 'Modernism', 'Classics', 'Public domain'], genre: 'Fiction, Classics & Literature', download_count: 46000, readUrl: 'https://www.gutenberg.org/ebooks/5200.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/5200', language: 'English', desc: 'Kafka’s modernist classic in a browser-friendly Gutenberg edition.' },
  { id: 'gutenberg-huck-finn', title: 'Adventures of Huckleberry Finn', authors: [{ name: 'Mark Twain' }], subjects: ['Adventure', 'Fiction', 'Classics', 'Public domain'], genre: 'Adventure', download_count: 48000, readUrl: 'https://www.gutenberg.org/ebooks/76.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/76', language: 'English', desc: 'Mark Twain’s river adventure in Project Gutenberg’s online reader.' },
  { id: 'gutenberg-little-women', title: 'Little Women', authors: [{ name: 'Louisa May Alcott' }], subjects: ['Children', 'Fiction', 'Classics', 'Public domain'], genre: 'Storybooks & Children', download_count: 51000, readUrl: 'https://www.gutenberg.org/ebooks/514.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/514', language: 'English', desc: 'A family classic available in Project Gutenberg’s readable web format.' },
  { id: 'gutenberg-secret-garden', title: 'The Secret Garden', authors: [{ name: 'Frances Hodgson Burnett' }], subjects: ['Children', 'Fiction', 'Classics', 'Public domain'], genre: 'Storybooks & Children', download_count: 43000, readUrl: 'https://www.gutenberg.org/ebooks/113.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/113', language: 'English', desc: 'A children’s classic in a reliable Project Gutenberg browser edition.' },
  { id: 'gutenberg-time-machine', title: 'The Time Machine', authors: [{ name: 'H. G. Wells' }], subjects: ['Science fiction', 'Classics', 'Public domain'], genre: 'Science Fiction & Fantasy', download_count: 45000, readUrl: 'https://www.gutenberg.org/ebooks/35.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/35', language: 'English', desc: 'H. G. Wells’s time-travel landmark in Project Gutenberg’s online reader.' },
  { id: 'gutenberg-invisible-man', title: 'The Invisible Man', authors: [{ name: 'H. G. Wells' }], subjects: ['Science fiction', 'Classics', 'Public domain'], genre: 'Science Fiction & Fantasy', download_count: 42000, readUrl: 'https://www.gutenberg.org/ebooks/5230.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/5230', language: 'English', desc: 'A science-fiction classic with a browser-readable Gutenberg edition.' },
  { id: 'openstax-calculus', title: 'Calculus Volume 1', authors: [{ name: 'OpenStax' }], subjects: ['Calculus', 'Mathematics', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 33000, pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/CalculusVolume1-OP.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/calculus-volume-1', language: 'English', desc: 'An openly licensed calculus textbook from OpenStax.' },
  { id: 'openstax-astronomy-2e', title: 'Astronomy 2e', authors: [{ name: 'OpenStax' }], subjects: ['Astronomy', 'Science', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 31000, pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Astronomy_2e-WEB.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/astronomy-2e', language: 'English', desc: 'A free introductory astronomy textbook from OpenStax.' }
];

FREE_PDF_BOOKS.push(...EXTRA_OPEN_BOOKS);

const OPENSTAX_EXPANSION = [
  { id: 'openstax-physics', title: 'College Physics 2e', authors: [{ name: 'OpenStax' }], subjects: ['Physics', 'Science', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 30500, pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/College_Physics_2e-WEB.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/college-physics-2e', language: 'English', desc: 'A complete openly licensed physics textbook from OpenStax.' },
  { id: 'openstax-statistics', title: 'Introductory Statistics 2e', authors: [{ name: 'OpenStax' }], subjects: ['Statistics', 'Mathematics', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 30200, pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Introductory_Statistics_2e-WEB.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/introductory-statistics-2e', language: 'English', desc: 'A free statistics textbook for college and self-study learners.' },
  { id: 'openstax-economics-3e', title: 'Principles of Economics 3e', authors: [{ name: 'OpenStax' }], subjects: ['Economics', 'Social science', 'Textbook', 'CC BY'], genre: 'History, Biography & Travel', download_count: 29800, pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Principles_of_Economics_3e-WEB.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/principles-economics-3e', language: 'English', desc: 'An openly licensed economics textbook for broad social-science shelves.' }
];

FREE_PDF_BOOKS.push(...OPENSTAX_EXPANSION);

const VISUAL_AND_REFERENCE_BOOKS = [
  { id: 'comic-book-plus', title: 'Golden Age Comics Collection', authors: [{ name: 'Comic Book Plus' }], subjects: ['Comics', 'Graphic novels', 'Golden Age', 'Public domain'], genre: 'Comics & Graphic Novels', download_count: 56000, readUrl: 'https://comicbookplus.com/', coverUrl: '', sourceName: 'Comic Book Plus', sourceUrl: 'https://comicbookplus.com/', language: 'English', desc: 'A legal public-domain comics portal for superheroes, adventure strips, humor comics, pulps, and comic magazines.' },
  { id: 'digital-comic-museum', title: 'Public Domain Comics Museum', authors: [{ name: 'Digital Comic Museum' }], subjects: ['Comics', 'Golden Age', 'Public domain', 'Sequential art'], genre: 'Comics & Graphic Novels', download_count: 53500, readUrl: 'https://digitalcomicmuseum.com/', coverUrl: '', sourceName: 'Digital Comic Museum', sourceUrl: 'https://digitalcomicmuseum.com/', language: 'English', desc: 'A large archive of copyright-cleared Golden Age comic books for browsing and download.' },
  { id: 'open-culture-comics', title: 'Free Comics & Graphic Novels Guide', authors: [{ name: 'Open Culture' }], subjects: ['Comics', 'Graphic novels', 'Reading guide', 'Free books'], genre: 'Comics & Graphic Novels', download_count: 42000, readUrl: 'https://www.openculture.com/free_comic_books', coverUrl: '', sourceName: 'Open Culture', sourceUrl: 'https://www.openculture.com/free_comic_books', language: 'English', desc: 'A curated guide to free, legal comics and graphic novels from publishers, artists, museums, and public-domain collections.' },
  { id: 'manga-plus', title: 'MANGA Plus Free Chapters', authors: [{ name: 'SHUEISHA' }], subjects: ['Manga', 'Shonen', 'Official publisher', 'Comics'], genre: 'Manga & Webcomics', download_count: 59000, readUrl: 'https://mangaplus.shueisha.co.jp/updates', coverUrl: '', sourceName: 'MANGA Plus by SHUEISHA', sourceUrl: 'https://mangaplus.shueisha.co.jp/', language: 'Multiple languages', desc: 'Official publisher access to free manga chapters and simulpub releases where available.' },
  { id: 'viz-free-manga', title: 'VIZ Free Manga Chapters', authors: [{ name: 'VIZ Media' }], subjects: ['Manga', 'Official publisher', 'Graphic storytelling', 'Comics'], genre: 'Manga & Webcomics', download_count: 52000, readUrl: 'https://www.viz.com/read/free', coverUrl: '', sourceName: 'VIZ Media', sourceUrl: 'https://www.viz.com/read/free', language: 'English', desc: 'Official free manga chapters from VIZ, useful for learners who want current, legal manga samples.' },
  { id: 'webtoons-originals', title: 'WEBTOON Free Comics', authors: [{ name: 'WEBTOON' }], subjects: ['Webcomics', 'Manga-inspired', 'Graphic novels', 'Serialized comics'], genre: 'Manga & Webcomics', download_count: 50000, readUrl: 'https://www.webtoons.com/en/', coverUrl: '', sourceName: 'WEBTOON', sourceUrl: 'https://www.webtoons.com/en/', language: 'English', desc: 'Free serialized webcomics across romance, fantasy, action, comedy, drama, and slice-of-life.' },
  { id: 'gutenberg-grimms', title: "Grimms' Fairy Tales", authors: [{ name: 'Jacob Grimm and Wilhelm Grimm' }], subjects: ['Storybooks', 'Fairy tales', 'Children', 'Public domain'], genre: 'Storybooks & Children', download_count: 54000, readUrl: 'https://www.gutenberg.org/ebooks/2591.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/2591', language: 'English', desc: 'Classic fairy tales and bedtime stories in a public-domain online edition.' },
  { id: 'gutenberg-andersen', title: "Andersen's Fairy Tales", authors: [{ name: 'Hans Christian Andersen' }], subjects: ['Storybooks', 'Fairy tales', 'Children', 'Public domain'], genre: 'Storybooks & Children', download_count: 52500, readUrl: 'https://www.gutenberg.org/ebooks/1597.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1597', language: 'English', desc: 'Hans Christian Andersen’s beloved storybook collection for children and families.' },
  { id: 'world-history-encyclopedia', title: 'World History Encyclopedia', authors: [{ name: 'World History Encyclopedia' }], subjects: ['Encyclopedia', 'History', 'Reference', 'Articles'], genre: 'Encyclopedias & Reference', download_count: 45500, readUrl: 'https://www.worldhistory.org/', coverUrl: '', sourceName: 'World History Encyclopedia', sourceUrl: 'https://www.worldhistory.org/', language: 'English', desc: 'A broad reference encyclopedia for history topics, timelines, maps, biographies, and ancient cultures.' },
  { id: 'stanford-encyclopedia-philosophy', title: 'Stanford Encyclopedia of Philosophy', authors: [{ name: 'Stanford University' }], subjects: ['Encyclopedia', 'Philosophy', 'Reference', 'Academic'], genre: 'Encyclopedias & Reference', download_count: 45000, readUrl: 'https://plato.stanford.edu/', coverUrl: '', sourceName: 'Stanford Encyclopedia of Philosophy', sourceUrl: 'https://plato.stanford.edu/', language: 'English', desc: 'An expert-written philosophy encyclopedia for concepts, thinkers, logic, ethics, and ideas.' },
  { id: 'wikibooks-reference', title: 'Wikibooks Open Textbooks & Manuals', authors: [{ name: 'Wikibooks contributors' }], subjects: ['Reference', 'Textbooks', 'Manuals', 'Open knowledge'], genre: 'Encyclopedias & Reference', download_count: 44000, readUrl: 'https://en.wikibooks.org/wiki/Main_Page', coverUrl: '', sourceName: 'Wikibooks', sourceUrl: 'https://en.wikibooks.org/wiki/Main_Page', language: 'Multiple languages', desc: 'Open textbooks, manuals, study guides, cookbooks, language books, and reference works.' },
  { id: 'intechopen-books', title: 'IntechOpen Academic Books', authors: [{ name: 'IntechOpen' }], subjects: ['Academic books', 'Science', 'Engineering', 'Open access'], genre: 'Academic & Research', download_count: 36500, readUrl: 'https://www.intechopen.com/books', coverUrl: '', sourceName: 'IntechOpen', sourceUrl: 'https://www.intechopen.com/books', language: 'English', desc: 'Open-access academic books and chapters across science, technology, medicine, and engineering.' }
];

FREE_PDF_BOOKS.push(...VISUAL_AND_REFERENCE_BOOKS);

const SHAYARI_AND_ROMANCE_BOOKS = [
  { id: 'rekhta-jaun-elia', title: 'Jaun Elia Shayari Collection', authors: [{ name: 'Jaun Elia' }], subjects: ['Shayari', 'Urdu poetry', 'Ghazal', 'Romantic poetry'], genre: 'Shayari & Punjabi Poetry', download_count: 58500, readUrl: 'https://www.rekhta.org/poets/jaun-eliya', coverUrl: '', sourceName: 'Rekhta', sourceUrl: 'https://www.rekhta.org/poets/jaun-eliya', language: 'Urdu / Hindi / Roman', desc: 'A legal Rekhta author collection for Jaun Elia shayari, ghazals, and nazms.' },
  { id: 'rekhta-waris-shah', title: 'Waris Shah Poetry & Heer', authors: [{ name: 'Waris Shah' }], subjects: ['Punjabi poetry', 'Heer', 'Sufi poetry', 'Public domain'], genre: 'Shayari & Punjabi Poetry', download_count: 56000, readUrl: 'https://www.rekhta.org/poets/waris-shah', coverUrl: '', sourceName: 'Rekhta', sourceUrl: 'https://www.rekhta.org/poets/waris-shah', language: 'Punjabi / Urdu / Hindi', desc: 'Waris Shah’s Punjabi poetic tradition and Heer resources from a legal poetry portal.' },
  { id: 'wikisource-heer-waris-shah', title: 'Heer Waris Shah', authors: [{ name: 'Waris Shah' }], subjects: ['Punjabi classic', 'Romance', 'Poetry', 'Wikisource'], genre: 'Shayari & Punjabi Poetry', download_count: 54500, readUrl: 'https://pa.wikisource.org/wiki/%E0%A8%B9%E0%A9%80%E0%A8%B0_%E0%A8%B5%E0%A8%BE%E0%A8%B0%E0%A8%BF%E0%A8%B8_%E0%A8%B8%E0%A8%BC%E0%A8%BE%E0%A8%B9', coverUrl: '', sourceName: 'Punjabi Wikisource', sourceUrl: 'https://pa.wikisource.org/wiki/%E0%A8%B9%E0%A9%80%E0%A8%B0_%E0%A8%B5%E0%A8%BE%E0%A8%B0%E0%A8%BF%E0%A8%B8_%E0%A8%B8%E0%A8%BC%E0%A8%BE%E0%A8%B9', language: 'Punjabi', desc: 'The Punjabi classic Heer Waris Shah in an open Wikisource reading edition.' },
  { id: 'rekhta-shiv-kumar-batalvi', title: 'Shiv Kumar Batalvi Poems', authors: [{ name: 'Shiv Kumar Batalvi' }], subjects: ['Punjabi poetry', 'Romantic poetry', 'Birha', 'Author collection'], genre: 'Shayari & Punjabi Poetry', download_count: 53000, readUrl: 'https://www.rekhta.org/poets/shiv-kumar-batalvi', coverUrl: '', sourceName: 'Rekhta', sourceUrl: 'https://www.rekhta.org/poets/shiv-kumar-batalvi', language: 'Punjabi / Hindi / Roman', desc: 'A legal author page for Shiv Kumar Batalvi poems and romantic Punjabi verse.' },
  { id: 'rekhta-amrita-pritam', title: 'Amrita Pritam Poetry', authors: [{ name: 'Amrita Pritam' }], subjects: ['Punjabi poetry', 'Romantic poetry', 'Indian literature'], genre: 'Shayari & Punjabi Poetry', download_count: 52000, readUrl: 'https://www.rekhta.org/poets/amrita-pritam', coverUrl: '', sourceName: 'Rekhta', sourceUrl: 'https://www.rekhta.org/poets/amrita-pritam', language: 'Punjabi / Hindi / Urdu', desc: 'Romantic and partition-era poetry from Amrita Pritam through a legal poetry collection.' },
  { id: 'gutenberg-sense-sensibility', title: 'Sense and Sensibility', authors: [{ name: 'Jane Austen' }], subjects: ['Fiction', 'Romance', 'Classic novel', 'Public domain'], genre: 'Romance', download_count: 54000, readUrl: 'https://www.gutenberg.org/ebooks/161.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/161', language: 'English', desc: 'Jane Austen’s romantic classic in a public-domain online edition.' },
  { id: 'gutenberg-persuasion', title: 'Persuasion', authors: [{ name: 'Jane Austen' }], subjects: ['Fiction', 'Romance', 'Classic novel', 'Public domain'], genre: 'Romance', download_count: 51500, readUrl: 'https://www.gutenberg.org/ebooks/105.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/105', language: 'English', desc: 'A second-chance romantic novel from Jane Austen, available through Project Gutenberg.' },
  { id: 'gutenberg-northanger-abbey', title: 'Northanger Abbey', authors: [{ name: 'Jane Austen' }], subjects: ['Fiction', 'Romance', 'Gothic parody', 'Public domain'], genre: 'Romance', download_count: 49200, readUrl: 'https://www.gutenberg.org/ebooks/121.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/121', language: 'English', desc: 'Austen’s playful romantic novel with Gothic touches in an open reader.' },
  { id: 'gutenberg-anne-green-gables', title: 'Anne of Green Gables', authors: [{ name: 'L. M. Montgomery' }], subjects: ['Fiction', 'Romance', 'Coming of age', 'Public domain'], genre: 'Romance', download_count: 50500, readUrl: 'https://www.gutenberg.org/ebooks/45.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/45', language: 'English', desc: 'A warm coming-of-age classic with romantic arcs from Project Gutenberg.' },
  { id: 'gutenberg-scarlet-pimpernel', title: 'The Scarlet Pimpernel', authors: [{ name: 'Baroness Orczy' }], subjects: ['Fiction', 'Romance', 'Adventure', 'Public domain'], genre: 'Romance', download_count: 47000, readUrl: 'https://www.gutenberg.org/ebooks/60.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/60', language: 'English', desc: 'A romantic adventure classic with a reliable public-domain web edition.' }
];

FREE_PDF_BOOKS.push(...SHAYARI_AND_ROMANCE_BOOKS);

// ---------------------------------------------------------------------
// MORE_BOOKS — additional curated public-domain / open-access titles.
// Adds real Project Gutenberg entries across genres already used by
// SHELVES, so the curated shelf count grows without touching the
// Gutendex/dynamic search path.
// ---------------------------------------------------------------------
const MORE_BOOKS = [
  // Fiction, Classics & Literature
  { id: 'gutenberg-great-expectations', title: 'Great Expectations', authors: [{ name: 'Charles Dickens' }], subjects: ['Fiction', 'Classics', 'Coming of age', 'Public domain'], genre: 'Fiction, Classics & Literature', download_count: 50000, readUrl: 'https://www.gutenberg.org/ebooks/1400.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1400', language: 'English', desc: 'Dickens’s coming-of-age classic in a reliable public-domain reader.' },
  { id: 'gutenberg-david-copperfield', title: 'David Copperfield', authors: [{ name: 'Charles Dickens' }], subjects: ['Fiction', 'Classics', 'Public domain'], genre: 'Fiction, Classics & Literature', download_count: 42000, readUrl: 'https://www.gutenberg.org/ebooks/766.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/766', language: 'English', desc: 'One of Dickens’s most personal novels, in an open online edition.' },
  { id: 'gutenberg-oliver-twist', title: 'Oliver Twist', authors: [{ name: 'Charles Dickens' }], subjects: ['Fiction', 'Classics', 'Social commentary', 'Public domain'], genre: 'Fiction, Classics & Literature', download_count: 40500, readUrl: 'https://www.gutenberg.org/ebooks/730.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/730', language: 'English', desc: 'Dickens’s classic on poverty and resilience, free to read online.' },
  { id: 'gutenberg-christmas-carol', title: 'A Christmas Carol', authors: [{ name: 'Charles Dickens' }], subjects: ['Fiction', 'Classics', 'Holiday', 'Public domain'], genre: 'Fiction, Classics & Literature', download_count: 46000, readUrl: 'https://www.gutenberg.org/ebooks/46.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/46', language: 'English', desc: 'Dickens’s beloved novella of redemption, in a free public-domain edition.' },
  { id: 'gutenberg-leaves-of-grass', title: 'Leaves of Grass', authors: [{ name: 'Walt Whitman' }], subjects: ['Poetry', 'American literature', 'Public domain'], genre: 'Poetry', download_count: 28500, readUrl: 'https://www.gutenberg.org/ebooks/1322.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1322', language: 'English', desc: 'Whitman’s landmark poetry collection in an open web edition.' },
  { id: 'gutenberg-raven-poe', title: 'The Raven and Other Poems', authors: [{ name: 'Edgar Allan Poe' }], subjects: ['Poetry', 'Gothic', 'Public domain'], genre: 'Poetry', download_count: 27000, readUrl: 'https://www.gutenberg.org/ebooks/25525.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/25525', language: 'English', desc: 'Poe’s celebrated poetry collection, freely readable online.' },

  // Mystery & Detective
  { id: 'gutenberg-tell-tale-heart', title: 'The Tell-Tale Heart and Other Stories', authors: [{ name: 'Edgar Allan Poe' }], subjects: ['Mystery', 'Horror', 'Short stories', 'Public domain'], genre: 'Mystery & Detective', download_count: 33500, readUrl: 'https://www.gutenberg.org/ebooks/2148.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/2148', language: 'English', desc: 'Poe’s tense psychological tales, free in Project Gutenberg’s reader.' },
  { id: 'gutenberg-moonstone', title: 'The Moonstone', authors: [{ name: 'Wilkie Collins' }], subjects: ['Mystery', 'Detective fiction', 'Classics', 'Public domain'], genre: 'Mystery & Detective', download_count: 25500, readUrl: 'https://www.gutenberg.org/ebooks/155.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/155', language: 'English', desc: 'Often called the first English detective novel, free to read online.' },

  // Adventure
  { id: 'gutenberg-count-monte-cristo', title: 'The Count of Monte Cristo', authors: [{ name: 'Alexandre Dumas' }], subjects: ['Adventure', 'Classics', 'Revenge', 'Public domain'], genre: 'Adventure', download_count: 44000, readUrl: 'https://www.gutenberg.org/ebooks/1184.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1184', language: 'English', desc: 'Dumas’s epic tale of revenge and redemption, free online.' },
  { id: 'gutenberg-three-musketeers', title: 'The Three Musketeers', authors: [{ name: 'Alexandre Dumas' }], subjects: ['Adventure', 'Classics', 'Public domain'], genre: 'Adventure', download_count: 41000, readUrl: 'https://www.gutenberg.org/ebooks/1257.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1257', language: 'English', desc: 'A swashbuckling adventure classic in a public-domain online edition.' },
  { id: 'gutenberg-robinson-crusoe', title: 'Robinson Crusoe', authors: [{ name: 'Daniel Defoe' }], subjects: ['Adventure', 'Classics', 'Survival', 'Public domain'], genre: 'Adventure', download_count: 39500, readUrl: 'https://www.gutenberg.org/ebooks/521.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/521', language: 'English', desc: 'The classic castaway adventure, free in Project Gutenberg’s reader.' },
  { id: 'gutenberg-gullivers-travels', title: "Gulliver's Travels", authors: [{ name: 'Jonathan Swift' }], subjects: ['Adventure', 'Satire', 'Classics', 'Public domain'], genre: 'Adventure', download_count: 38000, readUrl: 'https://www.gutenberg.org/ebooks/829.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/829', language: 'English', desc: 'Swift’s satirical travel adventure, free to read online.' },
  { id: 'gutenberg-around-the-world-80', title: 'Around the World in Eighty Days', authors: [{ name: 'Jules Verne' }], subjects: ['Adventure', 'Travel', 'Classics', 'Public domain'], genre: 'Adventure', download_count: 37500, readUrl: 'https://www.gutenberg.org/ebooks/103.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/103', language: 'English', desc: 'Verne’s classic race-against-time adventure, free online.' },

  // Science Fiction & Fantasy
  { id: 'gutenberg-20000-leagues', title: 'Twenty Thousand Leagues Under the Sea', authors: [{ name: 'Jules Verne' }], subjects: ['Science fiction', 'Adventure', 'Classics', 'Public domain'], genre: 'Science Fiction & Fantasy', download_count: 40000, readUrl: 'https://www.gutenberg.org/ebooks/164.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/164', language: 'English', desc: 'Verne’s undersea science-fiction classic, free to read online.' },
  { id: 'gutenberg-war-of-worlds', title: 'The War of the Worlds', authors: [{ name: 'H. G. Wells' }], subjects: ['Science fiction', 'Classics', 'Public domain'], genre: 'Science Fiction & Fantasy', download_count: 43000, readUrl: 'https://www.gutenberg.org/ebooks/36.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/36', language: 'English', desc: 'Wells’s alien-invasion classic, freely available online.' },
  { id: 'gutenberg-journey-center-earth', title: 'A Journey to the Centre of the Earth', authors: [{ name: 'Jules Verne' }], subjects: ['Science fiction', 'Adventure', 'Classics', 'Public domain'], genre: 'Science Fiction & Fantasy', download_count: 32000, readUrl: 'https://www.gutenberg.org/ebooks/3748.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/3748', language: 'English', desc: 'Verne’s subterranean adventure classic, free to read online.' },

  // Storybooks & Children
  { id: 'gutenberg-peter-pan', title: 'Peter Pan', authors: [{ name: 'J. M. Barrie' }], subjects: ['Children', 'Fantasy', 'Classics', 'Public domain'], genre: 'Storybooks & Children', download_count: 41500, readUrl: 'https://www.gutenberg.org/ebooks/16.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/16', language: 'English', desc: 'The boy who never grew up, in a free public-domain edition.' },
  { id: 'gutenberg-jungle-book', title: 'The Jungle Book', authors: [{ name: 'Rudyard Kipling' }], subjects: ['Children', 'Adventure', 'Classics', 'Public domain'], genre: 'Storybooks & Children', download_count: 39000, readUrl: 'https://www.gutenberg.org/ebooks/236.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/236', language: 'English', desc: 'Kipling’s classic jungle tales, free to read online.' },
  { id: 'gutenberg-wind-willows', title: 'The Wind in the Willows', authors: [{ name: 'Kenneth Grahame' }], subjects: ['Children', 'Classics', 'Public domain'], genre: 'Storybooks & Children', download_count: 36500, readUrl: 'https://www.gutenberg.org/ebooks/289.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/289', language: 'English', desc: 'A gentle riverbank classic, free in a public-domain online edition.' },
  { id: 'gutenberg-aesops-fables', title: "Aesop's Fables", authors: [{ name: 'Aesop' }], subjects: ['Children', 'Fables', 'Classics', 'Public domain'], genre: 'Storybooks & Children', download_count: 34500, readUrl: 'https://www.gutenberg.org/ebooks/21.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/21', language: 'English', desc: 'Timeless short fables with morals, free to read online.' },

  // Philosophy, Religion & Ideas
  { id: 'gutenberg-meditations', title: 'Meditations', authors: [{ name: 'Marcus Aurelius' }], subjects: ['Philosophy', 'Stoicism', 'Classics', 'Public domain'], genre: 'Philosophy, Religion & Ideas', download_count: 30500, readUrl: 'https://www.gutenberg.org/ebooks/2680.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/2680', language: 'English', desc: 'The Stoic emperor’s personal reflections, free to read online.' },
  { id: 'gutenberg-republic-plato', title: 'The Republic', authors: [{ name: 'Plato' }], subjects: ['Philosophy', 'Classics', 'Public domain'], genre: 'Philosophy, Religion & Ideas', download_count: 29500, readUrl: 'https://www.gutenberg.org/ebooks/1497.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1497', language: 'English', desc: 'Plato’s foundational work on justice and the ideal state, free online.' },
  { id: 'gutenberg-prince-machiavelli', title: 'The Prince', authors: [{ name: 'Niccolò Machiavelli' }], subjects: ['Philosophy', 'Political theory', 'Classics', 'Public domain'], genre: 'Philosophy, Religion & Ideas', download_count: 27500, readUrl: 'https://www.gutenberg.org/ebooks/1232.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1232', language: 'English', desc: 'Machiavelli’s treatise on power and leadership, free to read online.' },

  // History, Biography & Travel
  { id: 'gutenberg-origin-of-species', title: 'On the Origin of Species', authors: [{ name: 'Charles Darwin' }], subjects: ['Science', 'History of ideas', 'Classics', 'Public domain'], genre: 'History, Biography & Travel', download_count: 31500, readUrl: 'https://www.gutenberg.org/ebooks/1228.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/1228', language: 'English', desc: 'Darwin’s landmark work on evolution, free to read online.' },
  { id: 'gutenberg-wealth-of-nations', title: 'The Wealth of Nations', authors: [{ name: 'Adam Smith' }], subjects: ['Economics', 'History', 'Classics', 'Public domain'], genre: 'History, Biography & Travel', download_count: 26500, readUrl: 'https://www.gutenberg.org/ebooks/3300.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/3300', language: 'English', desc: 'The foundational economics text, free in an online reader.' },
  { id: 'gutenberg-common-sense', title: 'Common Sense', authors: [{ name: 'Thomas Paine' }], subjects: ['History', 'Political philosophy', 'Classics', 'Public domain'], genre: 'History, Biography & Travel', download_count: 24500, readUrl: 'https://www.gutenberg.org/ebooks/147.html.images', coverUrl: '', sourceName: 'Project Gutenberg', sourceUrl: 'https://www.gutenberg.org/ebooks/147', language: 'English', desc: 'Paine’s revolutionary pamphlet, free to read online.' },

  // Science, Math & Technology
  { id: 'openstax-anatomy-physiology', title: 'Anatomy and Physiology 2e', authors: [{ name: 'OpenStax' }], subjects: ['Biology', 'Anatomy', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 28500, pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/AnatomyPhysiology2e-WEB.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/anatomy-and-physiology-2e', language: 'English', desc: 'An openly licensed anatomy and physiology textbook from OpenStax.' },
  { id: 'openstax-precalculus', title: 'Precalculus 2e', authors: [{ name: 'OpenStax' }], subjects: ['Mathematics', 'Precalculus', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 26000, pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Precalculus2e-WEB.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/precalculus-2e', language: 'English', desc: 'A free precalculus textbook covering functions, trigonometry, and more.' },

  // Academic & Research
  { id: 'doab-open-access', title: 'DOAB Open Access Book Directory', authors: [{ name: 'Directory of Open Access Books' }], subjects: ['Academic books', 'Open access', 'Multi-discipline'], genre: 'Academic & Research', download_count: 22000, readUrl: 'https://www.doabooks.org/', coverUrl: '', sourceName: 'DOAB', sourceUrl: 'https://www.doabooks.org/', language: 'Multiple languages', desc: 'A discovery service for peer-reviewed open-access academic books across disciplines.' },
  { id: 'oapen-library', title: 'OAPEN Open Access Library', authors: [{ name: 'OAPEN Foundation' }], subjects: ['Academic books', 'Open access', 'Humanities', 'Social science'], genre: 'Academic & Research', download_count: 21000, readUrl: 'https://www.oapen.org/', coverUrl: '', sourceName: 'OAPEN', sourceUrl: 'https://www.oapen.org/', language: 'Multiple languages', desc: 'A library of open-access books, mainly in humanities and social sciences.' }
];

FREE_PDF_BOOKS.push(...MORE_BOOKS);


const SHELVES = [
  ['Indian Open PDFs', { genre: 'Indian', searchTerms: ['india', 'tagore', 'gandhi', 'gita'] }],
  ['Fiction, Classics & Literature', { genre: 'Fiction, Classics & Literature', searchTerms: ['classic literature', 'dickens', 'austen', 'twain'] }],
  ['Adventure', { genre: 'Adventure', searchTerms: ['adventure', 'sea stories', 'verne', 'stevenson'] }],
  ['Mystery & Detective', { genre: 'Mystery & Detective', searchTerms: ['detective', 'mystery', 'sherlock', 'poe'] }],
  ['Romance & Love Stories', { genre: 'Romance', searchTerms: ['romance', 'love stories', 'austen', 'classic romance novels'] }],
  ['Shayari & Punjabi Poetry', { genre: 'Shayari & Punjabi Poetry', searchTerms: ['shayari', 'ghazal', 'punjabi poetry', 'heer waris shah'] }],
  ['Science Fiction & Fantasy', { genre: 'Science Fiction & Fantasy', searchTerms: ['science fiction', 'fantasy', 'wells', 'gothic'] }],
  ['Poetry', { genre: 'Poetry', searchTerms: ['poetry', 'poems', 'shakespeare sonnets', 'tagore'] }],
  ['Storybooks & Children', { genre: 'Storybooks & Children', searchTerms: ['children', 'fairy tales', 'wonderland', 'school stories'] }],
  ['Comics & Graphic Novels', { genre: 'Comics & Graphic Novels', searchTerms: ['comics', 'graphic novels', 'comic book', 'sequential art'] }],
  ['Manga & Webcomics', { genre: 'Manga & Webcomics', searchTerms: ['manga', 'webcomics', 'graphic stories', 'comic chapters'] }],
  ['Encyclopedias & Reference', { genre: 'Encyclopedias & Reference', searchTerms: ['encyclopedia', 'reference', 'world history', 'wikibooks'] }],
  ['Academic & Research', { genre: 'Academic & Research', searchTerms: ['open access books', 'research books', 'academic books', 'intechopen'] }],
  ['Science, Math & Technology', { genre: 'Science, Math & Technology', searchTerms: ['science textbook', 'mathematics', 'physics', 'biology'] }],
  ['History, Biography & Travel', { genre: 'History, Biography & Travel', searchTerms: ['history', 'biography', 'travel', 'war'] }],
  ['Philosophy, Religion & Ideas', { genre: 'Philosophy, Religion & Ideas', searchTerms: ['philosophy', 'religion', 'ethics', 'gita'] }]
];

const RESOURCE_LINKS = [
  { name: 'Project Gutenberg', type: 'Public-domain books', url: 'https://www.gutenberg.org/', desc: 'Classic literature and Indian public-domain works with reliable browser and PDF editions where available.' },
  { name: 'OpenStax', type: 'Open textbooks', url: 'https://openstax.org/', desc: 'Peer-reviewed Creative Commons textbooks in science, history, psychology, math, and more.' },
  { name: 'DOAB', type: 'Open-access books', url: 'https://www.doabooks.org/', desc: 'Academic open-access books from many publishers; use the source link for more PDFs.' },
  { name: 'OAPEN', type: 'Open-access library', url: 'https://www.oapen.org/', desc: 'A broad library of legally open books, organized by subject and publisher.' },
  { name: 'Comic Book Plus', type: 'Comics', url: 'https://comicbookplus.com/', desc: 'Public-domain comic books, comic strips, pulps, and graphic storytelling collections.' },
  { name: 'MANGA Plus', type: 'Official manga', url: 'https://mangaplus.shueisha.co.jp/', desc: 'Official free manga chapters from SHUEISHA where publisher access is available.' },
  { name: 'Wikibooks', type: 'Reference', url: 'https://en.wikibooks.org/wiki/Main_Page', desc: 'Open textbooks, manuals, how-to books, language books, and community reference works.' },
  { name: 'Rekhta', type: 'Shayari', url: 'https://www.rekhta.org/', desc: 'Legal Urdu, Hindi, and Punjabi poetry collections, including shayari, ghazals, and author pages.' },
  { name: 'Wikisource', type: 'Open texts', url: 'https://wikisource.org/', desc: 'Community-maintained public-domain and freely licensed texts in many Indian languages.' }
];

const HISTORY_KEY = 'gyansetu.readingHistory';
const USER_KEY = 'gyansetu.googleUser';
const CACHE_KEY = 'gyansetu.bookCache.v3';
const library = new Map();
let dark = true;
let activeReaderCleanup = null;
let currentUser = readJson(USER_KEY, null);
const $ = (selector, root = document) => root.querySelector(selector);
const app = $('#app');

const author = (book) => (book.authors || []).map((person) => person.name).join(', ') || 'Unknown author';
const cover = (book) => book.coverUrl || book.formats?.['image/jpeg'] || '';
const pdfOf = (book) => book.pdfUrl || Object.entries(book.formats || {}).find(([type, url]) => /pdf/i.test(type) || String(url).toLowerCase().split('?')[0].endsWith('.pdf'))?.[1]?.replace('http://', 'https://') || '';
const readableOf = (book) => book.readUrl || pdfOf(book) || Object.entries(book.formats || {}).find(([type]) => /text\/html/i.test(type))?.[1]?.replace('http://', 'https://') || '';
const formatOf = (book) => book.readUrl ? 'Online' : (pdfOf(book) ? 'PDF' : 'Online');
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const remember = (books) => books.forEach((book) => library.set(String(book.id), book));

function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function cacheBooks(key, books) { writeJson(`${CACHE_KEY}.${key}`, { savedAt: Date.now(), books }); }
function cachedBooks(key) { const cached = readJson(`${CACHE_KEY}.${key}`, null); return cached && Date.now() - cached.savedAt < 86400000 ? cached.books : null; }
function userInitials() { return (currentUser?.name || currentUser?.email || 'G').split(/\s|@/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase(); }
function userHistory() { if (!currentUser) return []; return readJson(HISTORY_KEY, {})[currentUser.email] || []; }

function saveProgress(book, marker = 'Opened') {
  if (!currentUser) return;
  const all = readJson(HISTORY_KEY, {});
  const entry = { id: String(book.id), title: book.title, author: author(book), cover: cover(book), book, page: 0, totalPages: 1, percent: 100, marker, updatedAt: new Date().toISOString() };
  const existing = all[currentUser.email] || [];
  all[currentUser.email] = [entry, ...existing.filter((item) => item.id !== entry.id)].slice(0, 24);
  writeJson(HISTORY_KEY, all);
}

function placeholderCover(book) {
  return `<span class="coverFallback"><strong>${esc(book.title)}</strong><small>${esc(book.sourceName || 'Open PDF')}</small></span>`;
}

function genreMatch(book, genre) {
  if (genre === 'Indian') return /india|indian|tagore|gandhi|gita|waris|shiv kumar|amrita|punjabi|shayari/i.test(`${book.title} ${author(book)} ${(book.subjects || []).join(' ')}`);
  if (genre === 'Romance') return /romance|romantic|love/i.test(`${book.title} ${author(book)} ${(book.subjects || []).join(' ')}`);
  if (genre === 'Shayari & Punjabi Poetry') return /shayari|ghazal|nazm|urdu poetry|punjabi poetry|waris shah|jaun elia|shiv kumar|batalvi|amrita pritam|heer/i.test(`${book.title} ${author(book)} ${(book.subjects || []).join(' ')}`);
  return book.genre === genre || (book.subjects || []).some((subject) => subject.toLowerCase().includes(genre.toLowerCase().split(',')[0]));
}

function sortBooks(books) { return [...books].sort((a, b) => (b.download_count || 0) - (a.download_count || 0) || a.title.localeCompare(b.title)); }

async function searchGutendex(term, count = 40) {
  if (!term) return [];
  const cacheKey = `gutendex.${term}.${count}`;
  const cached = cachedBooks(cacheKey);
  if (cached) { remember(cached); return cached; }
  try {
    const params = new URLSearchParams({ search: term });
    const response = await fetch(`https://gutendex.com/books/?${params}`);
    if (!response.ok) return [];
    const data = await response.json();
    const books = (data.results || []).map((doc) => ({ id: `gb-${doc.id}`, title: doc.title || 'Untitled', authors: (doc.authors || []).map((person) => ({ name: person.name })), subjects: [...(doc.subjects || []), ...(doc.bookshelves || []), 'Project Gutenberg'], genre: 'Fiction, Classics & Literature', download_count: doc.download_count || 0, pdfUrl: doc.formats?.['application/pdf'] || '', coverUrl: doc.formats?.['image/jpeg'] || '', sourceName: 'Project Gutenberg', sourceUrl: `https://www.gutenberg.org/ebooks/${doc.id}`, readUrl: doc.formats?.['text/html; charset=utf-8'] || doc.formats?.['text/html'] || `https://www.gutenberg.org/ebooks/${doc.id}.html.images`, language: (doc.languages || []).join(', ') || 'Open edition', desc: 'A public-domain book from Project Gutenberg with a direct PDF format.' })).filter((book) => readableOf(book)).slice(0, count);
    cacheBooks(cacheKey, books); remember(books); return books;
  } catch { return []; }
}

async function searchBooks(query, count = 24) {
  const term = typeof query === 'string' ? query : query?.search || '';
  const base = query?.genre ? FREE_PDF_BOOKS.filter((book) => genreMatch(book, query.genre)) : FREE_PDF_BOOKS.filter((book) => !term || `${book.title} ${author(book)} ${(book.subjects || []).join(' ')}`.toLowerCase().includes(term.toLowerCase()));
  const searchTerms = query?.searchTerms || (term ? [term] : []);
  const gutendexGroups = await Promise.all(searchTerms.slice(0, 4).map((searchTerm) => searchGutendex(searchTerm, Math.max(8, Math.ceil(count / 2)))));
  const gutendex = gutendexGroups.flat().map((book) => query?.genre ? { ...book, genre: query.genre } : book);
  const seen = new Set();
  const merged = sortBooks([...base, ...gutendex].filter((book) => readableOf(book) && !/archive\.org|openlibrary\.org/i.test(readableOf(book)) && !seen.has(book.id) && seen.add(book.id))).slice(0, count);
  remember(merged); return merged;
}

function render() {
  remember(FREE_PDF_BOOKS);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  app.innerHTML = `<div class="app"><header class="topbar"><a class="brand" href="#" aria-label="GyanSetu home"><img class="brandLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu logo"><div><b>GyanSetu</b><span>Digital Library</span></div></a><form class="search"><span>⌕</span><input id="q" placeholder="Search shayari, romantic novels, comics, storybooks..."><button>Search</button></form><nav class="topActions"><button class="navBtn" id="historyBtn">History</button><button class="accountBtn" id="loginBtn">${currentUser ? `<span>${userInitials()}</span>${esc(currentUser.name)}` : 'Continue with Google'}</button><button class="iconBtn" id="theme" aria-label="Toggle theme">${dark ? '☀' : '☾'}</button></nav></header><main><section class="hero"><div class="heroText"><p class="eyebrow">✦ open web reading room</p><h1>Read free books without broken links.</h1><p>GyanSetu now includes every major reading lane: shayari, Punjabi poetry, romantic novels, comics, manga, storybooks, encyclopedias, reference works, textbooks, classics, and research books from legal open-web or official free sources.</p><div class="heroActions"><button data-search="Indian">Open Indian books</button><button class="ghost" data-search="shayari romantic novels comics storybooks">Explore all types</button></div></div><aside class="device"><div class="deviceTop">Fast reading desk <span>Reliable links</span></div><div class="gridMini" id="featured"></div></aside></section><section class="historyPanel" id="history"><div><p class="eyebrow">Reading history</p><h2>Pick up where you left off</h2></div><div id="historyList"></div></section><section class="resources" id="resources"></section><div id="content"></div></main></div>`;
  $('#theme').onclick = () => { dark = !dark; render(); };
  $('#loginBtn').onclick = loginFlow;
  $('#historyBtn').onclick = () => $('#history').scrollIntoView({ behavior: 'smooth' });
  $('.search').onsubmit = (event) => { event.preventDefault(); showResults($('#q').value.trim() || 'classic literature'); };
  document.querySelectorAll('[data-search]').forEach((button) => { button.onclick = () => showResults(button.dataset.search); });
  app.onclick = (event) => { const cardButton = event.target.closest('[data-id]'); if (cardButton) openDetails(library.get(cardButton.dataset.id)); };
  renderHistory(); renderResources(); loadFeatured(); showShelves();
}

function loginFlow() {
  if (currentUser && confirm('Sign out of GyanSetu?')) { currentUser = null; localStorage.removeItem(USER_KEY); render(); return; }
  if (currentUser) return;
  const name = prompt('Continue with Google\n\nEnter your Google account name to enable reading history on this device:');
  if (!name) return;
  currentUser = { name: name.trim(), email: `${name.trim().toLowerCase().replace(/\s+/g, '.')}@google.user` };
  writeJson(USER_KEY, currentUser); render();
}

function renderResources() {
  $('#resources').innerHTML = `<div class="sectionHead"><div><p class="eyebrow">Free open-book collections</p><h2>No Internet Archive books</h2></div><span>Public-domain and Creative Commons sources only</span></div><div class="resourceGrid">${RESOURCE_LINKS.map((item) => `<a class="resourceCard" href="${item.url}" target="_blank" rel="noopener"><small>${esc(item.type)}</small><b>${esc(item.name)}</b><span>${esc(item.desc)}</span></a>`).join('')}</div>`;
}

function directPdfLink(book) { const readUrl = readableOf(book); return readUrl ? `<a class="sourceLink" href="${readUrl}" target="_blank" rel="noopener">Open ${formatOf(book)}</a><a class="sourceLink" href="${book.sourceUrl || readUrl}" target="_blank" rel="noopener">Source: ${esc(book.sourceName || 'Open library')}</a>` : ''; }

function renderHistory() {
  const box = $('#historyList');
  if (!currentUser) { box.innerHTML = '<div class="emptyState"><b>Sign in with Google to save reading history.</b><p>Your books and last-opened PDFs will appear here on this device.</p></div>'; return; }
  const items = userHistory(); remember(items.map((item) => item.book).filter(Boolean));
  box.innerHTML = items.length ? `<div class="historyGrid">${items.map((item) => `<button class="historyCard" data-id="${item.id}">${item.cover ? `<img loading="lazy" src="${item.cover}" alt="">` : ''}<span><b>${esc(item.title)}</b><small>${esc(item.author)} · ${esc(item.marker || 'Opened')}</small><progress value="1" max="1"></progress></span></button>`).join('')}</div>` : '<div class="emptyState"><b>No saved books yet.</b><p>Open a book and your reading desk will remember it.</p></div>';
}

function bookCard(book) {
  const title = esc(book.title);
  if (!readableOf(book)) return '';
  return `<article class="bookCard"><button class="coverBtn" data-id="${book.id}" aria-label="View details for ${title}">${cover(book) ? `<img loading="lazy" decoding="async" src="${cover(book)}" alt="${title}">` : placeholderCover(book)}<em>${formatOf(book)}</em></button><h3>${title}</h3><p>${esc(author(book))}</p><button class="read" data-id="${book.id}">Read book</button></article>`;
}

function loadFeatured() {
  const featured = sortBooks(FREE_PDF_BOOKS).slice(0, 4);
  $('#featured').innerHTML = featured.map((book) => `<button data-id="${book.id}" aria-label="View ${esc(book.title)}">${cover(book) ? `<img loading="lazy" decoding="async" src="${cover(book)}" alt="">` : placeholderCover(book)}<small>${formatOf(book)}</small></button>`).join('');
}

function showShelves() {
  const content = $('#content');
  content.innerHTML = SHELVES.map((shelf, index) => `<section class="shelf"><div class="sectionHead"><h2>${shelf[0]}</h2><button data-shelf="${index}">See all →</button></div><div class="rule"></div><div class="rail" id="rail${index}">${'<div class="skeleton"></div>'.repeat(8)}</div></section>`).join('');
  document.querySelectorAll('[data-shelf]').forEach((button) => { button.onclick = () => showResults(SHELVES[button.dataset.shelf][1]); });
  const observer = new IntersectionObserver((entries) => entries.filter((entry) => entry.isIntersecting).forEach(async (entry) => { observer.unobserve(entry.target); const index = Number(entry.target.id.replace('rail', '')); try { const books = await searchBooks(SHELVES[index][1], 40); entry.target.innerHTML = books.length ? books.map(bookCard).join('') : '<p class="muted">More open books are being curated for this genre.</p>'; } catch { entry.target.innerHTML = '<p class="muted">This shelf could not load right now.</p>'; } }), { rootMargin: '450px 0px' });
  document.querySelectorAll('.rail').forEach((rail) => observer.observe(rail));
}

async function showResults(query) {
  const label = query?.genre || (typeof query === 'string' ? query : query.search) || 'open books';
  const content = $('#content');
  content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${esc(label)}”</h2></div><div class="rule"></div><div class="loader">◌ Searching curated open books…</div></section>`;
  try { const books = await searchBooks(query, 150); content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${esc(label)}”</h2></div><div class="rule"></div><div class="results">${books.length ? books.map(bookCard).join('') : '<p class="muted">No matching non-Archive open books found. Try another title, author, or genre.</p>'}</div></section>`; content.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  catch (error) { content.innerHTML = `<p class="muted">${esc(error.message)}</p>`; }
}

function openDetails(book) {
  if (!book) return;
  const hasPdf = Boolean(readableOf(book));
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" role="dialog" aria-modal="true"><div class="details"><button class="close" aria-label="Close details">×</button><div class="detailCover">${cover(book) ? `<img loading="lazy" src="${cover(book)}" alt="">` : placeholderCover(book)}</div><div><p class="eyebrow">★ ${hasPdf ? 'Open reading edition' : 'Open book details'}</p><h2>${esc(book.title)}</h2><p class="byline">${esc(author(book))}</p><p class="desc">${esc(book.desc || 'Read the full book inside GyanSetu from a legal open-web source.')}</p><dl><dt>Subjects</dt><dd>${esc((book.subjects || []).slice(0, 4).join(' · ') || 'Open book')}</dd><dt>Language</dt><dd>${esc(book.language || 'Open edition')}</dd><dt>Format</dt><dd>Complete online edition</dd></dl>${directPdfLink(book)}<button class="primary" ${hasPdf ? '' : 'disabled'}>${hasPdf ? `📖 Read ${formatOf(book)} in GyanSetu` : 'Book unavailable'}</button></div></div></div>`);
  $('.close').onclick = () => $('.modal').remove();
  $('.modal').onclick = (event) => { if (event.target.classList.contains('modal')) event.target.remove(); };
  $('.primary').onclick = () => { if (!hasPdf) return; $('.modal').remove(); openPdfReader(book); };
}

function openPdfReader(book) {
  const bookUrl = readableOf(book);
  if (!bookUrl || /archive\.org|openlibrary\.org/i.test(bookUrl)) { alert('This item is blocked because Internet Archive/Open Library books are not used in GyanSetu.'); return; }
  const isPdf = !book.readUrl && Boolean(pdfOf(book));
  const readerUrl = isPdf ? `${bookUrl}#toolbar=1&navpanes=0&view=FitH` : bookUrl;
  saveProgress(book, `${formatOf(book)} opened`);
  document.body.insertAdjacentHTML('beforeend', `<section class="reader" role="dialog" aria-modal="true"><div class="readerShell pdfShell"><div class="readerTop"><div><small>Direct open-web ${formatOf(book)}</small><b>${esc(book.title)}</b></div><button id="rclose" aria-label="Close reader">×</button></div><div class="pdfToolbar"><span>Books load only when you open them, keeping shelves fast.</span><a href="${bookUrl}" target="_blank" rel="noopener">Open in new tab</a></div><iframe class="pdfFrame" loading="lazy" title="${esc(book.title)}" src="${readerUrl}"></iframe></div></section>`);
  const reader = $('.reader');
  const close = () => { reader?.remove(); if (activeReaderCleanup) window.removeEventListener('keydown', activeReaderCleanup); activeReaderCleanup = null; renderHistory(); };
  $('#rclose').onclick = close;
  activeReaderCleanup = (event) => { if (event.key === 'Escape') close(); };
  window.addEventListener('keydown', activeReaderCleanup);
}

render();
