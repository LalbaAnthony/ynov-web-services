# Ynov Web services Project example

## 🚀 - Quick start

```sh
cd ynov-web-services
npm i ; npm run dev
```

## 📚 - Documentation

Generate a JWT token for testing:
```sh
node generateToken.js
```

Using the API to create a new book:

```js
async function addBook() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IndyaXRlciIsImlhdCI6MTc2MTY2Mzc2NCwiZXhwIjoxNzYxNjY3MzY0fQ.0vva8cwxA2ogXRSD26oTxsIxOkzF2BRr5JW9d8-6R3w";

  const response = await fetch("http://localhost:3000/api/books", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "La Horde du Contrevent",
      author: "Alain Damasio"
    })
  });

  const data = await response.json();
  console.log("Réponse API:", data);
}

addBook();
```