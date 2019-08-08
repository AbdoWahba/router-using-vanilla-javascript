let callPage = form_path => {
  let xhr = new XMLHttpRequest();

  xhr.responseType = "document";

  xhr.open("GET", form_path, true);

  xhr.onload = () => {
    if (xhr.status == 200) {
      body = new XMLSerializer().serializeToString(xhr.response.body);
      documentJson = xml2json(this.response, "");

      return { body: body, documentJson: documentJson };
    }
  };

  xhr.send();
};
