const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const initializeConnectionDb = require("./db/db.connect");
const quiz = require("./routes/quiz.router")
const user = require("./routes/user.router")
const score = require("./routes/score.router") 

const app = express();

app.use(bodyParser.json())
app.use(cors());

const port = 3000;

initializeConnectionDb();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.use("/quiz", quiz);
app.use("/auth",user);
app.use("/score",score);

app.listen( process.env.PORT || port, () => {
    console.log(`server Online!`)
  })