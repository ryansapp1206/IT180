const input = document.getElementById('taskInput');
const button = document.getElementById('addBtn');
const list = document.getElementById('taskList');

button.onclick = function() {
    const text = input.value;

    if (text !== "") {
        const li = document.createElement('li');
        li.textContent = text + " ";

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';

        removeBtn.onclick = function() {
            list.removeChild(li);
        };

        li.appendChild(removeBtn);
        list.appendChild(li);

        input.value = "";
    }
};