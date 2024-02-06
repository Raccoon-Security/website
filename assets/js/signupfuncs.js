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

function loginfunc() {
	var email = document.getElementById("email").value
	var passw = document.getElementById("passw").value
	
	var savedemail = getCookie("email")
	var savedpassw = getCookie("passw")
	
	if (savedemail != "") {
		
	}
}

function signupfunc() {
	var fname = document.getElementById("fname").value
	var lname = document.getElementById("lname").value
	var email = document.getElementById("email").value
	var passw = document.getElementById("passw").value
	
	setCookie("fname",fname,180)
	setCookie("lname",lname,180)
	setCookie("email",email,180)
	setCookie("passw",passw,180)
}