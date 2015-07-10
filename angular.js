/**
 * Created by taimoor on 6/4/2015.
 */
    //Radio Question Constructor.
    function radioQuestions(message, option1, option2, option3, option4, answer){
        this.message = message;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.answer = answer;
    }

    //CheckBox Questions Constructor.
    function checkQuestions(message, option1, option2, option3, option4, option5, answer){
        this.message = message;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.option5 = option5;
        this.answer = answer;
    }
    //True false questions.
    function trueFalse(message, option1, option2, answer){
        this.message = message;
        this.option1 = option1;
        this.option2 = option2;
        this.answer = answer;
    }

    var question1 = new radioQuestions("Capital city of Pakistan is ?","Karachi", "Lahore", "Islamabad", "Peshawar", "Islamabad");
    var question2 = new radioQuestions("Pakistan is the ____ largest populated Country ?", 9, 6, 3, 5, 6);
    /*var question5 = new radioQuestions("Natioanl Animal of Pakistan ?","Lion", "Leopard", "Markhooor", "Goat", "Markhooor");
var question8 = new radioQuestions("Next Prime Minister of Pakistan ?","Imran Khan", "Imran Khan", "Imran Khan", "Imran Khan", "Imran Khan");*/
    /*var question3 = new radioQuestions("Most Populated country in Pakistan ?","Karachi", "Faisalabad", "Lahore", "Peshawar", "Karachi");
    var question4 = new radioQuestions("National Sports of Pakistan ?","Cricket", "Football", "Hockey", "Snooker", "Hockey");

    var question6 = new radioQuestions("Natioanl Dress of Pakistan ?","Shalwar Kameez", "Pent Shirt", "Lungi", "Coat Pent", "Shalwar Kameez");
    var question7 = new radioQuestions("Minar-e-Pakistan is situated in ?","Lahore", "Karachi", "Larkana", "Islamabad", "Lahore");
    */

    var question3 = new checkQuestions("Which one of these are Provincial Capitals ?","Lahore", "Hyderabad", "Quetta", "Peshawar", "Multan", [1,3,4]);
    var question4 = new trueFalse("Karachi is located at the China Border", "true", "false", "false");

    var arr = [question1, question2, question3, question4];
    var i = 0;
    var counter = 0;



// Angular Working

    //Module wokring
        var app = angular.module('radioDemo1', ['ngMaterial', 'firebase']);

    //Controller
        app.controller('AppCtrl', function($scope, $firebaseObject) {

        var ref = new Firebase("https://glowing-fire-2966.firebaseio.com//data");

        // download the data into a local object
        var syncObject = $firebaseObject(ref);

    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
        $scope.selected = [];
        $scope.toggle = function (checked, list) {
            var idx = list.indexOf(checked);
            if (idx > -1) list.splice(idx, 1);
            else list.push(checked);
            $scope.data = list;
        };
        syncObject.$bindTo($scope, "firebaseData");

    /*DOM Variables*/
        $scope.myCheck = true;
        $scope.myTrueFalse = true;
        $scope.myRadio = false;
        $scope.myButton = false;
        $scope.score = '';
        $scope.nextValue = 'Next';
        $scope.data = 'NULL';
        $scope.checkBox = false;
        $scope.questionNo = 1;
        $scope.showQuestion = false;


        $scope.ques = {
            messageName: arr[i].message
        };

        $scope.radioData = [
            { label: arr[i].option1, value: arr[i].option1 },
            { label: arr[i].option2, value: arr[i].option2 },
            { label: arr[i].option3, value: arr[i].option3 },
            { label: arr[i].option4, value: arr[i].option4 }
        ];


        $scope.checkSubmit = function(val){
            $scope.data = val;
        }

        //On Next/Submit/Try again button.
        $scope.nextItem = function() {
            if($scope.data !== 'NULL') {

        //To check if the answer is correct
                if ($scope.data === arr[i].answer && (i <= 1 || i > 1)) {
                    counter++;
                }
                else if(i === 2){
                    var k = 0, hit = 0, miss = 0, l ;
                    for(l = 0; l < 3; l++){
                        for(k = 0; k < $scope.data.length; k++){
                            if(arr[i].answer[l]  === $scope.data[k]){
                                hit++;
                                break;
                            }
                            else {
                                miss++;
                            }
                        }
                    }
                    counter += hit/ 3;
                }
        //Changes the Next button to Submit
                if(i === 2){
                    $scope.nextValue = 'Submit';
                }
        //Checking the position of Question.
                if ($scope.nextValue === 'Try Again'){
                    $scope.score = '';
                    $scope.nextValue = 'Next';
                    counter = 0;
                    i = 0;
                    $scope.myRadio = false;
                    $scope.myCheck = true;
                    $scope.ques = {
                        messageName: arr[i].message
                    };
                    $scope.radioData = [
                        {label: arr[i].option1, value: arr[i].option1},
                        {label: arr[i].option2, value: arr[i].option2},
                        {label: arr[i].option3, value: arr[i].option3},
                        {label: arr[i].option4, value: arr[i].option4}
                    ];
                    $scope.data = 'NULL';
                }
        //Display the Answer on submission.
                else if (i === 3) {
                    $scope.showQuestion = true;
                    $scope.myRadio = true;
                    $scope.myCheck = true;
                    $scope.myTrueFalse = true;

                    counter = (counter/4) * 100;
                    if(counter === 100) {
                        $scope.myButton = true;
                    }
                    counter = counter.toFixed(2);
                    if(counter === 100.00) {
                        $scope.score = 'Your Score ' + counter + ' % You are Awesome';
                    }
                    else if(counter >= 60){
                        $scope.score = 'Your Score ' + counter + ' % You are Pass';
                    }
                    else {
                        $scope.score = 'Your Score ' + counter + ' % you are fail';
                    }
                    $scope.ques = {
                        messageName: 'Final Score'
                    };

                    $scope.nextValue = 'Try Again';
                    i = 0;
                    $scope.selected = [];
                }
        //Changing the Question and options.
                else {
                    i++;
                    $scope.questionNo = i+1;
                    $scope.ques = {
                        messageName: arr[i].message
                    };
                    if(i <= 1){
                        $scope.radioData = [
                            {label: arr[i].option1, value: arr[i].option1},
                            {label: arr[i].option2, value: arr[i].option2},
                            {label: arr[i].option3, value: arr[i].option3},
                            {label: arr[i].option4, value: arr[i].option4}
                        ];
                    }
                    else if(i === 2){

                        $scope.myRadio = true;
                        $scope.myTrueFalse = true;
                        $scope.myCheck = false;
                        $scope.radioData = [
                            {label: arr[i].option1, value: 1},
                            {label: arr[i].option2, value: 2},
                            {label: arr[i].option3, value: 3},
                            {label: arr[i].option4, value: 4},
                            {label: arr[i].option5, value: 5}
                        ];
                    }
                    else if(i === 3){
                        $scope.myCheck = true;
                        $scope.myRadio = true;
                        $scope.myTrueFalse = false;
                        $scope.radioData = [
                            {label: arr[i].option1, value: arr[i].option1},
                            {label: arr[i].option2, value: arr[i].option2},
                        ];
                    }
                    $scope.data = 'NULL';
                }
            }
        };
    });