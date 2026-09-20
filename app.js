const panel = document.querySelector('[data-assistant-panel]');
const backdrop = document.querySelector('.backdrop');
const answer = document.querySelector('[data-answer]');
const form = document.querySelector('[data-assistant-form]');
const questionInput = document.querySelector('#question');

function openAssistant() {
  panel.classList.add('is-open');
  panel.setAttribute('aria-hidden', 'false');
  backdrop.classList.add('is-visible');
  questionInput.focus();
}
function closeAssistant() {
  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
  backdrop.classList.remove('is-visible');
}

document.querySelectorAll('[data-open-assistant]').forEach((button) => button.addEventListener('click', openAssistant));
document.querySelectorAll('[data-close-assistant]').forEach((button) => button.addEventListener('click', closeAssistant));
document.querySelectorAll('[data-question]').forEach((button) => button.addEventListener('click', () => {
  questionInput.value = button.dataset.question;
  renderAnswer(button.dataset.question);
}));

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeAssistant(); });
form.addEventListener('submit', (event) => { event.preventDefault(); renderAnswer(questionInput.value); });

function renderAnswer(question) {
  const text = question.trim().toLowerCase();
  if (!text) { answer.textContent = 'اكتب سؤالًا تعليميًا أولًا.'; return; }
  if (text.includes('عاجل') || text.includes('طوارئ')) {
    answer.textContent = 'إذا كانت هناك صعوبة في التنفس، ألم صدري شديد، فقدان وعي، نزيف شديد، أو تدهور سريع، فاتصل بخدمات الطوارئ المحلية أو توجّه إلى أقرب مستشفى فورًا.';
    return;
  }
  if (text.includes('هدف') || text.includes('منصة')) {
    answer.textContent = 'هذه نسخة أولية من بوابة تعليمية وبحثية. ستجمع المراجع والموضوعات الصحية وتساعد على الوصول إلى المحتوى، لكنها لا تشخّص ولا تستبدل الطبيب.';
    return;
  }
  if (text.includes('مرجع')) {
    answer.textContent = 'استخدم المراجع الأصلية والإرشادات الرسمية، تحقق من تاريخ التحديث، واستشر مختصًا مؤهلًا قبل اتخاذ أي قرار صحي.';
    return;
  }
  answer.textContent = 'أستطيع تقديم توجيه تعليمي عام فقط. لا تدخل بيانات شخصية، ولا تعتمد على هذه الإجابة للتشخيص أو العلاج؛ ناقش حالتك مع طبيب أو فريق رعاية صحي.';
}
