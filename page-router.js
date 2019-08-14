let callPage = (form_path, headfn, bodyfn, title, hash) => {
  let xhr = new XMLHttpRequest();

  xhr.responseType = "document";

  xhr.open("GET", form_path, true);

  xhr.onload = () => {
    if (xhr.status == 200) {
      body = new XMLSerializer().serializeToString(xhr.response.body);
      headXML = xhr.response.head;
      ap = headfn(headXML);
      appended.scripts = ap.scripts;
      appended.styles = ap.styles;
      bodyfn(body);
      console.log(appended);
    }
  };

  xhr.send();
};

appendHead = headXML => {
  var ind = 0;
  var appended = { scripts: [], styles: [] };
  var newElements = headXML.getElementsByTagName("script");
  var oldElements = document.getElementsByTagName("script");
  var can_be_appended = true;
  for (
    let newElement = 0;
    newElement - ind < newElements.length;
    newElement++
  ) {
    can_be_appended = true;
    for (let oldElement = 0; oldElement < oldElements.length; oldElement++) {
      if (newElements[newElement - ind].src === oldElements[oldElement].src) {
        can_be_appended = false;
        break;
      }
    }
    if (can_be_appended) {
      head = document.getElementsByTagName("head")[0];
      var ele = newElements[newElement - ind].src;
      newElements[newElement - ind].src = ele;
      appended.scripts.push(newElements[newElement - ind]);
      console.log(ele);
      console.log(oldElements);
      head.appendChild(newElements[newElement - ind]);

      ind++;
    }
  }

  var ind = 0;
  var newElements = headXML.getElementsByTagName("link");
  var oldElements = document.getElementsByTagName("link");
  var can_be_appended = true;
  for (
    let newElement = 0;
    newElement - ind < newElements.length;
    newElement++
  ) {
    can_be_appended = true;
    for (let oldElement = 0; oldElement < oldElements.length; oldElement++) {
      if (newElements[newElement - ind].href === oldElements[oldElement].href) {
        can_be_appended = false;
        break;
      }
    }

    if (can_be_appended) {
      head = document.getElementsByTagName("head")[0];
      var ele = newElements[newElement - ind].href;
      newElements[newElement - ind].href = ele;
      appended.styles.push(newElements[newElement - ind]);
      head.appendChild(newElements[newElement - ind]);

      ind++;
    }
  }
  console.log(appended);
  return appended;
};

appendBody = bodyTXT => {
  document.getElementById(appDiv);
  let myDiv = document.getElementById(appDiv);
  myDiv.innerHTML = bodyTXT;
};

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
