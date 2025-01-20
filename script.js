let num = parseInt(localStorage.getItem('num')) || 1;
const list = document.getElementById('list');
const add = document.getElementById('add');
const inpval = document.getElementById('input');
const clearall = document.getElementById('clear-all');
const time = document.getElementById('time');
const day = document.getElementById('day');

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day1 = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();

    time.textContent = `${hours}:${minutes}:${seconds}`;
    day.textContent = `${day1} ${month} ${year}`;
}

setInterval(updateTime, 1000);

function createTaskElement(taskText, taskId) {
    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.style.padding = '10px';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.fontFamily = 'Poppins';
    li.style.fontWeight = 'bold';
    li.style.fontSize = '20px';
    li.style.color = 'white';

    li.textContent = taskText;

    const removeButton = document.createElement('div');
    removeButton.textContent = 'x';
    removeButton.style.width = '20px';
    removeButton.style.height = '20px';
    removeButton.style.borderRadius = '50%';
    removeButton.style.border = '2px solid white';
    removeButton.style.display = 'flex';
    removeButton.style.justifyContent = 'center';
    removeButton.style.alignItems = 'center';
    removeButton.style.cursor = 'pointer';
    removeButton.style.color = 'white';

    removeButton.addEventListener('click', () => {
        li.remove();
        localStorage.removeItem(taskId);
        updateTaskIndices();
    });

    li.appendChild(removeButton);
    return li;
}

function updateTaskIndices() {
    const tasks = list.children;
    num = 1;
    localStorage.clear();
    for (const task of tasks) {
        const taskText = task.firstChild.textContent;
        localStorage.setItem(num, taskText);
        num++;
    }
    localStorage.setItem('num', num);
}

add.addEventListener('click', () => {
    if (inpval.value == '') {
        return
    };

    const taskText = inpval.value.trim();
    const li = createTaskElement(taskText, num);
    list.appendChild(li);

    localStorage.setItem(num, taskText);
    num++;
    localStorage.setItem('num', num);

    inpval.value = '';
});

inpval.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        add.click();
    }
});

clearall.addEventListener('click', () => {
    list.innerHTML = '';
    num = 1;
    localStorage.clear();
    localStorage.setItem('num', num);
});

document.addEventListener('DOMContentLoaded', () => {
    list.innerHTML = '';
    for (let i = 1; i < num; i++) {
        const taskText = localStorage.getItem(i);
        if (taskText) {
            const li = createTaskElement(taskText, i);
            list.appendChild(li);
        }
    }
});
