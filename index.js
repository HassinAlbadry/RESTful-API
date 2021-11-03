const express=require('express'); 
const app=express();
const PORT= 8080; 
const mysql= require('mysql');

const connection= mysql.createConnection({
  
    host:"localhost",
    user:"root",
    password:"",
    database:"nodejs"

})


app.listen(
  
        PORT, 
        () => console.log(`http://localhost:${PORT}`)


);

app.use(express.json())
app.get('/petowner',(req,res)=>{

connection.query(`select * from petowner`,(err, result)=> {

    res.status(200).send({
       result
        
    })
})

    

});

app.post('/petowner/:id/:owner/:pet', (req,res) =>{
 const {id,owner,pet} = req.params;
   

var sql = `INSERT INTO petowner 
            (
                id,owner,pet
            )
            VALUES
            (
                ?, ?, ?
            )`;
connection.query(sql, [id,owner,pet], function (err, data) {
    if (err) {
        res.send({
            recordAdded: `Error adding new record to our database`,
        });
    } else {
        res.send({
            recordAdded: `Added new record to our database with your parameters: ID of ${id},  owner name of: ${owner} , pet name of: ${pet}.`,
        });
    }
});




   
});