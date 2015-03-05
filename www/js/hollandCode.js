app.controller('holland',['$scope', '$localstorage', 'asmntResultService', function($scope, $localstorage, asmntResultService){

  var personalities = {
            'realistic'   :0,  'investigative':0, 
            'artistic'    :0,  'social'       :0, 
            'enterprising':0,  'conventional' :0 
    };

$scope.pairs = shuffle(combinations(Object.keys(personalities),2));
$scope.index =  $scope.isComplete = 0;

$scope.nextPair = function(personality){
  $scope.index++; personalities[personality]++
  console.log(personalities);
  if($scope.index == $scope.pairs.length){ //if user is finished with asmnt...
    $scope.isComplete = true;
    $scope.results = {
      labels: Object.keys(personalities),
      datasets: [
        {
          data: Object.keys(personalities).map(function(key){return personalities[key] / 5}),
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)"
        }
      ]
    }

    //code to send career personality asmnt results to career binder asmnt results
    d = new Date();
    curday = d.getDate();
    curmonth = d.getMonth();
    curyear = d.getFullYear();
    var datestring = curmonth + "/" + curday + "/" + curyear;

    asmntResultService.addAsmntResult(personalities, 'Career Personality Results', datestring);
    $localstorage.setObject( 'assessments', asmntResultService.getAsmntResult() );

  } 
};

}])

.directive('hollandCompare', function(){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl:'templates/holland/compare.html',
    
  }
})

.directive('hollandResults', function(){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl:'templates/holland/results.html',
    link: function(scope, element, attrs){
      scope.$watch(attrs.complete, function(value){
        if(value){
          console.log(scope.results);
          var ctx = document.getElementById("radar-chart").getContext("2d")
          var myRadarChart = new Chart(ctx).Radar(scope.results);
        }
      })
    }
  }
})

/**
 * Helper for creating combonations of an array
 * @param  {Object} arr set to operate on
 * @param  {integer} k   size of subsets
 * @return {Array}     Array of size k arrays
 */
function combinations(arr, k){
  var i, subI, ret = [], sub, next;

  for(i = 0; i < arr.length; i++){
      if(k === 1){
          ret.push( [ arr[i] ] );
      }else{
          sub = combinations(arr.slice(i+1, arr.length), k-1);
          for(subI = 0; subI < sub.length; subI++ ){
              next = sub[subI];
              next.unshift(arr[i]);
              ret.push( next );
          }
      }
  }
  return ret;
}

// Fisher - Yates shuffle
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}