const mongoose = require('mongoose');

// This is your connection string with your password
const MONGODB_URI = "mongodb+srv://safinsanthosh037_db_user:<Safin2007>@cluster0.vzfqd8y.mongodb.net/portfolio?retryWrites=true&w=majority";
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            if (mongoose.connection.readyState !== 1) {
                await mongoose.connect(MONGODB_URI);
            }
            const newFeedback = new Feedback(req.body);
            await newFeedback.save();
            return res.status(200).send("<h1>Thank you!</h1><p>Feedback received.</p><a href='/'>Go Back</a>");
        } catch (error) {
            return res.status(500).send("Error: " + error.message);
        }
    }
}
