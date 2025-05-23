import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const rantForm = document.getElementById('rantForm');
const rantText = document.getElementById('rantText');
const wordCount = document.getElementById('wordCount');
const confirmation = document.getElementById('confirmation');

const MAX_WORDS = 2000;

// Word count update
rantText.addEventListener('input', () => {
  const words = rantText.value.trim().split(/\s+/).filter(Boolean);
  wordCount.textContent = `${words.length} / ${MAX_WORDS} words`;
  wordCount.style.color = words.length > MAX_WORDS ? 'red' : '#880e4f';
});

// Handle form submission
rantForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const words = rantText.value.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    alert('Please write something before submitting.');
    return;
  }

  if (words.length > MAX_WORDS) {
    alert(`Please limit your thoughts to ${MAX_WORDS} words.`);
    return;
  }

  confirmation.style.display = 'none';

  try {
    await addDoc(collection(db, 'rants'), {
      text: rantText.value.trim(),
      timestamp: serverTimestamp()
    });

    confirmation.style.display = 'block';
    rantForm.reset();
    wordCount.textContent = `0 / ${MAX_WORDS} words`;
  } catch (error) {
    alert('Error sending your feelings. Please try again.');
    console.error(error);
  }
});
