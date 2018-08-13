var http = createRequestObject();
var field = '';
var loadingfilm = '';
function fix() {
return true;
}
window.onerror = fix;
{window.status="Done"}
function createRequestObject() {
	var xmlhttp;
	try { xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); }
	catch(e) {
    try { xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
	catch(f) { xmlhttp=null; }
  }
  if(!xmlhttp&&typeof XMLHttpRequest!="undefined") {
	xmlhttp=new XMLHttpRequest();
  }
	return  xmlhttp;
}

function handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			response = http.responseText;
			field.innerHTML = response;
			field.scrollIntoView();
			if(!response) window.location.href = url;
		}
  	}
	catch(e){}
	finally{}
}
//#######################################
//# SEARCH HEADER
//#######################################
function do_search() {
	kw = document.getElementById("keyword").value;
	if (!kw) alert('Please enter keyword to search movies');
	else {
		kw = encodeURIComponent(kw);
		if(isNaN(kw))
		{
			kw=kw.replace(/%20/g,'+');
			window.location.href = 'http://putlockers.sh/search-movies/'+kw+'.html';
		}
		else
		{
			window.location.href = 'http://putlockers.sh/search-movies/movies.html';	
		}
	}
  return false;
}
//#######################################
//# SEARCH FOOTER
//#######################################
function do_search_footer() {
	kw = document.getElementById("keyword_footer").value;
	if (!kw) alert('Please enter keyword to search movies');
	else {
		kw = encodeURIComponent(kw);
		if(isNaN(kw))
		{
			kw=kw.replace(/%20/g,'+');
			window.location.href = 'http://putlockers.sh/search-movies/'+kw+'.html';
		}
		else
		{
			window.location.href = 'http://putlockers.sh/search-movies/movies.html';	
		}
	}
  return false;
}
//#######################################
//# ADD EMOTIONS
//#######################################
function addText(elname, wrap1, wrap2) {
	if (document.selection) { // for IE 
		var str = document.selection.createRange().text;
		document.forms['add'].elements[elname].focus();
		var sel = document.selection.createRange();
		sel.text = wrap1 + str + wrap2;
		return;
	} else if ((typeof document.forms['add'].elements[elname].selectionStart) != 'undefined') { // for Mozilla
		var txtarea = document.forms['add'].elements[elname];
		var selLength = txtarea.textLength;
		var selStart = txtarea.selectionStart;
		var selEnd = txtarea.selectionEnd;
		var oldScrollTop = txtarea.scrollTop;
		var s1 = (txtarea.value).substring(0,selStart);
		var s2 = (txtarea.value).substring(selStart, selEnd)
		var s3 = (txtarea.value).substring(selEnd, selLength);
		txtarea.value = s1 + wrap1 + s2 + wrap2 + s3;
		txtarea.selectionStart = s1.length;
		txtarea.selectionEnd = s1.length + s2.length + wrap1.length + wrap2.length;
		txtarea.scrollTop = oldScrollTop;
		txtarea.focus();
		return;
	} else {
		insertText(elname, wrap1 + wrap2);
	}
}
//#######################################
//# COUNT WORDS
//#######################################
var submitcount=0;
   function checkSubmit() {

      if (submitcount == 0)
      {
      submitcount++;
      document.Surv.submit();
      }
   }


function wordCounter(field, countfield, maxlimit) {
wordcounter=0;
for (x=0;x<field.value.length;x++) {
      if (field.value.charAt(x) == " " && field.value.charAt(x-1) != " ")  {wordcounter++}
      if (wordcounter > 250) {field.value = field.value.substring(0, x);}
      else {countfield.value = maxlimit - wordcounter;}
      }
   }

function textCounter(field, countfield, maxlimit) {
  if (field.value.length > maxlimit)
      {field.value = field.value.substring(0, maxlimit);}
      else
      {countfield.value = maxlimit - field.value.length;}
  }
//#######################################
//# COMMENT
//#######################################
function showComment(num,film_id,page) { 
	field = document.getElementById("comment_field");
	field.innerHTML = loadingText;
	http.open('POST',  'index.php');
	http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = handleResponse;
    http.send('showcomment=1&num='+num+'&film_id='+film_id+'&page='+page); 
  return false; 
} 

function comment_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			var response = http.responseText;
			if (response == 'OK') {
				film_id = encodeURIComponent(document.getElementById("film_id").value);
				num = encodeURIComponent(document.getElementById("num").value);
				showComment(num,film_id,1);
			}
			else document.getElementById("comment_loading").innerHTML = response;

		}
  	}
	catch(e){}
	finally{}
}

function comment_check_values() {
	film_id = encodeURIComponent(document.getElementById("film_id").value);
	num = encodeURIComponent(document.getElementById("num").value);
	comment_poster = encodeURIComponent(document.getElementById("comment_poster").value);
	comment_content = encodeURIComponent(document.getElementById("comment_content").value);
	try {
	    document.getElementById("comment_loading").innerHTML = loadingText;
		document.getElementById("comment_loading").style.display = "block";
		http.open('POST',  'index.php');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		http.onreadystatechange = comment_handleResponse;
		http.send('comment=1&film_id='+film_id+'&num='+num+'&comment_poster='+comment_poster+'&comment_content='+comment_content);
		document.getElementById("submit").disabled=true;document.getElementById("submit").value="Wait...";
	}
	catch(e){}
	finally{}
  return false;
}
//#######################################
//# RATING
//#######################################
function rating(film_id,star) {
	try {
		document.getElementById("rate_s").innerHTML = loadingText;
		document.getElementById("rate_s").style.display = "block";
		hide_rating_process();
		http.open('POST',  'http://putlockers.sh/index.php');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function() {
			if((http.readyState == 4)&&(http.status == 200)){
				document.getElementById("rating_field").innerHTML = http.responseText;
			}
		}
		http.send('rating=1&film_id='+film_id+'&star='+star);
	}
	catch(e){}
	finally{}
	return false;
}


	// pre-fetch image
	(new Image()).src = RATE_OBJECT_IMG;
	(new Image()).src = RATE_OBJECT_IMG_HALF;
	(new Image()).src = RATE_OBJECT_IMG_BG;

	function show_star(starNum,rate_text) {
		remove_star();
		document.getElementById("rate_text_d").innerHTML = rate_text;
		full_star(starNum);
	}
	
	function full_star(starNum) {
		for (var i=0; i < starNum; i++)
			document.getElementById('star'+ (i+1)).src = RATE_OBJECT_IMG;
	}
	function remove_star() {
		for (var i=0; i < 5; i++)
			document.getElementById('star' + (i+1)).src = RATE_OBJECT_IMG_BG; // RATE_OBJECT_IMG_REMOVED;
	}
	function remove_all_star() {
		for (var i=0; i < 5; i++) document.getElementById('star' + (i+1)).src = RATE_OBJECT_IMG_BG; // RATE_OBJECT_IMG_REMOVED;
		document.getElementById("rate_text_d").innerHTML = 'Bình Chọn';
	}
	function show_rating_process() {
		if(document.getElementById("rating_process")) document.getElementById("rating_process").style.display = "block";
		if(document.getElementById("rate_s")) document.getElementById("rate_s").style.display = "none";
	}
	function hide_rating_process() {
		document.getElementById("rating_process").style.display = "none";
		if(document.getElementById("rate_s")) document.getElementById("rate_s").style.display = "block";
	}
//#######################################
//# REQUEST
//#######################################
function showRequest(num,page) {
	field = document.getElementById("request_field");
	field.innerHTML = loadingText;
	http.open('POST',  'index.php');
	http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = handleResponse;
    http.send('showrequest=1&num='+num+'&page='+page); 
  return false; 
} 

function request_handleResponse() {
	try {
		if((http.readyState == 4)&&(http.status == 200)){
			var response = http.responseText;
			if (response == 'OK') {
				num = encodeURIComponent(document.getElementById("num").value);
				showRequest(num,1);
			}
			else document.getElementById("request_loading").innerHTML = response;
			
		}
  	}
	catch(e){}
	finally{}
}

function request_check_values() {
	num = encodeURIComponent(document.getElementById("num").value);
	request_name = encodeURIComponent(document.getElementById("request_name").value);
	request_email = encodeURIComponent(document.getElementById("request_email").value);
	try{
			document.getElementById("request_loading").innerHTML = loadingText;
			document.getElementById("request_loading").style.display = "block";
			http.open('POST',  'index.php');
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			http.onreadystatechange = request_handleResponse;
			http.send('request=1&num='+num+'&request_name='+request_name+'&request_email='+request_email);
			//document.getElementById("send").disabled=true;document.getElementById("send").value="Wait...";
		}
	  catch(e){}
	  finally{}
	return false;
}
//#######################################
//# BROKEN
//#######################################
function showBroken(film_id,episode_id) {
	try {
		document.getElementById("broken_field").innerHTML = loadingText;
		document.getElementById('broken_field').style.display='block';
		http.open('POST','index.php');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function() {
			if((http.readyState == 4)&&(http.status == 200)){
				document.getElementById("broken_field").innerHTML = http.responseText;
			}
		}
		http.send('broken=1&film_id='+film_id+'&episode_id='+episode_id);
	}
	catch(e){}
	finally{}
	return false;
}
//#######################################
//# SHOW FILM
//#######################################
function showFilm(num,page,number,apr,cat_id) { 
    field = document.getElementById(num);
	field.innerHTML = loadingText;
	http.open('POST',  'index.php');
	http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = handleResponse;
    http.send('showfilm=1&num='+num+'&page='+page+'&number='+number+'&apr='+apr+'&cat_id='+cat_id); 
  return false; 
}
//#######################################
//# SHOW TRAILER
//#######################################
function showTrailer(num,apr,page) { 
    field = document.getElementById("trailer_loading");
	field.innerHTML = loadingText;
	http.open('POST',  'index.php');
	http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = handleResponse;
    http.send('showtrailer=1&num='+num+'&apr='+apr+'&page='+page); 
  return false; 
}
function now_watching()
{
	ajaxpage('http://putlockers.sh/?now=watching','watching');
	setTimeout("now_watching()",30000);
}
var bustcachevar=1 //bust potential caching of external pages after initial request? (1=yes, 0=no)
var loadedobjects=""
var rootdomain="http://"+window.location.hostname
var bustcacheparameter=""
function ajaxpage(url, containerid){
var page_request = true
if (window.XMLHttpRequest) // if Mozilla, Safari etc
page_request = new XMLHttpRequest()
else if (window.ActiveXObject){ // if IE
try {
page_request = new ActiveXObject("Msxml2.XMLHTTP")
} 
catch (e){
try{
page_request = new ActiveXObject("Microsoft.XMLHTTP")
}
catch (e){}
}
}
else
return false
page_request.onreadystatechange=function(){
loadpage(page_request, containerid)
}
if (bustcachevar) //if bust caching of external page
bustcacheparameter=(url.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()
page_request.open('GET', url, true)
page_request.send(null)
}

function loadpage(page_request, containerid){
if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1))
document.getElementById(containerid).innerHTML=page_request.responseText
}
function sharePopup(url) {
	window.open(url, "sharePopup", "menubar=1,resizable=1,width=620,height=450");
}