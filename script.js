document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const nav = document.getElementById("mainNav");

  const updateNav = () => {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }
  };

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  // Mobile navbar close
  document.querySelectorAll(".navbar-collapse .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.querySelector(".navbar-collapse");

      if (menu && menu.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Scroll reveal animations
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Expedition checklist progress
  const checklist = document.getElementById("checklist");

  if (checklist) {
    const boxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");

    const updateProgress = () => {
      const done = boxes.filter((box) => box.checked).length;

      if (progressText) {
        progressText.textContent = `${done} / ${boxes.length} COMPLETE`;
      }

      if (progressBar) {
        progressBar.style.width = `${boxes.length ? (done / boxes.length) * 100 : 0}%`;
      }
    };

    boxes.forEach((box) => box.addEventListener("change", updateProgress));
    updateProgress();
  }

  // Contact form and WhatsApp
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    const messageBox = document.getElementById("contactMessage");
    const messageCount = document.getElementById("messageCount");
    const feedback = document.getElementById("formFeedback");

    // Message character counter
    if (messageBox && messageCount) {
      messageBox.maxLength = 600;

      const updateCount = () => {
        messageCount.textContent = `${messageBox.value.length} / 600`;
      };

      messageBox.addEventListener("input", updateCount);
      updateCount();
    }

    // Send form details to WhatsApp
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const nameField = document.getElementById("contactName");
      const emailField = contactForm.querySelector('input[type="email"]');
      const topicField = contactForm.querySelector("select");

      if (!nameField || !emailField || !messageBox) {
        if (feedback) {
          feedback.textContent = "Please check the contact form fields.";
          feedback.classList.add("visible");
        }
        return;
      }

      const visitorName = nameField.value.trim();
      const visitorEmail = emailField.value.trim();
      const topic = topicField ? topicField.value : "General Inquiry";
      const message = messageBox.value.trim();

      // WhatsApp number in international format
      const whatsappNumber = "923188898841";

      const whatsappMessage =
        "NEW CONTACT MESSAGE - ALPINE ASCENTS\n\n" +
        "Name: " +
        visitorName +
        "\n" +
        "Email: " +
        visitorEmail +
        "\n" +
        "Topic: " +
        topic +
        "\n" +
        "Message: " +
        message;

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);

      // Open WhatsApp with the prepared message
      window.open(whatsappURL, "_blank");

      if (feedback) {
        feedback.textContent =
          "WhatsApp opened! Press Send in WhatsApp to deliver your message.";
        feedback.classList.add("visible");
      }
    });
  }
});
