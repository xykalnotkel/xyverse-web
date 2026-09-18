/** Short, interruptible native-details transitions. No frame loop or animation dependency. */
export function pasangGerak() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Map<HTMLDetailsElement, { animation: Animation; open: boolean }>();
  function expand(group: HTMLDetailsElement, open: boolean) {
    const from = group.getBoundingClientRect().height;
    const previous = active.get(group);
    if (previous) { previous.animation.onfinish = null; previous.animation.cancel(); active.delete(group); }
    group.style.height = '';
    group.style.overflow = '';
    if (reduced.matches || !group.animate) { group.open = open; return; }
    group.open = true;
    const summary = group.querySelector<HTMLElement>(':scope > summary')!;
    const css = getComputedStyle(group);
    const to = open ? group.getBoundingClientRect().height
      : summary.getBoundingClientRect().height + parseFloat(css.borderTopWidth) + parseFloat(css.borderBottomWidth);
    group.style.overflow = 'hidden';
    group.style.height = `${from}px`;
    const animation = group.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: 260, easing: 'cubic-bezier(.22,1,.36,1)',
    });
    active.set(group, { animation, open });
    animation.onfinish = () => {
      group.open = open;
      group.style.height = '';
      group.style.overflow = '';
      active.delete(group);
    };
  }
  document.querySelectorAll<HTMLDetailsElement>('details').forEach(group => {
    const summary = group.querySelector<HTMLElement>(':scope > summary');
    summary?.addEventListener('click', event => {
      if ((event.target as HTMLElement).closest('a,button,input')) return;
      event.preventDefault();
      const open = !(active.get(group)?.open ?? group.open);
      if (open && group.closest('#mob')) {
        document.querySelectorAll<HTMLDetailsElement>('#mob details').forEach(other => {
          if (other !== group && (active.get(other)?.open ?? other.open)) expand(other, false);
        });
      }
      expand(group, open);
    });
  });
  const finish = () => [...active.values()].forEach(x => x.animation.finish());
  window.addEventListener('resize', finish, { passive: true });
  reduced.addEventListener('change', () => { if (reduced.matches) finish(); });

  // Content remains visible without JS. Only offscreen content is prepared for reveal.
  const io = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  }, { threshold: .04, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
    if (reduced.matches || el.getBoundingClientRect().top < innerHeight - 20) {
      el.classList.add('in');
      return;
    }
    el.dataset.revealPending = '';
    const grid = el.closest('.grid');
    if (grid) el.style.setProperty('--reveal-delay', `${Math.min([...grid.children].indexOf(el), 3) * 45}ms`);
    io.observe(el);
  });
}
