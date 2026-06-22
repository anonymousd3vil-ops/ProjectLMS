import app from './app.js';
console.log("HEllooooooooooooooooooooo");
const PORT = process.env.PORT || 5050;


app.listen(PORT, ()=> {
    console.log(`Server is stated at http://localhost:${PORT}...`);
});
