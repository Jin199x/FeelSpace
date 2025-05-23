import { db, storage } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js";

const rantForm = document.getElementById('rantForm');
const rantText = document.getElementById('rantText');
const wordCount = document.getElementById('wordCount');
const imagesInput = document.getElementById('images');
const confirmation = document.getElementById('confirmation');

const MAX_WORDS = 2000;
const MAX_IMAGES = 2;

// Word count update
rantText.addEventListener('input', () => {
  const words = rantText.value.trim().split(/\s+/).filter(Boolean);
  wordCount.textContent = `${words.length} / ${MAX_WORDS} words`;
  if(words.length > MAX_WORDS) {
    wordCount.style.color = 'red';
  } else {
    wordCount.style.color = '#880e4f'; // pastel dark pink
  }
});

// Handle form submission
rantForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate word count
  const words = rantText.value.trim().split(/\s+/).filter(Boolean);
  if(words.length === 0) {
    alert('Please write something before submitting.');
    return;
  }
  if(words.length > MAX_WORDS) {
    alert(`Please limit your thoughts to ${MAX_WORDS} words.`);
    return;
  }

  // Validate images count
  if(imagesInput.files.length > MAX_IMAGES) {
    alert(`You can upload up to ${MAX_IMAGES} images only.`);
    return;
  }

  confirmation.style.display = 'none';

  try {
    // Upload images and collect URLs
    const imageUrls = [];
    for(let i = 0; i < imagesInput.files.length; i++) {
      const file = imagesInput.files[i];
      const storageRef = ref(storage, `feelspace_images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }

    // Save rant with image URLs to Firestore
    await addDoc(collection(db, 'rants'), {
      text: rantText.value.trim(),
      images: imageUrls,
      timestamp: serverTimestamp()
    });

    // Show confirmation and reset form
    confirmation.style.display = 'block';
    rantForm.reset();
    wordCount.textContent = `0 / ${MAX_WORDS} words`;

  } catch (error) {
    alert('Error sending your feelings. Please try again.');
    console.error(error);
  }
});
