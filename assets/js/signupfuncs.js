//Debug commands for the console//
//     !!!get login data!!! 
//console.log(JSON.parse(window.atob(getCookie("logindata"))))

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkdataforemail(array,attemptedemail) {
	arraylength = array.length
	for (var i = 0; i<arraylength; i++) {
		console.log(array[i])
		if (array[i].email == attemptedemail) {
			return false
			break
		}
	}
	return true
}

function checkdataforpassw(array,attemptedpassw) {
	arraylength = array.length
	for (var i = 0; i<arraylength; i++) {
		console.log(array[i])
		if (array[i].password == attemptedpassw) {
			return false
			break
		}
	}
	return true
}

function resetalldata() {
	setCookie("sessiondata","",1)
	setCookie("logindata","",180)
}

function logalldata() {
	console.log([getCookie("sessiondata"),getCookie("logindata")])
}

function loginfunc() {
	document.getElementById("incorrect").innerText = ""
	var email2 = document.getElementById("email").value
	var passw = document.getElementById("passw").value
	
	var logindata = getCookie("logindata")
	
	if (logindata != "") {
		logindata = window.atob(logindata)
		logindata = JSON.parse(logindata)
		arraylength = logindata.length
		for (var i = 0; i < arraylength; i++) {
			console.log(logindata[i])
			if (logindata[i].email == email2 && logindata[i].password == passw) {
				console.log("Login Success!!!!! WOOOOO!")
				
				var data = JSON.stringify(logindata[i])
				var data = window.btoa(data)
				setCookie("sessiondata",data,1)

				window.location.replace("dashboard.html")
				return
			} else {
				console.log("login failure :(")
			}
		}
		document.getElementById("incorrect").innerText = "Incorrect Login"
	} else {
		document.getElementById("incorrect").innerText = "Incorrect Login"
	}
}

function signupfunc() {
	var fname = document.getElementById("fname").value
	var lname = document.getElementById("lname").value
	var email2 = document.getElementById("email").value
	var passw = document.getElementById("passw").value
	
	if (getCookie("logindata") == "") {
		var saveddata = [
			{firstname:fname, lastname:lname, email:email2, password:passw}
		]
		var encode = JSON.stringify(saveddata)
		encode = window.btoa(encode)
		
		setCookie("logindata",encode,180)
		
		window.location.replace("login.html")
	} else {
		var decode = window.atob(getCookie("logindata"))
		decode = JSON.parse(decode)
		
		if (checkdataforemail(decode,email2) == true) {
		var newlogin = {firstname:fname, lastname:lname, email:email2, password:passw}
		decode.push(newlogin)
		
		var encode = JSON.stringify(decode)
		encode = window.btoa(encode)
		setCookie("logindata",encode,180)
		
		window.location.replace("login.html")
		} else {
		document.getElementById("error").innerText = "Email is Already Registered."
		}
	}
}

function logoutfunc() {
	setCookie("sessiondata","",1)
	window.location.replace("login.html")
}

var tempval = false

function passwordchange() {

	var passwobj = document.getElementById("passw").value
	
	var decode = window.atob(getCookie("sessiondata"))
	decode = JSON.parse(decode)
	console.log("AAaaAAAAA@")
	if (tempval == false) {
	console.log(decode)
		if (decode.password == passwobj) {
			document.getElementById("passwlabel").innerText = "Enter Your New Password"
			tempval = true
			console.log(decode)
			return
		} else {
			document.getElementById("incorrect").innerText = "Incorrect Password"
		}
	} else if (tempval == true) {
		decode.password = passwobj
		console.log(decode)
		
		var encode = JSON.stringify(decode)
		encode = window.btoa(encode)
		setCookie("sessiondata",encode,1)
		
		var decodedos = window.atob(getCookie("logindata"))
		decodedos = JSON.parse(decodedos)
	
		arraylength = decodedos.length
		for (var i = 0; i < arraylength; i++) {
			if (decodedos[i].email == decode.email) {
				decodedos[i] = decode
				tempval = false
				break
			}
		}
		var encodedos = JSON.stringify(decodedos)
		encodedos = window.btoa(encodedos)
		setCookie("logindata",encodedos,180)
		console.log([decode,encode,decodedos,encodedos])
	}
}