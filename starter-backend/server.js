const express = require("express");
const cors = require("cors");
const { unknownEndpoint } = require('./middleware');

require("dotenv").config({ path: "firebase_key.env" }); // Load env file
// create your express application
const app = express();

const admin = require("firebase-admin");
const fs = require("fs");

const credentials = JSON.parse(fs.readFileSync(process.env.FIREBASE_KEY_PATH, "utf8")); 

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

// enable json parsing
app.use(express.json());

// enable cors
app.use(cors({ origin: "*"}));
// app.use(cors({
//     origin: "http://10.18.101.45:3001",
//     method: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"]
// }));

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

const db = admin.firestore();

//post endpoint! to create!
app.post('/create', async (req, res) => {
    try {
        console.log("THIS IS WHAT I GOT:", req.body); 
        const postId = req.body.postId;
        const postJson = {
            //username: req.body.username,
            song: req.body.song,
            artist: req.body.artist,
            content: req.body.content,
            cover: req.body.cover,
            album: req.body.album,
            uid: req.body.uid,
            //rating: req.body.rating
        };
        const response = await db.collection("posts").doc(postId).set(postJson);
        res.send(response);
        console.log("sent successfully");
        //code with error messages to help for debugging:
        // Firestore write (Await it!)
        // await db.collection("posts").doc(postId).set(postJson);

        // console.log("Data written to Firestore successfully");
        // res.status(200).json({ message: "Post added successfully!" });
    } 
    catch(error) {
        res.send(error);
        //error messages:
        console.error("Firebase Error:", error);
        // res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})



//read endpoint
app.get('/read/all', async (req, res) => {
    try {
        const postsRef = db.collection("posts");
        const response = await postsRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch(error) {
        res.send(error);
        //error messages:
        // console.error("Firebase Error:", error);
        // res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})

//read 1 post
app.get('/read/:postId', async (req, res) => {
    try {
        const postRef = db.collection("posts").doc(req.params.postId)
        const response = await postRef.get();
        res.send(response.data());
    } catch(error) {
        res.send(error);
        //error messages:
        // console.error("Firebase Error:", error);
        // res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})

//update
app.post('/update', async (req, res) => {
    try {
        const postId = req.body.postId;
        const newContent = "hello world";
        const postRef = await db.collection("posts").doc(postId).update({
            content: newContent
        })
        res.send(postRef);
    } catch(error) {
        res.send(error);
        //error messages:
        // console.error("Firebase Error:", error);
        // res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})

//delete
app.delete('/delete/:postId', async (req, res) => {
    try {
        const response = await db.collection("posts").doc(req.params.postId).delete();
        res.send(response);
    } catch(error) {
        res.send(error);
        //error messages:
        // console.error("Firebase Error:", error);
        // res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})


// our 'database'. This is just a simple in-memory store for the images, and
// will be lost when the server is restarted. In a real application, you would
// use a database to store the images.
const images = [];

// test endpoint
app.get('/message/hello', (req, res) => {
    res.send(
        `Attention HCP Project Team! If you see this, your front end and
        back end are connected. Don't believe me? Upload and image and
        see for yourself!`
    )
})

app.post('/image/upload', (req, res) => {
    console.log(req.body);
    const base64ImgData = req.body.image;
    images.push(base64ImgData);
    res.status(201).send('Image uploaded');
})

app.get('/image/featured', (req, res) => {
    res.send(images);
})

// error handling
app.use(unknownEndpoint);

// set port to listen on
const PORT = 3001;

// start your server
// app.listen(PORT, () => {
//     console.log(`Server running on port test ${PORT}`);
// });


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});