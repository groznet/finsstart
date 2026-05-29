// Mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMenuBtn');
  function toggleMenu(open) {
    if (mobileMenu) mobileMenu.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
    document.body.classList.toggle('mobile-menu-open', open);
  }
  if (mobileBtn) mobileBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  // Load services
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    fetch('/data/services.json')
      .then(res => res.json())
      .then(data => {
        servicesGrid.innerHTML = data.map(svc => `
          <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition">
            <i class="${svc.icon} text-4xl text-accent mb-4"></i>
            <h3 class="text-xl font-bold">${svc.title}</h3>
            <p class="text-gray-500 mt-2">${svc.description}</p>
          </div>
        `).join('');
      })
      .catch(() => servicesGrid.innerHTML = '<div class="col-span-full text-center">Ошибка загрузки услуг</div>');
  }

  // Load FAQ
  const faqContainer = document.getElementById('faqAccordion');
  if (faqContainer) {
    fetch('/data/faq.json')
      .then(res => res.json())
      .then(faqs => {
        faqContainer.innerHTML = faqs.map((faq, idx) => `
          <div class="border rounded-xl bg-white overflow-hidden">
            <div class="faq-question flex justify-between items-center p-5 font-semibold cursor-pointer hover:bg-gray-50" data-idx="${idx}">
              <span>${faq.question}</span><i class="fas fa-chevron-down transition-transform duration-200"></i>
            </div>
            <div class="faq-answer px-5 pb-5 text-gray-600">${faq.answer}</div>
          </div>
        `).join('');
        document.querySelectorAll('.faq-question').forEach(btn => {
          btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            answer.classList.toggle('open');
            icon.style.transform = answer.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
          });
        });
      });
  }

  // Form submits (prevent default)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
      form.reset();
    });
  });
});