const Order = require('../modals/orderModal');
const Cart = require('../modals/cartModal');
const User = require('../modals/userModal');
const Items = require('../modals/itemModal');


exports.showOrder = async (req,res)=>{
    const userId = req.user.user_id;
    const {email} =await User.findOne({_id:userId})

    const order =await Order.findOne({email})
    try{
    const items = await Promise.all(

        order.items.map(async (item)=>{
            const itemDetails = await Items.findOne({id:item.itemId})

              return{
                id:itemDetails.id,
                title: itemDetails.title,
                description:itemDetails.description,
                price: itemDetails.price,
                image:itemDetails.image,
                quantity:item.quantity
            }
        })
    );
    const detailedOrder = {
        name: order.name,
        address: order.address,
        items:items,
        email: order.email,
        phone:order.phone,
        orderType : order.orderType,
        orderTime: order.orderTime,
        availableTime: order.availableTime,
    }
    
    res.status(200).json(detailedOrder)
    }catch(e){
       res.status(500).json(e)
    }
}

exports.createOrder = async(req,res)=>{
    const {address,phone,minutesToPrepare} = req.body
    const userId = req.user.user_id;
    function calculateTime(){
        const date = new Date;
        console.log(date)
        date.setTime(date.getTime() + minutesToPrepare * 60000);
        return date
    }
    const availableTime =calculateTime();

    const user =await User.findOne({_id:userId});
    const {name,email} = user;

    const userCart = await Cart.findOne({userId});
    const {items,orderType} = userCart;


    if(!userCart && !userCart.items.length){
        return res.status(404).json({message:"Cart is empty"})
    }
    try{
        const order = new Order({
            name,
            email,
            address,
            items,
            phone,
            orderType,
            availableTime
        })  
        await order.save()
        res.status(200).json("order created");
    }catch(e){
       console.log(e)
       res.status(500).json(e)
    }
}



//     if(!userCart && !userCart.products.length){
//         return res.status(404).json({message:"Cart is empty"})
//     }

//     try{
//     let subtotal =0;
//     const allproducts =  await Products.find();
//     const products = userCart.products.map((product)=>{

//         const productDetails = allproducts.find((item)=> item.id == product.productId);

//         subtotal += productDetails.price * product.quantity;
//         return {
//             id:productDetails.id,
//             title:productDetails.title,
//             description:productDetails.description,
//             price:productDetails.price,
//             image:productDetails.image,
//             quantity:product.quantity
//         };
//     })
//     res.status(200).json({products,subtotal});
// }catch(e){
//     res.status(500).json({
//         message:"Error in fetching products",
//     })
// }


// let subtotal =0;
//         const allproducts =  await Products.find();
//         products = userCart.products.map((product)=>{
    
//             const productDetails = allproducts.find((item)=> item.id == product.productId);
    
//             subtotal += productDetails.price * product.quantity;
//             return {
//                 id:productDetails.id,
//                 title:productDetails.title,
//                 description:productDetails.description,
//                 price:productDetails.price,
//                 image:productDetails.image,
//                 quantity:product.quantity
//             };
//         })
        // res.status(200).json({products,subtotal});