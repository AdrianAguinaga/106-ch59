function saveTask()
{
    console.log("hello im the saveButton");
}

function init()
{
    console.log("hello im the init");
    $("#btnSave").click(saveTask);
}

window.onload = init;// it waits until the css and the html resolved to run the logic