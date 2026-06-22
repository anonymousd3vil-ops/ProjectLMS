import app from './app.js';
import connectToDB from './config/dbConnection.js';

const PORT = process.env.PORT || 5050;

app.listen(PORT, ()=> {
    connectToDB();
    console.log(`Server is stated at http://localhost:${PORT}...`);
});

