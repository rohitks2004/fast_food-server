const Item = require('../modals/itemModal');
const { v4:uuidv4} = require('uuid');

exports.getItems = async(req,res)=>{
    try{
        const items =await Item.find();
        res.send(items);
    }catch(e){
        console.log(e);        
    }
}

exports.createItem = async(req,res)=>{
    
    const {user_id:userId , userType} = req.user;

    if(userType =='customer'){
        res.status(500).json({
            message: 'You are not authorized to create an item'
        })
    } 

    const {name,description,price,image,category} = req.body;

    const item = new Item({
        id:uuidv4(),
        name,
        description,
        price,
        image,
        category
    })
    try{
        await item.save().then(res.status(200).json('item created successfully'))
    }
    catch(e){
        console.log(e)
    }
}
exports.updateItem = async (req,res)=>{
    const {user_id:userId , userType} = req.user;

    if(userType =='customer'){
        res.status(500).json({
            message: 'You are not authorized to update an item'
        })
    } 

    const id = req.params.id;
    try{ 
        const item = await Item.find({id})
        const {title,description,price,category,image} = item
        await Item.updateOne({id},{
            $set:{
                title:(req.body.title || title ),
                description:(req.body.description || description),
                price:(req.body.price || price),
                category:(req.body.category || category),
                image:(req.body.image || image),
            }
        })
        res.status(200).json('updated')
    }
    catch(e){
        console.log(e)
    }
}
exports.deleteItem = async(req,res)=>{
    const {user_id:userId , userType} = req.user;

    if(userType =='customer'){
        res.status(500).json({
            message: 'You are not authorized to delete an item'
        })
    } 

    try{
        const id = req.body.id;
        await Item.deleteOne({id})
        res.status(200).json("item deleted")
    }catch(e){
        console.log(e)
    }
}
// {
//     "id": 1,
//     "name": "Original Recipe Chicken",
//     "description": "Classic fried chicken with secret blend of 11 herbs and spices.",
//     "price": 8.99,
//     "image": "src/images/original_recipe_chicken.png",
//     "category": "Chicken&Fish"
// }