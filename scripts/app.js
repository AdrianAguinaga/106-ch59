// This URL should point to YOUR deployed Azure Function App
const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask() {
  const title    = $("#txtTitle").val();
  const desc     = $("#txtDescription").val();
  const color    = $("#selColor").val();
  const date     = $("#selDate").val();
  const status   = $("#selStatus").val();
  const budget   = $("#numBudget").val();

  const data = new Task(title, desc, color, date, status, budget);
console.log("DATA before POST:", data);

$.ajax({
  type: "POST",
  url: API,
  data: JSON.stringify(data),
  contentType: "application/json",
  success: function(created){
    console.log("CREATED:", created);
    displayTask(created);
    // limpiar formulario
  },
  error: function(err){
    console.error("POST error:", err.responseText || err);
    alert("Task could not be saved.");
  }
});

}

function displayTask(task){
  const render = `
    <div class="task" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
      </div>
    </div>`;
  $(".list").append(render);
}

function loadTasks(){
 $.ajax({
    type: "GET",
    url: API, // Use the API constant to load tasks
    dataType: "json",
    success: function (tasks){
      $(".list").empty();
      tasks.forEach(displayTask); // Show all tasks from your API
    },
    error: function (err){
      console.error("GET error:", err);
    }
  });
}

function init(){
  console.log("App initialized");
  $("#btnSave").click(saveTask);
  loadTasks();
}

window.onload = init;