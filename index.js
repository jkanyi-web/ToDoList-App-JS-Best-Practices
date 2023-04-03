/** @format */

function addItem() {
  const userInputValue = document.getElementById('input').value;

  const item = {
    description: userInputValue,
    completed: false,
    index: 0,
  };

  const itemArray = [];

  if (localStorage.getItem('items').length) {
    const currentItems = JSON.parse(localStorage.getItem('items'));

    if (currentItems.length > 0) {
      currentItems.forEach((item) => {
        itemArray.push(item);
      });
    }
  }

  if (item.description.trim().length > 0) {
    item.index = itemArray.length;
    itemArray.push(item);
  }

  localStorage.setItem('items', JSON.stringify(itemArray));

  reOrder();
  loadItems();

  document.getElementById('input').value = '';
}

function updateItem() {
  const items = JSON.parse(localStorage.getItem('items'));

  const updatedValue = document.getElementById('updateId').value;
  const itemIndex = document
    .getElementById('updateId')
    .getAttribute('elementid');

  items[itemIndex].description = updatedValue;

  localStorage.setItem('items', JSON.stringify(items));

  loadItems();

  document.getElementById('formCreate').style.display = 'block';
  document.getElementById('formUpdate').style.display = 'none';
}

function checkStatus() {
  const items = JSON.parse(localStorage.getItem('items'));
  const checkBoxes = document.querySelectorAll('.check');

  checkBoxes.forEach((box, index) => {
    const paragraph = box.nextElementSibling;

    box.checked = items[index].completed;
    if (items[index].completed) {
      paragraph.style.textDecoration = 'line-through';
      paragraph.style.color = '#999';
    } else {
      paragraph.style.textDecoration = 'none';
      paragraph.style.color = 'black';
    }

    box.addEventListener('click', () => {
      items[index].completed = box.checked;
      if (items[index].completed) {
        paragraph.style.textDecoration = 'line-through';
        paragraph.style.color = '#999';
      } else {
        paragraph.style.textDecoration = 'none';
        paragraph.style.color = 'black';
      }
      localStorage.setItem('items', JSON.stringify(items));
    });
  });
}

function checkNull(item) {
  return item.description !== null;
}

function deleteItem() {
  const items = JSON.parse(localStorage.getItem('items'));

  const deleteBtnz = document.querySelectorAll('.trash');
  deleteBtnz.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      delete items[index];
      const clean = items.filter(checkNull);
      localStorage.setItem('items', JSON.stringify(clean));
      reOrder();
      e.target.parentElement.style.display = 'none';
    });
  });
}

function editItem() {
  const editItems = document.querySelectorAll('.fa-edit');

  editItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      document.getElementById('formCreate').style.display = 'none';
      document.getElementById('formUpdate').style.display = 'block';
      document.getElementById('updateId').setAttribute('elementid', index);

      const previousSibling = item.previousElementSibling;

      document.getElementById('updateId').value = previousSibling.textContent;
    });
  });
}


function loadItems() {
  const listContainer = document.querySelector('.list');

  listContainer.innerHTML = '';

  const tasks = [];

  if (localStorage.getItem('items').length > 0) {
    const items = JSON.parse(localStorage.getItem('items'));
    items.forEach((item) => {
      tasks.push(item);
    });
  }

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('task');
    li.innerHTML = `
          <input class="check" id="${task.index}" type="checkbox" name="checkbox">
          <p class="description">${task.description}</p>
          <i class="fa-solid fa-edit"></i>
          <i class="fa-solid fa-trash trash"></i>
  `;
    listContainer.append(li);
  });
  checkStatus();
  deleteItem();
  editItem();
}

function removeCompleted() {
  const clear = document.querySelector('.clear');

  clear.addEventListener('click', () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];

    const filteredItems = items.filter((item) => !item.completed);

    localStorage.setItem('items', JSON.stringify(filteredItems));

    loadItems();
  });
}

function reOrder() {
  if (localStorage.getItem('items').length > 0) {
    const list = [];

    const items = JSON.parse(localStorage.getItem('items'));

    items.forEach((item, index) => {
      item.index = index + 1;
      list.push(item);
    });

    localStorage.setItem('items', JSON.stringify(list));
  }
}