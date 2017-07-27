
// properly angular ka swagat karna
// foodieApp is the name of the app here
//ngRoute is not a directive it is a module
var foodieApp = angular.module('foodieApp',['ngRoute']);
//console.log(foodieApp);

//configure kar rahe hain
foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
	.when('/fav', {
		templateUrl: 'pages/fav.html',
		controller: 'favController'
	})

})

// iss function ke andar aayega jo bhi kaam hoga controller ka

foodieApp.controller('restaurantController',function($scope,$routeParams,$http,$location) {
	//Empty
	$scope.ingredients = [];

	$scope.restaurantId = $routeParams.id;
//console.log($routeParams.id);

var restaurants = [{
					name: 'Farzi Cafe',
					address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
					location: 'Connaught Place',
					category: 'Casual Dining, Bar',
					vote: '4.2',
					cuisines: 'Modern Indian',
					cost: '2200',
					id: 1,
					hours: '12 Noon to 1 AM (Mon-Sun)',
					image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
				},{
            name: 'CCD',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Modern Indian',
            cost: '400',
						bestDish: {
									name: 'Corn Pizza',
									image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
								},
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
          },
          {
                name: 'Sagar Ratna',
                address: 'baddi',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.5',
                cuisines: 'Modern Indian',
                cost: '1000000',
								id: 3,
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
              },
              {
                    name: 'AFC',
                    address: 'BUEST',
                    location: 'CHANDIGARH',
                    category: 'Casual Dining, Bar',
                    vote: '5.0',
                    cuisines: 'Modern Indian',
                    cost: '50',
										id: 4,
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
									}]


				$scope.restaurant = restaurants[$routeParams.id - 1];



			$scope.getIngredients = function(url) {
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
					$http({
						'method': 'POST',
						'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
						'headers': {
							'Authorization': 'Key a83cf33d81ca4f71ae7f18345e7b8ab0',
							'Content-Type': 'application/json'
						},
						'data': data,

					}).then(function (response) {
								var ingredients = response.data.outputs[0].data.concepts;
					  			var list = '';
									//  var cboxArray = [];
									for (var i =0;i < ingredients.length;i++) {
										$scope.ingredients.push(ingredients[i].name);
									}



						//console.log(list);
					}, function (xhr) {
												   console.log(xhr);
												  });
											}
											$scope.goToFav = function() {
													$location.url('fav')
													console.log($location.url);
												}

})

foodieApp.controller('favController',function($scope,$location,$http) {

	//index=0;
	$scope.ingredients = [];

//console.log($routeParams.id);

  $scope.restaurants = [{
							name: 'Farzi Cafe',
							address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
							location: 'Connaught Place',
							category: 'Casual Dining, Bar',
							vote: '4.2',
							cuisines: 'Modern Indian',
							cost: '2200',
							id: 1,
							bestDish: {
										name: 'Corn Pizza',
										image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
									},
							hours: '12 Noon to 1 AM (Mon-Sun)',
							image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
						},{
            name: 'CCD',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Modern Indian',
            cost: '400',
						id: 2,
						bestDish: {
									name: 'Corn Pizza',
									image: 'https://static01.nyt.com/images/2016/06/28/dining/28COOKING-FRIEDCHICKENGUIDE13/28COOKING-FRIEDCHICKENGUIDE13-superJumbo.jpg'
								},
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
          },
          {
                name: 'Sagar Ratna',
                address: 'baddi',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.5',
                cuisines: 'Modern Indian',
                cost: '1000000',
								id: 3,
								bestDish: {
											name: 'Corn Pizza',
											image: 'sa.JPG'
										},
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
              },
              {
                    name: 'AFC',
                    address: 'BUEST',
                    location: 'CHANDIGARH',
                    category: 'Casual Dining, Bar',
                    vote: '5.0',
                    cuisines: 'Modern Indian',
                    cost: '50',
										id: 4,
										bestDish: {
													name: 'Corn Pizza',
													image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
												},
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
                    }]

	$scope.getList = function(){
                    	restlist = angular.copy($scope.restaurants);
                    	var imageUrls= [];
                    	for(var i =0 ; i< $scope.restaurants.length; i++){
                    		imageUrls.push(restlist[i].bestDish.image);
    		        	         }

    		        	for(i=0; i<4; i++){

    		        		$scope.getFav(imageUrls[i]);

    		        	}    

                    	//console.log(imageUrls);
                    	//console.log($scope.restaurants.length);
            		        }



						$scope.lists1 = [
						{'vl' : 'vegetable'},
						{'vl' : 'almond'},
						{'vl' : 'corn'},
						{'vl' : 'milk'},
						{'vl' : 'apple'},
					];
					$scope.lst1 = [];
					$scope.change1 = function(check,value){
								if(check){
										$scope.lst1.push(value);
								}else{
										 $scope.lst1.splice($scope.lst1.indexOf(value), 1);
								}
					};

					//
					$scope.lists2 = [
					{'vl' : 'meat'},
					{'vl' : 'egg'},
					{'vl' : 'onion'},
					{'vl' : 'lettuce'},
					{'vl' : 'banana'},
					];
					$scope.lst2 = [];
					$scope.change2 = function(check,value){
							if(check){
									$scope.lst2.push(value);
							}else{
									 $scope.lst2.splice($scope.lst2.indexOf(value), 1);
							}
					};


								$scope.getFav = function(url,$index) {

									console.log($index);

						var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
										$http({
											'method': 'POST',
											'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
											'headers': {
												'Authorization': 'Key a83cf33d81ca4f71ae7f18345e7b8ab0',
												'Content-Type': 'application/json'
											},
											'data': data,

										}).then(function (response) {
													var ingredients = response.data.outputs[0].data.concepts;
										  			var list = '';
														//  var cboxArray = [];
														for (var i =0;i < ingredients.length;i++) {
															$scope.ingredients.push(ingredients[i].name);
														}
														console.log(ingredients);




														for(var i=0;i< $scope.lst1.length;i++){
													if ($scope.ingredients.indexOf($scope.lst1[i]) > -1) {

																if($scope.ingredients.indexOf($scope.lst2[i]) > -1){
																	var info1 = "<h2 class='highlight-info'>You will not like this Food</h2>";
																  console.log("Not Your FAV");
																	$(".rest-wrapper").append(info1);
																		console.log(".rest-wrapper-" +index);
																		$(".rest-wrapper-" +index).css("background-color" ,"#ea0b0b");

																					break;
																}
																var info2 = "<h2 class='highlight-info'>This is the food You May LIKE</h2>";
																console.log("Your FAV");
																$(".rest-wrapper").append(info2);
																	(".rest-wrapper-" +index).css("background-color" ,"#308917");
																break;
															 }

															 else {
																 var info1 = "<h2 class='highlight-info'>You will not like this Food</h2>";
																 console.log("Not Your FAV");
																 $(".rest-wrapper").append(info1);
																	 (".rest-wrapper-" +index).css("background-color" ,"#ea0b0b");

															 }

									}


											//console.log(list);
										}, function (xhr) {
																	   console.log(xhr);
																	  });
																}




})

foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
			$location.url('home')
			console.log($location.url);
		}
})

//controller ka function is used to create a controller
//main controller controller ka naam h
// iss function ke andar aayega jo bhi kaam hoga controller ka
foodieApp.controller('mainController',function($scope) {
  //CONTROLLER KAREGA KYA

  $scope.restaurants = [{
							name: 'Farzi Cafe',
							address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
							location: 'Connaught Place',
							category: 'Casual Dining, Bar',
							vote: '4.2',
							cuisines: 'Modern Indian',
							cost: '2200',
							id: 1,
							hours: '12 Noon to 1 AM (Mon-Sun)',
							image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
						},{
            name: 'CCD',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Modern Indian',
            cost: '400',
						id: 2,
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
          },
          {
                name: 'Sagar Ratna',
                address: 'baddi',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.5',
                cuisines: 'Modern Indian',
                cost: '1000000',
								id: 3,
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
              },
              {
                    name: 'AFC',
                    address: 'BUEST',
                    location: 'CHANDIGARH',
                    category: 'Casual Dining, Bar',
                    vote: '5.0',
                    cuisines: 'Modern Indian',
                    cost: '50',
										id: 4,
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
                    }]
})
