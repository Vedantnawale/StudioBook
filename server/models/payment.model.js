import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    
    razorpay_payment_id: {
        type: String,
        required: [true, 'Payment id is required']
    },  // mulitple payment use kar rahe ho to uska nam razorpay_payment_id na rakhke payment_id rakhna abhi dummy use kar rahe isilye ye chalega.
    
    razorpay_subscription_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Payment = model('Payment', paymentSchema);

export default Payment;