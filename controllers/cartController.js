const Cart = require('../modals/cartModal')
const Items = require('../modals/itemModal')

exports.showCart =async(req,res)=>{
    const userId = req.user.user_id;
    const userCart = await Cart.findOne({userId})

    if(!userCart && !userCart.products.length){
        return res.status(404).json('cart is empty')
    }
    try{
        var subtotal = 0;
        const items = await Promise.all(
            userCart.items.map(async(item) => {
                const itemDetails = await Items.findOne({id:item.itemId})
                subtotal +=  itemDetails.price * item.quantity
                return {
                    id:itemDetails.id,
                    name: itemDetails.name,
                    description:itemDetails.description,
                    price: itemDetails.price,
                    category:itemDetails.category,
                    image:itemDetails.image,
                    quantity:item.quantity
                }
            }
        )
    )
        res.json({items,subtotal})
    }
    catch(e){
        res.status(500).json({
            message:"Error in fetching items",
            error:e
        })
    }
}
exports.addToCart = async(req,res)=>{
    const userId = req.user.user_id;
    const userCart =await Cart.findOne({userId})
    const {itemId,quantity,orderType} = req.body;

    if(!userCart){
        const userCart = new Cart({
            userId,
            orderType,
            items:[{
                itemId,
                quantity
            }]
        })
        try{
            await userCart.save();
            res.status(200).json("cart created");
        }
        catch(e){
            res.status(500).json(e);
        }
    }
    else{
        const itemIndex = userCart.items.findIndex(item => item.itemId == itemId);

        if(itemIndex > -1){
            userCart.items[itemIndex].quantity = quantity;
        }else{
            userCart.items.push({
                itemId,
                quantity
            })
        }
        try{
            await userCart.save();
            res.status(200).json("item added to created");
        }
        catch(e){
            res.status(500).json(e);
        }
    }
}
exports.removeFromCart=async(req,res)=>{
    const userId=req.user.user_id;
    // const {productId} = req.body;
    const itemId = req.params.id
    const userCart=await Cart.findOne({userId})
    if(!userCart){
        return res.status(404).json("cart not found")
    }else{
        const cartitems=userCart.items;
        if(!cartitems){
            res.status(200).json("No items in cart")
        }
        else{
            if(!cartitems.find((item)=>itemId==item.itemId)){
                res.status(200).json("product not found in cart")
            }
            const updatedCartitems=cartitems.filter((item)=>itemId!=item.itemId)
            userCart.items = updatedCartitems;
            await userCart.save();
            res.status(200).json("item removed from cart")
        }
    }
}

exports.editCart = async(req,res)=>{
    const userId=req.user.user_id;
    const orderType = req.body.orderType;
    const cart = await Cart.findOne({userId});
    cart.orderType = orderType;
    try{
        await cart.save();
        res.status(200).json("edited cart");
    }catch(e){
        console.log(e);
        
    }
}
// const cartSchema = new mongoose.Schema({
//     userId: { type: String, required: [true,"user id is required"] },
//     items:[
//         {
//             itemId: { type: String, required: [true,'product id is required']},
//             quantity:  { type: Number, required: [true,'quantity is required' ]}
//         }
//     ]
// })