angular.module('NotecardApp')
  .controller('NotecardsController', NotecardsController);

NotecardsController.$inject = ["$http", "$scope", "Notecard"];
function NotecardsController($http, $scope, Notecard){
  var self = this;

  function getNotecards(){
    var notecards = Notecard.query(function () {
      self.notecards = notecards;
      console.log(notecards);
    });

    // $http
    //   .get('http://localhost:3000/criminals')
    //   .then(function(response){
    //     self.criminals = response.data.criminals;
    // });
  }
  getNotecards();


  $scope.submit = function () {
    var data = self.newNotecard;
    console.log(data);
    Notecard.save(data, function () {
      self.newNotecard = {};
      getNotecards();
    });


    // $http
    //   .post('http://localhost:3000/criminals', data)
    //   .then(function(response){
    //     self.newCriminal = {};
    //     self.newCriminal.status = "Unknown";
    //     getCriminals();
    //   });
  };

  $scope.delete = function (id) {
    console.log(id);

    Notecard.remove({ id: id }, function() {
      getNotecards();
    });


    // $http
    //   .delete('http://localhost:3000/criminals/'+id)
    //   .then(function(response){
    //     getCriminals();
    //   });
  };

}


app.factory("Notecard", function($resource) {
  return $resource("http://localhost:3000/flashcards/:id");
  // return $resource("https://shielded-forest-41789.herokuapp.com/api/flashcards/:id");
});
