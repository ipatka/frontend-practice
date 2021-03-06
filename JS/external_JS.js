// start with document.ready
$( document ).ready(function() {

	$( "#submit_button" ).click(function() {
	//validate

		if (validate_input()) {
			item = create_json();
			$.post('../controller/practice_actions.php', 
				{postname: item}, 
				function() {
  				alert_success();
				});


			
		}

		
		


	});


});

function validate_input() {
		valid_input = true;
		valid_content = true;

			var total = $('.textfield').length;
			$('.textfield').each(function(i){
				//if any field is empty
				if ($.trim($(this).val()) == '') {
					valid_input = false;
					}

				//if the last field is nonempty and non-alphabetic
				if ((i == (total - 1)) && ($.trim($(this).val()) != '')) {
        			if (is_alphabetic($.trim($(this).val())) == false) {
					valid_content = false; 
					}
    			}


			});



		if (valid_input == false) {
			alert_emptyfield();
			
			return false;
		}
		if (valid_content == false) {
			alert_nonalphabetic();
			return false;
		}

		

		return true;

		
}

function create_json() {

		jsonObj = {};

	$("input[class=textfield]").each(function(i) {
		jsonObj["key"+i] = $(this).val();

    });

    jsonString = JSON.stringify(jsonObj);
    console.log(jsonString);
    return jsonString;
}



function is_alphabetic(str) {

		alphabetic = false;

		if (/^[a-zA-Z]+$/.test(str)) {
    		alphabetic = true;
		}

		return alphabetic;

}





function alert_success() {

	$('#submit_button').fadeTo(50,0.5).fadeTo(50,1);
	$('#alert').replaceWith("<div id='alert'>submitted</div>");
	$('#alert').delay(500).fadeOut(500);
	
	
	
}

function alert_nonalphabetic() {
	$('#alert').replaceWith("<div id='alert'>use only alphabetic characters in bottom field</div>");
	$('#alert').delay(2000).fadeOut(500);
	
	
}

function alert_emptyfield() {
	$('#alert').replaceWith("<div id='alert'>please fill out all fields</div>");
	$('#alert').delay(1500).fadeOut(500);

}

