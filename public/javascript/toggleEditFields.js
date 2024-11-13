function toggleEdit(field) {
    const viewElement = document.getElementById(`${field}-view`);
    const inputElement = document.getElementById(`${field}-input`);
    const saveButton = document.getElementById(`${field}-save`);
    
    if (viewElement.classList.contains('d-none')) {
        viewElement.classList.remove('d-none');
        inputElement.classList.add('d-none');
        saveButton.classList.add('d-none');
    } else {
        viewElement.classList.add('d-none');
        inputElement.classList.remove('d-none');
        saveButton.classList.remove('d-none');
    }
}

function showMessage(username) {
    const message = 'Bạn có chắc chắn muốn xóa người dùng này?';
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('alert', 'alert-warning');
    messageDiv.setAttribute('role', 'alert');
    
    messageDiv.innerHTML = `
        <p>${message}</p>
        <button class="btn btn-success" onclick="deleteUser('${username}')">Có</button>
        <button class="btn btn-danger" onclick="closeMessage()">Hủy</button>
    `;
    
    document.body.prepend(messageDiv);
}

function deleteUser(username) {
    window.location.href = `/delete-user/${username}`;
}

function closeMessage() {
    const messageDiv = document.querySelector('.alert-warning');
    if (messageDiv) {
        messageDiv.style.display = 'none';
    }
}
