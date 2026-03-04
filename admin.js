// Admin Panel Authentication and Video Upload
const secretCode = "100";

const loginButton = document.getElementById('login-button');
const secretCodeInput = document.getElementById('secret-code');
const loginMessage = document.getElementById('login-message');
const uploadSection = document.getElementById('upload-section');

loginButton.addEventListener('click', () => {
    if (secretCodeInput.value === secretCode) {
        loginMessage.textContent = "Access granted!";
        loginMessage.style.color = "green";
        uploadSection.style.display = "block";
        document.getElementById('login-section').style.display = "none";
    } else {
        loginMessage.textContent = "Incorrect secret code!";
        loginMessage.style.color = "red";
    }
});

// Handle video upload
import { uploadVideo } from './firebase-config.js';

videoUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file) {
        try {
            const downloadURL = await uploadVideo(file);
            uploadMessage.textContent = `Video uploaded successfully: ${file.name}`;
            uploadMessage.style.color = "green";
            console.log("Uploaded video URL:", downloadURL);
        } catch (error) {
            uploadMessage.textContent = "Failed to upload video.";
            uploadMessage.style.color = "red";
            console.error("Error uploading video:", error);
        }
    } else {
        uploadMessage.textContent = "No video selected.";
        uploadMessage.style.color = "red";
    }
});

// Handle movie upload form submission
const movieUploadForm = document.getElementById('movie-upload-form');
const uploadStatus = document.getElementById('upload-status');

movieUploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('movie-title').value;
    const description = document.getElementById('movie-description').value;
    const releaseDate = document.getElementById('movie-release-date').value;
    const imageFile = document.getElementById('movie-image').files[0];
    const videoFile = document.getElementById('movie-video').files[0];

    if (!imageFile || !videoFile) {
        uploadStatus.textContent = "Please select both an image and a video.";
        uploadStatus.style.color = "red";
        return;
    }

    try {
        // Upload image to Firebase Storage
        const imageURL = await uploadVideo(imageFile);

        // Upload video to Firebase Storage
        const videoURL = await uploadVideo(videoFile);

        // Display success message
        uploadStatus.textContent = `Movie uploaded successfully!`;
        uploadStatus.style.color = "green";

        console.log("Movie Details:", {
            title,
            description,
            releaseDate,
            imageURL,
            videoURL
        });

        // Optionally, you can save these details to a database (e.g., Firebase Firestore)
    } catch (error) {
        uploadStatus.textContent = "Failed to upload movie. Please try again.";
        uploadStatus.style.color = "red";
        console.error("Error uploading movie:", error);
    }
});

// Handle video upload form submission
const videoUploadForm = document.getElementById('video-upload-form');
const videoUploadStatus = document.getElementById('video-upload-status');

videoUploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const videoTitle = document.getElementById('video-title').value;
    const videoFile = document.getElementById('video-file').files[0];

    if (!videoFile) {
        videoUploadStatus.textContent = "Please select a video file.";
        videoUploadStatus.style.color = "red";
        return;
    }

    try {
        // Upload video to Firebase Storage
        const videoURL = await uploadVideo(videoFile);

        // Display success message
        videoUploadStatus.textContent = `Video uploaded successfully! Title: ${videoTitle}`;
        videoUploadStatus.style.color = "green";

        console.log("Uploaded Video URL:", videoURL);
    } catch (error) {
        videoUploadStatus.textContent = "Failed to upload video. Please try again.";
        videoUploadStatus.style.color = "red";
        console.error("Error uploading video:", error);
    }
});