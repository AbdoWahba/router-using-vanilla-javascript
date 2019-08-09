let callPage = (form_path, headfn, bodyfn, title, hash) => {
  let xhr = new XMLHttpRequest();

  xhr.responseType = "document";

  xhr.open("GET", form_path, true);

  xhr.onload = () => {
    if (xhr.status == 200) {
      body = new XMLSerializer().serializeToString(xhr.response.body);
      headXML = xhr.response.head;

      var ret = "";
      ret = { body: body, headXML: headXML };

      headfn(headXML);
      bodyfn(body);

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

appendBody = bodyTXT => {
  document.getElementById(appDiv);
  let myDiv = document.getElementById(appDiv);
  myDiv.innerHTML = bodyTXT;
};
console.log("hello");

addPageTemp = (path, title, hash) => {
  let myDiv = document.getElementById("list");

  const link2 = createDiv(
    "view2",
    `<li class="nav-item">
          <a class="nav-link" href="#/` +
      hash +
      `">` +
      title +
      `</a>
        </li>`
  );
  myDiv.parentNode.insertBefore(link2, myDiv.nextSibling);
  template(title, () => {
    document.title = title;
    callPage(path, appendHead, appendBody, title, hash);
  });
  route("/" + hash, title);
};

// window.addEventListener("load", () => {
//   addPageTemp("./dataforms/bodyform.html", "BodyForm", "body");
// });
