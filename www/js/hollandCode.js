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
  //if user is finished with asmnt...
  if($scope.index == $scope.pairs.length){ 
    $scope.isComplete = true;
    $scope.results = {
      labels: Object.keys(personalities),
      datasets: [
        {
          data: Object.keys(personalities).map(function(key){return personalities[key] / 5}),
          fillColor: "rgba(15, 62, 48,0.2)",
          strokeColor: "rgba(15, 62, 48,1)",
          pointColor: "rgba(15, 62, 48,1)",
          pointStrokeColor: "#111",
          pointHighlightFill: "#111",
          pointHighlightStroke: "rgba(15, 62, 48,1)"
        }
      ]
    }
    String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
 }
    // Creates the outside links for top personality
    $scope.ordPersonalities = _.pairs(personalities).sort(function(a,b){ return b[1] - a[1]});

    document.getElementById('best-personality').setAttribute('onClick',"window.open('http://www.onetonline.org/explore/interests/" + ordPersonalities[0][0].capitalizeFirstLetter() + "')")


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

$scope.oNet = function(){

  window.open('http://www.onetonline.org/explore/interests/' + $scope.ordPersonalities[0][0].capitalizeFirstLetter(),'_system');
}

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
          var myRadarChart = new Chart(ctx).Radar(scope.results,{ 
            pointLabelFontSize : 18,
            //String - Point label font colour  
            pointLabelFontColor : "black",
            scaleLineWidth:1,
            //String - Colour of the scale line 
            scaleLineColor : "#111",
            //Number - Scale label font size in pixels  
            scaleFontSize : 7,
            //Boolean - Whether to animate the chart
            animation : true,

            //Number - Number of animation steps
            animationSteps : 60,
            //String - Animation easing effect
            animationEasing : "easeOutQuart",
            });
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