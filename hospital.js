

const express=require('express');
const app=express();



//this is used to get data or fetch or read data from the body 
app.use(express.json());

const port=5000;

//this is for one user only showing his name and kidney status 


// creating an object arrays 
const users=[{
    name:"Rayyan",

    kidneys: [{
        healthy:false,
    }]




}];

function filterkidneys(n){
    if(n.healthy){
        return true;

    }
    return false;

}


app.get("/", function(req , res){
    //check how many kidneys does john have and how many are functioning good 
  
    
    const johnkidneys =users[0].kidneys;
    const noofkidneys=johnkidneys.length;
    let noofhealthykidneys=0;
    for(let i=0;i<johnkidneys.length;i++){
        if(johnkidneys[i].healthy){
            noofhealthykidneys++;

        }
    }

    //plz check this if it is working or not 

    // const noofhealthykidneys=johnkidneys.filter(filterkidneys);


    const numberofunhealthykidneys=noofkidneys-noofhealthykidneys;



    res.json({
        
        noofkidneys,
        noofhealthykidneys,
        numberofunhealthykidneys,




    })





});




app.post("/",function(req,res){

    //we have to add or insert new kidney 
    const ishealthy=req.body.ishealthy;
    //add or use push function
    users[0].kidneys.push({
        //whose health status is 
        healthy : ishealthy

    })
    res.json({
        msg : "Done!"
    })
})


//here also it can be 411 case applicable

app.put("/",function(req,res){
    //replace all the unhealthy kidneys to healthy 
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;

    }
    res.json({})
})



app.delete("/",function(req,res){
    //delete all the unhealthy kidneys to healthy 
    //if there is no unhealthy kidney then whats the matter behind it why he should remove or dlete 
    //it will  consider as wrong input
    //return  411 status code 
    if(isthereatleastoneunhealthykidney()){
        const newkidneys= [];
        for(let i=0;i<users[0].kidneys.length;i++){
            
    
            if(users[0].kidneys[i].healthy){
                newkidneys.push({
                    healthy : true
                })
            }
    
            
    
    
        }
        users[0].kidneys=newkidneys;
        res.json({msg: "Deleted Succesfully"})
    }
    else{

        res.status(411).json({
            msg:"You have no unhealthy kidneys "
        })
    }
   
})


function isthereatleastoneunhealthykidney(){
    let atleastunhealthykidney=false;

    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastunhealthykidney= true;
        }
    }

    return  atleastunhealthykidney;

}

app.listen(port);
