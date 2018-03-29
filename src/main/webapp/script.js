var app = angular.module("myApp", ["ngStorage"]);


app.controller("myCtrl",function($scope,$window,$sessionStorage) {
    $scope.names = [{"id":"1","daysLeft":"0","taskType":"Underwrite Decision","workItem":"Reund-claim","policyName":"PF12341234","client":"Aravind Sam","reason":"Work item closed","pdf":"PF12341234.pdf","vehicle":"Maruti Suzuki","class":"Sedan","date":"10-11-1994","amount":"2,000$"},
                    {"id":"2","daysLeft":"0","taskType":"Underwrite Decision","workItem":"Reund-claim","policyName":"PF12341235","client":"Satya Sai","reason":"Reassigning to support","pdf":"PF12341235.pdf","vehicle":"Hyundai","class":"Santro","date":"09-11-2004","amount":"2,500$"},
                    {"id":"3","daysLeft":"0","taskType":"Underwrite Decision","workItem":"Reund-claim","policyName":"PF12341236","client":"Joseph Bill","reason":"Priority Change","pdf":"PF12341236.pdf","vehicle":"Isuzu","class":"MZ-7","date":"22-11-2005","amount":"4,000$"}];
    $scope.lastName = "Doe";
	$sessionStorage.flag='';
    $scope.textAreaFirst="suffiecientInfo";
    $scope.textAreaSecond="In Suffiecient Info";
    $scope.textArea=$sessionStorage.flag;
    $scope.validate = function(id) {
	$window.sessionStorage.setItem("id",id);

		if(id=="1"){ 
	for(var i=0;i<$scope.names.length;i++){
	if($scope.names[i].id=="1"){
	$window.sessionStorage.setItem("obj",JSON.stringify($scope.names[i]));
	
	}
		}
		
			$sessionStorage.flag= $scope.textAreaFirst;
			$scope.textArea=$sessionStorage.flag; 
			   $window.sessionStorage.setItem("info","Client search  completed. Sufficient information.");
			   $window.sessionStorage.setItem("reasons","No Claim");

		}else{
			for(var i=0;i<$scope.names.length;i++){
			if($scope.names[i].id==id){
				$window.sessionStorage.setItem("obj",JSON.stringify($scope.names[i]));
			}
			}
			$window.sessionStorage.setItem("info","Client search not completed. In sufficient information. Caution.");
			$window.sessionStorage.setItem("reasons","3 ERS Claims pending");
			$sessionStorage.flag= $scope.textAreaSecond;
			$scope.textArea=$sessionStorage.flag;
			
		   }
   } 
});
app.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">Status</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
          scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

   /*     $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });
*/
        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
app.controller("secondController",function($scope,$sessionStorage,$window) {
$scope.showModal=false;
$scope.buttonClicked = "";
$scope.names = ["Yes", "No", "Questionable","Unknown"];
$scope.value=JSON.parse($window.sessionStorage.getItem("obj"));
$scope.textArea=$window.sessionStorage.getItem("info");
$scope.reason=$window.sessionStorage.getItem("reasons");

	$scope.submit=function(){
	$window.location.href="thirdpage.html";
	}
$scope.myFunc=function(){
	
	 $scope.showModal = !$scope.showModal;
	 $scope.buttonClicked = "true";
	 
}
$scope.myfunc2=function(){
alert("Claim Review Sent");
}
$scope.close=function(){
$window.location.href="index.html";
}
$scope.init=function() {

   document.getElementById("iFrame1").src = $scope.value.pdf;
}
});