# 🧠 Mini Express (TypeScript)

A lightweight implementation of an Express-like web framework built from scratch using Node.js and TypeScript.

This project is designed to help understand how backend frameworks work internally — including routing, middleware, request handling, and the concept of mounting functions on functions.

---

# 🚀 Features

- Minimal HTTP framework
- Middleware system (`app.use`)
- Routing (`app.get`, `app.post`)
- JSON response helper (`res.json`)
- Body parsing (JSON + URL-encoded)
- Custom `app.listen` implementation
- Built with TypeScript

---

# 📁 Project Structure

```
src/
  ├── app.ts          # Core framework logic
  ├── types.ts        # Type definitions
  ├── bodyParser.ts   # Middleware for parsing request body
  └── server.ts       # Entry point
```

---

# ⚙️ Installation

```bash
npm install
```

---

# ▶️ Running the Project

### Development

```bash
npm run dev
```

### Build & Run

```bash
npm run build
npm start
```

---

# 🧪 Example Usage

```ts
const app = createApp();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# 🧠 System Design

## High-Level Flow

```
Incoming Request
      ↓
Middleware Stack
      ↓
Route Matching
      ↓
Handler Execution
      ↓
Response Sent
```

---

## Core Components

### 1. Application (`app`)

- A function `(req, res)`
- Handles incoming HTTP requests
- Also acts as a container for routes and middleware

---

### 2. Middleware System

Middleware functions are stored in an array:

```
middlewares = [fn1, fn2, fn3]
```

Execution is controlled using `next()`:

```
fn1 → fn2 → fn3 → route handler
```

---

### 3. Router

Routes are stored as:

```ts
{
  method: "GET",
  path: "/",
  handler: Function
}
```

Matching is done using:

```ts
routes.find((r) => r.method === req.method && r.path === req.url);
```

---

### 4. HTTP Server

```
app.listen()
    ↓
http.createServer(app)
    ↓
Node handles incoming requests
    ↓
app(req, res) executes
```

---

# 🔥 Core Concept: Mounting Functions on Functions

This is the **most important concept** behind Express.

---

## 🧠 What does it mean?

In JavaScript:

> Functions are objects.

That means:

- You can call them
- You can attach properties to them

---

## 💡 Example

```js
function app(req, res) {
  res.end("Hello");
}

app.get = function () {};
app.use = function () {};
```

Now:

```js
app(); // function call
app.get(); // method call
```

👉 Same object doing BOTH things.

---

## 🧩 How Mini Express Uses It

Inside `createApp()`:

```ts
const app = (req, res) => {
  // handle request
};

app.get = (path, handler) => {
  routes.push({ method: "GET", path, handler });
};

app.use = (middleware) => {
  middlewares.push(middleware);
};
```

---

## 🤯 Why This Design?

Because Node’s HTTP server expects:

```js
(req, res) => {};
```

So:

```js
http.createServer(app);
```

works ONLY if `app` is a function.

But we also want:

```js
app.get();
app.use();
```

👉 Solution: **attach methods to the function**

---

## ⚡ Mental Model

Think of `app` as:

```
Function + Object = Hybrid
```

---

## 🧬 Visual Representation

```
           app (function)
          /      |      \
         /       |       \
   callable   .get()   .use()
```

---

# 🧠 Key Learnings

- How Node HTTP server works
- How middleware chaining works
- How routing systems are built
- How Express internally structures apps
- How JavaScript functions can behave like objects

---

# 🚀 Future Improvements

- Route parameters (`/user/:id`)
- Query parsing
- Error handling middleware
- Async middleware support
- Router system (`app.router`)
- File upload support

---

# ⚔️ Conclusion

This project demonstrates how a real-world backend framework like Express works internally — from request handling to middleware execution.

Understanding this gives you a strong foundation to:

- Build your own frameworks
- Optimize backend systems
- Crack system design interviews
- Contribute to open-source libraries

---

# 🙌 Credits

Built as a learning project to deeply understand backend internals.
