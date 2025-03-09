const SUCCESS = 200

const users = document.getElementById('users')
const form = document.getElementById('form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const loader = document.getElementById('loader')

function startLoader() {
    loader.className = 'show' 
}
function stopLoader() {
    loader.className = '' 
}

let focused

document.getElementById('edit-button').onclick = function edit_user() {
    startLoader()
    fetch(`https://jsonplaceholder.typicode.com/users/${focused.user.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: focused.user.id,
            name: nameInput.value,
            email: emailInput.value
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'}})
        .then(response => response.json())
        .then(json => {
            focused.user.name = json.name
            focused.user.email = json.email
            focused.name.innerText = json.name
            focused.email.innerText = json.email
            stopLoader()
        })

    form.hidden = true
}

function create_user(user) {
    const item = document.createElement('li');
     
    const name = document.createElement('div')
    name.innerText = user.name
    
    const email = document.createElement('div')
    email.innerText = user.email
    
    const editButton = document.createElement('button')
    editButton.className = 'edit'
    editButton.innerText = 'edit'
    editButton.onclick = () => {
        focused = {name, email, user}
        nameInput.value = user.name
        emailInput.value = user.email
        form.hidden = false
    }

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'delete'
    deleteButton.className = 'delete'
    deleteButton.onclick = () => {
        startLoader()
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {method: 'DELETE'})
        .then(response => {
            if (response.status === SUCCESS) {
                users.removeChild(item)
                form.hidden = true
            }
            stopLoader()
        })
    }

    item.append(name, email, editButton, deleteButton)
    users.append(item)
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        for (const user of json) {
            create_user(user)
        }
    })