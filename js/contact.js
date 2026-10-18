(() => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmitBtn') || form.querySelector('.contact-form__submit');
  const params = new URLSearchParams(window.location.search);
  const topic = params.get('topic');
  const channel = params.get('channel');

  const heroTitle = document.getElementById('contactHeroTitle');
  const heroLead = document.getElementById('contactHeroLead');
  const channelSelect = document.getElementById('contactChannel');
  const messageField = document.getElementById('contactMessage');

  if (topic === 'support') {
    if (heroTitle) heroTitle.textContent = '無料サポートのお問い合わせ';
    if (heroLead) {
      heroLead.innerHTML = '使い方のご相談や、オンラインでのご説明のご希望など、お気軽にご連絡ください。<br>ご相談内容とご希望の日時をお知らせください。';
    }
    if (submitBtn) submitBtn.textContent = '無料サポートについて相談する';
    if (messageField && !messageField.value) {
      messageField.placeholder = 'ご相談内容（例：初期設定の進め方、今日やることの使い方 など）をご記入ください';
    }
  }

  const channelMap = { mail: 'mail', line: 'line', zoom: 'zoom' };
  if (channelSelect && channel && channelMap[channel]) {
    channelSelect.value = channelMap[channel];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    submitBtn.disabled = true;
    const prevLabel = submitBtn.textContent;
    submitBtn.textContent = '送信中…';
    setTimeout(() => {
      submitBtn.textContent = prevLabel;
      submitBtn.disabled = false;
      status.textContent = 'お問い合わせありがとうございます。（仮ページのため、実際には送信されていません）';
      form.reset();
      if (topic === 'support' && channelSelect && channel && channelMap[channel]) {
        channelSelect.value = channelMap[channel];
      }
    }, 600);
  });
})();
