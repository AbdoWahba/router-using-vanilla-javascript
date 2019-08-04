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
  console.log(url);
  const routeResolved = resolveRoute(url);
  routeResolved();
};
