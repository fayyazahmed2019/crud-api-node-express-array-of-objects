const express = require('express');

const app = express();
const port = 5000;




let users = [

    {name: 'fayyaz', password: 123, date: '06-04-2022', status: 'active', id:1},
    {name: 'rehan', password: 1234, date: '06-04-2022', status: 'active', id:2},
    {name: 'naveed', password: 123, date: '07-04-2022', status: 'active', id:3},
    {name: 'iqbal', password: 1234, date: '07-04-2022', status: 'Not active', id:4},
]

/////it enables our server to read JSON data 
const urlParser = express.json();
app.use(urlParser);



app.get("/",(req,res)=>{
    res.statusCode = 200;

    res.send("Hello World")
})





app.post('/create-user', ( req, res ) => {
    if(req.body.name) {
        res.statusCode = 201;
        const newUser = users.length + 1;
        users.push({ 
            name: req.body.name,
            password: req.body.password,
            date: req.body.date,
            status: req.body.status,

            id: newUser
        })
    
        res.send('<h1>User Created Successfully</h1>')
    } else {
        res.statusCode = 400;
        res.send('<h1>Name Field is Missing</h1>')
    }

})




app.get('/getalldata',(req,res)=>{

    res.statusCode = 200; // success
    res.json(users)

})


//find return object and filter return array

/// get user data through id:

app.get('/users/:id',(req, res)=>{ // '/users/:id' (req.params.id)

    res.statusCode = 200;
    const userf = users.find((usr)=> usr.id === parseInt(req.params.id))
    console.log("get",userf)
   
    if(!userf){

       return res.send(`User Not Found: ${req.params.id}`)
    }
    
    res.json(userf)
})




////dateapi

app.get('/date/:date',(req, res)=>{ // '/all/:date' (req.params.id)

    res.statusCode = 200;
    const userf = users.filter((usr)=> usr.date ===  (req.params.date))
    console.log(`get: ${userf}, req ${req.params.date}`)
   
    if(!userf){

       return res.send(`User Not Found: ${req.params.date}`)
    }
    
    res.json(userf)
})




////statusapi

app.get('/status/:status',(req, res)=>{ // '/all/:date' (req.params.id)

    res.statusCode = 200;
    const userf = users.filter((usr)=> usr.status ===  (req.params.status))
    console.log(`get: ${userf}, req ${req.params.status}`)
   
    if(!userf){
        res.statusCode = 400;
       return res.send(`User Not Found: ${req.params.status}`)
    }
    
    res.json(userf)
})




app.put('/users/:id',(req, res)=>{

    let foundput = users.find((usr) => usr.id === parseInt(req.params.id)) 

    

    if (!foundput){

        res.statusCode = 404;
        console.log(foundput, console)
        return res.send(`<h1> Data Not Found, ${req.params.id}</h1>`)

    }else{

        res.statusCode = 200;
               
        console.log("id:", foundput)
    
        let updated = {
            
            id: foundput.id,
            name: req.body.name,
           password: req.body.password,
           date: req.body.date,
           status: req.body.status,
    
            };
    
        let targetindex = users.indexOf(foundput);
        users.splice(targetindex, 1, updated);
        return res.send(`<h1>User Update Successfully</h1>`)


    }


})




app.delete('/users/:id', (req, res) => {
        
    let found = users.find((usr) => usr.id === parseInt(req.params.id));

if (!found){

    res.statusCode = 400;
    console.log(found, console)
    return res.send(`<h1>Data Not Found</h1>,  ${req.params.id}`)

   
}else{


let targetindex = users.indexOf(found)
res.statusCode = 200;

console.log("targetindex",targetindex)
users.splice(targetindex, 1)
console.log(users)
res.send('<h1>User Delete Successfully</h1>')

}


})







app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})