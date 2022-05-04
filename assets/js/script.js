var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

var taskFormHandler = function (event) {
	event.preventDefault();
	var taskNameInput = document.querySelector("input[name='task-name']").value;
	var taskTypeInput = document.querySelector("select[name='task-type']").value;

	if (!taskNameInput || !taskTypeInput) {
		alert("Please enter both a name and a type for your task.");
		return false;
	}

	var taskDataObj = {
		name: taskNameInput,
		type: taskTypeInput,
	};

	createTaskEl(taskDataObj);
	formEl.reset();
};

var createTaskEl = function (taskDataObj) {
	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";

	listItemEl.setAttribute("data-task-id", taskIdCounter);

	var taskInfoEl = document.createElement("div");
	taskInfoEl.className = "task-info";

	taskInfoEl.innerHTML =
		"<h3 class='task-name'>" +
		taskDataObj.name +
		"</h3><span class='task-type'>" +
		taskDataObj.type +
		"</span>";
	listItemEl.appendChild(taskInfoEl);
	var taskActionsEl = createTaskActions(taskIdCounter);
	console.log(taskActionsEl);
	listItemEl.appendChild(taskActionsEl)

	tasksToDoEl.appendChild(listItemEl);

	taskIdCounter++;
};

var createTaskActions = function (taskId) {
	var actionContainerEl = document.createElement("div");
	actionContainerEl.className = "task-actions";

	var editButtonEl = document.createElement("button");
	editButtonEl.textContent = "Edit";
	editButtonEl.className = "btn edit-btn";
	editButtonEl.setAttribute("data-task-id", taskId);

	actionContainerEl.appendChild(editButtonEl);

	var deleteButtonEl = document.createElement("button");
	deleteButtonEl.textContent = "Delete";
	deleteButtonEl.className = "btn delete-btn";
	deleteButtonEl.setAttribute("data-task-id", taskId);

	actionContainerEl.appendChild(deleteButtonEl);

	var statusSelectEl = document.createElement("select");
	statusSelectEl.className = "select-status";
	statusSelectEl.setAttribute("name", "status-change");
	statusSelectEl.setAttribute("data-task-id", taskId);

	var statusChoices = ["To Do", "In Progress", "Completed"];

	for (i = 0; i < statusChoices.length; i++) {
		var statusOptionEl = document.createElement("option");
		statusOptionEl.textContent = statusChoices[i];
		statusOptionEl.setAttribute("value", statusChoices[i]);

		statusSelectEl.appendChild(statusOptionEl);
	}

	actionContainerEl.appendChild(statusSelectEl);

	return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function (event) {
	console.log(event.target);

	if (event.target.matches(".delete-btn")) {
		var taskId = event.target.getAttribute("data-task-id");
		deleteTask(taskId);
	}
};

var deleteTask = function(taskId) {
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")
	taskSelected.remove();
}

pageContentEl.addEventListener("click", taskButtonHandler);
