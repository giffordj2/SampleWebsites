var nameE = false, emailE = false, descriptionE = false;

var $nameLabel = $("<label></label>"),
	$emailLabel = $("<label></label>"),
	$descriptionLabel = $("<label></label>"),
	$thankYouP = $("<p>Thank you for submitting your information. </br>" +
					"An estimate will be set to you using this information.</p>");

function validate(){
	var isValid = true;
	//check to see if name field is empty
	if($("input[name = 'name' ]").val().length === 0){
		isValid = false;
		nameE = true;
		}
	//check to see if email field is empty
	if($("input[name = 'email' ]").val().length === 0){
		isValid = false;
		emailE = true;
	}
	if($("#description").val().length ===0){
		isValid = false;
		descriptionE = true;
		}	
	return isValid;
	}
	
	
$("button").click(function(event){
	event.preventDefault();
	var isValid = validate();
	if(!isValid){
		console.log(isValid + ", " + nameE + ", " + emailE);
			if(nameE){
				$("#nameEmpty").show();
				}
			if(emailE){
				$("#emailEmpty").show();
				}
			if(descriptionE){
				$("#descriptionEmpty").show();
				}
		}
	else{
		$(".estimate").hide();
		$("section").append($thankYouP);
		$nameLabel.html("Name: "+ $("input[name = 'name' ]").val());
		$("section").append($nameLabel).append("</br>");
		
		$emailLabel.html("Email: "+ $("input[name = 'email' ]").val());
		$("section").append($emailLabel).append("</br>");
		
		$descriptionLabel.html("Description of job: " + $("#description").val());
		$("section").append($descriptionLabel);
	}
	}
);