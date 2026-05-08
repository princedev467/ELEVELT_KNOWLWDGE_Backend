const cartModel = require("../model/cart.model");

const getCart = async (req, res) => {


}

const getAllCart = async (req, res) => {
    console.log('terms Routes');
    try {
        const cart = await cartModel.find()

        console.log(cart);

        res.status(200).json({ sucess: true, data: cart, message: 'get  cart sucessfully' })

    } catch (error) {
        res.status(500).json({ sucess: false, data: [], message: 'getAll cart error' + error.message })
    }

}

const addCart = async (req, res) => {
    try {
        console.log("req.body", req.body);

        const cart = await cartModel.create(req.body)

        res.status(200).json({
            success: true,
            message: "cart added successfully",
            data: cart
        });



    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'add cart error' + error.message
        });
    }
};

const updateCart = async (req, res) => {
    try {
        console.log("id:", req.params.id);
        console.log("body:", req.body);

        const cartData = await cartModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );


        if (!cartData) {

            return res.status(404).json({ data: null, message: 'cart not updated' });
        }

        res.status(200).json({
            success: true,
            message: "cart update successfully",
            data: cartData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'update cart error ' + error.message
        });
    }
}

const deleteCart = async (req, res) => {
//     try {
//         // console.log("id:", req.params.id);

//            const{id1,id2}=req.params;
//            console.log("id1",id1);
           
        

//             let cartItem= await cartModel.findOne({"items._id": req.params.id});
//             console.log("cartItem",cartItem);

       
        

//         if (!cartData) {

//             return res.status(404).json({ data: null, message: 'cart not deleted' });
//         }

//     // let items  =  cartItem?.items?.findIndex((v)=>v._id=== req.params.id);

//     // let filtercart=cartItem?.items?.splice(items,1);

//         res.status(200).json({
//             success: true,
//             message: "cart Items  delete successfully",
//             data: cartData
//         });


//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             data: [],
//             message: 'delete cart Items  Internal Server Error ' + error.message
//         });
//     }

}


module.exports = {
    getAllCart,
    addCart,
    updateCart,
    deleteCart,
    getCart
}

