
function point_1(x, y, radius)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fill();
}

function point_2(x, y, radius)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fill();
}
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

point_1(20,40,6);
point_2(40,60,6);
