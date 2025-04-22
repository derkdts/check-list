  (() => {
  const correctPassword = '****';
  const sessionKey = 'tabAuth';
  const passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
  const passwordForm = document.getElementById('passwordForm');
  const modalPasswordInput = document.getElementById('modalPassword');
  const passwordError = document.getElementById('passwordError');
  const tabs = document.querySelectorAll('#tabs button[data-bs-toggle="tab"]');
  const logoutBtn = document.getElementById('logoutBtn');
  let targetTabId = null;

  function isAuthorized() {
    return sessionStorage.getItem(sessionKey) === 'true';
  }

  function updateProtectedTabsVisibility(activeTabId) {
    document.querySelectorAll('.tab-pane.protected').forEach(pane => {
      if (isAuthorized() && pane.id === activeTabId) {
        pane.classList.add('show', 'active');
      } else {
        pane.classList.remove('show', 'active');
      }
    });
  }

  window.addEventListener('load', () => {
    updateProtectedTabsVisibility('home');
  });

  document.getElementById('tabs').addEventListener('click', e => {
    const btn = e.target.closest('button[data-bs-toggle="tab"]');
    if (!btn) return;

    const tabId = btn.getAttribute('data-bs-target').substring(1);
    if (tabId === 'home') {
      updateProtectedTabsVisibility('home');
      return;
    }

    if (!isAuthorized()) {
      e.preventDefault();
      targetTabId = tabId;
      passwordError.style.display = 'none';
      modalPasswordInput.value = '';
      modalPasswordInput.classList.remove('is-invalid');
      passwordModal.show();
    } else {
      updateProtectedTabsVisibility(tabId);
    }
  });

  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    const enteredPassword = modalPasswordInput.value.trim();

    if (enteredPassword === correctPassword) {
      sessionStorage.setItem(sessionKey, 'true');
      passwordModal.hide();

      if (targetTabId) {
        const targetTabBtn = document.querySelector(`#tabs button[data-bs-target="#${targetTabId}"]`);
        if (targetTabBtn) {
          bootstrap.Tab.getOrCreateInstance(targetTabBtn).show();
        }
        updateProtectedTabsVisibility(targetTabId);
        targetTabId = null;
      }
    } else {
      passwordError.style.display = 'block';
      modalPasswordInput.classList.add('is-invalid');
      modalPasswordInput.focus();
    }
  });

  modalPasswordInput.addEventListener('input', () => {
    passwordError.style.display = 'none';
    modalPasswordInput.classList.remove('is-invalid');
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem(sessionKey);
    const homeTabBtn = document.getElementById('tab-home');
    bootstrap.Tab.getOrCreateInstance(homeTabBtn).show();
    updateProtectedTabsVisibility('home');
  });

  document.getElementById('tabs').addEventListener('shown.bs.tab', e => {
    const activatedTabId = e.target.getAttribute('data-bs-target').substring(1);
    if (activatedTabId === 'home' || isAuthorized()) {
      updateProtectedTabsVisibility(activatedTabId);
    } else {
      const homeTabBtn = document.getElementById('tab-home');
      bootstrap.Tab.getOrCreateInstance(homeTabBtn).show();
      updateProtectedTabsVisibility('home');
    }
  });
})();
