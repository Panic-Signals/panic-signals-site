// Sends the booking form to Formspree without leaving the page.
// Without JS the form still posts directly to Formspree.

const OK = "Thanks — we'll get back to you.";
const FAIL = "Sorry, that couldn't send. Please try again or email us directly.";

export function enhanceBookingForm(form: HTMLFormElement): void {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLElement>('[data-booking-status]');
  if (!button || !status) return;
  const idleLabel = button.textContent ?? 'Send request';

  const show = (text: string, kind: 'ok' | 'err' | '') => {
    status.textContent = text;
    status.className = kind;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.textContent = 'Sending…';
    show('', '');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      form.reset();
      show(OK, 'ok');
    } catch {
      show(FAIL, 'err');
    } finally {
      button.disabled = false;
      button.textContent = idleLabel;
    }
  });
}
