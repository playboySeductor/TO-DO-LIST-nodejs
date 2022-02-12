const express = require('express');
const app = express();

//this port number is to be used for localhost
const port= 2500;

app.use(express.urlencoded());

//adding css and js file
app.use(express.static('assets'));

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//setting up database to store local datas
const db = require('./config/mongoose');

const TodoList = require('./models/todo');

var Search="";
app.post('/search',(req,res)=>{
    Search= req.body.searchCategory;
    return res.redirect('back');
});


app.get('/',(req,res)=>{
    if(Search !=="")
    {
        TodoList.find({category:search},(err,tasks)=>{
            if(err){
                console.log('Error in fetching data from database');
                return;
            }
            return res.render('home',{
                Todo_list: tasks
            });
        })
    }
   else{
       TodoList.find({},(err,tasks)=>{
           if(err){
               console.log('Error from fetching data from databases');
               return;
           }
           return res.render('home',{
               Todo_list:tasks
           });
       })
   }
});

app.post('/',(req,res)=>{
    TodoList.create({
        task: req.body.task,
        category: req.body.category,
        data: req.body.date,
    },(err,newTask)=>{
        if(err){
            console.log('error in creating a contact');
            return;
        }
        return res.redirect('back');
    }
    );
});

app.get('/delete-task', (req,res)=>{
    let id= req.query.id;
    TodoList.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in finding data from dB');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,(err)=>{
    if(err)
    {
        console.error();
        return;
    }
    console.log('Successful running in port ' + port);
})