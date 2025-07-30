// Global variables
let gameCounter = 0;
let currentColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffa500'];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
    initializeSocialMediaLinks();
    initializeVisitorSharing();
    updateGameCounter();
});

// Initialize social media link interactions
function initializeSocialMediaLinks() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show notification
            const platform = this.querySelector('span').textContent;
            showNotification(`🌐 Opening ${platform}! Stay connected with our family!`);
            
            // Add sparkle effect
            createSocialSparkles(this);
        });
        
        // Add hover sound effect
        card.addEventListener('mouseenter', function() {
            playLightClickSound();
        });
    });
}

// Create sparkle effect for social media cards
function createSocialSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            sparkle.style.fontSize = '1rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = `socialSparkle 1s ease-out forwards`;
            
            // Random direction
            const angle = (i / 8) * 360;
            sparkle.style.setProperty('--angle', angle + 'deg');
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 50);
    }
}

// Light click sound for hover effects
function playLightClickSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Initialize visitor sharing functionality
function initializeVisitorSharing() {
    initializeSampleContent();
    initializeFileUploads();
    initializeStoryForm();
}

// Switch between sharing tabs
function switchTab(tabName) {
    // Remove active class from all tabs and buttons
    document.querySelectorAll('.sharing-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected tab and button
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
    
    playLightClickSound();
    showNotification(`📋 Switched to ${tabName.charAt(0).toUpperCase() + tabName.slice(1)} tab!`);
}

// Initialize sample content for demonstration
function initializeSampleContent() {
    // Sample photos
    const photoGallery = document.getElementById('photo-gallery');
    const samplePhotos = [
        { emoji: '🏖️', title: 'Beach Day', author: 'Sarah Family' },
        { emoji: '🎂', title: 'Birthday Fun', author: 'Mike & Kids' },
        { emoji: '🌳', title: 'Nature Walk', author: 'Johnson Family' },
        { emoji: '🎪', title: 'Circus Adventure', author: 'The Smiths' },
        { emoji: '🏔️', title: 'Mountain Trip', author: 'Adventure Family' },
        { emoji: '🎨', title: 'Art Day', author: 'Creative Kids' }
    ];
    
    samplePhotos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <div class="photo-placeholder-item">
                <div class="emoji">${photo.emoji}</div>
                <h5>${photo.title}</h5>
                <p>by ${photo.author}</p>
            </div>
        `;
        photoItem.addEventListener('click', () => {
            showNotification(`📷 Viewing "${photo.title}" by ${photo.author}!`);
            playLightClickSound();
        });
        photoGallery.appendChild(photoItem);
    });
    
    // Sample videos
    const videoGallery = document.getElementById('video-gallery');
    const sampleVideos = [
        { emoji: '🎬', title: 'Family Movie Night', author: 'The Browns', duration: '2:30' },
        { emoji: '🏃', title: 'Kids Running Race', author: 'Sports Family', duration: '1:45' },
        { emoji: '🍰', title: 'Baking Together', author: 'Chef Mom', duration: '3:15' },
        { emoji: '🐕', title: 'Playing with Pets', author: 'Animal Lovers', duration: '2:00' }
    ];
    
    sampleVideos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <div class="video-placeholder-item">
                <div class="emoji">${video.emoji}</div>
                <h5>${video.title}</h5>
                <p>by ${video.author}</p>
                <small>Duration: ${video.duration}</small>
            </div>
        `;
        videoItem.addEventListener('click', () => {
            showNotification(`🎥 Playing "${video.title}" by ${video.author}!`);
            playLightClickSound();
        });
        videoGallery.appendChild(videoItem);
    });
    
    // Sample stories
    const storiesContainer = document.getElementById('stories-gallery');
    const sampleStories = [
        {
            title: "Our Amazing Beach Vacation",
            author: "Emma Wilson",
            type: "Family Trip",
            location: "Malibu Beach",
            content: "We spent the most wonderful week at the beach! The kids built sandcastles while we watched the sunset every evening. It was pure magic watching them discover seashells and chase the waves. These are the moments that make life beautiful!",
            date: "2 days ago"
        },
        {
            title: "First Day of School Adventure",
            author: "David Chen",
            type: "Special Milestone",
            location: "Sunny Elementary",
            content: "Today our little one started kindergarten! The excitement, nervousness, and pride all mixed together. Seeing her walk into that classroom with her new backpack was both heartwarming and tear-inducing. Here's to new beginnings!",
            date: "1 week ago"
        },
        {
            title: "Grandma's Secret Recipe Day",
            author: "Maria Rodriguez",
            type: "Everyday Moments",
            location: "Our Kitchen",
            content: "Three generations cooking together in one kitchen! Grandma finally shared her famous tamale recipe with us. The kids were covered in flour, but their smiles were priceless. Food really does bring families together.",
            date: "3 days ago"
        }
    ];
    
    sampleStories.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.className = 'story-item';
        storyItem.innerHTML = `
            <div class="story-header">
                <div class="story-title">${story.title}</div>
                <div class="story-meta">${story.date}</div>
            </div>
            <div class="story-content">${story.content}</div>
            <div class="story-footer">
                <span>📍 ${story.location}</span>
                <span>By ${story.author}</span>
                <span>🏷️ ${story.type}</span>
            </div>
        `;
        storyItem.addEventListener('click', () => {
            showNotification(`📖 Reading "${story.title}" by ${story.author}!`);
            playLightClickSound();
        });
        storiesContainer.appendChild(storyItem);
    });
}

// Initialize file upload functionality
function initializeFileUploads() {
    const photoUpload = document.getElementById('photo-upload');
    const videoUpload = document.getElementById('video-upload');
    
    photoUpload.addEventListener('change', function(e) {
        handleFileUpload(e.target.files, 'photo');
    });
    
    videoUpload.addEventListener('change', function(e) {
        handleFileUpload(e.target.files, 'video');
    });
}

// Trigger file upload
function triggerFileUpload(type) {
    const uploadInput = document.getElementById(type + '-upload');
    uploadInput.click();
    playLightClickSound();
}

// Handle file upload
function handleFileUpload(files, type) {
    if (files.length === 0) return;
    
    const fileNames = Array.from(files).map(file => file.name).join(', ');
    showNotification(`📤 Uploading ${files.length} ${type}(s): ${fileNames.substring(0, 50)}${fileNames.length > 50 ? '...' : ''}!`);
    
    // Simulate upload process
    setTimeout(() => {
        showNotification(`✅ Successfully uploaded ${files.length} ${type}(s)! Thank you for sharing!`);
        createConfetti();
        
        // Add uploaded files to gallery (simulation)
        addUploadedContent(files, type);
    }, 2000);
}

// Add uploaded content to gallery (simulation)
function addUploadedContent(files, type) {
    const gallery = document.getElementById(type === 'photo' ? 'photo-gallery' : 'video-gallery');
    
    Array.from(files).forEach(file => {
        const item = document.createElement('div');
        item.className = type + '-item';
        
        const emoji = type === 'photo' ? '📸' : '🎥';
        const content = `
            <div class="${type}-placeholder-item">
                <div class="emoji">${emoji}</div>
                <h5>${file.name}</h5>
                <p>by You (just uploaded!)</p>
                ${type === 'video' ? '<small>Processing...</small>' : ''}
            </div>
        `;
        
        item.innerHTML = content;
        item.style.border = '2px solid #ffa500';
        item.style.background = 'rgba(255, 165, 0, 0.2)';
        
        gallery.insertBefore(item, gallery.firstChild);
        
        item.addEventListener('click', () => {
            showNotification(`${emoji} Viewing your uploaded ${type}: ${file.name}!`);
            playLightClickSound();
        });
    });
}

// Initialize story form
function initializeStoryForm() {
    const storyForm = document.getElementById('storyForm');
    
    storyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(storyForm);
        const name = storyForm.querySelector('input[type="text"]').value;
        const title = storyForm.querySelectorAll('input[type="text"]')[1].value;
        const story = storyForm.querySelector('textarea').value;
        const type = storyForm.querySelector('select').value;
        const location = storyForm.querySelectorAll('input[type="text"]')[2].value;
        
        if (name && title && story) {
            addNewStory({
                title: title,
                author: name,
                type: type || 'Adventure',
                location: location || 'Unknown',
                content: story,
                date: 'Just now'
            });
            
            showNotification(`📝 Thank you ${name}! Your story "${title}" has been shared!`);
            storyForm.reset();
            createConfetti();
            playLightClickSound();
        }
    });
}

// Add new story to the gallery
function addNewStory(story) {
    const storiesContainer = document.getElementById('stories-gallery');
    
    const storyItem = document.createElement('div');
    storyItem.className = 'story-item';
    storyItem.style.border = '2px solid #ffa500';
    storyItem.style.background = 'rgba(255, 165, 0, 0.2)';
    
    storyItem.innerHTML = `
        <div class="story-header">
            <div class="story-title">${story.title} ✨ NEW!</div>
            <div class="story-meta">${story.date}</div>
        </div>
        <div class="story-content">${story.content}</div>
        <div class="story-footer">
            <span>📍 ${story.location}</span>
            <span>By ${story.author}</span>
            <span>🏷️ ${story.type}</span>
        </div>
    `;
    
    storyItem.addEventListener('click', () => {
        showNotification(`📖 Reading "${story.title}" by ${story.author}!`);
        playLightClickSound();
    });
    
    storiesContainer.insertBefore(storyItem, storiesContainer.firstChild);
    
    // Scroll to the new story
    storyItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Interactive functions for home section
function createConfetti() {
    playFireworkSound();
    
    // Create massive fireworks effect
    createFireworks();
    
    // Enhanced confetti with multiple colors and shapes
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createEnhancedConfetti();
        }, i * 30);
    }
    
    // Screen flash effect
    createScreenFlash();
    
    // Shake the page
    shakeScreen();
    
    showNotification('🎆 BOOM! Amazing fireworks celebration! 🎇');
}

// Create spectacular fireworks
function createFireworks() {
    for (let f = 0; f < 8; f++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6) + 100;
            
            // Create firework explosion
            createFireworkExplosion(x, y);
            
            // Play explosion sound
            playExplosionSound();
        }, f * 600);
    }
}

// Create individual firework explosion
function createFireworkExplosion(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffa500', '#ff69b4', '#32cd32', '#dda0dd'];
    const particles = 25;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 10px currentColor';
        
        const angle = (i / particles) * 360;
        const velocity = 150 + Math.random() * 100;
        particle.style.animation = `fireworkParticle 2s ease-out forwards`;
        particle.style.setProperty('--angle', angle + 'deg');
        particle.style.setProperty('--velocity', velocity + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2500);
    }
    
    // Create central explosion flash
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.left = (x - 50) + 'px';
    flash.style.top = (y - 50) + 'px';
    flash.style.width = '100px';
    flash.style.height = '100px';
    flash.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)';
    flash.style.borderRadius = '50%';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9998';
    flash.style.animation = 'explosionFlash 0.5s ease-out forwards';
    
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
}

// Enhanced confetti with different shapes
function createEnhancedConfetti() {
    const confetti = document.createElement('div');
    const shapes = ['🎉', '🎊', '⭐', '💫', '✨', '🌟', '💥', '🎆'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    confetti.innerHTML = shape;
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-50px';
    confetti.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = `enhancedConfettiFall ${3 + Math.random() * 2}s linear forwards`;
    confetti.style.setProperty('--rotation', Math.random() * 720 + 'deg');
    confetti.style.setProperty('--sway', (Math.random() - 0.5) * 200 + 'px');
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Screen flash effect
function createScreenFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.background = 'rgba(255, 255, 255, 0.8)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9997';
    flash.style.animation = 'screenFlash 0.3s ease-out forwards';
    
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 300);
}

// Shake screen effect
function shakeScreen() {
    document.body.style.animation = 'screenShake 0.8s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 800);
}

// Enhanced change colors function
function changeColors() {
    playMagicSound();
    
    const newColorSets = [
        ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffa500'],
        ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
        ['#ff7675', '#74b9ff', '#00b894', '#fdcb6e', '#fd79a8'],
        ['#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'],
        ['#ff6348', '#2ed573', '#1e90ff', '#ffa502', '#ff4757'],
        ['#7bed9f', '#70a1ff', '#5352ed', '#ff6b81', '#ffa726']
    ];
    
    currentColors = newColorSets[Math.floor(Math.random() * newColorSets.length)];
    
    // Animate color change with ripple effect
    createColorRipple();
    
    // Update background with smooth transition
    const homeSection = document.querySelector('.home-section');
    homeSection.style.transition = 'background 2s ease-in-out';
    homeSection.style.background = `linear-gradient(45deg, ${currentColors.join(', ')})`;
    homeSection.style.backgroundSize = '400% 400%';
    
    // Create color burst effect
    createColorBurst();
    
    showNotification('🎨 WOW! Colors transformed! The world is more beautiful now! 🌈');
}

// Color ripple effect
function createColorRipple() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.border = `3px solid ${currentColors[i % currentColors.length]}`;
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '9996';
            ripple.style.animation = 'colorRipple 1.5s ease-out forwards';
            ripple.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1500);
        }, i * 200);
    }
}

// Color burst effect
function createColorBurst() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const burst = document.createElement('div');
            burst.style.position = 'fixed';
            burst.style.left = '50%';
            burst.style.top = '50%';
            burst.style.width = '12px';
            burst.style.height = '12px';
            burst.style.backgroundColor = currentColors[Math.floor(Math.random() * currentColors.length)];
            burst.style.borderRadius = '50%';
            burst.style.pointerEvents = 'none';
            burst.style.zIndex = '9995';
            burst.style.boxShadow = '0 0 10px currentColor';
            
            const angle = (i / 30) * 360;
            const distance = 150 + Math.random() * 100;
            burst.style.animation = 'colorBurst 1s ease-out forwards';
            burst.style.setProperty('--angle', angle + 'deg');
            burst.style.setProperty('--distance', distance + 'px');
            
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 1000);
        }, i * 30);
    }
}

// Enhanced sound function
function playSound() {
    playMelodySound();
    
    // Create musical wave animation
    createSoundWaves();
    
    // Create floating musical notes
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingNote();
        }, i * 100);
    }
    
    // Create sound pulse effect
    createSoundPulse();
    
    showNotification('🎵 Beautiful melody playing! Music fills the air! 🎶');
}

// Create sound waves animation
function createSoundWaves() {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.position = 'fixed';
            wave.style.left = '50%';
            wave.style.top = '50%';
            wave.style.width = '0px';
            wave.style.height = '0px';
            wave.style.border = '2px solid rgba(255, 255, 255, 0.6)';
            wave.style.borderRadius = '50%';
            wave.style.pointerEvents = 'none';
            wave.style.zIndex = '9994';
            wave.style.animation = 'soundWave 2s ease-out forwards';
            wave.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(wave);
            setTimeout(() => wave.remove(), 2000);
        }, i * 300);
    }
}

// Create floating musical note
function createFloatingNote() {
    const notes = ['♪', '♫', '♬', '🎵', '🎶', '🎼'];
    const note = document.createElement('div');
    note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
    note.style.position = 'fixed';
    note.style.left = Math.random() * window.innerWidth + 'px';
    note.style.top = window.innerHeight + 'px';
    note.style.fontSize = '2rem';
    note.style.color = currentColors[Math.floor(Math.random() * currentColors.length)];
    note.style.pointerEvents = 'none';
    note.style.zIndex = '9993';
    note.style.textShadow = '0 0 10px currentColor';
    note.style.animation = 'floatingNote 4s ease-out forwards';
    
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 4000);
}

// Create sound pulse effect
function createSoundPulse() {
    const homeSection = document.querySelector('.home-section');
    homeSection.style.animation = 'soundPulse 0.6s ease-in-out';
    setTimeout(() => {
        homeSection.style.animation = '';
    }, 600);
}

// Sound effects
function playFireworkSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create complex firework sound
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(200 + i * 100, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800 + i * 200, audioContext.currentTime + 0.1);
                oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.8);
            }, i * 200);
        }
    }
}

function playExplosionSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
}

function playMagicSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create magical ascending sound
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                const baseFreq = 440 + i * 220;
                oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 2, audioContext.currentTime + 0.3);
                
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.4);
            }, i * 80);
        }
    }
}

function playMelodySound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99]; // C, D, E, F, G
        
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            }, i * 200);
        });
    }
}

// Entertainment section game functions
function playGame(gameType) {
    gameCounter++;
    updateGameCounter();
    
    switch(gameType) {
        case 'memory':
            showGameModal('Memory Game', 'Match the pairs! 🧠', createMemoryGame());
            break;
        case 'quiz':
            showGameModal('Family Quiz', 'Test your knowledge! 🤔', createQuizGame());
            break;
        case 'draw':
            showGameModal('Drawing Board', 'Express your creativity! 🎨', createDrawingGame());
            break;
        case 'music':
            playMusicGame();
            break;
    }
}

function createMemoryGame() {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const gameEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    let gameHTML = '<div class="memory-game">';
    gameEmojis.forEach((emoji, index) => {
        gameHTML += `<div class="memory-card" data-emoji="${emoji}" onclick="flipCard(this, ${index})">
            <div class="card-front">?</div>
            <div class="card-back">${emoji}</div>
        </div>`;
    });
    gameHTML += '</div>';
    
    return gameHTML;
}

function createQuizGame() {
    const questions = [
        { q: "What's the most important thing in a family?", a: "Love and togetherness! ❤️" },
        { q: "What makes a house a home?", a: "The people who live in it with love! 🏠" },
        { q: "Best family activity?", a: "Spending quality time together! 👨‍👩‍👧‍👦" }
    ];
    
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    
    return `
        <div class="quiz-game">
            <h3>${randomQ.q}</h3>
            <button onclick="showAnswer('${randomQ.a}')" class="quiz-btn">Show Answer</button>
            <div id="quiz-answer" style="display:none; margin-top:20px; padding:20px; background:rgba(255,255,255,0.1); border-radius:10px;"></div>
        </div>
    `;
}

function createDrawingGame() {
    return `
        <div class="drawing-game">
            <canvas id="drawingCanvas" width="400" height="300" style="border: 2px solid #fff; border-radius: 10px; background: white;"></canvas>
            <div class="drawing-controls" style="margin-top: 15px;">
                <button onclick="clearCanvas()" class="draw-btn">Clear</button>
                <input type="color" id="colorPicker" value="#ff6b6b" style="margin: 0 10px;">
                <input type="range" id="brushSize" min="1" max="20" value="5" style="margin: 0 10px;">
            </div>
        </div>
    `;
}

function playMusicGame() {
    const songs = [
        "🎵 Happy Birthday to You! 🎂",
        "🎵 Twinkle Twinkle Little Star ⭐",
        "🎵 Row Row Row Your Boat 🚣",
        "🎵 If You're Happy and You Know It 😊"
    ];
    
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    showNotification(`Now playing: ${randomSong}`);
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createMusicalNote();
        }, i * 200);
    }
}

function createMusicalNote() {
    const note = document.createElement('div');
    note.innerHTML = '♪';
    note.style.position = 'fixed';
    note.style.fontSize = '2rem';
    note.style.color = currentColors[Math.floor(Math.random() * currentColors.length)];
    note.style.left = Math.random() * window.innerWidth + 'px';
    note.style.top = window.innerHeight + 'px';
    note.style.pointerEvents = 'none';
    note.style.zIndex = '9999';
    note.style.animation = 'musicNote 3s ease-out forwards';
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        note.remove();
    }, 3000);
}

function updateGameCounter() {
    const counter = document.getElementById('gameCounter');
    if (counter) {
        counter.textContent = gameCounter;
    }
}

// Modal functionality
function showGameModal(title, subtitle, content) {
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <p>${subtitle}</p>
                <button class="close-modal" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    if (!document.getElementById('modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .game-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: modalFadeIn 0.3s ease;
            }
            
            .modal-content {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 20px;
                padding: 30px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                color: white;
            }
            
            .modal-header {
                text-align: center;
                margin-bottom: 20px;
                position: relative;
            }
            
            .close-modal {
                position: absolute;
                top: -10px;
                right: -10px;
                background: #ff6b6b;
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                line-height: 1;
            }
            
            .memory-game {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                max-width: 400px;
                margin: 0 auto;
            }
            
            .memory-card {
                aspect-ratio: 1;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1.5rem;
            }
            
            .memory-card:hover {
                transform: scale(1.05);
                background: rgba(255, 255, 255, 0.3);
            }
            
            .quiz-btn, .draw-btn {
                background: #ff6b6b;
                border: none;
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .quiz-btn:hover, .draw-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    if (content.includes('drawingCanvas')) {
        setTimeout(() => initializeDrawingCanvas(), 100);
    }
}

function closeModal(element) {
    const modal = element.closest('.game-modal');
    modal.style.animation = 'modalFadeOut 0.3s ease forwards';
    setTimeout(() => modal.remove(), 300);
}

// Drawing game functionality
function initializeDrawingCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    
    let isDrawing = false;
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.beginPath();
        }
    }
    
    window.clearCanvas = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
}

// Quiz game functionality
function showAnswer(answer) {
    const answerDiv = document.getElementById('quiz-answer');
    answerDiv.innerHTML = `<strong>Answer:</strong> ${answer}`;
    answerDiv.style.display = 'block';
    answerDiv.style.animation = 'fadeIn 0.5s ease';
}

// Memory game functionality
let flippedCards = [];
let matchedPairs = 0;

function flipCard(card, index) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped')) return;
    
    card.classList.add('flipped');
    card.style.transform = 'rotateY(180deg)';
    card.querySelector('.card-front').style.display = 'none';
    card.querySelector('.card-back').style.display = 'block';
    
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.getAttribute('data-emoji');
    const emoji2 = card2.getAttribute('data-emoji');
    
    if (emoji1 === emoji2) {
        matchedPairs++;
        card1.style.background = 'rgba(76, 175, 80, 0.3)';
        card2.style.background = 'rgba(76, 175, 80, 0.3)';
        
        if (matchedPairs === 8) {
            setTimeout(() => {
                showNotification('🎉 Congratulations! You matched all pairs!');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.style.transform = 'rotateY(0deg)';
            card2.style.transform = 'rotateY(0deg)';
            card1.querySelector('.card-front').style.display = 'block';
            card1.querySelector('.card-back').style.display = 'none';
            card2.querySelector('.card-front').style.display = 'block';
            card2.querySelector('.card-back').style.display = 'none';
        }, 500);
    }
    
    flippedCards = [];
}

// Surprise me functionality
function surpriseMe() {
    const surprises = [
        () => {
            document.body.style.filter = 'hue-rotate(90deg)';
            setTimeout(() => document.body.style.filter = 'none', 2000);
            showNotification('🌈 Reality shift! Everything looks different!');
        },
        () => {
            createConfetti();
            showNotification('✨ Surprise confetti attack!');
        },
        () => {
            const elements = document.querySelectorAll('.section');
            elements.forEach(el => {
                el.style.transform = 'rotate(1deg)';
                setTimeout(() => el.style.transform = 'rotate(0deg)', 1000);
            });
            showNotification('🌀 Wobbly world activated!');
        },
        () => {
            changeColors();
            createMusicalNote();
            showNotification('🎨🎵 Color symphony!');
        }
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    randomSurprise();
}

// Contact form handling
function initializeFormHandling() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name') || form.querySelector('input[type="text"]').value;
            
            showNotification(`📧 Thank you ${name}! Your message has been sent with love!`);
            form.reset();
            
            setTimeout(() => {
                createConfetti();
            }, 500);
        });
    }
    
    // Add click handlers for contact links
    initializeContactLinks();
}

// Initialize contact link interactions
function initializeContactLinks() {
    const contactItems = document.querySelectorAll('.contact-item a');
    
    contactItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const type = this.href.includes('mailto:') ? 'email' : 
                        this.href.includes('tel:') ? 'phone' : 'website';
            
            playLightClickSound();
            
            if (type === 'email') {
                showNotification('📧 Opening email client to send us a message!');
            } else if (type === 'phone') {
                showNotification('📱 Ready to call us! We\'d love to hear from you!');
            } else if (type === 'website') {
                showNotification('🌐 Opening our website! Thanks for visiting!');
            }
            
            // Add sparkle effect
            createContactSparkles(this);
        });
        
        // Add hover sound effect
        link.addEventListener('mouseenter', function() {
            playLightClickSound();
        });
    });
}

// Create sparkle effect for contact links
function createContactSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '💫';
            sparkle.style.position = 'fixed';
            sparkle.style.left = centerX + 'px';
            sparkle.style.top = centerY + 'px';
            sparkle.style.fontSize = '1rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = `contactSparkle 1s ease-out forwards`;
            
            // Random direction
            const angle = (i / 6) * 360;
            sparkle.style.setProperty('--angle', angle + 'deg');
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 80);
    }
}

// Scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #ffa500);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        font-weight: 600;
        animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 3s forwards;
        max-width: 300px;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3500);
}

// Add CSS animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes modalFadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
    
    @keyframes musicNote {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes socialSparkle {
        0% { 
            transform: translate(0, 0) scale(1) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translate(
                calc(cos(var(--angle)) * 80px), 
                calc(sin(var(--angle)) * 80px)
            ) scale(0) rotate(180deg); 
            opacity: 0; 
        }
    }
    
    @keyframes contactSparkle {
        0% { 
            transform: translate(0, 0) scale(1) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translate(
                calc(cos(var(--angle)) * 60px), 
                calc(sin(var(--angle)) * 60px)
            ) scale(0) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes fireworkParticle {
        0% { 
            transform: translate(0, 0) scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: translate(
                calc(cos(var(--angle)) * var(--velocity)), 
                calc(sin(var(--angle)) * var(--velocity))
            ) scale(0); 
            opacity: 0; 
        }
    }
    
    @keyframes explosionFlash {
        0% { 
            transform: scale(0); 
            opacity: 1; 
        }
        50% { 
            transform: scale(1); 
            opacity: 0.8; 
        }
        100% { 
            transform: scale(2); 
            opacity: 0; 
        }
    }
    
    @keyframes enhancedConfettiFall {
        0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(var(--rotation)) translateX(var(--sway));
            opacity: 0;
        }
    }
    
    @keyframes screenFlash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes colorRipple {
        0% { 
            width: 0px; 
            height: 0px; 
            opacity: 1; 
        }
        100% { 
            width: 800px; 
            height: 800px; 
            opacity: 0; 
        }
    }
    
    @keyframes colorBurst {
        0% { 
            transform: translate(-50%, -50%) scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: translate(
                calc(-50% + cos(var(--angle)) * var(--distance)), 
                calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(0); 
            opacity: 0; 
        }
    }
    
    @keyframes soundWave {
        0% { 
            width: 0px; 
            height: 0px; 
            opacity: 0.8; 
        }
        100% { 
            width: 600px; 
            height: 600px; 
            opacity: 0; 
        }
    }
    
    @keyframes floatingNote {
        0% { 
            transform: translateY(0) rotate(0deg) scale(1); 
            opacity: 1; 
        }
        100% { 
            transform: translateY(-100vh) rotate(360deg) scale(0.5); 
            opacity: 0; 
        }
    }
    
    @keyframes soundPulse {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.02); }
        50% { transform: scale(1.05); }
        75% { transform: scale(1.02); }
    }
`;
document.head.appendChild(animationStyle);