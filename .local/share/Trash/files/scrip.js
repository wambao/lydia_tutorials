function check_getTriangleDimensions(){
var sideA = parseFloat(prompt("Enter Parameters for side A"));
var sideB = parseFloat(prompt("Enter Parameters for side B"));
var sideC = parseFloat(prompt("Enter Parameters for side C"));


if(sideA===sideB && sideB===sideC && sideB===sideC){
alert("Triangle is Equilateral ");
}
else if(sideA===sideB || sideA===sideC || sideC===sideB){
alert("Triangle is Isosceles");
}
else if((sideA+sideB)<= sideC || (sideA+sideC)<=sideB || (sideB+sideC)<=sideA) {
alert("Values do not match a Triangle");
}
else{
alert("Triangle is Scalene");
}



