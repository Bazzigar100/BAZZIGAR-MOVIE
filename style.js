// Updated sample movie data with real images
const movies = [
    { title: "Inception", description: "A mind-bending thriller by Christopher Nolan.", image: "https://image.tmdb.org/t/p/w200/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg" },
    { title: "The Dark Knight", description: "A gritty superhero movie.", image: "https://image.tmdb.org/t/p/w200/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg" },
    { title: "Interstellar", description: "A journey through space and time.", image: "https://image.tmdb.org/t/p/w200/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg" },
    { title: "Tenet", description: "A time-twisting espionage thriller.", image: "https://image.tmdb.org/t/p/w200/k68nPLbIST6NP96JmTxmZijEvCA.jpg" },
    { title: "Dunkirk", description: "A gripping World War II drama.", image: "https://image.tmdb.org/t/p/w200/ebSnODDg9lbsMIaWg2uAbjn7TO5.jpg" }
];

// Function to display movies
function displayMovies(movieList) {
    const movieGrid = document.getElementById('movie-grid');
    movieGrid.innerHTML = '';

    movieList.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
        `;

        movieGrid.appendChild(movieElement);
    });
}

// Search functionality
const searchBox = document.getElementById('search-box');
searchBox.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    displayMovies(filteredMovies);
});

// Initial display
displayMovies(movies);

// Function to open the movie modal
function openMovieModal(movie) {
    const modal = document.getElementById('movie-modal');
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-description').textContent = movie.description;
    document.getElementById('modal-release-date').textContent = movie.releaseDate;
    document.getElementById('modal-image').src = movie.image;
    document.getElementById('watch-link').href = movie.videoURL;
    document.getElementById('download-link').href = movie.videoURL;

    modal.style.display = 'block';
}

// Function to close the movie modal
const closeModal = document.getElementById('close-modal');
closeModal.addEventListener('click', () => {
    document.getElementById('movie-modal').style.display = 'none';
});

// Handle video upload
const videoUpload = document.getElementById('video-upload');
const uploadMessage = document.getElementById('upload-message');

videoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const videoURL = URL.createObjectURL(file);
        const movieGrid = document.getElementById('movie-grid');

        const videoElement = document.createElement('div');
        videoElement.classList.add('movie');

        videoElement.innerHTML = `
            <video controls width="100%">
                <source src="${videoURL}" type="${file.type}">
                Your browser does not support the video tag.
            </video>
            <h3>${file.name}</h3>
        `;

        movieGrid.appendChild(videoElement);
        uploadMessage.textContent = "Video uploaded successfully!";
    } else {
        uploadMessage.textContent = "No video selected.";
    }
});

// Handle subscription button clicks
const subscribeButtons = document.querySelectorAll('.subscribe-button');

subscribeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (index === 0) {
            alert('You have subscribed to the Monthly Plan for ₹10!');
        } else if (index === 1) {
            alert('You have subscribed to the Yearly Plan for ₹20!');
        }
    });
});

// Razorpay Payment Integration with UPI ID and UTR handling
const razorpayButton = document.getElementById('razorpay-button');

razorpayButton.addEventListener('click', () => {
    const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: 1000, // Amount in paise (₹10 = 1000 paise)
        currency: "INR",
        name: "PR Movies",
        description: "Premium Subscription",
        image: "https://via.placeholder.com/100", // Replace with your logo URL
        handler: function (response) {
            const utrNumber = prompt("Please enter the UTR number for verification:");
            if (utrNumber) {
                alert(`UTR Number: ${utrNumber} verified successfully!`);
                const confirmation = confirm("Do you want to activate your subscription now?");
                if (confirmation) {
                    alert("Subscription activated! Enjoy your premium access.");
                    addPremiumBadge(); // Add the premium badge after successful payment
                } else {
                    alert("Subscription activation canceled.");
                }
            } else {
                alert("UTR number is required to complete the subscription.");
            }
        },
        prefill: {
            name: "",
            email: "",
            contact: ""
        },
        theme: {
            color: "#1e90ff"
        },
        method: {
            upi: true, // Enable UPI payments (including Google Pay)
            card: true, // Enable card payments
            netbanking: true // Enable net banking
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
});

// Function to add a premium badge for subscribed users
function addPremiumBadge() {
    const premiumBadge = document.createElement('span');
    premiumBadge.textContent = 'Premium';
    premiumBadge.style.cssText = `
        background-color: gold;
        color: black;
        padding: 0.2rem 0.5rem;
        border-radius: 5px;
        font-size: 0.8rem;
        margin-left: 0.5rem;
    `;

    const header = document.querySelector('header h1');
    header.appendChild(premiumBadge);
}

// Chatbot functionality with automatic responses
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Predefined bot responses
const botResponses = {
    hello: "Hi there! How can I assist you today?",
    subscription: "Our premium subscription is ₹120 per month. Would you like to subscribe?",
    movies: "We have a wide range of movies available. Use the search bar to find your favorite!",
    default: "I'm sorry, I didn't understand that. Can you rephrase?"
};

// Function to handle user messages
function handleUserMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    handleBotResponse(message);
}

// Function to handle bot responses
function handleBotResponse(message) {
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');

    const lowerCaseMessage = message.toLowerCase();
    const response = botResponses[lowerCaseMessage] || botResponses.default;

    botMessage.textContent = response;
    chatMessages.appendChild(botMessage);

    // Scroll to the bottom of the chat window
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Automatically respond to user input
chatInput.addEventListener('input', () => {
    const message = chatInput.value.trim();
    if (message) {
        handleUserMessage(message);
        chatInput.value = '';
    }
});