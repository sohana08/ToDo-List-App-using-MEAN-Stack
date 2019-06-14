const express =  require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const List = require("../backend/models/list");

const app = express();

//k2BP5HQbBZ8IcpCG
//connect to database
mongoose.connect("mongodb+srv://sonam:k2BP5HQbBZ8IcpCG@cluster0-9luva.mongodb.net/node-angular?retryWrites=true&w=majority" , { useNewUrlParser: true })
.then(() => {
    console.log("connected to database");
})
.catch(() => {
  console.log("connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});



app.post('/todos',(req,res,next) => {
  const list = new List({
    list: req.body.list
  });
  // console.log(req.body.list);
  list.save().then(createdList => {
    res.status(201).json({
      message:'list added successfully',
      listId: createdList._id
  });
  });

 });


app.get('/todos', (req,res,next) => {
    // const lists = [
    //   {id: '2i34y2e', list: 'to do first'},
    //   {id: 'uwy8ye', list: 'to do second'}
    // ];

    List.find().then(documents => {
      res.status(200).json({
        message: 'Fetched successfully',
        lists: documents
      });
      });

});

app.delete("/todos/:id", (req, res, next) => {
  List.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "List deleted!" });
  });
});



module.exports = app;
