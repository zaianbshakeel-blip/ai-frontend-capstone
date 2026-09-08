// script.js — validation and form behavior for settings form
(function(){
  'use strict';

  // Regex rules
  const USERNAME_RE = /^[A-Za-z0-9_-]{3,20}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_RE = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const THEMES = new Set(['Light','Dark','Auto']);

  // DOM cache
  const form = document.getElementById('settings-form');
  const usernameEl = document.getElementById('username');
  const emailEl = document.getElementById('email');
  const passwordEl = document.getElementById('password');
  const notificationsEl = document.getElementById('notifications');
  const successEl = document.getElementById('success-message');
  const themeFieldset = document.getElementById('theme-fieldset');

  function getErrorEl(input){
    return document.getElementById(input.id + '-error');
  }

  function showError(input, message){
    const err = getErrorEl(input);
    if(err){
      err.textContent = message;
    }
    input.setAttribute('aria-invalid','true');
  }

  function clearError(input){
    const err = getErrorEl(input);
    if(err){
      err.textContent = '';
    }
    input.removeAttribute('aria-invalid');
  }

  function validateUsername(){
    const v = usernameEl.value.trim();
    if(!v){
      showError(usernameEl, 'Username is required.');
      return false;
    }
    if(!USERNAME_RE.test(v)){
      showError(usernameEl, 'Username must be 3–20 characters and may include letters, numbers, - and _.');
      return false;
    }
    clearError(usernameEl);
    return true;
  }

  function validateEmail(){
    const v = emailEl.value.trim();
    if(!v){
      showError(emailEl, 'Email is required.');
      return false;
    }
    if(!EMAIL_RE.test(v)){
      showError(emailEl, 'Enter a valid email address.');
      return false;
    }
    clearError(emailEl);
    return true;
  }

  function validatePassword(){
    const v = passwordEl.value || '';
    if(!v){
      showError(passwordEl, 'Password is required.');
      return false;
    }
    if(!PASSWORD_RE.test(v)){
      showError(passwordEl, 'Password must be at least 8 characters, include one uppercase letter and one number.');
      return false;
    }
    clearError(passwordEl);
    return true;
  }

  function validateTheme(){
    const radios = themeFieldset.querySelectorAll('input[name="theme"]');
    let selected = null;
    radios.forEach(r=>{ if(r.checked) selected = r.value; });
    const errEl = document.getElementById('theme-error');
    if(!selected){
      if(errEl) errEl.textContent = 'Please select a theme.';
      return false;
    }
    if(!THEMES.has(selected)){
      if(errEl) errEl.textContent = 'Invalid theme selection.';
      return false;
    }
    if(errEl) errEl.textContent = '';
    return true;
  }

  // Attach blur/change listeners
  usernameEl.addEventListener('blur', validateUsername);
  emailEl.addEventListener('blur', validateEmail);
  passwordEl.addEventListener('blur', validatePassword);
  // Theme radios: validation on change
  themeFieldset.addEventListener('change', validateTheme);

  // Form submit
  form.addEventListener('submit', function(evt){
    evt.preventDefault();
    successEl.classList.add('hidden');
    successEl.textContent = '';

    const okUsername = validateUsername();
    const okEmail = validateEmail();
    const okPassword = validatePassword();
    const okTheme = validateTheme();

    if(okUsername && okEmail && okPassword && okTheme){
      // Success — show message but never expose password
      successEl.textContent = 'Settings saved successfully.';
      successEl.classList.remove('hidden');
      // For accessibility focus the success message
      successEl.focus && successEl.focus();
      // Do not log or persist password
    } else {
      // Focus first invalid field
      if(!okUsername) usernameEl.focus();
      else if(!okEmail) emailEl.focus();
      else if(!okPassword) passwordEl.focus();
      else {
        const radios = themeFieldset.querySelectorAll('input[name="theme"]');
        radios.length && radios[0].focus();
      }
    }
  });

  // Reset handler: clear errors and success message
  form.addEventListener('reset', function(){
    // run after native reset
    window.setTimeout(function(){
      clearError(usernameEl);
      clearError(emailEl);
      clearError(passwordEl);
      const themeErr = document.getElementById('theme-error');
      if(themeErr) themeErr.textContent = '';
      successEl.textContent = '';
      successEl.classList.add('hidden');
      // ensure password is cleared
      passwordEl.value = '';
    },0);
  });

})();
