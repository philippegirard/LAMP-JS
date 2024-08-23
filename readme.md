
# Start the server (Development)

```
npm run dev
```

# Router

LAMP-JS works like the LAMP stack, but with .ejs files instead of .php files.

For example, try the following paths:
* `http://localhost:3001` (loads `views/index.ejs`)
* `http://localhost:3001/about.ejs` (loads `views/about.ejs`) 
* `http://localhost:3001/hello` (loads `views/hello/index.ejs`)
* `http://localhost:3001/hello/friend.ejs` (loads `views/hello/friend.ejs`)
* `http://localhost:3001/hello/world` (loads `views/hello/world/index.ejs`)

# Static Files

All files in the `/public` are served as static files. You can access them by going to `http://localhost:3000/public/<filename>`. For example, if you have a file called `hello.txt` in the `/public` folder, you can access it by going to `http://localhost:3000/public/stylesheets/style.css`.

# Deploy

```
npm run start
```