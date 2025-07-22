function saveTask()
{ 
    // get the values
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    console.log(title, desc, color, date, status, budget);
    //build an object
    let data = new Task(title, desc, color,date ,status, budget );
    console.log(data);
    
    // display the info
    //displayTask(data);

    // save to server
    console.log("hello im the saveButton");
    $.ajax({
        type: "post",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response)
        {console.log(response);},
        error: function (error)
        {console.log(error);}
    })
}

function displayTask(task){
    let render = `<div class = "task" style="border-color:${task.color}" >
    <div class="info">
    <h4> ${task.title}</h4>
    <p> ${task.desc}<p>
    </div>
    <label class="status">${task.status} </label>
    <div class="date-budget">
    <label> ${task.date}</label>
    <label> ${task.budget}</label>
    </div>
    </div>`
    ;
    // use the content of the object to render the list section
    $(".list").append(render);

}

function loadTask(){
    // get the content of the http://fsdiapi.azurewebsites.net/api/tasks
    //console.log the response from the server
    $.ajax(
        {
            type: "get",
            url: "http://fsdiapi.azurewebsites.net/api/tasks",
            success: function (response){
                let dataJSON = JSON.parse(response);
 // in the list section, render only those messages created by you
                for(let i=0;i<dataJSON.length;i++)
                {
                    let currentValue = dataJSON[i];
                    if(currentValue.name == "Adrian59")
                    {
                        displayTask(currentValue);
                    }

                }

                console.log(response);
                console.log(dataJSON);
            },
            error: function (error){
                console.log(error);
            }
        }
    )
    
}
// render on the list section, only those messages created by you

function testRequest()
{
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net",
        success: function(response)
        {
            console.log(response);
        },
        error: function(error)
        {
            console.log(error);
        }
    });
}

function init()
{
    console.log("hello im the init");
    $("#btnSave").click(saveTask);
    loadTask();
}

window.onload = init;// it waits until the css and the html resolved to run the logic