import { isiForm, kirimPesan } from './pesan';

/** Shared by homepage and contact page: quiet initially, inline validation,
 * one submission status at a time. Client checks never replace server checks. */
export function pasangFormKontak() {
  const form = document.querySelector<HTMLFormElement>('#cf');
  if (!form || form.dataset.ready) return;
  form.dataset.ready = 'true';
  const button = form.querySelector<HTMLButtonElement>('#cf-kirim')!;
  const error = form.querySelector<HTMLElement>('#cf-err')!;
  const success = form.querySelector<HTMLElement>('#cf-ok')!;
  const texts = JSON.parse(form.querySelector('#cf-teks')?.textContent || '{}');
  const minimum = Number(form.dataset.minPesan) || 10;
  const rules: Record<string, (v: string) => boolean> = {
    nama: v => v.trim().length >= 2,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    pesan: v => v.trim().length >= minimum,
  };
  let submitted = false;
  let sending = false;
  const dirty = new Set<string>();
  const field = (name: string) => form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)!;
  const quiet = () => { error.hidden = true; success.hidden = true; };
  function validate(name: string) {
    const input = field(name), container = input.closest<HTMLElement>('[data-f]')!;
    const message = container.querySelector<HTMLElement>('[data-msg]')!;
    const valid = rules[name](input.value);
    container.classList.toggle('is-err', !valid);
    message.hidden = valid;
    input.setAttribute('aria-invalid', String(!valid));
    if (!valid) input.setAttribute('aria-describedby', message.id);
    else input.removeAttribute('aria-describedby');
    return valid;
  }
  for (const name of Object.keys(rules)) {
    const input = field(name), message = input.closest('[data-f]')!.querySelector<HTMLElement>('[data-msg]')!;
    message.id ||= `${input.id}-error`;
    input.addEventListener('blur', event => {
      // Do not move the submit button between pointer-down and click.
      // The submit handler validates all fields together.
      if (event.relatedTarget === button || sending) return;
      // Merely tabbing through an untouched empty field is not an error.
      if (submitted || dirty.has(name) || input.value.trim()) validate(name);
    });
    input.addEventListener('input', () => {
      dirty.add(name);
      if (input.getAttribute('aria-invalid') === 'true') validate(name);
    });
  }
  form.addEventListener('input', quiet);
  form.addEventListener('change', quiet);
  form.addEventListener('pilih', quiet);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    quiet();
    submitted = true;
    if (Object.keys(rules).map(validate).includes(false)) {
      // No duplicate red banner: explain only at the invalid fields.
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    sending = true;
    button.disabled = true;
    button.classList.add('is-load');
    form.setAttribute('aria-busy', 'true');
    const result = await kirimPesan(isiForm(form));
    sending = false;
    button.disabled = false;
    button.classList.remove('is-load');
    form.removeAttribute('aria-busy');
    if (!result.ok) {
      const body = error.querySelector<HTMLElement>('[data-pesan-body]') || error;
      body.textContent = result.galat === 'jaringan' ? texts.jaringan
        : result.galat === 'terlaluSering' ? texts.terlaluSering
        : result.galat === 'gagal' ? texts.gagal : result.galat;
      error.hidden = false;
      error.scrollIntoView({ block: 'nearest' });
      return;
    }
    form.reset();
    submitted = false;
    dirty.clear();
    for (const name of Object.keys(rules)) {
      const input = field(name);
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      input.closest('[data-f]')?.classList.remove('is-err');
      input.closest('[data-f]')!.querySelector<HTMLElement>('[data-msg]')!.hidden = true;
    }
    success.hidden = false;
    success.scrollIntoView({ block: 'nearest' });
  });
}
