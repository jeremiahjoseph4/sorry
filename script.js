// Apology messages for different moods
const apologies = {
    angry: [
        "I'm sorry for making you angry. Your happiness means the world to me, and I hate being the reason you're upset.",
        "I messed up and made you angry. I promise to do better because seeing you angry hurts my heart.",
        "I know I'm in the doghouse right now, but I'm truly sorry. Can I make it up to you with ice cream and cuddles?",
        "I'm sorry I made you angry. You have every right to be upset, but I hope you can forgive me eventually."
    ],
    sad: [
        "I'm sorry I made you sad. The last thing I ever want is to be the reason tears fall from your beautiful eyes.",
        "Seeing you sad breaks my heart. I'm truly sorry and I'll do whatever it takes to see you smile again.",
        "I'm sorry for making you feel this way. Your happiness is my priority, and I failed. Let me fix it.",
        "I know I hurt you and that makes me sad too. I'm sorry and I promise to be more thoughtful."
    ],
    confused: [
        "I'm sorry I confused you. Communication is key, and I clearly dropped the ball. Let me explain better.",
        "I'm sorry for the confusion. I value you too much to leave you wondering. Let's talk it through.",
        "I messed up and made things confusing. I'm sorry and I promise to be clearer in the future.",
        "I'm sorry for the mixed signals. You deserve clarity and I failed to provide that. Can we start over?"
    ],
    amused: [
        "I see that little smile! I'm still sorry, but I'm glad I can at least amuse you while apologizing.",
        "I'm sorry, but I'm also glad you're amused! Can this be my official apology? Pretty please?",
        "I know I messed up, but seeing you amused gives me hope. I'm sorry and I love your smile!",
        "I'm sorry for whatever I did, but I'm loving that you're amused! Does this mean I'm forgiven?"
    ],
    happy: [
        "You're happy? That's the best news! I'm still sorry, but your happiness is everything to me.",
        "I'm sorry, but seeing you happy makes my day complete! Can I keep you this happy forever?",
        "I'm sorry for my mistake, but your happiness is my reward. I promise to keep you smiling!",
        "I'm sorry, but your smile just made my day! I'll do anything to keep you this happy."
    ]
};

// Emoji rain effects
const emojiSets = {
    angry: ['😢', '💔', '🙏', '😔'],
    sad: ['🤗', '💕', '🌈', '☀️'],
    confused: ['💡', '🗣️', '❤️', '🤝'],
    amused: ['😂', '🎉', '🎈', '🌟'],
    happy: ['🎉', '🥳', '💕', '🌈']
};

let currentMood = 'happy';
let hasSelectedMood = false;
let hasPulledLever = false;

// Global functions for onclick handlers
function selectMood(mood, element) {
    // Remove previous selection
    document.querySelectorAll('.mood').forEach(m => m.classList.remove('selected'));
    
    // Add selection to current mood
    element.classList.add('selected');
    currentMood = mood;
    hasSelectedMood = true;
    
    // Haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Show message
    updateMessage(`I see you're feeling ${currentMood}. Here's your personalized apology!`);
    
    // Generate apology immediately
    generateApology();
    
    // Create emoji rain immediately
    createEmojiRain();
}

function pullLever() {
    const lever = document.getElementById('apologyLever');
    
    if (!hasSelectedMood) {
        updateMessage("Please select how you're feeling first!");
        return;
    }
    
    // Animate lever
    lever.style.transform = 'rotate(30deg)';
    
    setTimeout(() => {
        lever.style.transform = 'rotate(0deg)';
    }, 300);
    
    // Haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate([50, 50, 50]);
    }
    
    // Generate new apology
    generateApology();
    hasPulledLever = true;
    
    // Create emoji rain again
    createEmojiRain();
}

function resetMachine() {
    // Haptic feedback if available
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    
    // Reset mood selection
    document.querySelectorAll('.mood').forEach(m => m.classList.remove('selected'));
    hasSelectedMood = false;
    hasPulledLever = false;
    currentMood = 'happy';
    
    // Reset message
    updateMessage('<span class="dancing-emoji">🤖</span> Click a mood to start... <span class="dancing-emoji">🤖</span>');
    
    // Remove any emoji rain
    document.querySelectorAll('.emoji-rain').forEach(emoji => emoji.remove());
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Show intro bubble with animation
    setTimeout(() => {
        document.getElementById('introBubble').classList.add('show');
    }, 500);
    
    // Create floating hearts periodically
    setInterval(createFloatingHeart, 2000);
    
    // Add touch event listeners for mobile as backup
    const moods = document.querySelectorAll('.mood');
    moods.forEach(mood => {
        mood.addEventListener('touchend', function(e) {
            e.preventDefault();
            const moodType = this.getAttribute('data-mood');
            selectMood(moodType, this);
        });
    });
    
    // Add touch event for lever as backup
    const lever = document.getElementById('apologyLever');
    lever.addEventListener('touchend', function(e) {
        e.preventDefault();
        pullLever();
    });
    
    // Add touch event for reset button as backup
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        resetMachine();
    });
});

function generateApology() {
    const apologyArray = apologies[currentMood];
    const randomApology = apologyArray[Math.floor(Math.random() * apologyArray.length)];
    
    const apologyText = document.getElementById('apologyText');
    apologyText.classList.remove('show-text');
    
    setTimeout(() => {
        apologyText.innerHTML = randomApology;
        apologyText.classList.add('show-text');
    }, 300);
}

function createEmojiRain() {
    const emojis = emojiSets[currentMood];
    const container = document.querySelector('.container');
    
    // Clear existing emoji rain
    document.querySelectorAll('.emoji-rain').forEach(emoji => emoji.remove());
    
    // Create fewer emojis on mobile for performance
    const emojiCount = window.innerWidth < 768 ? 15 : 20;
    
    for (let i = 0; i < emojiCount; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'emoji-rain';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(emoji);
            
            // Remove emoji after animation
            setTimeout(() => {
                emoji.remove();
            }, 5000);
        }, i * 100);
    }
}

function createFloatingHeart() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function updateMessage(message) {
    const apologyText = document.getElementById('apologyText');
    apologyText.classList.remove('show-text');
    
    setTimeout(() => {
        apologyText.innerHTML = message;
        apologyText.classList.add('show-text');
    }, 300);
}

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
