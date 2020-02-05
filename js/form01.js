 $(document).ready(function() {

 	$(document).on("input", "#phone", function() {
 		this.value = this.value.replace(/\D/g, '');

 	});

 	jQuery.validator.addMethod("email",function(value,element,param)
 	{
 		if(this.optional(element))
    {//This is not a 'required' element and the input is empty
return true;
}

if(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value))
{
	return true;
}

return false;

},"Некорректный email");


 	$(".form").validate({

 		rules: {

 			name: {
 				required: true,
 				minlength: 2

 			},
 			phone: {
 				required: true,
 				minlength: 8
 			},          
 			email: {
 				required: true,
 				email: true,


 			},


 		},
 		messages: {
 			name: "Введите мин. 2 символа",
 			phone: "Некорректный телефон",
 			email: "Некорректный email"
 		}

 	});

 	
 	
 	var questArr = [];
 	var affiliateusertoken;
 	var affiliateid;
 	var ip;
 	var country;
 	var city;
 	var utmmedium;
 	var utmcontent;
 	var utmcampaign;
 	var utmsource;
 	var utmterm;
 	var linkId;
 	var firstname;
 	var lastname;
 	var email;
 	var phoneCountry;
 	var phoneNumber;
 	var phoneOperator;
 	var params;
 	var res;
 	var codePhone;
 	var url_;
 	var url;
 	var email;
 	var fullName;
 	var _fullName;
 	var firstName;
 	var lastName;
 	var phoneConfirm;
 	var Data  = new Date();
 	var Hour = Data.getHours();
 	var Minutes = Data.getMinutes();
 	var Seconds = Data.getSeconds();

 	function dateToYMD(date) {
 		var d = date.getDate();
 		var m = date.getMonth() + 1; 
 		var y = date.getFullYear();
 		return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
 	}

 	init();

// function yaCounter() {

	
// 	yaCounter53777584.reachGoal('form');
// 	return true;

// }


var respLeadId;
var respSuccess;


$('.next .pager-link').click(function (e) {


	{

		var html = $('.active  .active-item').text();

		questArr.push(html);

	}

});




$('.form-button').click(function() {

	


	debugger;
	
	
	fullName = urlLit($('#name').val(),0);
	_fullName = fullName.split(' ');
	firstName = _fullName[0];
	lastName = _fullName[1] || _fullName[0];
	email = $('#email').val();
	console.log(email,fullName);



	phoneCountry = $('.form .selected-dial-code').text().replace("+", "");

	var _phoneNumber = $('#phone').val();
	phoneOperator = _phoneNumber[0] + _phoneNumber[1];
	phoneNumber = _phoneNumber.replace(phoneOperator,'');


	var d = _phoneNumber.substr(0,3);

	if (d == '380') {
		_phoneNumber = _phoneNumber.replace(d, '');
	}

	if(phoneCountry === '380') {
		console.log('phoneCountry', 'UA');


		while(_phoneNumber.charAt(0) === '0')
		{
			_phoneNumber = _phoneNumber.substr(1);
		}
		console.log(_phoneNumber);
	} 

	var phoneSms = phoneCountry + _phoneNumber;

	console.log(phoneSms);




	res = randomInteger(1000,9999);
	console.log(res);

	$('#currPhone').text(phoneSms);

	// url_ = getQueryString(baseurl, params);



	var curDate = dateToYMD(new Date()) + ' ' +Hour+":"+Minutes+":"+Seconds;



	utmmedium = $.urlParam('utm_medium');
	utmcontent = $.urlParam('utm_content');
	utmterm = $.urlParam('utm_term');

	

	if ($(".form ").valid()) {



		// dataLayer.push({'event': 'formsend'});



		$.ajax({
			url: 'temps.php',
			type: 'POST',
			data: jQuery.param({ 
				field0 : curDate, 
				field1: firstName, 
				field2 : email, 
				field3: phoneSms, 
				field4 : country, 

				field5: utmsource, 
				field6: utmmedium, 

				field7: utmcampaign, 
				field8: utmcontent,
				field9: utmterm,
			}) ,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function (response) {
				console.log('log ok');
			},
			error: function () {
				console.log("log error");
			}
		});


		$('#preloader').show();


		var req= $.ajax({


			url: 'https://apis.lblv.com/Marketing/Leads/add.aspx',

			type: 'POST',

			data: {
				cid:'208',
				referral:'liveru',
				country: country,
				prefix: phoneCountry,
				fname: firstName,
				lname: lastName,
				email: email,
				phone: _phoneNumber,
				utm_source: utmsource
			},
			success: function(data,responseText){




				console.log('data.id',data.Lead_id);
				console.log('data.Success',data.Success);
				


				if (data.Lead_id) {
					respLeadId = 'Lead_Id' + ':' + data.Lead_id.toString();
				} else {
					respLeadId == null;
				}
				respSuccess ='Success' + ':' + data.Success.toString();

				console.log(respLeadId);
				console.log(respSuccess);

				var curDate = dateToYMD(new Date()) + ' ' +Hour+":"+Minutes+":"+Seconds;

				
				if(data.Success){


		 	    // dataLayer.push({'event': 'formsend'});


		 	    $.ajax({
		 	    	url: 'sheets.php',
		 	    	type: 'POST',
		 	    	data: jQuery.param({ 
		 	    		field0 : respLeadId, 
		 	    		field1 : email, 
		 	    		field2:  $.trim(questArr[0]), 
		 	    		field3: $.trim(questArr[1]),
		 	    		field4: $.trim(questArr[2]),
		 	    		field5: $.trim(questArr[3]),
		 	    		field6: $.trim(questArr[4]),
		 	    		field7: $.trim(questArr[5]),
		 	    		field8: $.trim(questArr[6]),
		 	    		field9: $.trim(questArr[7]),
		 	    		field10: $.trim(questArr[8]),
		 	    		field11: $.trim(questArr[9])
		 	    	}) ,
		 	    	contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		 	    	success: function (response) {
		 	    		console.log('success');
		 	    	},
		 	    	error: function () {
		 	    		console.log("error");
		 	    	}
		 	    });



		 	    $.ajax({
		 	    	url: 'temps.php',
		 	    	type: 'POST',
		 	    	data: jQuery.param({ 
		 	    		field0 : curDate, 
		 	    		field1: firstName, 
		 	    		field2 : email, 
		 	    		field3: phoneSms, 
		 	    		field4 : country, 
		 	    		field5: respSuccess,
		 	    		field6: respLeadId, 
		 	    		field7: utmsource, 
		 	    		field8: utmmedium, 

		 	    		field9: utmcampaign, 
		 	    		field10: utmcontent,
		 	    		field11: utmterm,
		 	    	}) ,
		 	    	contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		 	    	success: function (response) {
		 	    		console.log('log ok');
		 	    	},
		 	    	error: function () {
		 	    		console.log("log error");
		 	    	}
		 	    });




		 	    window.location = 'success.html ';
		 	    console.log('data true');

		 	} else {
		 		$('#preloader').hide();

		 		$(".popup-ver").fadeIn("slow");

		 		if (data.Lead_id) {
		 			respLeadId = 'Lead_Id' + ':' + data.Lead_id.toString();
		 		} else {
		 			respLeadId == null;
		 		}
		 		respSuccess ='Success' + ':' + data.Success.toString();

		 		console.log(respLeadId);
		 		console.log(respSuccess);

		 		var curDate = dateToYMD(new Date()) + ' ' +Hour+":"+Minutes+":"+Seconds;



		 		$.ajax({
		 			url: 'temps.php',
		 			type: 'POST',
		 			data: jQuery.param({ 
		 				field0 : curDate, 
		 				field1: firstName, 
		 				field2 : email, 
		 				field3: phoneSms, 
		 				field4 : country, 
		 				field5: respSuccess,
		 				field6: respLeadId,
		 				field7: data.Message.toString(),
		 				field8: utmsource, 
		 				field9: utmmedium, 

		 				field10: utmcampaign, 
		 				field11: utmcontent,
		 				field12: utmterm,


		 			}) ,
		 			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		 			success: function (response) {
		 				console.log('log ok');
		 			},
		 			error: function () {
		 				console.log("log error");
		 			}
		 		});



		 	}


		 },
		 error: function(){
		 	console.log('Error request');
		 	
		 	console.log('data',data);
		 	
		 },

		})


	}

});


 $("#res").click(function() { 

 	var codeSms = $('#sms-code').val();


 	

 	

 	$('#preloader').show();

 	
 	_phoneNumber = $('#currPhone').text().replace(phoneCountry,"");


 	var req= $.ajax({


 		url: 'https://apis.lblv.com/Marketing/Leads/add.aspx',
 		

 		type: 'POST',

 		data: {
 			cid:'208',
 			referral:'liveru',
 			country: country,
 			prefix: phoneCountry,
 			fname: firstName,
 			lname: lastName,
 			email: email,
 			phone: _phoneNumber,
 			utm_source: utmsource
 		},
 		withCredentials: true,
 		success: function (data) {


 			if (data.Lead_id) {
 				respLeadId = 'Lead_Id' + ':' + data.Lead_id.toString();
 			} else {
 				respLeadId == null;
 			}
 			respSuccess ='Success' + ':' + data.Success.toString();

 			console.log(respLeadId);
 			console.log(respSuccess);

 			var curDate = dateToYMD(new Date()) + ' ' +Hour+":"+Minutes+":"+Seconds;

 			if(data.Success  && codeSms == res){

					// dataLayer.push({'event': 'formsend'});


					$.ajax({
						url: 'sheets.php',
						type: 'POST',
						data: jQuery.param({ 
							field0 : respLeadId, 
							field1 : email, 
							field2:  $.trim(questArr[0]), 
							field3: $.trim(questArr[1]),
							field4: $.trim(questArr[2]),
							field5: $.trim(questArr[3]),
							field6: $.trim(questArr[4]),
							field7: $.trim(questArr[5]),
							field8: $.trim(questArr[6]),
							field9: $.trim(questArr[7]),
							field10: $.trim(questArr[8]),
							field11: $.trim(questArr[9]),
						}) ,
						contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
						success: function (response) {
							console.log('success');
						},
						error: function () {
							console.log("error");
						}
					});


					$.ajax({
						url: 'temps.php',
						type: 'POST',
						data: jQuery.param({ 
							field0 : curDate, 
							field1: firstName, 
							field2 : email, 
							field3: phoneCountry + _phoneNumber, 
							field4 : country, 
							field5: respSuccess,
							field6: respLeadId, 

							field7: utmsource, 
							field8: utmmedium, 
							field9: utmcampaign, 
							field10: utmcontent,				
							field11: utmterm,
							field12: 'sms'
						}) ,
						contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
						success: function (response) {
							console.log('log ver ok');
						},
						error: function () {
							console.log("error");
						}
					});

					window.location = 'success.html ';


					
				}  else if (!data.Success  && codeSms == res) {
					



					$.ajax({
						url: 'temps.php',
						type: 'POST',
						data: jQuery.param({ 
							field0 : curDate, 
							field1: firstName, 
							field2 : email, 
							field3: phoneCountry + _phoneNumber, 
							field4 : country,
							field5: respSuccess, 
							field6: data.Message.toString(),
							field7: utmsource, 
							field8: utmmedium, 
							field9: utmcampaign, 
							field10: utmcontent,				
							field11: utmterm,


						}) ,
						contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
						success: function (response) {
							console.log('log ver ok');
						},
						error: function () {
							console.log("error");
						}
					});

					debugger;

					window.location = 'success.html ';

				}
				


			},

			error: function () {
				console.log("error");
			}
		})



	// }

	if( codeSms != res){

		console.log('fail');
		$('#codeError').css('display', 'block');
		$('#preloader').hide();
	}



});

 // if($('#errorLead').css('display', 'block')) {
 // 	$('#res, #change-number').prop('disabled', true);
 // }

 $("#change-number").click(function() { 
 	$('.popup-form-title, #sms-code, #codeError, #res, #change-number').css('display', 'none');
 	$('.phoneConfirmWrap').css('display', 'block');
 });

 $("#submit-number").click(function() { 
    // console.log(params);

    // console.log('click');

    debugger;

    phoneConfirm = $('.phoneConfirm').val();
    // phoneCountry = $('.codePhone').val().replace('+', '');
    phoneCountry = $('.popup-form .selected-dial-code').text().replace("+", "");

    var _phoneNumber = phoneConfirm;
    if(_phoneNumber) {
    	phoneOperator = _phoneNumber[0] + _phoneNumber[1];
    	phoneNumber = _phoneNumber.replace(phoneOperator,'');
    }
    


    console.log(_phoneNumber);

    res = randomInteger(1000,9999);

    var phoneSms = phoneCountry + phoneConfirm;
    var curDate = dateToYMD(new Date()) + ' ' +Hour+":"+Minutes+":"+Seconds;


    $.ajax({
    	url: 'send.php',
    	type: 'POST',
    	data: jQuery.param({ field0 : phoneSms, field1: res}) ,
    	contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    	success: function (response) {
    		console.log(response.status);
    	},
    	error: function () {
    		console.log("error");
    	}
    });



    $('#currPhone').text(phoneSms);
    $('.popup-form-title, #sms-code, #res, #change-number').css('display', 'block');
    $('.phoneConfirmWrap').css('display', 'none');
    console.log('success');
    console.log(phoneSms);
    console.log(res);
    console.log(phoneCountry);
     // console.log(urlConfirm);
     
 });


 function randomInteger(min, max) {
 	var rand = min - 0.5 + Math.random() * (max - min + 1)
 	rand = Math.round(rand);
 	return rand;
 }

 function getQueryString(baseurl, params) {
 	var url = baseurl;
 	var isFirst = true;

 	$.each(params, function(key, value) {
 		url += isFirst ? '?' : '&';

 		isFirst = false;
 		url += (key.toString() + '=' + value);
 	});

 	return url;
 }


 function getphoneOperator(phoneNumber) {

 	var parts = phoneNumber.split(' ', 2);
 	if (parts && parts.length > 1) {

 		return parts[0].replace('(', '').replace(')', '');
 	}
 	return '';
 }


 function getphoneNumber(phoneNumber) {
 	var parts = phoneNumber.split(' ', 2);

 	if (parts && parts.length > 1) {
 		return parts[1].replace('-', '').replace('-', '');
 	}

 	return '';
 }


 function urlLit(w,v) {
 	var tr='a b v g d e ["zh","j"] z i y k l m n o p r s t u f h c ch sh ["shh","shch"] ~ y ~ e yu ya ~ ["jo","e"]'.split(' ');
 	var ww=''; w=w.toLowerCase();
 	for(i=0; i<w.length; ++i) {
 		cc=w.charCodeAt(i); ch=(cc>=1072?tr[cc-1072]:w[i]);
 		if(ch.length<3) ww+=ch; else ww+=eval(ch)[v];}
 		return(ww.replace(/[^a-zA-Z0-9\-]/g,'-').replace(/[-]{2,}/gim, '-').replace( /^\-+/g, '').replace( /\-+$/g, ''));
 	}

 	var ip;


 	function init() {
 		$('#codePhone').addClass('valid');

 		$(".codePhone").intlTelInput({

 			geoIpLookup: function (callback) {
 				$.get("https://pro.ip-api.com/json/?key=U1XmvRzic1gUxH3", function() {}, "jsonp").always(function(response) {
 					var countryCode = (response && response.countryCode) ? response.countryCode : "";
 					callback(countryCode);

 					console.log(countryCode);

 					country = response.country;
 					countryCode = response.countryCode;
 					city = response.city;

 					ip = response.query;

 					console.log('country:', country);
 					console.log('countryCode:', countryCode);
 					console.log('city:', city);
 					console.log('ip:', ip);

 				});

 			},


 			preferredCountries: ["ua", "ru", "kz",  "az"],

 			initialCountry: "auto",
 			separateDialCode: true


 		});



 		$.urlParam = function (name) {
 			var results = new RegExp('[\?&]' + name + '=([^&#]*)')
 			.exec(window.location.href);

 			if (results) {
 				return results[1] || 0;
 			}


 		}


 		affiliateusertoken = $.urlParam('usertoken');
 		affiliateid = $.urlParam('affiliateId');
 		utmmedium = $.urlParam('utm_medium');
 		utmcontent = $.urlParam('utm_content');
 		utmterm = $.urlParam('utm_term');
 		utmcampaign = $.urlParam('utm_campaign');
 		utmsource = $.urlParam('utm_source');





 	}



 });







