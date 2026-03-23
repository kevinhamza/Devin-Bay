import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    userId: String,
    cart: Array,
    total: Number,
    paymentMethod: String,
    status: {type: String, default: "pending"}
}, {timestamps: true})

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)

