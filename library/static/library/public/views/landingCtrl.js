(function(){
	angular.module('takeWing').controller('landingCtrl', function($scope, $timeout, $q, $log, $mdDialog, $mdToast, $mdMedia){
		
		var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    // list of `state` value/display objects
    self.getMatches   = getMatches;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;
    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
	function searchCatalog (query){
		webServices.getBooks(query).then(function(response){ 
            $scope.books = response; //Assign data received to $scope.data
        });
	}
	function getMatches(text){
		deferred = $q.defer();
		webServices.getAutocomplete(text).then(function(response){ 
            deffered.resolve(response); 
        });
		return deferred.promise;
		
	}
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
	  searchCatalog(item);
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
    
    $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Where would you like to send your book?')
          .textContent('Please click outside of the box to close.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Google')
          .clickOutsideToClose(true)
          .cancel('Download');
    $mdDialog.show(confirm).then(function() {
      $scope.googleToast();
    }, function() {
      $scope.downloadToast();
    });
  };
    
    $scope.googleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Your book was sent to Google Books!')
        .position('bottom right')
        .hideDelay(3000)
    );
  };
    
     $scope.downloadToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Your book download has started!')
        .position('bottom right')
        .hideDelay(3000)
    );
  };
  
  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/authorDialogTemp.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  
  function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
    
    $scope.books = [
	{  
         "coverurl":"/media/winged_covers/Brandon%20Sanderson%2C%20Mary%20Robinette%20Kowal%2C%20Dan%20Wells%2C%20Howard%20Tayler/Shadows%20Beneath%3A%20The%20Writing%20Excuses%20Anthology/Images/cover.jpg",
         "publisher":null,
         "isbn":null,
         "title":"Shadows Beneath: The Writing Excuses Anthology",
         "series":[  

         ],
         "authors":[  
            {  
               "sort":"Tayler, Brandon Sanderson, Mary Robinette Kowal, Dan Wells, Howard",
               "id":1548,
               "name":"Brandon Sanderson, Mary Robinette Kowal, Dan Wells, Howard Tayler"
            }
         ],
         "filetypes":[  
            {  
               "description":"",
               "id":1,
               "name":"epub"
            },
            {  
               "description":"",
               "id":2,
               "name":"mobi"
            }
         ],
         "id":3670,
         "tags":[  

         ],
         "slug":""
      },
      {  
         "coverurl":"/media/winged_covers/Brandon%20Sanderson/Alcatraz/Images/msr_cvi_r1.jpg",
         "publisher":null,
         "isbn":null,
         "title":"Alcatraz",
          "series":[  
           {  
              "authors":[  
                 2481
              ],
              "position":1,
              "summary":"",
              "id":909,
              "name":"Mistborn"
           } ,
           {  
              "authors":[  
                 2481
              ],
              "position":2,
              "summary":"",
              "id":910,
              "name":"Cosmere"
           }
        ],
         "authors":[  
            {  
               "sort":"Sanderson, Brandon",
               "id":2481,
               "name":"Brandon Sanderson"
            }
         ],
         "filetypes":[  
            {  
               "description":"",
               "id":1,
               "name":"epub"
            },
             {  
               "description":"",
               "id":1,
               "name":"epub"
            },
             {  
               "description":"",
               "id":1,
               "name":"epub"
            },
             {  
               "description":"",
               "id":1,
               "name":"epub"
            }
         ],
         "id":5720,
         "tags":[  

         ],
         "slug":""
      },
      {  
         "coverurl":"/media/winged_covers/Brandon%20Sanderson/Alcatraz%20versus%20the%20Evil%20Librarians/cover.jpeg",
         "publisher":null,
         "isbn":null,
         "title":"Alcatraz versus the Evil Librarians",
         "series":[  
            {  
               "authors":[  
                  2481
               ],
               "summary":"",
               "id":909,
               "name":"Alcatraz"
            }
         ],
         "authors":[  
            {  
               "sort":"Sanderson, Brandon",
               "id":2481,
               "name":"Brandon Sanderson"
            }
         ],
         "filetypes":[  
            {  
               "description":"",
               "id":1,
               "name":"epub"
            },
            {  
               "description":"",
               "id":2,
               "name":"mobi"
            }
         ],
         "id":5721,
         "tags":[  

         ],
         "slug":""
      },
      {  
         "coverurl":"/media/winged_covers/Brandon%20Sanderson/Alcatraz%20versus%20the%20Scrivener's%20Bones/cover.jpeg",
         "publisher":null,
         "isbn":null,
         "title":"Alcatraz versus the Scrivener's Bones",
         "series":[  
            {  
               "authors":[  
                  2481
               ],
               "summary":"",
               "id":909,
               "name":"Alcatraz"
            }
         ],
         "authors":[  
            {  
               "sort":"Sanderson, Brandon",
               "id":2481,
               "name":"Brandon Sanderson"
            }
         ],
         "filetypes":[  
            {  
               "description":"",
               "id":1,
               "name":"epub"
            },
            {  
               "description":"",
               "id":2,
               "name":"mobi"
            }
         ],
         "id":5722,
         "tags":[  

         ],
         "slug":""
      },
      {  
         "coverurl":"/media/winged_covers/Brandon%20Sanderson/Alcatraz%20versus%20the%20Knights%20of%20Crystallia/cover.jpeg",
         "publisher":null,
         "isbn":null,
         "title":"Alcatraz versus the Knights of Crystallia",
         "series":[  
            {  
               "authors":[  
                  2481
               ],
               "summary":"",
               "id":909,
               "name":"Alcatraz"
            }
         ],
         "authors":[  
            {  
               "sort":"Sanderson, Brandon",
               "id":2481,
               "name":"Brandon Sanderson"
            }
         ],
         "filetypes":[  
            {  
               "description":"",
               "id":1,
               "name":"epub"
            },
            {  
               "description":"",
               "id":2,
               "name":"mobi"
            }
         ],
         "id":5723,
         "tags":[  

         ],
         "slug":""
      }
      ]
    
    
    
  })
})();