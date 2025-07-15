function hello()
{
    console.log("hello there!");
}

function init()
{
    console.log("hello im the init");
    hello();
}

window.onload = hello;// it waits until the css and the html resolved to run the logic