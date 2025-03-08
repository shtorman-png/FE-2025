const user_list = document.getElementById('userlist');

function create_element(user, index) {
    const name_tag = document.createElement('input')
    name_tag.value = user.name
    const email_tag = document.createElement('input')
    email_tag.value = user.email
    const delete_button = document.createElement('button')
    delete_button.textContent = 'Delete'
    delete_button.onclick = () => {
        user_list.removeChild(list_item)
        fetch(`https://jsonplaceholder.typicode.com/users/${index}`, {
            method: 'DELETE'
          })
    }
    const edit_button = document.createElement('button')
    edit_button.textContent = 'Edit'
    edit_button.onclick = () => {
        update_user(index, name_tag.value, email_tag.value)
    }
    const list_item = document.createElement('li')
    list_item.append(name_tag, email_tag, delete_button, edit_button)
    user_list.appendChild(list_item)
}

window.get_users = function get_users() {
    user_list.innerHTML = ''
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
        for (let idx = 0; idx < json.length; idx++) {
            const user = json[idx]
            create_element(user, idx)
        }
    });
}

function update_user(index, name, email) {
    fetch(`https://jsonplaceholder.typicode.com/users/${index + 1}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: index + 1,
            name,
            email
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
}

