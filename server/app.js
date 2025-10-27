
const express = require('express');
const connectDataBase = require('./configs/db.configs');
const userRouter = require('./routes/user.route');

const app = express();

app.use(express.json());

connectDataBase();  //  Data base connection 

app.get('/test', (req, res) => {
    res.status(200).json({msg : "I am test Router ! "})
});

app.use('/user', userRouter)

app.use((req, res) => {
    res.status(404).json({msg : "404 page not found ! "})
});


app.listen(3000, () => {
    console.log("Server start on PORT 3000")
})