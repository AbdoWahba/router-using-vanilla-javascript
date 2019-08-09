let callPage = (form_path, addfn) => {
  debugger;
  let xhr = new XMLHttpRequest();

  xhr.responseType = "document";

  xhr.open("GET", form_path, true);

  xhr.onload = () => {
    if (xhr.status == 200) {
      body = new XMLSerializer().serializeToString(xhr.response.body);
      headXML = xhr.response.head;
      var ret = "";
      ret = { body: body, headXML: headXML };
      addfn(headXML);
      console.log(ret);
    }
  };

  xhr.send();
};

appendHead = headXML => {
  console.log(headXML);
  var newElements = headXML.getElementsByTagName("script");
  var oldElements = document.getElementsByTagName("script");
  var can_be_appended = true;
  console.log("eeh ba2a1");
  for (let newElement = 0; newElement < newElements.length; newElement++) {
    can_be_appended = true;
    for (let oldElement = 0; oldElement < oldElements.length; oldElement++) {
      console.log(newElements[newElement].src);
      console.log(oldElements[oldElement].src);
      if (newElements[newElement].src === oldElements[oldElement].src) {
        can_be_appended = false;
        console.log(newElements[newElement].src);
        console.log(oldElements[oldElement].src);
        break;
      }
      console.log("eeh ba2a3");
    }
    console.log("eeh ba2a4");
    if (can_be_appended) {
      head = document.getElementsByTagName("head")[0];
      console.log(newElement);
      console.log(newElements, newElement);
      head.appendChild(newElements[newElement]);
      console.log("eeh ba2a5");
    }
  }

  var newElements = headXML.getElementsByTagName("link");
  var oldElements = document.getElementsByTagName("link");
  var can_be_appended = true;
  console.log("eeh ba2a1");
  for (let newElement = 0; newElement < newElements.length; newElement++) {
    can_be_appended = true;
    for (let oldElement = 0; oldElement < oldElements.length; oldElement++) {
      console.log(newElements[newElement].href);
      console.log(oldElements[oldElement].href);
      if (newElements[newElement].href === oldElements[oldElement].href) {
        can_be_appended = false;
        console.log(newElements[newElement].href);
        console.log(oldElements[oldElement].href);
        break;
      }
      console.log("eeh ba2a3");
    }
    console.log("eeh ba2a4");
    if (can_be_appended) {
      head = document.getElementsByTagName("head")[0];
      console.log(newElement);
      console.log(newElements, newElement);
      head.appendChild(newElements[newElement]);
      console.log("eeh ba2a5");
    }
  }
};
debugger;
callPage("./dataforms/bodyform.html", appendHead);
