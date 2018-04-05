// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sthlmbnb', ['ionic'])



.config(function($ionicConfigProvider){
  $ionicConfigProvider.platform.android.tabs.position("bottom");
})


.controller("RoomsCtrl", function($scope, $http, $stateParams, $ionicPopover){
  $http.get("http://localhost:8888/sthlmbnb/index.php")
       .then(function(response){
         $scope.rooms=response.data
         $scope.whichRoom = $stateParams.id;
  })



$scope.submit = function(){ 
  var url = "http://localhost:8888/sthlmbnb/insert.php";
  $http.post(url, $scope.data)
       .then(function(responsePost){
         $scope.responsePost = responsePost;
       });
};

$scope.nights = function(datein, dateout){
  var datein = new Date(datein);
  var dateout = new Date(dateout);
  var time = Math.abs(dateout.getTime() - datein.getTime());

  $scope.nightsDiff = Math.ceil(time / (1000 * 3600 * 24));

  if($scope.nightsDiff == 0){
    $scope.nightsDiff = 1;

  }
  return $scope.nightsDiff;
  
}

$scope.totalPrice = function(price, nights){
  var price;
  var nights;
  $scope.priceToReturn = price * nights;

  return $scope.priceToReturn;
}

$scope.dateToday = new Date();

$scope.data = {
  indate: $scope.dateToday,
  outdate: $scope.dateToday,
  adults: 1,
  kids: 0,
  roomid: $stateParams.id,
  orderid: ''
};


  var template = '';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });

  $ionicPopover.fromTemplateUrl('popo.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hidden popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });


})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state("tabs",{
    url: "/tab",
    templateUrl: "templates/tabs.html",
    abstract: true
  })

  .state("tabs.home", {
    url: "/home",
    views: {
      "home-tab": {
        templateUrl: "templates/home.html"
      }
    }
  })
  .state("tabs.contact", {
    url:"/contact",
    views: {
      'contact-tab':{
        templateUrl: "templates/contact.html",
      }
    }
  })

  .state("tabs.rooms" , {
    url : "/rooms" ,
    views : {
      "rooms-tab" : {
        controller : "RoomsCtrl",
        templateUrl: "templates/rooms.html"
      }
    }
  })
  .state("tabs.room", {
    url : "/rooms/:id",
    views :{
      "rooms-tab" : {
        templateUrl : "templates/oneroom.html" ,
        controller : "RoomsCtrl"
      }
    }
  })


  $urlRouterProvider.otherwise("/tab/home");

})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})