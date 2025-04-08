const inputText = document.getElementById("text-input");
const addButton = document.getElementById("add-button");
const tasksList = document.getElementById("task-list-container");
const addArea = document.getElementById("add-container");
const updateInput = document.getElementById("text-update");
const updateButton = document.getElementById("update-button");

const titleArea = document.getElementById("title");
const searchOpenButton = document.getElementById("open-search-button");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const tasksArray = [];
let currentUpdateTask;

const changeAddInputToUpdateInput = (id, description) => {
  changeInputVisbility(true);

  updateInput.value = description;
  if (currentUpdateTask) {
    updateButton.removeEventListener("click", currentUpdateTask);
  }

  // Vai gerar conflitos se nao atribuir a funcao
  currentUpdateTask = () => updateTask(id, updateInput.value);
  updateButton.addEventListener("click", currentUpdateTask);
};

const refreshTasksList = () => {
  tasksList.innerHTML = "";
  console.log("ARRAY: ", tasksArray);
  if (tasksArray.length < 1) {
    tasksList.innerHTML = "";
    tasksList.innerHTML = `<div class="task-card">
    <div class="task">
      <div class="task-item">
        
        <div class="task-desc">
            <label > Lista vazia</label>
            <p class="task-id">adicione alguma tarefa</p>
        </div>
      </div>
      <div class="task-icons">
        
        
      </div>
    </div>
  </div>`;
  } else {
    tasksList.innerHTML = "";
    tasksArray.forEach((item) => {
      console.log(item.desc);
      tasksList.innerHTML += `<div class="task-card">
            <div class="task">
              <div class="task-item">
                
                <input type="checkbox" name="task" id="${item.id}"/>
                <div class="task-desc">
                    <label for="${item.id}">${item.desc}</label>
                    <p class="task-id">ID: ${item.id}</p>
                </div>
              </div>
              <div class="task-icons">
                <button class="edit-button" onclick="changeAddInputToUpdateInput(${item.id}, '${item.desc}')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z"
                    ></path>
                  </svg>
                </button>
                <button class="trash-button" onclick="removeTask(${item.id})">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                  >
                    <path
                      d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>`;
    });
  }
};

const addNewTask = (description) => {
  tasksArray.push({
    id: Math.random(),
    desc: description,
    isFinished: false,
  });
  inputText.value = "";

  tasksArray.sort((a, b) => a.id - b.id);
  refreshTasksList();
};

const removeTask = (taskId) => {
  const index = tasksArray.findIndex((item) => item.id === taskId);

  if (index !== -1) tasksArray.splice(index, 1);

  tasksArray.sort((a, b) => a.id - b.id);
  refreshTasksList();
};

const updateTask = (taskId) => {
  const index = tasksArray.findIndex((item) => item.id === taskId);

  if (index !== -1) tasksArray[index].desc = updateInput.value;

  changeInputVisbility(false);

  tasksArray.sort((a, b) => a.id - b.id);
  refreshTasksList();
};

const searchTask = (taskId) => {
  const index = tasksArray.findIndex((item) => item.id === parseFloat(taskId));
  const task = tasksArray[index];

  tasksArray.splice(index, 1);

  tasksArray.unshift(task);
  refreshTasksList();
  changeSearchVisbility(true);

  return task;
};

const changeInputVisbility = (isAddToUpdate) => {
  if (isAddToUpdate) {
    inputText.classList.add("hidden");
    addButton.classList.add("hidden");

    updateButton.classList.remove("hidden");
    updateInput.classList.remove("hidden");
  } else {
    updateButton.classList.add("hidden");
    updateInput.classList.add("hidden");

    inputText.classList.remove("hidden");
    addButton.classList.remove("hidden");
  }
};

const changeSearchVisbility = (isdefault) => {
  if (!isdefault) {
    titleArea.classList.add("hidden");
    searchOpenButton.classList.add("hidden");

    searchInput.classList.remove("hidden");
    searchButton.classList.remove("hidden");
  } else {
    titleArea.classList.remove("hidden");
    searchOpenButton.classList.remove("hidden");

    searchInput.classList.add("hidden");
    searchButton.classList.add("hidden");
  }
};

const handleSearchButton = () => {
  searchTask(searchInput.value);
};

searchButton.addEventListener("click", () => handleSearchButton());
searchOpenButton.addEventListener("click", () => changeSearchVisbility(false));
addButton.addEventListener("click", () => addNewTask(inputText.value));
refreshTasksList();
