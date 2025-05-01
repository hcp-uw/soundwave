import axios from 'axios';

// Replace with your backend URL or IP address (Ensure the backend is running)

//THINGS TO REMEMBER WHEN RUNNING LOCALLY
    //start frontend AND backend
    //replace IP address (check every time)

//REMEMBER TO UPDATE IP ADDRESS!!!!!

////const API_URL = 'http://10.18.255.150:3001'; // rachel
const API_URL = 'http://10.19.20.57:3001'; // miranda
//const API_URL = 'http://localhost:3001';
const API_URL = 'http://10.19.71.196:3001'; // aditi

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/read/all`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const sendData = async (data) => {
    try {
        console.log("Sending data:", data);
        const response = await axios.post(`${API_URL}/create`, data, { timeout: 20000 });
        console.log("Response received:", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Axios error:", error.message);
        }
        return null;
    }
};

export const createPost = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/create`, data); // Matches your /create endpoint
            return response.data; // Returns success message or created postId
        } catch (error) {
            console.error("Error creating post:", error.message);
            return null;
        }
    };


// import axios from 'axios';

// // Replace with your backend URL (use the correct IP for physical device testing)
// const API_URL = 'http://localhost:3001/'; // Replace "localhost" with your IP if on a physical device

// // Function to fetch all posts
// export const fetchAllPosts = async () => {
//     try {
//         const response = await axios.get(${API_URL}/read/all); // Adjusted to match your /read/all endpoint
//         return response.data; // Returns an array of posts
//     } catch (error) {
//         console.error("Error fetching posts:", error.message);
//         return null;
//     }
// };

// // Function to fetch a single post by postId
// export const fetchSinglePost = async (postId) => {
//     try {
//         const response = await axios.get(${API_URL}/read/${postId}); // Adjusted to match your /read/:postId endpoint
//         return response.data; // Returns a single post object
//     } catch (error) {
//         console.error(Error fetching post with ID ${postId}:, error.message);
//         return null;
//     }
// };

// // Function to create a new post
// export const createPost = async (data) => {
//     try {
//         const response = await axios.post(${API_URL}/create, data); // Matches your /create endpoint
//         return response.data; // Returns success message or created postId
//     } catch (error) {
//         console.error("Error creating post:", error.message);
//         return null;
//     }
// };
// // Function to update a post
// export const updatePost = async (postId, updatedContent) => {
//     try {
//         const response = await axios.post(${API_URL}/update, {
//             postId,
//             content: updatedContent, // Matches the "content" update field
//         });
//         return response.data;
//     } catch (error) {
//         console.error(Error updating post with ID ${postId}:, error.message);
//         return null;
//     }
// };

// // Function to delete a post
// export const deletePost = async (postId) => {
//     try {
//         const response = await axios.delete(${API_URL}/delete/${postId}); // Matches your /delete/:postId endpoint
//         return response.data;
//     } catch (error) {
//         console.error(Error deleting post with ID ${postId}:, error.message);
//         return null;
//     }
// };
