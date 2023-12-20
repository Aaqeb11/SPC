// const express = require("express");
import express from "express"
import bodyParser from "body-parser";
import pg from "pg";
// import ejs from 'ejs';
// const ejs=require("ejs")

// const bodyParser = require("body-parser");
// const ejs = require("ejs");
import NodeWebcam from 'node-webcam';
import jsQR from 'jsqr';
import gerusermedia from 'getusermedia'
import getusermedia from "getusermedia";


const app = express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())
const db = new pg.Client({
    user: "postgres",
    host: "127.0.0.1",
    database: "world",
    password: "Aaqeb@110",
    port: 5432,
  });
  db.connect();




app.get("/", function(req, res){
    // res.render("home");
   res.render("home")
    
});
let bar="";
let count=0;
let listprice=0;
app.get("/barcode",(req,res)=>{
    res.status(200).json({ count ,listprice});
    
})
app.post("/barcode",async(req,res)=>{
    bar=req.body.barcode;
    // console.log(req.body.barcode);
    try {
        
        const result =  await db.query('SELECT count FROM items WHERE barcode=$1',[bar]);
        const listPrice=await db.query('SELECT listprice FROM items WHERE barcode=$1',[bar])
        count = result.rows[0].count;
        listprice=listPrice.rows[0].listprice
        console.log(count);
        res.status(200).send('successfull')
        
        // const items = result.rows;
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post("/add",async(req,res)=>{
    try{
        await db.query('UPDATE items SET count=count+1 WHERE barcode=$1',[bar])
        res.status(200).send('successfull')
    }catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).send('Internal Server Error');
    }
})
app.get("/add",async(req,res)=>{
    try {
        
        const result =  await db.query('SELECT count FROM items WHERE barcode=$1',[bar]);
        let count2 = result.rows[0].count;
        console.log(count2);
        res.status(200).json({ count2 });
        // const items = result.rows;
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).send('Internal Server Error');
    }
})
app.post("/sub",async(req,res)=>{
    try{
        await db.query('UPDATE items SET count=count-1 WHERE barcode=$1',[bar])
        res.status(200).send('successfull')
    }catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).send('Internal Server Error');
    }
})
app.get("/sub",async(req,res)=>{
    try {
        
        const result =  await db.query('SELECT count FROM items WHERE barcode=$1',[bar]);
        let count3 = result.rows[0].count;
        console.log(count3);
        res.status(200).json({ count3});
        // const items = result.rows;
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(3000, function() {
   console.log("Server started on port 3000.");
});