// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEZnZl0_VTb4TOIWUgOlEMApx0LXeVbn8",
  authDomain: "bazzigar-movies.firebaseapp.com",
  projectId: "bazzigar-movies",
  storageBucket: "bazzigar-movies.firebasestorage.app",
  messagingSenderId: "395090920877",
  appId: "1:395090920877:web:9862978e147d7d425ecd24",
  measurementId: "G-LLHQQ9XQFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Function to upload a file to Firebase Storage
export async function uploadVideo(file) {
    const storageRef = ref(storage, `videos/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("File uploaded successfully. Download URL:", downloadURL);
    return downloadURL;
}