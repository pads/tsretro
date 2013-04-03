function MainController($scope, tiddlerService, searchService, statusService) {

    var bagName;

    $scope.questions = [
        { name: "What did we do well?", tag: "whatDidWeDoWell" },
        { name: "What did we learn?", tag: "whatDidWeLearn" },
        { name: "What should we do differently next time?", tag: "whatShouldWeDoDifferentlyNextTime" },
        { name: "What still puzzles us?", tag: "whatStillPuzzlesUs" }
    ];

    $scope.savedNotes = {
        "whatDidWeDoWell": {},
        "whatDidWeLearn": {},
        "whatShouldWeDoDifferentlyNextTime": {},
        "whatStillPuzzlesUs": {}
    };

    $scope.question = $scope.questions[0];
    
    $scope.display = "hidden";

    function resetForm() {

        $scope.title = null;
        $scope.notes = null;
        $scope.tags = [];
    }

    function getStatus(callback) {

        statusService.getStatus(function (status) {
            bagName =  status.space.recipe;
            callback();
        });
    }

    function populateApp() {

        searchService.search("tag:_retrospective", function(searchResults) {

            for(var i = 0; i < searchResults.length; i++) {
                var currentTiddler = searchResults[i];
                var tags = currentTiddler.tags;

                for(var t = 0; t < tags.length; t++) {
                    if(tags[t] in $scope.savedNotes) {
                        $scope.savedNotes[tags[t]][currentTiddler.title] = currentTiddler;
                    }
                }
            }
        });
    }

    $scope.toggleForm = function() {

        if($scope.display === "hidden") {
            $scope.display = "block";
        } else {
            $scope.display = "hidden";
            resetForm();
        }
    };

    $scope.saveForm = function() {

        var tags = [$scope.question.tag, $scope.project, "_retrospective"];
        if($scope.tags && $scope.tags.length > 0) {
            tags = tags.concat($scope.tags.split(" "));
        }

        var tiddler = { title: $scope.title, text: $scope.notes, tags: tags };

        tiddlerService.putTiddler(bagName, tiddler, function(data) {

            $scope.savedNotes[$scope.question.tag][data.title] = data;
            resetForm();
        });
    };

    $scope.deleteNote = function(note) {

        tiddlerService.deleteTiddler(bagName, note.title, function() {

           delete $scope.savedNotes[note.tags[0]][note.title];
        });
    };

    getStatus(populateApp);
}