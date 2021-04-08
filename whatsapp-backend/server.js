// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbmessages.js';
import Pusher from 'pusher';
import Cors from 'cors';

// app config
const app = express() ;
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1134310",
  key: "dc42d0d8f18ca63682ac",
  secret: "e20f1d447012e05f2232",
  cluster: "ap2",
  useTLS: true
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

// middleware
app.use(express.json());
app.use(Cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Header", "*");
//     next();
// });

// DB configuration

const connection_url = 'mongodb+srv://admin:xXXJlslSg1sjn39S@cluster0.fjjl3.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    // console.log(msgCollection);
    // console.log(changeStream);

    changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === 'insert') {
        const messageDetails = change.fullDocument;
        pusher.trigger('messages', 'inserted',
        {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            received: messageDetails.received,
        }
    );
} else {
    console.log('Error triggering Pusher')
}
        
    });
});

// ????

// api Routes
app.get("/",(req, res) => res.status(200).send("Hello world"));

app.get("/messages/syn", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage =  req.body;

    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
})

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))
