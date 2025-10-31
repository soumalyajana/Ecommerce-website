import mongoose from 'mongoose'

/**
 * Defines the schema for an Order document in MongoDB.
 * This schema captures essential information about a customer order.
 */
const orderSchema = new mongoose.Schema({
    // Reference to the user who placed the order
    userId: { 
        type: String, 
        required: true 
    },
    // Array of items in the order (usually includes product ID, quantity, price, etc.)
    items: { 
        type: Array, 
        required: true 
    },
    // Total amount of the order
    amount: { 
        type: Number, 
        required: true 
    },
    // The shipping/billing address object
    address: { 
        type: Object, 
        required: true 
    },
    // Status of the order (e.g., 'Order Placed', 'Processing', 'Shipped', 'Delivered')
    status: { 
        type: String, 
        required: true, 
        default: 'Order Placed' 
    },
    // Method of payment (e.g., 'Credit Card', 'Cash on Delivery')
    paymentMethod: { 
        type: String, 
        required: true 
    },
    // Boolean indicating if payment has been received
    payment: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
    // Timestamp or date of the order creation (using Number for Unix timestamp or similar)
    date: { 
        type: Number, 
        required: true 
    },
}, { minimize: false }) // The minimize: false option ensures that Mongoose keeps empty objects ({}) in the schema if they exist

/**
 * Creates the Mongoose model. 
 * Checks if the model already exists to prevent re-compilation in development.
 */
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)

export default orderModel;
