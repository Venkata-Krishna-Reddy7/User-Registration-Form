document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registrationForm');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm');
  const passwordStrength = document.getElementById('password-strength');
  const successMessage = document.getElementById('success-message');
  password.addEventListener('input', function() {
    const val = password.value;
    let strength = '';  
    if (val.length === 0) {
      strength = '';
    } else if (val.length < 6) {
      strength = 'strength-weak';
    } else if (val.length < 10) {
      strength = 'strength-medium';
    } else {
      strength = 'strength-strong';
    }
    
    passwordStrength.className = 'password-strength ' + strength;
  });
  confirmPassword.addEventListener('input', function() {
    if (password.value !== confirmPassword.value) {
      document.getElementById('confirm-error').style.display = 'block';
    } else {
      document.getElementById('confirm-error').style.display = 'none';
    }
  });
  const fileInput = document.getElementById('photo');
  fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      this.classList.add('has-file');
    } else {
      this.classList.remove('has-file');
    }
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const requiredFields = ['fname', 'lname', 'email', 'phone', 'dob', 'password', 'confirm'];
    requiredFields.forEach(field => {
      const element = document.getElementById(field);
      const errorElement = document.getElementById(field + '-error'); 
      if (!element.value.trim()) {
        errorElement.style.display = 'block';
        isValid = false;
      } else {
        errorElement.style.display = 'none';
      }
    });
    if (password.value !== confirmPassword.value) {
      document.getElementById('confirm-error').style.display = 'block';
      isValid = false;
    }
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
      document.getElementById('gender-error').style.display = 'block';
      isValid = false;
    } else {
      document.getElementById('gender-error').style.display = 'none';
    } 
    if (isValid) {
      successMessage.style.display = 'block';
      form.reset();
      passwordStrength.className = 'password-strength';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    }
  });
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      const errorElement = document.getElementById(this.id + '-error');
      if (!this.value.trim() && this.hasAttribute('required')) {
        errorElement.style.display = 'block';
      } else {
        errorElement.style.display = 'none';
      }
      if (this.type === 'email' && this.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.value)) {
          errorElement.style.display = 'block';
          errorElement.textContent = 'Please enter a valid email address';
        } else {
          errorElement.style.display = 'none';
        }
      }
      if (this.type === 'tel' && this.value.trim()) {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(this.value)) {
          errorElement.style.display = 'block';
          errorElement.textContent = 'Please enter a valid 10-digit phone number';
        } else {
          errorElement.style.display = 'none';
        }
      }
    });
  });
});
