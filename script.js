var app = angular.module("lingoApp", []);
app.controller("lingoCtrl", function($scope, $http) {

    // ------- SET VARIABLES TO MOVE BETWEEN PAGES
    $scope.page = 0;
    if ($scope.page == 0) $scope.title = "Dashboard";
    else if ($scope.page == 1) $scope.title = "Dictionary";
    else{
        $scope.title = "Settings";
    }


// ------ CONNECTING MYSQL WITH ANGUALR ----
  var request = $http({
      method: 'GET',
      url: '/data'
  });
  request.then(function successCallback(response) {
        $scope.dictionary = response.data;
        console.log($scope.dictonary);
    }, function errorCallback(err) {
        console.log("Error getting data");
        console.log(err);
    });


    //------ STORE VOCABULARIES------
    $scope.vocabulary = [];
    $scope.improvement = [];


    //------ ADDING WORDS TO YOUR VOCABULARY ------
    $scope.fill = function(word){
        $scope.wording = word.w;
        $scope.vocabulary.push(word);
        console.log($scope.vocabulary);
        $scope.wording = "";
    };


    $scope.improvement = [
        {w: "programming", t: "programación" },
        {w: "artificial intelligence", t: "inteligencia artificial"},
        {w: "cryptocurrency", t: "criptomoneda"},
        {w: "hello", t: "Hola" },
        {w: "cake", t: "pastel"},
        {w: "school", t: "colegio"}
    ];

    $scope.improv2 = [
        
    ];


    //-------------- FUNCTIONS TO CHECK WORD --------
    $scope.check = function(v){
        console.log(v);
        scope.message = "True";
    }



});










//------------- ANGULARJS CHART STUFF -----------
var lineCanvas = document.getElementById('myChart');
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Words Learn Per Month",
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
	showLines: true,
    scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Words Learn Per Month'
      }
    }]
  }
};
var myLineChart = Chart.Line(lineCanvas,{
	data:data,
    options:option
});


/* ----------------- PIE CHART ----------------- */
var pieCanvas = document.getElementById('pieChart');
var pieData = {
    labels: ["Spanish", "German", "Vietnamese"],
        datasets: [{
          backgroundColor: [
            "#85C1E9",
            "#2980B9",
            "#34495e"
          ],
          data: [12, 19, 3]
        }]
};
var myDoughnutChart = new Chart(pieCanvas, {
    type: 'doughnut',
    data: pieData
});


/* ---------- LINE CHART ---------- */
var barCanvas = document.getElementById('barChart');
var barData = {
    labels: ["Mon", "Tue", "Wed", "Thu"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(127, 179, 213, 0.6)",
            borderColor: "rgba(36, 113, 163,1)",
            borderWidth: 2,
            hoverBackgroundColor: "#1A5276",
            hoverBorderColor: "#1A5276 ",
            data: [65, 59, 20, 99],
        }
    ]
};

var barOption = {
	scales: {
  	yAxes:[{
    		stacked:true,
        gridLines: {
        	display:true,
          color:"rgba(0,0,0,0.1)"
        }
    }],
    xAxes:[{
    		gridLines: {
        	display:false
        }
    }]
  }
};
var mybarChart = new Chart(barCanvas, {
    type: 'bar',
    data: barData,
    options: barOption
});

/*------------- DROPDOWN BUTTON ON SETTINGS PAGE-----------*/
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
}

function displayOp() {
    document.getElementById("myDropdown").classList.toggle("show");
}