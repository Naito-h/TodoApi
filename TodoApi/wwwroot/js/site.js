const uri = 'api/todoitems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addDetailTextbox = document.getElementById('add-detail');

    const item = {
        isComplete: false,
        state: "new",
        name: addNameTextbox.value.trim(),
        detail: addDetailTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addDetailTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('edit-state').value = item.state;
    document.getElementById('edit-date').value = item.date;
    document.getElementById('edit-detail').value = item.detail;
    document.getElementById('editForm').style.display = 'block';
}

/*function displayDetailForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('detail-name').value = item.name;
    document.getElementById('detail-id').value = item.id;
    document.getElementById('detail-isComplete').checked = item.isComplete;
    document.getElementById('detail-detail').value = item.detail;
    document.getElementById('detailForm').style.display = 'block';
}*/

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        state: document.getElementById('edit-state').value,
        date: document.getElementById('edit-date').value,
        name: document.getElementById('edit-name').value.trim(),
        detail: document.getElementById('edit-detail').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

/*function updateItem2() {
    const itemId = document.getElementById('detail-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('detail-isComplete').checked,
        name: document.getElementById('detail-name').value.trim(),
        detail: document.getElementById('detail-detail').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput2();

    return false;
}*/

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

/*function closeInput2() {
    document.getElementById('detailForm').style.display = 'none';
}*/

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function ChangeColor() {
    for (let i = 0; i < document.getElementById("todos").rows.length; i++) {
        let row = document.getElementById("todos").rows.item(i);
        let cell1 = row.cells.item(0);
        let cell2 = row.cells.item(2);
        let cell3 = row.cells.item(3);

        let input = cell1.getElementsByTagName('input');

        if (cell1.textContent == "new") {
            cell1.style.color = 'red';
            cell2.style.textDecoration = 'none';
            cell2.style.color = 'red';
            cell3.style.textDecoration = 'none';
            cell3.style.color = 'red';
        } else if (cell1.textContent == "active") {
            cell1.style.color = 'blue';
            cell2.style.textDecoration = 'none';
            cell2.style.color = 'blue';
            cell3.style.textDecoration = 'none';
            cell3.style.color = 'blue';
        } else if (cell1.textContent == "finished") {
            cell1.style.color = 'black';
            cell2.style.textDecoration = 'line-through';
            cell3.style.textDecoration = 'line-through';
        } else {
            cell1.style.color = 'black';
            cell2.style.textDecoration = 'line-through';
            cell3.style.textDecoration = 'line-through';
        }

        /*if (input[0].checked) {
            cell2.style.textDecoration = 'line-through';
            cell2.style.color = 'red';
            cell3.style.textDecoration = 'line-through';
            cell3.style.color = 'red';
        } else {
            cell2.style.textDecoration = 'none';
            cell2.style.color = 'blue';
            cell3.style.textDecoration = 'none';
            cell3.style.color = 'blue';
            //console.log(cell1.firstChild);
            //console.log(input.item(0));
        }
        */
    }
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let stateElement = document.createTextNode(item.state);

        let isCheck = (item.isComplete == true) ? "yes" : "no";
        let newElement = document.createElement("p");
        let newContent = document.createTextNode(isCheck);
        newElement.appendChild(newContent);
        newElement.setAttribute("id", "ischeck");

        /*let detailButton = button.cloneNode(false);
        detailButton.innerText = 'Detail';
        detailButton.setAttribute('onclick', `displayDetailForm(${item.id})`);
        */

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
                
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        //td1.appendChild(isCompleteCheckbox);
        td1.appendChild(stateElement);
        //td1.appendChild(newElement);

        let td2 = tr.insertCell(1);
        let newDate = document.createElement('input');
        newDate.type = 'date';
        newDate.value = item.date;
        td2.appendChild(newDate);
        //console.log(newDate);
        //console.log(document.getElementById("edit-date"));

        let td3 = tr.insertCell(2);
        let textNode = document.createTextNode(item.name);
        td3.appendChild(textNode);

        let td4 = tr.insertCell(3);
        let textNode2 = document.createTextNode(item.detail);
        td4.appendChild(textNode2);

        /*let td4 = tr.insertCell(3);
        td4.appendChild(detailButton);
        */

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);

       
    });

    ChangeColor();

    todos = data;
}