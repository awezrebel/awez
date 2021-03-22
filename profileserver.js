var http = require('http');
const fs = require('fs'); 
const fse = require('fs-extra');  
var express=require('express');
var validator = require('validator');
const path = require('path');
const router = express.Router();
var mysql = require('mysql');
var url = require('url');
const { SSL_OP_TLS_ROLLBACK_BUG } = require('constants');
var app = express();
app.use(express.urlencoded());
app.use(express.static('public'));  
app.get('/', function(req,res) {
var query = require('url').parse(req.url,true).query;
var flag1=2;
var flag2=0;
var j=0,z=0;
let wp,block=null;
var name=null;
var username=query.username;
var uname=query.uname;
var uname1=query.uname1;
var password=query.password;
var pwd=query.pwd;
var otp=query.otp;
var projects =query.projects;
var mobile =query.mobile ;
var epass =query.epass ;
var ecpass=query.ecpass;

 
 
//connection with database

var connection = mysql.createConnection({
host: "database-1.cxg5ddbyrmb4.us-east-1.rds.amazonaws.com",
user: "admin",
password: "12345678",
port: "3306",
database: "database1"
});


if(uname!=null){
res.sendfile("otp.html");
var spawn = require("child_process").spawn; 
var process = spawn('python',["./otpv.py",] ); 

};


app.get('/otp', function(req, res) {
res.sendfile("otp.html");
var spawn = require("child_process").spawn; 
var process = spawn('python',["./otpv.py",] ); 
}); 

//login

if(username != undefined && password != undefined) {
fse.truncate('currentlogin.txt')
fs.readFile('block.txt', 'utf-8', (err, data) => { 
if (err) throw err;

console.log("line no 67"+data);
if(username==data){
res.send("Your account is blocked ..pls login after 24hrs");
}else{

var test = 0;             
pd=password;
connection.query('SELECT * from login', function (error,login, fields) {
if (error) throw error;

var length = login.length;

for(var i = 0; i < length; i++){
if (login[i].uname==username && login[i].pwd==password){
test=1
fs.appendFile('currentlogin.txt', username, (err) => { 
if (err) throw err; 
}) 
}
}
console.log(username);
console.log(password);
if(test==1){
res.redirect("/data");
}
if(test==0){
wrongpass();
}
});
//connection.end();
}})
}



function wrongpass(){
var count=0;
let data = username+",";
fs.appendFile('Out.txt', data, (err) => { 
if (err) throw err; 
}) 
var count=0;
try {  
var data1 = fs.readFileSync('out.txt', 'utf8');
console.log(data.toString());    
} catch(e) {
console.log('Error:', e.stack);
}
console.log("data" ,data1);
let inp=data1.split(",");

for(var w=0;w<=inp.length-1;w++){
if(inp[w]==username){
count++;
}
}
if(count==0){
res.send("Please provide valid details \n left 2 attempts");
}else if(count==1){
res.send("Please provide valid details \n left 1 attempt");
}else if(count>1){
res.send("Your account is blocked ..pls login after 24hrs");
fs.appendFile('block.txt', username, (err) => {
console.log("succesfully blocked"); 
if (err) throw err; 
}) 
console.log("user " + username + "blocked");
}
    
count=0;
}

var obj = {};
 
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/data', function(req, res){
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
if (err) throw err; 
connection.query(`SELECT name FROM login  WHERE (uname ='${data}')`, function(err, result) {
if(err){
throw err;
} else {
obj = {print: result};
res.render('print', obj);   
console.log(obj);      
}
});
});      
});




//forgot password 
if(otp!=null){
fs.readFile('otp.txt', 'utf-8', (err, data) => { 
if (err) throw err; 
if(otp==data){
forgotpass();
}else{
res.send("please provide the correct otp");
}
});



function forgotpass() {
connection.connect(function (err) {
if (err) throw err;
console.log("Connected RDS");
});
const sql3=`UPDATE login SET pwd = '${pwd}' WHERE (uname ='${uname1}')`;
connection.query(sql3, function (err, result) {
if (err) throw err;
console.log(result);
});
//connection.end();
res.send( `<p>Congratulations you have successfully reset your password` );

}
}


//profile 

var obj1 = {};
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/profile', function(req, res) { 
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
if (err) throw err;         
connection.query(`  select username,rollno, username, dob, mobile, cgpa, projects, images, remarks, mother, father, parentmobile, address,mail from profile WHERE (rollno ='${data}')`, function(err, result) {
        if(err){
        throw err;
        } else {
        obj1 = {profile: result};
        res.render('profile', obj1);   
        console.log(obj1);      
        }
        });
});
}); 
    
//edit details
app.get('/edit', function(req, res) {
res.sendfile("edit.html");
/*connection.connect(function (err) {
if (err) throw err;
console.log("Connected RDS");
});
const sql4=`UPDATE login SET pwd = '${epass}' WHERE (uname ='${name}')`;
connection.query(sql4, function (err, result) {
if (err) throw err;
console.log(result);
 
});
       
 */
});

//workshops
var obj2 = {};
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/workshops',function(req,res){
        fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
                if (err) throw err;         
                connection.query(`  select  Organisation, duration, Objective, Tools, Outcome from workshops WHERE (rollno ='${data}')`, function(err, result) {
                        if(err){
                        throw err;
                        } else {
                        obj2 = {workshops: result};
                        res.render('workshops', obj2);   
                        console.log(obj2);      
                        }
                        });
                });
                }); 
 
//skills
var obj3 = {};
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/skills',function(req,res){
        fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
                if (err) throw err;         
                connection.query(`  select  rollno, languages, web, tools from skills WHERE (rollno ='${data}')`, function(err, result) {
                        if(err){
                        throw err;
                        } else {
                        obj3 = {skills: result};
                        res.render('skills', obj3);   
                        console.log(obj3);      
                        }
                        });
                });
                }); 



//Achievements
 
var obj4 = {};
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/Achievements',function(req,res){
        fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
                if (err) throw err;         
                connection.query(`  select  Name, Details, Location from Achievements WHERE (rollno ='${data}')`, function(err, result) {
                        if(err){
                        throw err;
                        } else {
                        obj4 = {Achievements: result};
                        res.render('Achievements', obj4);   
                        console.log(obj4);      
                        }
                        });
                });
                });
                

//Projects
 
var obj5 = {};
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/projects',function(req,res){
        fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
                if (err) throw err;         
                connection.query(`  select  Topic, Duration, Objective, Tools, Outcome from projects WHERE (rollno ='${data}')`, function(err, result) {
                        if(err){
                        throw err;
                        } else {
                        obj5 = {projects: result};
                        res.render('projects', obj5);   
                        console.log(obj5);      
                        }
                        });
                });
                }); 
//warning
app.get('/warning', function(req,res){
res.sendfile("warning.html");
});

//logout
app.get('/logout', function(req, res) {
res.sendfile("logout.html");
});

}).listen(8000);
console.log("hi shaik iam listening to port 8000 ")



