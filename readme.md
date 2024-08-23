# LAMP-JS

LAMP-JS is a framework for anyone who love the of the LAMP stack, but want to use JavaScript instead of PHP.

# Features

## 1. Simply add files to the `views` folder and they will be served as web pages.

The main difference between the LAMP stack and LAMP-JS is that LAMP-JS uses .ejs file extensions instead of .php file extensions. 
For example: `http://localhost:3000/hello` loads `views/hello/index.ejs`.

For example, try the following paths:
* http://localhost:3000 (loads `views/index.ejs`)
* http://localhost:3000/about.ejs (loads `views/about.ejs`)
* http://localhost:3000/hello (loads `views/hello/index.ejs`)
* http://localhost:3000/hello/friend.ejs (loads `views/hello/friend.ejs`)
* http://localhost:3000/hello/world (loads `views/hello/world/index.ejs`)

## 2. Run any backend code within the `<% %>` tags in the .ejs files. For example:

```ejs
<%
// JavaScript code inside EJS tags
const message = "Hello, friend!";
const currentTime = new Date().toLocaleTimeString();
%>

<p>Current time: <%= currentTime %></p>
```
## 3. Partials

You can import a `.ejs` file into another `.ejs` file using the `include` function.
For example, if you have a `footer.ejs` file in the `views/partials` folder, you can include it in the `index.ejs` file like this:

```ejs
<%- include('partials/footer.ejs') %>
```

Note: partials paths are relative, so if you're in the `views/hello` folder and you want to include a partial from the `views/partials` folder, you can do it like this:

```ejs
<%- include('../partials/footer.ejs') %>
```
    

## 4. Add static files to the `public` folder and they will be served as static files.

All files in the `/public` are served as static files. 
You can access them by going to `http://localhost:3000/public/<filename>`. 
For example, if you have a file called `hello.txt` in the `/public` folder, you can access it by going to `http://localhost:3000/public/hello.txt`.

# Getting Started

## Start the server (Development)

```
npm run dev
```

## Deploy

```
npm run start
```