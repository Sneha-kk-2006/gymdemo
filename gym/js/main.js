/**
 * IRON PULSE FITNESS - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Background Video Sound Toggle
  const heroVideo = document.getElementById('heroBgVideo');
  const soundToggleBtn = document.getElementById('soundToggleBtn');

  if (heroVideo && soundToggleBtn) {
    heroVideo.muted = true;
    heroVideo.play().catch(err => {
      console.log('Video autoplay:', err);
    });

    soundToggleBtn.addEventListener('click', () => {
      if (heroVideo.muted) {
        heroVideo.muted = false;
        soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Sound On';
        showToast('🔊 Audio Enabled');
      } else {
        heroVideo.muted = true;
        soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Sound Off';
        showToast('🔇 Audio Muted');
      }
    });
  }

  // 2. Navbar Sticky Effect & Mobile Menu
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Workout Program Details Database
  const workoutData = {
    'strength': {
      title: 'Titan Strength',
      category: 'Strength & Power',
      coach: 'Marcus Vance',
      duration: '75 Mins / Day',
      intensity: 'High Intensity',
      split: [
        'Day 1: Heavy Squats & Hamstring Accessories',
        'Day 2: Competition Bench Press & Triceps',
        'Day 3: Rest & Hip/Thoracic Mobility',
        'Day 4: Deadlifts & Upper Back Density',
        'Day 5: Overhead Strict Press & Core'
      ],
      includes: [
        'Barbell technique breakdown',
        'Periodized 1RM tracker',
        'Post-workout recovery protocol'
      ]
    },
    'hypertrophy': {
      title: 'Mass Hypertrophy',
      category: 'Bodybuilding',
      coach: 'David Sterling',
      duration: '60 Mins / Day',
      intensity: 'Moderate - High',
      split: [
        'Day 1: Chest & Biceps',
        'Day 2: Back & Rear Delts',
        'Day 3: Quads & Calves',
        'Day 4: Shoulders & Triceps',
        'Day 5: Hamstrings & Core'
      ],
      includes: [
        'Time-Under-Tension protocols',
        'High-protein macronutrient guide',
        'Drop-set intensity finishers'
      ]
    },
    'hiit': {
      title: 'Metabolic Shred',
      category: 'Conditioning',
      coach: 'Elena Rostova',
      duration: '45 Mins / Day',
      intensity: 'Maximum Effort',
      split: [
        'Round 1: Assault Bike Intervals',
        'Round 2: Kettlebell Swings & Burpees',
        'Round 3: Heavy Sled Push & Battle Ropes',
        'Round 4: Box Jumps & Rower Sprints',
        'Round 5: Core Tabata Finishers'
      ],
      includes: [
        'Heart rate zone training',
        'Caloric burn acceleration',
        'Hydration & electrolyte guide'
      ]
    },
    'functional': {
      title: 'Calisthenics & Core',
      category: 'Functional Movement',
      coach: 'Sarah Jenkins',
      duration: '50 Mins / Day',
      intensity: 'Moderate',
      split: [
        'Warmup: Dynamic animal flow & joint prep',
        'Block A: Pull-Up & Dip progressions',
        'Block B: Gymnastic ring balance & core holds',
        'Block C: Agility ladder & plyometrics',
        'Cooldown: Fascia release & breathwork'
      ],
      includes: [
        'Zero-equipment travel workout alternatives',
        'Tendon strengthening drills',
        'Balance & agility improvement'
      ]
    },
    'combat': {
      title: 'Combat Boxing',
      category: 'Combat & Defense',
      coach: 'Marcus Vance',
      duration: '60 Mins / Day',
      intensity: 'High Intensity',
      split: [
        'Warmup: 3 rounds jump rope & footwork',
        'Round 1-4: Heavy bag combinations',
        'Round 5-8: Speed mitts & defensive slips',
        'Round 9-10: Medicine ball rotational slams',
        'Cool Down: Forearm stretches & core isometrics'
      ],
      includes: [
        'Hand-wrapping tutorials',
        'Reflex and footwork drills',
        'Cardiovascular endurance boost'
      ]
    },
    'mobility': {
      title: 'Mobility & Posture',
      category: 'Flexibility & Rehab',
      coach: 'Sarah Jenkins',
      duration: '45 Mins / Day',
      intensity: 'Gentle / Restorative',
      split: [
        'Phase 1: Cervical & thoracic spine decompression',
        'Phase 2: Hip flexor 90/90 flows',
        'Phase 3: Ankle & knee stability stretches',
        'Phase 4: Foam rolling trigger point release',
        'Phase 5: Parasympathetic breathwork'
      ],
      includes: [
        'Posture correction routine',
        'Active range-of-motion assessment',
        'CNS fatigue downregulation'
      ]
    }
  };

  // Workout Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workoutCards = document.querySelectorAll('.workout-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      workoutCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Workout Modal Popup
  const workoutModal = document.getElementById('workoutModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const viewDetailBtns = document.querySelectorAll('.btn-view-workout');

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const programId = btn.getAttribute('data-program');
      const data = workoutData[programId];

      if (data && workoutModal) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalCoach').innerHTML = `<i class="fa-solid fa-user-ninja"></i> Coach: ${data.coach}`;
        document.getElementById('modalDuration').innerHTML = `<i class="fa-solid fa-clock"></i> ${data.duration}`;
        document.getElementById('modalIntensity').innerHTML = `<i class="fa-solid fa-gauge"></i> ${data.intensity}`;

        const splitList = document.getElementById('modalSplitList');
        splitList.innerHTML = '';
        data.split.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa-solid fa-bolt text-yellow"></i> <span>${item}</span>`;
          li.style.display = 'flex';
          li.style.gap = '8px';
          li.style.alignItems = 'flex-start';
          li.style.marginBottom = '6px';
          li.style.fontSize = '0.85rem';
          splitList.appendChild(li);
        });

        const includesList = document.getElementById('modalIncludesList');
        includesList.innerHTML = '';
        data.includes.forEach(inc => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa-solid fa-check text-yellow"></i> <span>${inc}</span>`;
          li.style.display = 'flex';
          li.style.gap = '8px';
          li.style.alignItems = 'flex-start';
          li.style.marginBottom = '6px';
          li.style.fontSize = '0.82rem';
          li.style.color = 'var(--text-muted)';
          includesList.appendChild(li);
        });

        workoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      workoutModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

  if (workoutModal) {
    workoutModal.addEventListener('click', (e) => {
      if (e.target === workoutModal) {
        workoutModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // 4. Trainer "Book Session" buttons -> Prefill Enquiry Form
  const bookTrainerBtns = document.querySelectorAll('.btn-book-trainer');
  const trainerSelect = document.getElementById('enquiryTrainer');

  bookTrainerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const trainerName = btn.getAttribute('data-trainer');
      if (trainerSelect && trainerName) {
        trainerSelect.value = trainerName;
      }
      const enquirySection = document.getElementById('enquiry');
      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Selected Trainer: ${trainerName}`);
      }
    });
  });

  // 5. Enquiry Form Submission Handling
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('enquiryName').value.trim();
      const email = document.getElementById('enquiryEmail').value.trim();
      const phone = document.getElementById('enquiryPhone').value.trim();
      const plan = document.getElementById('enquiryPlan') ? document.getElementById('enquiryPlan').value : '';
      const trainer = document.getElementById('enquiryTrainer') ? document.getElementById('enquiryTrainer').value : '';
      const slot = document.getElementById('enquirySlot') ? document.getElementById('enquirySlot').value : '';

      if (!name || !email || !phone) {
        alert('Please fill in your Name, Email, and Phone Number.');
        return;
      }

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        showToast(`🔥 Thanks ${name}! Enquiry submitted successfully.`);

        const enquiryLead = {
          name,
          email,
          phone,
          plan,
          trainer,
          slot,
          timestamp: new Date().toLocaleString()
        };

        const existingLeads = JSON.parse(localStorage.getItem('gym_enquiries') || '[]');
        existingLeads.push(enquiryLead);
        localStorage.setItem('gym_enquiries', JSON.stringify(existingLeads));

        enquiryForm.reset();
      }, 700);
    });
  }

  // Toast Functionality
  function showToast(text) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${text}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
});
