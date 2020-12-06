const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

router.get('/',(req,res)=>{
    const home="Welcome to Utilize Server"
    res.send(home)
})

router.post('/add_data',function (req,res){
    const {customer_name, customer_email, product, quantity} = req.body
    if(!customer_name||!customer_email||!product||!quantity){
        return res.status(422).json({error: "Fill all fields"})
    }
    let rawdata = fs.readFileSync(path.resolve(__dirname, '../data/DummyData.json'));
    let orderData = JSON.parse(rawdata);
    const tempid=uniqid()
    let obj = []; 
    obj.push({
        id:tempid, 
        customer_name,
        customer_email,
        product,
        quantity
        })
    orderData.forEach((order) => {
        obj.push({
            id:order.id, 
            customer_name:order.customer_name,
            customer_email: order.customer_email,
            product: order.product,
            quantity: order.quantity
        })
      });     
    fs.writeFileSync(path.resolve(__dirname, '../data/DummyData.json'), JSON.stringify(obj));
    return res.json({message: "Successfully Added" })

})

router.post('/update_data',function (req,res){
    const {id, customer_name, customer_email, product, quantity} = req.body
    if(!id || !customer_name||!customer_email||!product||!quantity){
        return res.status(422).json({error: "Fill all fields"})
    }
    let rawdata = fs.readFileSync(path.resolve(__dirname, '../data/DummyData.json'));
    let orderData = JSON.parse(rawdata);
    let success=false
    orderData.forEach((order) => {
        // If the bookID is the one we are looking for, set it as null
        if (order.id === id) {   
            order.customer_name=customer_name
            order.customer_email=customer_email
            order.product=product
            order.quantity=quantity 
            success=true
        }
      });
      json = JSON.stringify(orderData); //convert it back to json
      fs.writeFileSync(path.resolve(__dirname, '../data/DummyData.json'), JSON.stringify(orderData));
    if(success)
    return res.json({message: "Match Found and updated" })
    return res.status(422).json({error: "Order Not Found"})
})

router.get('/get_data', function (req, res) {
    let rawdata = fs.readFileSync(path.resolve(__dirname, '../data/DummyData.json'));
    let orderData = JSON.parse(rawdata);
    res.send(orderData)
})

module.exports = router 