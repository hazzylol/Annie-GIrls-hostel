/* ---------- Booking flow ---------- */
(function () {
  const form = document.getElementById('bookForm');
  if (!form) return;

  const state = {
    room: null,
    price: 0,
    moveIn: '',
    duration: '6',
    firstName: '',
    phone: '',
  };

  // Gradient backgrounds for summary photo per room type
  const roomPhotoStyles = {
    '1': 'radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.4), transparent 50%), linear-gradient(135deg, #F6DDE4 0%, #EFC2CF 60%, #C8527A 130%)',
    '2': 'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.4), transparent 50%), linear-gradient(135deg, #F0E6D6 0%, #E5C9A2 60%, #C99B5A 130%)',
    '3': 'radial-gradient(ellipse at 30% 60%, rgba(255,255,255,0.4), transparent 50%), linear-gradient(135deg, #DDE7DB 0%, #B8CDB6 60%, #6F8F6E 130%)',
    '4': 'radial-gradient(ellipse at 70% 70%, rgba(255,255,255,0.4), transparent 50%), linear-gradient(135deg, #F4DDD0 0%, #E5B3A0 60%, #D87C5A 130%)',
  };
  const roomLabels = {
    '1': '1-seater · Single private',
    '2': '2-seater · Twin shared',
    '3': '3-seater · Triple shared',
    '4': '4-seater · Shared community',
  };

  // Pre-select room from ?room=N query
  const params = new URLSearchParams(location.search);
  const initialRoom = params.get('room');

  // Default move-in = next month, 1st
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const moveInInput = document.getElementById('moveIn');
  if (moveInInput) {
    moveInInput.value = nextMonth.toISOString().slice(0, 10);
    moveInInput.min = today.toISOString().slice(0, 10);
    state.moveIn = moveInInput.value;
  }

  /* ---- Room selection ---- */
  const options = document.querySelectorAll('.room-option');
  function selectRoom(roomVal) {
    options.forEach((o) => {
      const isActive = o.dataset.room === String(roomVal);
      o.dataset.selected = isActive ? 'true' : 'false';
      const input = o.querySelector('input');
      if (input) input.checked = isActive;
      if (isActive) {
        state.room = roomVal;
        state.price = parseInt(o.dataset.price, 10);
      }
    });
    updateSummary();
  }
  options.forEach((o) => {
    o.addEventListener('click', () => selectRoom(o.dataset.room));
  });
  if (initialRoom) selectRoom(initialRoom);

  /* ---- Form field tracking ---- */
  document.getElementById('duration').addEventListener('change', (e) => {
    state.duration = e.target.value;
    updateSummary();
  });
  moveInInput.addEventListener('change', (e) => {
    state.moveIn = e.target.value;
    updateSummary();
  });
  document.getElementById('firstName').addEventListener('input', (e) => {
    state.firstName = e.target.value.trim();
  });
  document.getElementById('phone').addEventListener('input', (e) => {
    state.phone = e.target.value.trim();
  });

  /* ---- Summary update ---- */
  const sumRoom = document.getElementById('summaryRoom');
  const sumPhoto = document.getElementById('summaryPhoto');
  const sumPrice = document.getElementById('sumPrice');
  const sumMoveIn = document.getElementById('sumMoveIn');
  const sumDuration = document.getElementById('sumDuration');

  function fmt(n) { return n.toLocaleString('en-PK'); }
  function formatDate(d) {
    if (!d) return '—';
    const date = new Date(d);
    return date.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function durationLabel(v) {
    return v === 'open' ? 'Open ended' : `${v} months`;
  }
  function updateSummary() {
    if (state.room) {
      sumRoom.textContent = roomLabels[state.room];
      sumPhoto.style.background = roomPhotoStyles[state.room];
      sumPrice.textContent = fmt(state.price);
    } else {
      sumRoom.textContent = 'Pick a room to begin';
      sumPhoto.style.background = '';
      sumPrice.textContent = '—';
    }
    sumMoveIn.textContent = formatDate(state.moveIn);
    sumDuration.textContent = durationLabel(state.duration);
  }
  updateSummary();

  /* ---- Step navigation ---- */
  const steps = form.querySelectorAll('.form-step');
  const pills = form.querySelectorAll('.step-pill');

  function showStep(n) {
    steps.forEach((s) => {
      s.dataset.active = s.dataset.step === String(n) ? 'true' : 'false';
    });
    pills.forEach((p) => {
      const stepN = parseInt(p.dataset.step, 10);
      p.dataset.active = stepN === n ? 'true' : 'false';
      p.dataset.done = stepN < n ? 'true' : 'false';
    });
    window.scrollTo({ top: form.offsetTop - 80, behavior: 'smooth' });
  }

  form.querySelectorAll('[data-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.dataset.next, 10);
      // Validate step 1
      if (next === 2 && !state.room) {
        alert('Please pick a room type to continue.');
        return;
      }
      if (next === 3) {
        const required = ['firstName', 'lastName', 'phone', 'email'];
        for (const id of required) {
          const el = document.getElementById(id);
          if (!el.value.trim()) {
            el.focus();
            el.style.borderColor = 'crimson';
            setTimeout(() => (el.style.borderColor = ''), 2000);
            return;
          }
        }
      }
      showStep(next);
    });
  });
  form.querySelectorAll('[data-prev]').forEach((btn) => {
    btn.addEventListener('click', () => {
      showStep(parseInt(btn.dataset.prev, 10));
    });
  });

  /* ---- Submit ---- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!document.getElementById('agreeTerms').checked) {
      alert('Please confirm you understand this is a request.');
      return;
    }
    const ref = 'AGH-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('confirmName').textContent = state.firstName || 'friend';
    document.getElementById('confirmRoom').textContent = roomLabels[state.room] || 'a room';
    document.getElementById('confirmPhone').textContent = state.phone || 'your number';
    document.getElementById('confirmRef').textContent = ref;
    showStep(4);
    pills.forEach((p) => (p.dataset.done = 'true'));
  });

  if (window.lucide) window.lucide.createIcons();
})();
