var appended = {
  scripts: [],
  styles: [],
  name: window.location.hash.slice(1) || "/"
};
// Application div
const appDiv = "app";

// Both set of different routes and template generation functions
let routes = {};
let templates = {};

// Register a template (this is to mimic a template engine)
let template = (name, templateFunction) => {
  return (templates[name] = templateFunction);
};

// Define the routes. Each route is described with a route path & a template to render
// when entering that path. A template can be a string (file name), or a function that
// will directly create the DOM objects.
let route = (path, template) => {
  if (typeof template == "function") {
    return (routes[path] = template);
  } else if (typeof template == "string") {
    return (routes[path] = templates[template]);
  } else {
    return;
  }
};

// Generate DOM tree from a string
let createDiv = (id, xmlString) => {
  let d = document.createElement("div");
  d.id = id;
  d.innerHTML = xmlString;
  return d.firstChild;
};

// Register the templates.

// Home template
template("Home", () => {
  document.title = "Home";
  let myDiv = document.getElementById(appDiv);
  myDiv.innerHTML = "";
  const link1 = createDiv(
    "view1",
    "<div><h1>Home page</h1><p>this is home page</p></div>"
  );
  return myDiv.appendChild(link1);
});

// Contact temolate
template("Contact", () => {
  document.title = "Contact";
  let myDiv = document.getElementById(appDiv);
  myDiv.innerHTML = "";
  const link1 = createDiv(
    "view1",
    "<div><h1>Contact US </h1><a href='https://www.tab-erp.com/' target='_blank'>TAB page</a></div>"
  );
  return myDiv.appendChild(link1);
});

// About template
template("About", () => {
  document.title = "About";
  let myDiv = document.getElementById(appDiv);
  myDiv.innerHTML = "";
  const link2 = createDiv(
    "view2",
    "<div><h1>About</h1><p>TAB is software company</p></div>"
  );
  return myDiv.appendChild(link2);
});

// Define the mappings route->template.
route("/", "Home");
route("/contact", "Contact");
route("/about", "About");

// Give the correspondent route (template) or fail
let resolveRoute = route => {
  try {
    return routes[route];
  } catch (error) {
    throw new Error("The route is not defined");
  }
};

// The actual router, get the current URL and generate the corresponding template
let router = evt => {
  const url = window.location.hash.slice(1) || "/";
  debugger;
  if (appended.name !== url && url !== "/") {
    if (appended.scripts.length != 0) {
      var scripts = document.getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        for (var j = 0; j < appended.scripts.length; j++) {
          if (scripts[i].src == appended.scripts[j].src) {
            scripts[i].remove();
          }
        }
      }
    }
    if (appended.styles.length != 0) {
      var styles = document.getElementsByTagName("link");
      for (var i = 0; i < styles.length; i++) {
        for (var j = 0; j < appended.styles.length; j++) {
          if (styles[i].href == appended.styles[j].href) {
            styles[i].remove();
          }
        }
      }
    }
    appended = {
      scripts: [],
      styles: [],
      name: window.location.hash.slice(1) || "/"
    };
  }
  console.log(url);
  const routeResolved = resolveRoute(url);
  routeResolved();
  //   lestening to event (form submission)
  if (url == "/addlink") {
    document.getElementById("formSub").addEventListener("submit", e => {
      e.preventDefault;
      console.log(e);
      newLink(
        document.getElementById("hash").value,
        document.getElementById("title").value,
        document.getElementById("header").value,
        document.getElementById("body").value
      );
    });
  }
};

// For first load or when routes are changed in browser url box.
window.addEventListener("load", () => {
  addPageTemp("./dataforms/bodyform.html", "BodyForm", "body");
  var appended = {
    scripts: [],
    styles: [],
    name: window.location.hash.slice(1) || "/"
  };
  router();
});
window.addEventListener("hashchange", router);

// adding links dynamically

// add linl template
template("AddLink", () => {
  document.title = "AddLink";
  let myDiv = document.getElementById(appDiv);
  myDiv.innerHTML = "";
  const link2 = createDiv(
    "view2",
    `<form id="formSub">
      <fieldset>
        <legend>Add link and page data</legend>
        
        <div class="form-group">
          <label>Hash address</label>
          <input
            type="text"
            id="hash"
            class="form-control"
            placeholder="Enter Hash"
          />
        </div>
        
        <div class="form-group">
            <label>page title</label>
            <input
              type="text"
              id="title"
              class="form-control"
              placeholder="Enter title"
            />
          </div>
  
          <div class="form-group">
              <label>Header</label>
              <input
                type="text"
                id="header"
                class="form-control"
                placeholder="Enter Header"
              />
            </div>
  
        <div class="form-group">
          <label for="exampleTextarea">Body</label>
          <textarea
            class="form-control"
            id="body"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </fieldset>
    </form>`
  );

  return myDiv.appendChild(link2);
});

// add link route
route("/addlink", "AddLink");

// add new link function
let newLink = function(hash, title, header, body) {
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
    let myDiv = document.getElementById(appDiv);
    myDiv.innerHTML = "";
    const link1 = createDiv(
      "view1",
      "<div><h1>" + header + " </h1><p>" + body + "</p></div>"
    );
    return myDiv.appendChild(link1);
  });
  route("/" + hash, title);
};
