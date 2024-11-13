document.getElementById('fullname').addEventListener('input', validateFullname)
document.getElementById('username').addEventListener('input', validateUsername)
document.getElementById('password').addEventListener('input', validatePassword)
document.getElementById('confirm-password').addEventListener('input', checkPasswordMatch)
document.getElementById('email').addEventListener('input', validateEmail)
document.getElementById('address').addEventListener('input', validateAddress)
document.getElementById('role').addEventListener('change', validateRole)

function validateFullname() {
    const fullname = document.getElementById('fullname').value
    const errorMessage = document.getElementById('fullname-error')
    
    if (fullname.length < 3) {
        errorMessage.textContent = 'Tên phải có ít nhất 3 ký tự.'
    } else {
        errorMessage.textContent = ''
    }
}

function validateUsername() {
    const username = document.getElementById('username').value
    const errorMessage = document.getElementById('username-error')
    
    if (username.length < 6) {
        errorMessage.textContent = 'Tài khoản phải có ít nhất 6 ký tự.'
    } else {
        errorMessage.textContent = ''
    }
}

function validatePassword() {
    const password = document.getElementById('password').value
    const errorMessage = document.getElementById('password-error')
    
    const strengthMessage = document.getElementById('password-strength')
    strengthMessage.classList.remove('text-danger', 'text-warning', 'text-success')

    if (password.length < 8) {
        errorMessage.textContent = 'Mật khẩu phải có ít nhất 8 ký tự.'
        strengthMessage.textContent = ''
    } else {
        errorMessage.textContent = ''
        const strength = checkPasswordStrength(password)
        strengthMessage.textContent = `Mật khẩu: ${strength}`

        if (strength === 'Yếu') {
            strengthMessage.classList.add('text-danger')
        } else if (strength === 'Trung Bình') {
            strengthMessage.classList.add('text-warning')
        } else if (strength === 'Mạnh') {
            strengthMessage.classList.add('text-success')
        }
    }

    const checkPasswordMatch = checkPasswordMatch(password, confirmPassword)
    
}
function checkPasswordStrength(password) {
    let strength = 'Yếu'
    
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    // Kiểm tra mật khẩu mạnh
    if (strongRegex.test(password)) {
        strength = 'Mạnh'
    } 
    // Kiểm tra mật khẩu trung bình
    else if (mediumRegex.test(password)) {
        strength = 'Trung Bình'
    }
    
    // Trả về độ mạnh của mật khẩu
    return strength
}
function checkPasswordMatch() {
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('confirm-password').value
  const errorConfirmMessage = document.getElementById('confirm-password-error')

  if (password !== confirmPassword) {
    errorConfirmMessage.textContent = 'Mật khẩu không khớp'
  } else {
    errorConfirmMessage.textContent = ''
  }
}

function validateEmail() {
  const email = document.getElementById('email').value
  const errorMessage = document.getElementById('email-error')
  
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  if (!emailRegex.test(email)) {
    errorMessage.textContent = 'Email không hợp lệ.'
  } else {
    errorMessage.textContent = ''
  }
}

function validateAddress() {
  const address = document.getElementById('address').value
  const errorMessage = document.getElementById('address-error')
  
  if (address.length < 10) {
    errorMessage.textContent = 'Địa chỉ phải có ít nhất 10 ký tự.'
  } else {
    errorMessage.textContent = ''
  }
}

function validateRole() {
  const role = document.getElementById('role').value
  const errorMessage = document.getElementById('role-error')
  
  if (role === '') {
    errorMessage.textContent = 'Vui lòng chọn quyền.'
  } else {
    errorMessage.textContent = ''
  }
}
