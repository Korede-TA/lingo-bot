var app = angular.module("lingoApp", []);
app.controller("lingoCtrl", function($scope) {

    // ------- SET VARIABLES TO MOVE BETWEEN PAGES
    $scope.page = 1;
    if ($scope.page == 0) $scope.title = "Dashboard";
    else if ($scope.page == 1) $scope.title = "Dictionary";
    else{
        $scope.title = "Settings";
    }


    //------ STORE VOCABULARIES------
    $scope.vocabulary = [];

    $scope.fill = function(word){
        $scope.wording = word.w;
        $scope.vocabulary.push(word);
        console.log($scope.vocabulary);
    };



    //----- HARD CODE VOCABULARY LIST -----
    $scope.dictionary = [
        {w: "programming", t: "programación" },
        {w: "artificial intelligence", t: "inteligencia artificial"},
        {w: "cryptocurrency", t: "criptomoneda"},
        {w: "hello", t: "Hola" },
        {w: "cake", t: "pastel"},
        {w: "school", t: "colegio"}
    ];




});

//------------- ANGULARJS CHART STUFF -----------
var canvas = document.getElementById('myChart');
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Your Skill Progress",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(84, 153, 199,0.4)",
            borderColor: "rgba(36, 113, 163 ,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: [65, 59, 80, 0, 56, 55, 40],
        }
    ]
};

var option = {
	showLines: true
};
var myLineChart = Chart.Line(canvas,{
	data:data,
  options:option
});
