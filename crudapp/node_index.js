const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9595;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://admin:admin@cluster0.6g5dile.mongodb.net/Deliveries', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const dtSchema = new mongoose.Schema({
    orderId: String,
    deliveryDate: String,
    deliveryAddress: String,
    deliveryFee: String,
});

const dt = mongoose.model('Deliveries', dtSchema);


app.post('/deliveries/add', async (req, res) => {
    const dt1 = new dt(req.body);
    try {
        await dt1.save();
        res.send(dt1);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/deliveries/all', async (req, res) => {
    try {
        const dt1 = await dt.find();
        res.send(dt1);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/deliveries/update/:id', async (req, res) => {
    try {
        const dt1 = await dt.findByIdAndUpdate(req.params.id, req.body);
        res.send(dt1);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/deliveries/delete/:id', async (req, res) => {
    try {
        const dt1 = await dt.findByIdAndDelete(req.params.id);
        res.send(dt1);
    } catch (error) {
        res.status(500).send(error);
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
