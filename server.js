
const express = require('express');
const { connectDB } = require('./postgres/connection.js');
const routes = require('./router/router.js');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ message: "Hello, how are you?" });
});

app.use(routes); 


app.use((err, req, res, next) => {
    console.error("An error occurred:", err);
    return res.status(500).json({ message: "Internal server error" });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port number ${PORT}`);
    });
}).catch(err => {
    console.error("Error connecting to the database:", err);
});
