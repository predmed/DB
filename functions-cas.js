var curpage ="1";
var curpages="1";
var curms="1";
var casum;
var pagines;

function carregatext() {
  var elsermo, satribut, xhttp, xmlDoc, text, atrib, casum, resposta;
  elsermo = "text.xml";
  var satribut = document.FormContent.atribut.value; // = atribut buscat
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }	
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      xmlDoc=xhttp.responseXML;
      text="";
	  mssermo = xmlDoc.getElementsByTagName("ms");
      atrib = xmlDoc.getElementsByTagName("sermo");
	  document.getElementById("contador").innerHTML = "Para facilitar la b&#250;squeda, puede consultar <a href='info.html' target='_blank'> M&#225s informaci&#243n</a> y listados de <a href='manuscripts.html' target='_blank'>manuscritos</a> y <a href='feasts.html' target='_blank'>festividades</a>. Actualmente hay " + mssermo.length + " manuscritos y " + atrib.length + " sermones en la base de datos.";
	  }
   }
  xhttp.open("GET", elsermo, true);
  xhttp.send();
}

function resetcurpage() {
	curpage="1";
	provaatributs ()
}

function resetcurpages() { // linka a author()
	curms="1";
	text="";
	author ()
}

function resetms() {
	curms="1";
	document.getElementById("respostatag").innerHTML = "";
	manuscrit ()
}

function resetcont() {
	document.getElementById("tagindoc").innerHTML="";
	document.getElementById("respostatag").innerHTML = "";
	curpage="1";
	continguts ()
}

function resetfeast() {
	document.getElementById("respostatag").innerHTML = "";
	curfeast="1";
	curpages="1";
	pagines="1";
	positius="0";
	feast ()
}

function provaatributs() {
  var elsermo, satribut, xhttp, xmlDoc, coincid, coinc, respperpage, s, atrib, resposta, switching;
  document.getElementById("respostatext").innerHTML = "";
  document.getElementById("tagindoc").innerHTML = "";	
  elsermo = "text.xml";
  var satribut = document.FormContent.atribut.value; // = atribut buscat
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }	
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      xmlDoc = xhttp.responseXML;
	  text = "";
	  document.getElementById("respostatag").innerHTML = satribut;
	  //document.getElementById("tagindoc").innerHTML = xhttp.responseText;
      numser = 
	  atrib = xmlDoc.getElementsByTagName("cit");  //Per saber quantes etiquetes hi ha
	  resposta = atrib.length;
	  coincid="0";
	  coinc="0";
	  respperpage = "5";
	  s="0";
	 // calcula el número de resultats i les pagines a mostrar
	 for (d = 0; d < resposta; d++) {  //Repassa totes les etiquetes i obté l'atribut desitjat
	     var casum = xmlDoc.getElementsByTagName("cit")[d].getAttribute(satribut);
		 if  (casum == null) {
		 } else {
		 coincid++
             }
		 }
	   var pagines =  Math.ceil (coincid/respperpage);
       // Busca les respostes (atributs) i les mostra per pantalla	   
	   var minpag = (((curpage-1) * respperpage)+1);
	   var maxpag = curpage * respperpage;
	   for (s = 0; s < resposta; s++) {
	   var casos = xmlDoc.getElementsByTagName("cit")[s].getAttribute(satribut);
	   var same1 = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("same1");
	   var sipdf = xmlDoc.getElementsByTagName("cit")[s].parentNode.getAttribute("pdf");
         if  (coincid == 0) {
		 text = "La base de datos no contiene sermones para este Thema";
		 document.getElementById("tagindoc").innerHTML = text;
		 } 
		 else if (casos == null) {
			}
		 else if (coinc == maxpag ) {
		    }
		else if (curpage > 1 && coinc < minpag-1) {
		    coinc++
			}
		else if (curpage > 1 && coinc > maxpag) {
			coinc++
			text += "<hr/><table border='0' width='90%'><tr><td width='15%'>Thema:</td><td>" + casos + ": " + atrib[s].innerHTML + "</td></tr><tr><td width='10%'>Author</td><td>" + atrib[s].parentNode.getAttribute("author") + "</td></tr><tr><td width='25%'>Location</td><td>" + atrib[s].parentNode.getAttribute("settlement") + ", " + atrib[s].parentNode.getAttribute("repository") + ", " + atrib[s].parentNode.getAttribute("idno") + "</td></tr></table>";
			
			if (same1>"") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'>El mismo serm&#243;n en:</td><td>" + atrib[msc].getAttribute("same1") + "</td></tr></table>";
			 } else {textms += ""; }
			
			if ( sipdf !="") {
				 text += "<table border='0' width='90%'><tr><td width='15%'>Electronic edition:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver PDF</a></td></tr></table>";
			 } else {
				}
				
				
		    document.getElementById("tagindoc").innerHTML = "<table border='1' width='90%'><tr></tr></table>" + text; 
			}
        // <tr><td width='15%'></td><td>" + "<button class='btn' value='View on screen' onclick='window.location.href='" + atrib[s].parentNode.getAttribute('web') + ">View on screen</button>&nbsp;&nbsp;<button class='btn'>" + "PDF" + "</button></td></tr>			
		 else { // pàgina =1
			coinc++
			text += "<hr/><table border='0' width='90%'><tr><td width='15%'>Thema:</td><td>" + casos + ": " + atrib[s].innerHTML + "</td></tr><tr><td>Author</td><td>" + atrib[s].parentNode.getAttribute("author") + "</td></tr><tr><td>Location</td><td>" + atrib[s].parentNode.getAttribute("settlement") + ", " + atrib[s].parentNode.getAttribute("repository") + ", " + atrib[s].parentNode.getAttribute("idno") + "</td></tr><tr><td>Edition</td><td>" + atrib[s].parentNode.getAttribute("editor") + "<i>" + atrib[s].parentNode.getAttribute("title") + "</i>" + atrib[s].parentNode.getAttribute("pubPlace") + atrib[s].parentNode.getAttribute("publisher") + atrib[s].parentNode.getAttribute("date") + atrib[s].parentNode.getAttribute("pags") + "</td></tr></table>"; 
			// <tr><td>" + "<button class='btn' value='View on screen' onclick='window.location.href='" + atrib[s].parentNode.getAttribute('web') + ">View on screen</button>&nbsp;&nbsp;<button class='btn'>" + "PDF" + "</button></td></tr>
		    // <button class='btn' onclick='window.location.href=''" + atrib[s].parentNode.getAttribute('web') + "''>View on screen</button>
			
			if ( sipdf !="") {
				 text += "<table border='0' width='90%'><tr><td width='15%'>Electronic edition:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver PDF</a></td></tr></table>";
			 } else {
				}
			
			document.getElementById("tagindoc").innerHTML = "<table border='0' width='95%'><tr></tr></table>" + text; 
		}
	 
	  if (pagines == 0) {
		 } else if (pagines == 1 && curpage == 1) { // Si has arribat al final de la primera pàgina i només hi ha una pàgina. No posar  fletxes
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + coincid + " de " + coincid + " - P&#225;gina " + curpage + " of " + pagines;
		 } else if (curpage == 1) { // Si has arribat al final de la primera pàgina. En aquesta secció s'ha de posar les fletxes
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + maxpag + " de " + coincid + " - P&#225;gina " + curpage + " of " + pagines + "  <button class ='btn' onclick='mesu()'> Siguiente </button></td></tr></table>";
		 } else if (curpage == pagines) { // Si has arribat al final de les respostes = al final de la última pàgina
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + coincid + " de " + coincid + " - P&#225;gina " + curpage + " of " + pagines + "  <button class ='btn' onclick='menysu()'> Anterior </button></td></tr></table>";
		 } else {
		    document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + maxpag + " de " + coincid + " - P&#225;gina " + curpage + " of " + pagines + "  <button class ='btn' onclick='menysu()'> Anterior </button>&nbsp;&nbsp;<button class ='btn' onclick='mesu()'> Siguiente </button> </td> </tr> </table>";
		    }
         }
      }
   }
  xhttp.open("GET", elsermo, true);
  xhttp.send();
}

function mesu() {
	curpage++
	document.getElementById("tagindoc").innerHTML = "";
	provaatributs()
}

function menysu() {
	curpage--
	document.getElementById("tagindoc").innerHTML = "";
	provaatributs()
}

function toend () {
	curpage = pagines;
	document.getElementById("tagindoc").innerHTML = "";
	provaatributs()
}

function continguts () {    // ve de la cerca thema via resetcont()
  document.getElementById("respostatext").innerHTML="";
  document.getElementById("tagindoc").innerHTML = "";
  var elsermo, satribut, paraula, xhttp, xmlDoc, text, atrib, casum, resposta;
  elsermo = "text.xml";
  var satribut = document.FormContent.atribut.value; // = atribut buscat. A 'corpus'  document.FormContent.atribut.value;
  var paraula = document.getElementById("atribut").value;
  document.getElementById("tagindoc").innerHTML = satribut + " | " + paraula;
  
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }	
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      xmlDoc = xhttp.responseXML;
      //document.getElementById("respostatext").innerHTML = "";
	  //document.getElementById("tagindoc").innerHTML = xhttp.responseText;
      atrib = xmlDoc.getElementsByTagName("cit");
	  resposta = atrib.length;
	  text = "";
	  coincid="0";
	  numms="0";
	  resperpage="5"
	  countms="0";
	  var msc;
      	  
      for (countms = 0; countms < resposta; countms++) {
		 var msnum = xmlDoc.getElementsByTagName("cit")[countms].getAttribute("thema_verse");
		 if  (msnum == paraula) {
		 		 numms++
		   }
		}
		
       var pagines = Math.ceil (numms/resperpage);
	   var minpag = (((curms-1) * resperpage)+1);
	   var maxpag = curms * resperpage;
	  	   
      for (d = 0; d < resposta; d++) {
	     var casum = xmlDoc.getElementsByTagName("cit")[d].getAttribute("thema_verse");
  	     var sipdf = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("pdf");
		 var sisettlement2 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement2");
		 var sisettlement3 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement3");
		 var sisettlement4 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement4");
		 var sisettlement5 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement5");
		 var sisettlement6 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement6");
		 var sisettlement7 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement7");
		 var sisettlement8 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement8");
		 var sisettlement9 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement9");
		 var sisettlement10 = xmlDoc.getElementsByTagName("cit")[d].parentNode.getAttribute("settlement10");
		 		 
		 if  (curpage == 1 && casum == paraula && coincid < maxpag) {
		   	coincid++
			text += "<hr/><table border='0' width='90%'><tr><td width='15%'>Thema: </td><td>" + atrib[d].innerHTML + "</td></tr><tr><td>Autor:</td><td>" +	atrib[d].parentNode.getAttribute("author") + "</td></tr><tr><td>Localizaci&#243;n:</td><td>" + atrib[d].parentNode.getAttribute("settlement") + ", " + atrib[d].parentNode.getAttribute("repository") + ", " + atrib[d].parentNode.getAttribute("idno") + "</td></tr></table>";

			if (sisettlement2) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement2") + atrib[d].parentNode.getAttribute("repository2") + atrib[d].parentNode.getAttribute("idno2") + atrib[d].parentNode.getAttribute("folio2") + "</td></tr></table>";
			}
			if (sisettlement3) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement3") + atrib[d].parentNode.getAttribute("repository3") + atrib[d].parentNode.getAttribute("idno3") + atrib[d].parentNode.getAttribute("folio3") + "</td></tr></table>";
			}
			if (sisettlement4) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement4") + atrib[d].parentNode.getAttribute("repository4") + atrib[d].parentNode.getAttribute("idno4") + atrib[d].parentNode.getAttribute("folio4") + "</td></tr></table>";
			}
			if (sisettlement5) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement5") + atrib[d].parentNode.getAttribute("repository5") + atrib[d].parentNode.getAttribute("idno5") + atrib[d].parentNode.getAttribute("folio5") + "</td></tr></table>";
			}
			if (sisettlement6) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement6") + atrib[d].parentNode.getAttribute("repository6") + atrib[d].parentNode.getAttribute("idno6") + atrib[d].parentNode.getAttribute("folio6") + "</td></tr></table>";
			}
			if (sisettlement7) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement7") + atrib[d].parentNode.getAttribute("repository7") + atrib[d].parentNode.getAttribute("idno7") + atrib[d].parentNode.getAttribute("folio7") + "</td></tr></table>";
			}
			if (sisettlement8) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement8") + atrib[d].parentNode.getAttribute("repository8") + atrib[d].parentNode.getAttribute("idno8") + atrib[d].parentNode.getAttribute("folio8") + "</td></tr></table>";
			}
			if (sisettlement9) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement9") + atrib[d].parentNode.getAttribute("repository9") + atrib[d].parentNode.getAttribute("idno9") + atrib[d].parentNode.getAttribute("folio9") + "</td></tr></table>";
			}
			if (sisettlement10) { 
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[d].parentNode.getAttribute("settlement10") + atrib[d].parentNode.getAttribute("repository10") + atrib[d].parentNode.getAttribute("idno10") + atrib[d].parentNode.getAttribute("folio10") + "</td></tr></table>";
			}			
			
			text+="<table border='0' width='90%'><tr><td width='15%'>Edici&#243;n:</td><td>" + atrib[d].parentNode.getAttribute("editor") + ", <i>" + atrib[d].parentNode.getAttribute("title") + "</i>, " + atrib[d].parentNode.getAttribute("pubPlace") + atrib[d].parentNode.getAttribute("publisher") + atrib[d].parentNode.getAttribute("date") + atrib[d].parentNode.getAttribute("pags") + "</td></tr></table>";
			
			if ( sipdf !="") {
			text += "<table border='0' width='90%'><tr><td width='15%'>Electronic edition:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver PDF</a></td></tr></table>";
			 } else {
				}	
					
			document.getElementById("tagindoc").innerHTML = "<table><tr></tr></table>" + text;
		 	   } else if  (curpage > 1 && casum == paraula && coincid < minpag) { // Quan casos < minpag no imprimeixis els resultats pero suma 1 a coinc
			coincid++ 
		 }
         // <a href class='btn'=" + atrib[d].parentNode.getAttribute("web") + " target = '_blank'>Link</a>
 		 if  (curpage > 1 && casum == paraula && coincid >= minpag && coincid <= maxpag) { // Les 'normals' a partir de la pàgina 2
            coincid++
			text += "<hr/><table border='0' width='90%'><tr><td width='15%'>Thema: </td><td>" + atrib[d].innerHTML + "</td></tr><tr><td>Autor (predicador):</td><td" + atrib[d].parentNode.getAttribute("author") + "</td></tr><tr><td>Localizaci&#243;n:</td><td>" + atrib[d].parentNode.getAttribute("settlement") + ", " + atrib[d].parentNode.getAttribute("repository") + ", " + atrib[d].parentNode.getAttribute("idno") + "</td></tr></table>";
			
			if ( sipdf !="") {
			text += "<table border='0' width='90%'><tr><td width='15%'>Edici&#243;n electr&#243;nica:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver PDF</a></td></tr></table>";
			 } else {
				}
			
	        document.getElementById("respostatext").innerHTML = "<table><tr></tr></table>" + text;
		  }
		 		 
		if  (pagines == 1 && coincid == 0) {
			 document.getElementById("respostatext").innerHTML = "La base de datos no contiene sermones para este autor.";
		 } else if (pagines == 1 && curpage ==1) { // Si estàs (al final de la) primera pàgina i només hi ha una pàgina. No posar  fletxes
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + coincid + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "</td></tr></table>";
		 } else if (curpage == 1) { // Si has arribat al final de la primera pàgina, només fletxa Next
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + maxpag + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "  <button class='btn' onclick='mesms()'> Siguiente </button></td></tr></table>";
		 } else if (curpage == pagines && coincid > numms) { // Si has arribat al final de les respostes = al final de la última pàgina, només fletxa Prev
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + numms + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "  <button class='btn' onclick='menysms()'> Anterior </button></td></tr></table>";
		 }  else if (curpage == pagines) { // Si has arribat al final de les respostes = al final de la última pàgina, només fletxa Prev
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + numms + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "  <button class='btn' onclick='menysms()'> Anterior </button></td></tr></table>";
		} else {
		    document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + maxpag + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "  <button class='btn' onclick='menysms()'> Anterior </button>&nbsp;&nbsp;<button class='btn' onclick='mesms()'> Siguiente </button> </td> </tr> </table>";
		       }
		    }
		 }
      }
  xhttp.open("GET", elsermo, true);
  xhttp.send();
}

function afegit () {
   	elsermo = "text.xml";
	var valor = document.FormContent.tipo.value;
	
	if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }	
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    xmlDoc = xhttp.responseXML;
	text="<hr/>";
	respo="0";
	resp = xmlDoc.getElementsByTagName(valor);
	
  		for (respo = 0; respo < resp.length; respo++) {
        var respi = xmlDoc.getElementsByTagName(valor)[respo];
		text += "<table border='0' width='90%'><tr><td width='15%'>T&#237;tulo</td><td>" + respi.getAttribute("titol") + "</td></tr><tr><td width='15%'>Autor</td><td>" + respi.getAttribute("author") + "</td></tr><tr><td>Localizaci&#243;n</td><td>" + respi.getAttribute("settlement1") + ", " + respi.getAttribute("repository1") + ", " + respi.getAttribute("idno1") + "</td></tr></table>";

		if  ( respi.getAttribute("settlement2") !="") {
			text += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + respi.getAttribute("settlement2") + ", " + respi.getAttribute("repository2") + ", " + respi.getAttribute("idno2")  + "</td></tr></table>";
			}	 else { text +="";
				}
		if  ( respi.getAttribute("editor") !="") {
			text += "<table border='0' width='90%'><tr><td width='15%'>Edici&#243;n</td><td>" + respi.getAttribute("editor") + ", " + respi.getAttribute("title") + "</td></tr></table>";
			}	 else { text +="";
				}

		if  ( respi.getAttribute("bibliografia") !="") {
			text += "<br/><table border='0' width='90%'><tr><td width='15%'>Bibliograf&#237;a</td><td>" + respi.getAttribute("bibliografia") + "</td></tr></table>";
			}	 else { text +="";
				}				
		
		text += "<hr/>"
		document.getElementById("tagindoc").innerHTML = text;

		}
	 }
  }
	xhttp.open("GET", elsermo, true);
	xhttp.send();
}

function manuscrit() { // ve de la cerca manuscrit via resetms
  document.getElementById("respostatag").innerHTML = "";
  var elsermo, satribut, xhttp, xmlDoc, textms, atrib, casum, resposta;
  elsermo="text.xml";
  var satribut = document.FormContent.manus.value; // = atribut buscat
  var paraula = document.getElementById("ms").value;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }	
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      xmlDoc = xhttp.responseXML;
      document.getElementById("respostatext").innerHTML = "";
	  //document.getElementById("respostatext").innerHTML = xhttp.responseText;
	  mssermo = xmlDoc.getElementsByTagName("ms");
      atrib = xmlDoc.getElementsByTagName("sermo");
	  ars = xmlDoc.getElementsByTagName("ars");
	  resposta = atrib.length;
	  text="";
	  textms="";
	  coincid="0";
      numms="0";
	  resperpage="5"
	  countms="0";
	  var msc;
	  var mssermolength = mssermo.length;
  	  for (d = 0; d < mssermolength; d++) {
        casum = xmlDoc.getElementsByTagName("ms")[d].getAttribute("codims");
 		siwebdig = xmlDoc.getElementsByTagName("ms")[d].getAttribute("webdig");
        if (casum == null) {  // Primer recompte per saber quantes coincidències hi ha
			document.getElementById("respostatag").innerHTML = "La base de datos todavía no contiene los sermones de este manuscrito. Esperamos a&#241;adirlos pr&#243;ximamente." + paraula + " --" + casum + "--" + mssermolength + "--" + siwebdig;
			} else if (casum == paraula) {
			text += "<table border='0' width='90%'><tr><td colspan='2'><b>" + mssermo[d].getAttribute("settlement") + ", " + mssermo[d].getAttribute("repository") + ", " + mssermo[d].getAttribute("idno") + "</b></td></tr></table>";

			if  ( mssermo[d].getAttribute("author") !="") {
				text += "<table border='0' width='90%'><tr><td width='15%'>Autor:</td><td>" + mssermo[d].getAttribute("author") + "</td></tr></table>";
			}	 else {
				 text += "";
				}
			
			if  ( mssermo[d].getAttribute("settlement2") !="") {
				text += "<table border='0' width='90%'><tr><td width='15%'>Informaci&#243n:</td><td>" + mssermo[d].getAttribute("informacio") + "</td></tr></table>";
			}	 else {
				 text += "";
				}
						
			if  ( mssermo[d].getAttribute("editor") !="") {
				text += "<table border='0' width='90%' ><tr><td width='15%'>Edici&#243n</td><td>" + mssermo[d].getAttribute("editor") + ", <i>" + mssermo[d].getAttribute("title") + "</i>. " + mssermo[d].getAttribute("pubPlace") + ", " + mssermo[d].getAttribute("publisher") + ", " + mssermo[d].getAttribute("date") + "</td></tr></table>";
			}	 else {
				 text += "";
				}
			
			if  ( mssermo[d].getAttribute("bibliografia") !="") {
				text += "<table border='0' width='90%' ><tr><td width='15%'>Bibliograf&#237;a:</td><td>" + mssermo[d].getAttribute("bibliografia") + "</td></tr></table>";
			}	 else {
				 }
			
			if (siwebdig) {
			   text += "<table><tr><td><a href=" + mssermo[d].getAttribute("webdig") + " class='btn' target= '_blank'>Manuscrito digitalizado (Enlace o descarga directa)</a></td></tr></table>";
			 }	
       	   		  document.getElementById("respostatag").innerHTML = text; 
            }
		  }
	     
      for (countms = 0; countms < resposta; countms++) { //Cerca de les respostes i presentació
		 var msnum = xmlDoc.getElementsByTagName("sermo")[countms].getAttribute("codims");
		 				 
		 if  (msnum == null) {
		 }	 else if  (msnum == paraula) {
		 		 numms++
		   }
		}
       var pagines = Math.ceil (numms/resperpage);
	   var minpag = (((curms-1) * resperpage)+1);
	   var maxpag = curms * resperpage;
	   var textpdf="";

		for (msc = 0; msc < resposta; msc++) {
	     var casum = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("codims");
		 var same1 = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("same1");
		 var same2 = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("same2");
 		 var same3 = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("same3");
 		 var same4 = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("same4");
		 var same5 = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("same5");
		 var same6 = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("same6");
		 var same7 = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("same7");
		 var sipdf = xmlDoc.getElementsByTagName("sermo")[msc].getAttribute("pdf");

		 if (curms == 1 && casum == paraula && coincid < maxpag) { //Primera pàgina
		 	 coincid++
			 textms += "<hr/><table border='0' width='90%'><tr><td width='15%'>Localizaci&#243;n:</td><td>" + atrib[msc].getAttribute("settlement") + ", " + atrib[msc].getAttribute("repository") + ", " + atrib[msc].getAttribute("idno") + "</td></tr><tr><td>Thema:</td><td>" + atrib[msc].children[0].getAttribute("thema_verse") + ": " + atrib[msc].children[0].innerHTML + "</td></tr><tr><td>Autor (predicador):</td><td>" + atrib[msc].getAttribute("author") + "</td></tr></table>";
			 
			if  ( atrib[msc].getAttribute("editor") !="") {
				textms += "<table border='0' width='90%'><tr><td width='15%'> Edici&#243;n:</td><td>" +  atrib[msc].getAttribute("editor") + ", <i>" + atrib[msc].getAttribute("title") + "</i>, " + atrib[msc].getAttribute("pubPlace") + ", " + atrib[msc].getAttribute("publisher") + ", " + atrib[msc].getAttribute("date") + ", " + atrib[msc].getAttribute("pags") + "</td></tr></table>";
			}	 else {
				 textms += "";
				}
			
			if ( same1>"") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'>El mismo serm&#243;n en:</td><td>" + atrib[msc].getAttribute("same1") + "</td></tr></table>";
			 } else {textms += ""; }
			
			if ( same2>"") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[msc].getAttribute("same2") + "</td></tr></table>";
			 } else {textms += ""; }
			
			if ( same3>"") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[msc].getAttribute("same3") + "</td></tr></table>";
			 } else {textms += ""; }
			
			if ( same4>"") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[msc].getAttribute("same4") + "</td></tr></table>";
			 } else {textms += ""; }

			if ( same5>"") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[msc].getAttribute("same5") + "</td></tr></table>";
			 } else {textms += ""; }
			 
			if ( same6>"") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[msc].getAttribute("same6") + "</td></tr></table>";
			 } else {textms += ""; } 
			
			if ( same7>"") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'></td><td>" + atrib[msc].getAttribute("same7") + "</td></tr></table>";
			 } else {textms += ""; }
			
			if ( sipdf !="") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'>Edici&#243;n electr&#243;nica:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver PDF</a></td></tr></table>";
			 } else { textms += "";}
				
			document.getElementById("tagindoc").innerHTML = "<table border='0' width='90%'><tr></tr></table>" + textms;
		 }
 		 else if  (curms > 1 && casum == paraula && coincid < minpag) { // Quan casos < minpag no imprimeixis els resultats pero suma 1 a coinc
			coincid++ 
		 }

		 if  (curms > 1 && casum == paraula && coincid >= minpag && coincid <= maxpag) { // Les 'normals' a partir de la pàgina 2
			 coincid++
			 textms += "<hr/><table border='0' width='90%'><tr><td width='15%'>Localizaci&#243;n:</td><td>" + atrib[msc].getAttribute("settlement") + ", " + atrib[msc].getAttribute("repository") + ", " + atrib[msc].getAttribute("idno") + "</td></tr><tr><td>Thema:</td><td>" + atrib[msc].children[0].getAttribute("thema_verse") + ": " + atrib[msc].children[0].innerHTML + "</td></tr><tr><td>Autor (predicador):</td><td>" + atrib[msc].getAttribute("author") + "</td></tr></table>";
			 	 
			 if  ( atrib[msc].getAttribute("editor") !="") {
				textms += "<table border='0' width='90%'><tr><td width='15%'> Edici&#243;n:</td><td>" +  atrib[msc].getAttribute("editor") + ", <i>" + atrib[msc].getAttribute("title") + "</i>. " + atrib[msc].getAttribute("pubPlace") + ", " + atrib[msc].getAttribute("publisher") + ", " + atrib[msc].getAttribute("date") + ", " + atrib[msc].getAttribute("pags") + "</td></tr></table>";
			}	 else {textms += ""; }
			 
			 if ( sipdf !="") {
				 textms += "<table border='0' width='90%'><tr><td width='15%'>Edici&#243;n electr&#243;nica</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver PDF</a></td></tr></table>";
			 } else { textms += ""; }
			 			 
			 document.getElementById("tagindoc").innerHTML = "<table border='0' width='90%'><tr></tr></table>" + textms;
		 }
			 
		if  (numms == 0) {
			 document.getElementById("tagindoc").innerHTML = "";
			 document.getElementById("tagindoc").innerHTML = "Manuscrito en fase de vaciado. Pr&#243;ximamente se especificar&#225;n los sermones que lo componen.";
		 } else if (pagines == 1 && curms ==1) { // Si estàs (al final de la) primera pàgina i només hi ha una pàgina. No posar  fletxes
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + coincid + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "</td></tr></table>";
		 } else if (curms == 1) { // Si has arribat al final de la primera pàgina, només fletxa Next
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + coincid + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "  <button class='btn' onclick='mesms()'> Siguiente </button></td></tr></table>";
		 } else if (curms == pagines && coincid > numms) { // Si has arribat al final de les respostes = al final de la última pàgina, només fletxa Prev
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + (coincid-1) + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "  <button class='btn' onclick='menysms()'> Anterior </button></td></tr></table>";
		 }  else if (curpages == pagines) { // Si has arribat al final de les respostes = al final de la última pàgina, només fletxa Prev
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + (coincid-1) + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "  <button class='btn' onclick='menysms()'> Anterior </button></td></tr></table>";
		} else {
		    document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + (coincid-1) + " de " + numms + " - P&#225;gina " + curms + " de " + pagines + "  <button class='btn' onclick='menysms()'> Anterior </button>&nbsp;&nbsp;<button class='btn' onclick='mesms()'> Siguiente </button> </td> </tr> </table>";
		       }
           }
	   }
   }
  xhttp.open("GET", elsermo, true);
  xhttp.send();
}

 function author () {
  document.getElementById("respostatag").innerHTML = "";
  var elsermo, satribut, xhttp, xmlDoc, text, atrib, casum, resposta;
  elsermo = "text.xml";
  var satribut = document.FormContent.pred.value; // = atribut buscat
  var paraula = document.getElementById("pred").value;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }	
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      xmlDoc = xhttp.responseXML;
      document.getElementById("respostatext").innerHTML = "";
	  //document.getElementById("tagindoc").innerHTML = xhttp.responseText;
      getms= xmlDoc.getElementsByTagName("ms");
	  totms = getms.length;
	  atrib = xmlDoc.getElementsByTagName("sermo");
	  resposta = atrib.length;
	  document.getElementById("tagindoc").innerHTML = "";
	  text = "";
	  coincid="0";
      incid="0";
	  coinc="0";
	  respperpage="5";
	  s="0";
	  var positius = "0";
	  for (d = 0; d < resposta; d++) { // conta els sermons amb autor buscat
	     var casum = xmlDoc.getElementsByTagName("sermo")[d].getAttribute("author");
		 
		 if  (casum == null) {
		 } else if (casum == paraula) {
		 positius++
            }
        }

//		var msstrobats="0";
//		for (mss = 0; mss < totms; mss++) { // conta els manuscrits amb autor buscat
//	     var trobats = xmlDoc.getElementsByTagName("ms")[mss].getAttribute("author");
//		 if  (trobats == null) {
//		 } else if (trobats == paraula) {
//		 msstrobats++
//           }
//       }

 	   var pagines = Math.ceil (positius/respperpage);
	   var minpag = (((curpages-1) * respperpage)+1);
	   var maxpag = curpages * respperpage;
	   for (s = 0; s < resposta; s++) { // resposta = tots els sermons
         var casos = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("author");
		 var sipdf = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("pdf");
		 var sieditor = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("editor");
		 var sisettlement2 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement2");
		 var sisettlement3 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement3");
		 var sisettlement4 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement4");
		 var sisettlement5 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement5");
		 var sisettlement6 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement6");
		 var sisettlement7 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement7");
		 var sisettlement8 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement8");
		 var sisettlement9 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement9");
		 var sisettlement10 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement10");
		 		 
		 if (curpages == 1 && casos == paraula && coinc < maxpag) { //Primera pàgina
		    coinc++;
		    text += "<hr/><table border='0' width='100%'><tr><td width='15%'>Thema</td><td>" + atrib[s].children[0].getAttribute("thema_verse") + ": " + atrib[s].children[0].innerHTML + "</tr><tr><td>Manuscrito: </td><td>" + atrib[s].getAttribute("settlement") + ", " + atrib[s].getAttribute("repository") + ", " + atrib[s].getAttribute("idno") + "</td></tr></table>";
			
			if (sisettlement2) { 
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement2") + ", " + atrib[s].getAttribute("repository2") + ", " + atrib[s].getAttribute("idno2") + "</td></tr></table>";
			}
	        if (sisettlement3) {
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement3") + ", " + atrib[s].getAttribute("repository3") + ", " + atrib[s].getAttribute("idno3") + "</td></tr></table>";
			}
			if (sisettlement4) {
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement4") + ", " + atrib[s].getAttribute("repository4") + ", " + atrib[s].getAttribute("idno4") + "</td></tr></table>";
			} 
			if (sisettlement5) {
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement5") + ", " + atrib[s].getAttribute("repository5") + ", " + atrib[s].getAttribute("idno5") + "</td></tr></table>";
			} 
			if (sisettlement6) {
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement6") + ", " + atrib[s].getAttribute("repository6") + ", " + atrib[s].getAttribute("idno6") + atrib[s].getAttribute("folio6") +"</td></tr></table>";
			} 
			if (sisettlement7) {
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement7") + ", " + atrib[s].getAttribute("repository7") + ", " + atrib[s].getAttribute("idno7") + atrib[s].getAttribute("folio7") +"</td></tr></table>";
			} 
			if (sisettlement8) {
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement8") + ", " + atrib[s].getAttribute("repository8") + ", " + atrib[s].getAttribute("idno8") + atrib[s].getAttribute("folio8") +"</td></tr></table>";
			} 
			if (sisettlement9) {
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement9") + ", " + atrib[s].getAttribute("repository9") + ", " + atrib[s].getAttribute("idno9") + atrib[s].getAttribute("folio9") +"</td></tr></table>";
			} 
			if (sisettlement10) {
			text += "<table border='0' width='100%'><tr><td width='15%'></td><td>" + atrib[s].getAttribute("settlement10") + ", " + atrib[s].getAttribute("repository10") + ", " + atrib[s].getAttribute("idno10") + atrib[s].getAttribute("folio10") +"</td></tr></table>";
			} 
						
			if  ( sieditor !="") {
				text += "<table border='0' width='100%'><tr><td width='15%'>Edici&#243;n: </td><td>" + atrib[s].getAttribute("editor") + ", <i>" + atrib[s].getAttribute("title") + "</i>. " + atrib[s].getAttribute("pubPlace") + ", " + atrib[s].getAttribute("publisher") + ", " + atrib[s].getAttribute("date") + ", p. " + atrib[s].getAttribute("pags") +"</td></tr></table>";
				}	 else {
				}
					
			 if ( sipdf !="") {
			 text += "<table border='0' width='100%'><tr><td width='15%'>Edici&#243;n electr&#243;nica:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver  PDF</a></td></tr></table>";
			 } else {
				}
			document.getElementById("tagindoc").innerHTML = "<table border='0' width='100%'></table>" + text;
			}
			
		 if  (curpages > 1 && casos == paraula && coinc < minpag) { // Quan casos < minpag no imprimeixis els resultats pero suma 1 a coinc
			coinc++ 
		 }
		 if  (curpages > 1 && casos == paraula && coinc >= minpag && coinc <= maxpag) { //Pàgines de la 2 a la última -1
			coinc++
		    text += "<hr/><table border='0' width='100%'><tr><td width='15%'>Thema</td><td>" + atrib[s].children[0].getAttribute("thema_verse") + ": " + atrib[s].children[0].innerHTML + "</tr><tr><td>Manuscrito: </td><td>" + atrib[s].getAttribute("settlement") + ", " + atrib[s].getAttribute("repository") + ", " + atrib[s].getAttribute("idno") + "</td></tr></table>";
	         
		 if  ( sieditor !="") {
				text += "<table border='0' width='100%'><tr><td width='15%'>Edici&#243;n: </td><td>" + atrib[s].getAttribute("editor") + ", <i>" + atrib[s].getAttribute("title") + "</i>. " + atrib[s].getAttribute("pubPlace") + ", " + atrib[s].getAttribute("publisher") + ", " + atrib[s].getAttribute("date") + ", p. " + atrib[s].getAttribute("pags") +"</td></tr></table>";
				}	 else {
				}
			 
			 if ( sipdf !="") {
			 text += "<table border='0' width='100%'><tr><td width='15%'>Edici&#243;n electr&#243;nica:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver  PDF</a></td></tr></table>";
			 } else {
				}
			document.getElementById("tagindoc").innerHTML = "<table border='0' width='100%'></table>" + text;
			}
			 
	
		 if  (pagines ==0 && coinc == 0) {
			document.getElementById("respostatext").innerHTML = "La base de datos no contiene sermones de este autor";
		 } else if (pagines == 1 && curpages ==1) { // Si estàs (al final de la) primera pàgina i només hi ha una pàgina. No posar  fletxes
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + positius + " de " + positius + " - P&#225;gina " + curpages + " de " + pagines + "</td></tr></table>";
		 } else if (curpages == 1) { // Si has arribat al final de la primera pàgina, només fletxa Next
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + maxpag + " de " + positius + " - P&#225;gina " + curpages + " de " + pagines + "  <button class='btn' onclick='mesu4()'> Siguiente </button></td></tr></table>";
		 } else if (curpages == pagines && coinc > positius) { // Si has arribat al final de les respostes = al final de la última pàgina, només fletxa Prev + reinicia pagines
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + positius + " de " + positius + " - P&#225;gina " + curpages + " de " + pagines + "  <button class='btn' onclick='menysu4()'> Anterior </button></td></tr></table>";
		 }  else if (curpages == pagines) { // Si has arribat al final de les respostes = al final de la última pàgina, només fletxa Prev
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + positius + " de " + positius + " - P&#225;gina " + curpages + " de " + pagines + "  <button class='btn' onclick='menysu4()'> Anterior </button></td></tr></table>";
		} else {
		    document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + maxpag + " de " + positius + " - P&#225;gina " + curpages + " de " + pagines + "  <button class='btn' onclick='menysu4()'> Anterior </button>&nbsp;&nbsp;<button class='btn' onclick='mesu4()'> Siguiente </button> </td> </tr> </table>";
              }
		  }
	   }
   }
  xhttp.open("GET", elsermo, true);
  xhttp.send();	
}

function feast () {
  var elsermo, satribut, xhttp, xmlDoc, text, atrib, casum, resposta;
  elsermo = "text.xml";
  var satribut = document.FormContent.pred.value; // = atribut buscat
  var paraula = document.getElementById("feast").value;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
    } else {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }	
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      xmlDoc = xhttp.responseXML;
      document.getElementById("respostatext").innerHTML = "";
	  //document.getElementById("tagindoc").innerHTML = xhttp.responseText;
      atrib = xmlDoc.getElementsByTagName("sermo");
	  resposta = atrib.length;
	  document.getElementById("tagindoc").innerHTML = "";
	  text = "";
	  curpages="1";
	  coincid="0";
      incid="0";
	  coinc="0";
	  respperpage="5";
	  s="0";
	  var positius = "0";
	  for (d = 0; d < resposta; d++) {
	     var casum = xmlDoc.getElementsByTagName("sermo")[d].getAttribute("feast");
		 if  (casum == null) {
		 } else if (casum == paraula) {
		 positius++
            }
        }
 	   var pagines = Math.ceil (positius/respperpage);
	   var minpag = (((curpages-1) * respperpage)+1);
	   var maxpag = curpages * respperpage;
	   for (s = 0; s < resposta; s++) { // resposta = tots els sermons
         var casos = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("feast");
		 var sipdf = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("pdf");
		 var sisettlement2 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement2");
		 var sisettlement3 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement3");
		 var sisettlement4 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement4");
		 var sisettlement5 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement5");
		 var sisettlement6 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement6");
		 var sisettlement7 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement7");
		 var sisettlement8 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement8");
		 var sisettlement9 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement9");
		 var sisettlement10 = xmlDoc.getElementsByTagName("sermo")[s].getAttribute("settlement10");
         var editor=xmlDoc.getElementsByTagName("sermo")[s].getAttribute("editor");		 
		 
		 if (curfeast == 1 && casos == paraula && coinc < maxpag) { //Primera pàgina
		    coinc++;
		    text += "<hr/><table border='0' width='100%'><tr><td width='15%'>Thema</td><td>" + atrib[s].children[0].getAttribute("thema_verse") + ": " + atrib[s].children[0].innerHTML + "</tr><tr><td>Manuscript: </td><td>" + atrib[s].getAttribute("settlement") + ", " + atrib[s].getAttribute("repository") + ", " + atrib[s].getAttribute("idno") + "</td></tr>";
			
			if (sisettlement2) {text += "<tr><td></td><td>" + sisettlement2 + atrib[s].getAttribute("repository2") + atrib[s].getAttribute("idno2") + "</td></tr>";}
	        if (sisettlement3) {text += "<tr><td></td><td>" + sisettlement3 + atrib[s].getAttribute("repository3") + atrib[s].getAttribute("idno3") + "</td></tr>";}
			if (sisettlement4) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement4") + atrib[s].getAttribute("repository4") + atrib[s].getAttribute("idno4") + "</td></tr>";} 
			if (sisettlement5) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement5") + atrib[s].getAttribute("repository5") + atrib[s].getAttribute("idno5") + "</td></tr>";} 
			if (sisettlement6) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement6") + atrib[s].getAttribute("repository6") + atrib[s].getAttribute("idno6") + "</td></tr>";}
			if (sisettlement7) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement7") + atrib[s].getAttribute("repository7") + atrib[s].getAttribute("idno7") + "</td></tr>";} 
			if (sisettlement8) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement8") + atrib[s].getAttribute("repository8") + atrib[s].getAttribute("idno8") + "</td></tr>";} 
			if (sisettlement9) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement9") + atrib[s].getAttribute("repository9") + atrib[s].getAttribute("idno9") + "</td></tr>";} 
			if (sisettlement10) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement10") + atrib[s].getAttribute("repository10") + atrib[s].getAttribute("idno10") + "</td></tr>";			} 
						
			if (editor) {
			text += "<tr><td>Edition: </td><td>" + atrib[s].getAttribute("editor") + ", " + "<i>" + atrib[s].getAttribute("title") + "</i> " + atrib[s].getAttribute("pubPlace") + atrib[s].getAttribute("publisher") + atrib[s].getAttribute("date") + ", pags. " + atrib[s].getAttribute("pags") +"</td></tr></table>";
			}
			
			 if ( sipdf !="") {
			 text += "<table border='0' width='100%'><tr><td width='15%'>Electronic edition:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver PDF</a></td></tr></table>";
			 } else {
				}
			document.getElementById("tagindoc").innerHTML = "<table border='0' width='100%'></table>" + text;
			}
			
		 else if  (curfeast > 1 && casos == paraula && coinc < minpag) { // Quan casos < minpag no imprimeixis els resultats pero suma 1 a coinc
			coinc++
		 if  (curpages > 1 && casos == paraula && coinc >= minpag && coinc <= maxpag) {
			 coinc++
		    text += "<hr/><table border='0' width='100%'><tr><td width='15%'>Thema</td><td>" + atrib[s].children[0].getAttribute("thema_verse") + ": " + atrib[s].children[0].innerHTML + "</tr><tr><td>Manuscript: </td><td>" + atrib[s].getAttribute("settlement") + ", " + atrib[s].getAttribute("repository") + ", " + atrib[s].getAttribute("idno") + "</td></tr>;
	         
 			if (sisettlement2) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement2") + atrib[s].getAttribute("repository2") + atrib[s].getAttribute("idno2") + "</td></tr>";}
	        if (sisettlement3) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement4") + atrib[s].getAttribute("repository3") + atrib[s].getAttribute("idno3") + "</td></tr>";}
			if (sisettlement4) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement4") + atrib[s].getAttribute("repository4") + atrib[s].getAttribute("idno4") + "</td></tr>";} 
			if (sisettlement5) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement5") + atrib[s].getAttribute("repository5") + atrib[s].getAttribute("idno5") + "</td></tr>";} 
			if (sisettlement6) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement6") + atrib[s].getAttribute("repository6") + atrib[s].getAttribute("idno6") + "</td></tr>";}
			if (sisettlement7) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement7") + atrib[s].getAttribute("repository7") + atrib[s].getAttribute("idno7") + "</td></tr>";} 
			if (sisettlement8) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement8") + atrib[s].getAttribute("repository8") + atrib[s].getAttribute("idno8") + "</td></tr>";} 
			if (sisettlement9) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement9") + atrib[s].getAttribute("repository9") + atrib[s].getAttribute("idno9") + "</td></tr>";} 
			if (sisettlement10) {text += "<tr><td></td><td>" + atrib[s].getAttribute("settlement10") + atrib[s].getAttribute("repository10") + atrib[s].getAttribute("idno10") + "</td></tr>";}
			 
			if (editor) {			
			text += "<tr><td>Edition: </td><td>" + atrib[s].getAttribute("editor") + ", " + "<i>" + atrib[s].getAttribute("title") + "</i> " + atrib[s].getAttribute("pubPlace") + atrib[s].getAttribute("publisher") + atrib[s].getAttribute("date") + ", pags. " + atrib[s].getAttribute("pags") +"</td></tr></table>";
			}
			 
			 if (sipdf !="") {
				 text += "<table border='0' width='100%'><tr><td width='15%'>Electronic edition:</td><td>" + "<a href=" + sipdf + " class='btn' target= '_blank'>Ver PDF</a></td></tr></table>";
			 } else {
				}
			 document.getElementById("tagindoc").innerHTML = "<table></table>" + text;
		     }
	      else {
			 }

		 if  (pagines ==0 && coinc == 0) {
			 document.getElementById("respostatext").innerHTML = "La base de datos no contiene sermones para esta festividad";
		 } else if (pagines == 1 && curpages ==1) { // Si estàs (al final de la) primera pàgina i només hi ha una pàgina. No posar  fletxes
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + positius + " de " + positius + " - P&#225;gina " + curpages + " de2 " + pagines + "</td></tr></table>";
		 } else if (curpages == 1) { // Si has arribat al final de la primera pàgina, només fletxa Next
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + maxpag + " de " + positius + " - P&#225;gina " + curpages + " de3 " + pagines + "  <button class='btn' onclick='mesu4()'> Siguiente </button></td></tr></table>";
		 } else if (curpages == pagines && coinc > positius) { // Si has arribat al final de les respostes = al final de la última pàgina, només fletxa Prev + reinicia pagines
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + positius + " de " + positius + " - P&#225;gina " + curpages + " de4 " + pagines + "  <button class='btn' onclick='menysu4()'> Anterior </button></td></tr></table>";
		 }  else if (curpages == pagines) { // Si has arribat al final de les respostes = al final de la última pàgina, només fletxa Prev
            document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td> Resultados " + minpag + " a " + positius + " de " + positius + " - P&#225;gina " + curpages + " de5 " + pagines + "  <button class='btn' onclick='menysu4()'> Anterior </button></td></tr></table>";
		} else {
		    document.getElementById("respostatext").innerHTML = "<table border='0' style='margin: auto;'><tr><td><button class='btn' onclick='menysu4()'> Anterior </button>&nbsp;&nbsp;Resultados " + minpag + " a " + maxpag + " de6 " + positius + " - P&#225;gina " + curpages + " de " + pagines + "&nbsp;&nbsp;<button class='btn' onclick='mesu4()'> Siguiente </button> </td> </tr> </table>";
              }
		  }
	   }
   }
  xhttp.open("GET", elsermo, true);
  xhttp.send();	
}

function mesu4() {
	curpages++
	document.getElementById("tagindoc").innerHTML = "";
	author()
}

function menysu4() {
	curpages--
	document.getElementById("tagindoc").innerHTML = "";
	author()
}

function mesms() {
	curms++
	document.getElementById("tagindoc").innerHTML = "";
	manuscrit()
}

function menysms() {
	curms--
	document.getElementById("tagindoc").innerHTML = "";
	manuscrit()
}


(function () {

var _ = function (input, o) {
	var me = this;
    
    // Keep track of number of instances for unique IDs
    Awesomplete.count = (Awesomplete.count || 0) + 1;
    this.count = Awesomplete.count;

	// Setup

	this.isOpened = false;

	this.input = $(input);
	this.input.setAttribute("autocomplete", "off");
	this.input.setAttribute("aria-owns", "awesomplete_list_" + this.count);
	this.input.setAttribute("role", "combobox");

	o = o || {};

	configure(this, {
		minChars: 2,
		maxResultados: 25,
		autoFirst: true,
		data: _.DATA,
		filter: _.FILTER_CONTAINS,
		sort: o.sort === false ? false : _.SORT_BYLENGTH,
		item: _.ITEM,
		replace: _.REPLACE
	}, o);

	this.index = -1;

	// Create necessary elements

	this.container = $.create("div", {
		className: "awesomplete",
		around: input
	});

	this.ul = $.create("ul", {
		hidden: "hidden",
        role: "listbox",
        id: "awesomplete_list_" + this.count,
		inside: this.container
	});

	this.status = $.create("span", {
		className: "visually-hidden",
		role: "status",
		"aria-live": "assertive",
        "aria-atomic": true,
        inside: this.container,
        //textContent: this.minChars != 0 ? ("Type " + this.minChars + " or more characters for results.") : "Begin typing for results."
	});

	// Bind events

	this._events = {
		input: {
			"input": this.evaluate.bind(this),
			"blur": this.close.bind(this, { reason: "blur" }),
			"keydown": function(evt) {
				var c = evt.keyCode;

				// If the dropdown `ul` is in view, then act on keydown for the following keys:
				// Enter / Esc / Up / Down
				if(me.opened) {
					if (c === 13 && me.selected) { // Enter
						evt.preventDefault();
						me.select();
					}
					else if (c === 27) { // Esc
						me.close({ reason: "esc" });
					}
					else if (c === 38 || c === 40) { // Down/Up arrow
						evt.preventDefault();
						me[c === 38? "previous" : "next"]();
					}
				}
			}
		},
		form: {
			"submit": this.close.bind(this, { reason: "submit" })
		},
		ul: {
			"mousedown": function(evt) {
				var li = evt.target;

				if (li !== this) {

					while (li && !/li/i.test(li.nodeName)) {
						li = li.parentNode;
					}

					if (li && evt.button === 0) {  // Only select on left click
						evt.preventDefault();
						me.select(li, evt.target);
					}
				}
			}
		}
	};

	$.bind(this.input, this._events.input);
	$.bind(this.input.form, this._events.form);
	$.bind(this.ul, this._events.ul);

	if (this.input.hasAttribute("list")) {
		this.list = "#" + this.input.getAttribute("list");
		this.input.removeAttribute("list");
	}
	else {
		this.list = this.input.getAttribute("data-list") || o.list || [];
	}

	_.all.push(this);
};

_.prototype = {
	set list(list) {
		if (Array.isArray(list)) {
			this._list = list;
		}
		else if (typeof list === "string" && list.indexOf(",") > -1) {
				this._list = list.split(/\s*,\s*/);
		}
		else { // Element or CSS selector
			list = $(list);

			if (list && list.children) {
				var Resultados = [];
				slice.apply(list.children).forEach(function (el) {
					if (!el.disabled) {
						var text = el.textContent.trim();
						var value = el.value || text;
						var label = el.label || text;
						if (value !== "") {
							Resultados.push({ label: label, value: value });
						}
					}
				});
				this._list = Resultados;
			}
		}

		if (document.activeElement === this.input) {
			this.evaluate();
		}
	},

	get selected() {
		return this.index > -1;
	},

	get opened() {
		return this.isOpened;
	},

	close: function (o) {
		if (!this.opened) {
			return;
		}

		this.ul.setAttribute("hidden", "");
		this.isOpened = false;
		this.index = -1;

		$.fire(this.input, "awesomplete-close", o || {});
	},

	open: function () {
		this.ul.removeAttribute("hidden");
		this.isOpened = true;

		if (this.autoFirst && this.index === -1) {
			this.goto(0);
		}

		$.fire(this.input, "awesomplete-open");
	},

	destroy: function() {
		//remove events from the input and its form
		$.unbind(this.input, this._events.input);
		$.unbind(this.input.form, this._events.form);

		//move the input out of the awesomplete container and remove the container and its children
		var parentNode = this.container.parentNode;

		parentNode.insertBefore(this.input, this.container);
		parentNode.removeChild(this.container);

		//remove autocomplete and aria-autocomplete attributes
		this.input.removeAttribute("autocomplete");
		this.input.removeAttribute("aria-autocomplete");

		//remove this awesomeplete instance from the global array of instances
		var indexOfAwesomplete = _.all.indexOf(this);

		if (indexOfAwesomplete !== -1) {
			_.all.splice(indexOfAwesomplete, 1);
		}
	},

	next: function () {
		var count = this.ul.children.length;
		this.goto(this.index < count - 1 ? this.index + 1 : (count ? 0 : -1) );
	},

	previous: function () {
		var count = this.ul.children.length;
		var pos = this.index - 1;

		this.goto(this.selected && pos !== -1 ? pos : count - 1);
	},

	// Should not be used, highlights specific item without any checks!
	goto: function (i) {
		var lis = this.ul.children;

		if (this.selected) {
			lis[this.index].setAttribute("aria-selected", "false");
		}

		this.index = i;

		if (i > -1 && lis.length > 0) {
			lis[i].setAttribute("aria-selected", "true");
            
			this.status.textContent = lis[i].textContent + ", list item " + (i + 1) + " of " + lis.length;
            
            this.input.setAttribute("aria-activedescendant", this.ul.id + "_item_" + this.index);

			// scroll to highlighted element in case parent's height is fixed
			this.ul.scrollTop = lis[i].offsetTop - this.ul.clientHeight + lis[i].clientHeight;

			$.fire(this.input, "awesomplete-highlight", {
				text: this.suggestions[this.index]
			});
		}
	},

	select: function (selected, origin) {
		if (selected) {
			this.index = $.siblingIndex(selected);
		} else {
			selected = this.ul.children[this.index];
		}

		if (selected) {
			var suggestion = this.suggestions[this.index];

			var allowed = $.fire(this.input, "awesomplete-select", {
				text: suggestion,
				origin: origin || selected
			});

			if (allowed) {
				this.replace(suggestion);
				this.close({ reason: "select" });
				$.fire(this.input, "awesomplete-selectcomplete", {
					text: suggestion
				});
			}
		}
	},

	evaluate: function() {
		var me = this;
		var value = this.input.value;

		if (value.length >= this.minChars && this._list.length > 0) {
			this.index = -1;
			// Populate list with options that match
			this.ul.innerHTML = "";

			this.suggestions = this._list
				.map(function(item) {
					return new Suggestion(me.data(item, value));
				})
				.filter(function(item) {
					return me.filter(item, value);
				});

			if (this.sort !== false) {
				this.suggestions = this.suggestions.sort(this.sort);
			}

			this.suggestions = this.suggestions.slice(0, this.maxResultados);

			this.suggestions.forEach(function(text, index) {
					me.ul.appendChild(me.item(text, value, index));
				});

			if (this.ul.children.length === 0) {
                
                this.status.textContent = "No results found";
                
				this.close({ reason: "nomatches" });
        
			} else {
				this.open();
        
                this.status.textContent = this.ul.children.length + " results found";
			}
		}
		else {
			this.close({ reason: "nomatches" });
            
                this.status.textContent = "No results found";
		}
	}
};

// Static methods/properties

_.all = [];

_.FILTER_CONTAINS = function (text, input) {
	return RegExp($.regExpEscape(input.trim()), "i").test(text);
};

_.FILTER_STARTSWITH = function (text, input) {
	return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
};

_.SORT_BYLENGTH = function (a, b) {
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	return a < b? -1 : 1;
};

_.ITEM = function (text, input, item_id) {
	var html = input.trim() === "" ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
	return $.create("li", {
		innerHTML: html,
		"aria-selected": "false",
        "id": "awesomplete_list_" + this.count + "_item_" + item_id
	});
};

_.REPLACE = function (text) {
	this.input.value = text.value;
};

_.DATA = function (item/*, input*/) { return item; };

// Private functions

function Suggestion(data) {
	var o = Array.isArray(data)
	  ? { label: data[0], value: data[1] }
	  : typeof data === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

	this.label = o.label || o.value;
	this.value = o.value;
}
Object.defineProperty(Suggestion.prototype = Object.create(String.prototype), "length", {
	get: function() { return this.label.length; }
});
Suggestion.prototype.toString = Suggestion.prototype.valueOf = function () {
	return "" + this.label;
};

function configure(instance, properties, o) {
	for (var i in properties) {
		var initial = properties[i],
		    attrValue = instance.input.getAttribute("data-" + i.toLowerCase());

		if (typeof initial === "number") {
			instance[i] = parseInt(attrValue);
		}
		else if (initial === false) { // Boolean options must be false by default anyway
			instance[i] = attrValue !== null;
		}
		else if (initial instanceof Function) {
			instance[i] = null;
		}
		else {
			instance[i] = attrValue;
		}

		if (!instance[i] && instance[i] !== 0) {
			instance[i] = (i in o)? o[i] : initial;
		}
	}
}

// Helpers

var slice = Array.prototype.slice;

function $(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
	return slice.call((con || document).querySelectorAll(expr));
}

$.create = function(tag, o) {
	var element = document.createElement(tag);

	for (var i in o) {
		var val = o[i];

		if (i === "inside") {
			$(val).appendChild(element);
		}
		else if (i === "around") {
			var ref = $(val);
			ref.parentNode.insertBefore(element, ref);
			element.appendChild(ref);
		}
		else if (i in element) {
			element[i] = val;
		}
		else {
			element.setAttribute(i, val);
		}
	}

	return element;
};

$.bind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function (event) {
				element.addEventListener(event, callback);
			});
		}
	}
};

$.unbind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function(event) {
				element.removeEventListener(event, callback);
			});
		}
	}
};

$.fire = function(target, type, properties) {
	var evt = document.createEvent("HTMLEvents");

	evt.initEvent(type, true, true );

	for (var j in properties) {
		evt[j] = properties[j];
	}

	return target.dispatchEvent(evt);
};

$.regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

$.siblingIndex = function (el) {
	/* eslint-disable no-cond-assign */
	for (var i = 0; el = el.previousElementSibling; i++);
	return i;
};

// Initialization

function init() {
	$$("input.awesomplete").forEach(function (input) {
		new _(input);
	});
}

// Are we in a browser? Check for Document constructor
if (typeof Document !== "undefined") {
	// DOM already loaded?
	if (document.readyState !== "loading") {
		init();
	}
	else {
		// Wait for it
		document.addEventListener("DOMContentLoaded", init);
	}
}

_.$ = $;
_.$$ = $$;

// Make sure to export Awesomplete on self when in a browser
if (typeof self !== "undefined") {
	self.Awesomplete = _;
}

// Expose Awesomplete as a CJS module
if (typeof module === "object" && module.exports) {
	module.exports = _;
}

return _;
}());
