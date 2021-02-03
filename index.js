const express=require('express');
const app=express();
const port=8000;

app.listen(port,function(err){
    if(err){
        // console.log('error: ',err);
        //instead of above
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`server is running on the port : ${port}`);
});