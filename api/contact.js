const mongoose = require('mongoose');

// This is your connection string with your password
const MONGODB_URI = "mongodb://safinsanthosh037:czPp7zUODcLXcyGh@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-xxxxxx-shard-0&authSource=admin&retryWrites=true&w=majority";
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
