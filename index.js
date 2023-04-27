
let stuff = [];

const fs         = require('fs');
const path       = require('path');
const bodyParser = require('body-parser');

const express = require("express");


const app = express();


app.use(express.json());

// static files
app.use(express.static(path.join((__dirname,'public'))));

app.get('/save',(req,res)=>{

    let data = loadfile('data/stuff.json');
    if(data){
          stuff = JSON.parse(data);
          stuff.push(req.query);
          savefile('data/stuff.json',stuff);
    }else{
         stuff.push(req.query);
         savefile('data/stuff.json',stuff); 
    }
   
    res.send(JSON.stringify(stuff));
});

app.get('/kill',(req,res)=>{

     console.log('kill '+req.query.index);

     let index = parseInt(req.query.index);
     let data  = loadfile('data/stuff.json');
     if(data){
         stuff   = JSON.parse(data);
         stuff.splice(index, 1);
         savefile('data/stuff.json',stuff);
         let str = JSON.stringify(stuff);
         res.send(str);
     }
});

app.get('/edit',(req,res)=>{

     let id = parseInt(req.query.id);
     console.log('EDIT id '+id);
     console.log(req.query);

     let data  = loadfile('data/stuff.json');
     if(data){
         stuff     = JSON.parse(data);
         stuff[id] = req.query;
         savefile('data/stuff.json',stuff);
         let str = JSON.stringify(stuff); 
         res.send(str);
     }
});



app.get('/read',(req,res)=>{

    let data = loadfile('data/stuff.json');
    if(data){
        stuff   = JSON.parse(data);
        let str = JSON.stringify(stuff);
        console.log(str); 
        res.send(str);
    }
});


// app.post('/info',(req,res)=>{
//     console.log(req.body);
//     res.send('POST REQUEST...');
// });



app.listen(3000,()=>{
    console.log('server on port 3000');
});


function savefile(path_file,obj){
    let str = JSON.stringify(obj);
    fs.writeFile(path_file, str , function(err){
       if (err) return console.log(err);
    });
}

function loadfile(path_file){

    if (fs.existsSync(path_file))
       {
         let data  = fs.readFileSync(path_file); 
          return data;
       }else{
           return null;
       }
}

function send_BD(str){

   let obj = JSON.parse(text);
   console.log(obj);

}