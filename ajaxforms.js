//The ajaxForm Object
var ajaxForm = {
	init: function(){
		//Get All Forms
		var forms = document.querySelectorAll("[ajaxForm]");
		
		//Process Forms
		for(var i=0; i<forms.length; i++)
		{
			//Catch Each Form Submission
			forms[i].onsubmit = function(){
				var data = $(this).serialize();
				var callback = window[this.getAttribute("ajaxForm")];
				
				//Options
				var options = {
					type: this.method,
					success: function(data, textStatus, jqXHR){
						var result = {
							"success" : true,
							"status" : jqXHR.status,
							"error"	: null,
							"data" : data
						};
						callback(result);
					},
					error: function(jqXHR, textStatus, errorThrown){
						var result = {
							"success" : false,
							"status" : jqXHR.status,
							"error" : errorThrown,
							"data" : null
						};
						callback(result);
					},
					data: data,
					url: this.action
				};
				
				//Submit Request
				$.ajax(options);
				return false;
			};
		}
	},
};

//Run on Window Load
window.addEventListener("load", ajaxForm.init);
