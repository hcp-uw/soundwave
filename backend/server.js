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
// change this in the production version: cors({ origin: process.env.CLIENT_URL })
app.use(cors({ origin: "*"}));

app.use(express.urlencoded({extended: true}));

const db = admin.firestore();

/**
 * POST /create
 * ----------------
 * Creates a new post and stores it in Firestore.
 *
 * Request Body:
 * @param {string} postId   - Unique ID for the post (used as Firestore document ID)
 * @param {string} song     - Song title
 * @param {string} artist  - Artist name
 * @param {string} album   - Album name
 * @param {string} cover   - URL to album cover image
 * @param {string} content - User-written post content
 * @param {string} uid     - Firebase user ID of the creator
 *
 * Responses:
 * @returns {201} Created
 * @returns {500} Internal server error
 */
app.post('/posts', async (req, res) => {
    try {
        console.log("Received request at /create", req.body); 
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
        res.status(201).json({
            message: "Post created successfully",
            id: postId
        });

    } 
    catch (error) {
        console.error("Firebase Error:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }

})



/**
 * GET /read/all
 * ----------------
 * Retrieves all posts from the Firestore "posts" collection.
 *
 * Response:
 * @returns {200} Array of post objects
 * @returns {500} Internal server error if retrieval fails
 */
app.get('/posts', async (req, res) => {
    try {
        const postsRef = db.collection("posts");
        const response = await postsRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch(error) {
        console.error("Firebase Error:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
})

/**
 * GET /read/:postId
 * -----------------
 * Retrieves a single post by its Firestore document ID.
 *
 * URL Parameters:
 * @param {string} postId - ID of the post to retrieve
 *
 * Response:
 * @returns {200} Post object if found
 * @returns {500} Internal server error
 */
app.get('/posts/:postId', async (req, res) => {
    try {
        const postRef = db.collection("posts").doc(req.params.postId)
        const response = await postRef.get();
        if (!response.exists) {
            return res.status(404).json({ error: "Post not found" });
        }

    } catch(error) {
        res.send(error);
        //error messages:
        // console.error("Firebase Error:", error);
        // res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
})

/**
 * * PATCH /posts/:postId
 * --------------------
 * Partially updates a post.
 *
 * Request Body:
 * @param {string} postId   - ID of the post to update
 *
 * Response:
 * @returns {200} Firestore update response
 * @returns {500} Internal server error
 */
app.patch('/posts/:postId', async (req, res) => {
  try {
    const updates = req.body;

    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields provided to update" });
    }

    const postRef = db.collection("posts").doc(req.params.postId);
    const doc = await postRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    await postRef.update(updates);

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Firebase Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


/**
 * DELETE /delete/:postId
 * ---------------------
 * Deletes a post from Firestore by its document ID.
 *
 * URL Parameters:
 * @param {string} postId - ID of the post to delete
 *
 * Response:
 * @returns {200} Firestore delete response
 * @returns {500} Internal server error
 */
app.delete('/posts/:postId', async (req, res) => {
    try {
        const postRef = db.collection("posts").doc(req.params.postId);
        const doc = await postRef.get();

        if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
        }

        await postRef.delete();

        res.status(204).send();
    } catch (error) {
        console.error("Firebase Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



// error handling
app.use(unknownEndpoint);

// set port to listen on
const PORT = 3001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
}); 