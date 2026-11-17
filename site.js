const languageButtons = document.querySelectorAll('.language-switch button');
const preview = document.querySelector('#preview');
const previewImage = document.querySelector('#preview-image');
const previewTitle = document.querySelector('#preview-title');
const translations = Array.from(document.querySelectorAll('[data-en], [data-en-alt], [data-en-label]'), (element) => ({
  element,
  text: element.textContent,
  alt: element.getAttribute('alt'),
  label: element.getAttribute('aria-label'),
}));
const screenshots = {
  dashboard: {
    file: 'aceiro-dashboard.png',
    pt: 'Aceiro · Painel do técnico',
    en: 'Aceiro · Technician’s dashboard',
  },
  bulletin: {
    file: 'aceiro-bulletin.png',
    pt: 'Aceiro · Visão do agricultor',
    en: 'Aceiro · Farmer’s view',
  },
};
let isEnglish = new URLSearchParams(location.search).get('lang') === 'en';

function setLanguage() {
  document.documentElement.lang = isEnglish ? 'en' : 'pt-BR';
  document.title = isEnglish ? 'Gustavo Barbosa | Data, BI & Automation' : 'Gustavo Barbosa | Dados, BI e Automação';
  for (const { element, text, alt, label } of translations) {
    if (element.dataset.en) element.textContent = isEnglish ? element.dataset.en : text;
    if (element.dataset.enAlt) element.alt = isEnglish ? element.dataset.enAlt : alt;
    if (element.dataset.enLabel) element.setAttribute('aria-label', isEnglish ? element.dataset.enLabel : label);
  }
  for (const button of languageButtons) {
    button.setAttribute('aria-pressed', button.dataset.lang === (isEnglish ? 'en' : 'pt'));
  }
}

for (const button of languageButtons) {
  button.addEventListener('click', () => {
    isEnglish = button.dataset.lang === 'en';
    setLanguage();
    const url = new URL(location.href);
    if (isEnglish) url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
  });
}

for (const trigger of document.querySelectorAll('[data-preview]')) {
  trigger.addEventListener('click', () => {
    const screenshot = screenshots[trigger.dataset.preview];
    const title = isEnglish ? screenshot.en : screenshot.pt;
    previewTitle.textContent = title;
    previewImage.src = './assets/' + screenshot.file;
    previewImage.alt = title;
    preview.showModal();
  });
}

setLanguage();
