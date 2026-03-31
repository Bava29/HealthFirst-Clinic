(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });



    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        nav: false,
        dots: true,
        dotsData: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


})(jQuery);


const scrollBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
});

scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



//Filter reviews 
const buttons = document.querySelectorAll(".filter-btn");
const groups = document.querySelectorAll(".review-group");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // Active button
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const target = button.getAttribute("data-target");

        // Hide all groups
        groups.forEach(group => group.style.display = "none");

        // Show selected group
        document.getElementById(target).style.display = "block";

    });
});


//Video card
const cards = document.querySelectorAll(".video-card");
const modal = document.getElementById("videoModal");
const frame = document.getElementById("videoFrame");
const closeBtn = document.querySelector(".close-btn");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const video = card.getAttribute("data-video");

        console.log("Clicked video:", video); // DEBUG

        frame.src = video + "?autoplay=1";
        modal.style.display = "flex";
    });
});
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        frame.src = "";
    });
}

//Review submission

const stars = document.querySelectorAll(".rating-input .stars i");

stars.forEach((star, index) => {
    star.addEventListener("click", () => {

        stars.forEach(s => s.classList.remove("active"));

        for (let i = 0; i <= index; i++) {
            stars[i].classList.add("active");
        }

    });
});



//Popup message 


const form = document.querySelector(".review-form-box form");
const popup = document.getElementById("successPopup");
const star = document.querySelectorAll(".rating-input .stars i");



if (form) {

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 2000);

        form.reset();

        star.forEach(stars => stars.classList.remove("active"));
    });
}



const card = document.querySelectorAll(".helpful-card");

function updateMostLiked() {
    let max = 0;
    let topCard = null;

    card.forEach(card => {
        const count = parseInt(card.querySelector(".heart-btn span").innerText);

        if (count > max) {
            max = count;
            topCard = card;
        }
    });

    // Remove old badges
    document.querySelectorAll(".top-badge").forEach(b => b.remove());

    // Add badge to highest
    if (topCard) {
        const badge = document.createElement("div");
        badge.classList.add("top-badge");
        badge.innerText = "🏆 Most Liked";
        topCard.appendChild(badge);
    }
}

// Heart click logic
document.querySelectorAll(".heart-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        let count = btn.querySelector("span");
        let icon = btn.querySelector("i");

        if (!btn.classList.contains("active")) {
            count.innerText = parseInt(count.innerText) + 1;
            btn.classList.add("active");
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        } else {
            count.innerText = parseInt(count.innerText) - 1;
            btn.classList.remove("active");
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }

        updateMostLiked(); // 🔥 update badge dynamically
    });
});

// Run once on load
updateMostLiked();



//FAQs filter 


const searchInput = document.getElementById("faqSearch");
const noResult = document.getElementById("noResult");

if (searchInput) {   // ✅ FIX

    searchInput.addEventListener("keyup", function () {

        let filter = searchInput.value.toLowerCase();
        let faqItems = document.querySelectorAll(".faq-item");
        let visibleCount = 0;

        faqItems.forEach(item => {

            let text = item.innerText.toLowerCase();

            item.innerHTML = item.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, "");

            if (text.includes(filter)) {
                item.style.display = "block";
                visibleCount++;

                if (filter !== "") {
                    let regex = new RegExp(`(${filter})`, "gi");
                    item.innerHTML = item.innerHTML.replace(regex, '<mark class="highlight">$1</mark>');
                }

            } else {
                item.style.display = "none";
            }

        });

        if (visibleCount === 0 && filter !== "") {
            noResult.style.display = "block";
        } else {
            noResult.style.display = "none";
        }

    });

}




document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        item.addEventListener("click", function () {

            faqItems.forEach(i => {
                if (i !== item) i.classList.remove("active");
            });

            item.classList.toggle("active");

        });

    });

});




// Toggle Chat
function toggleChat() {
    const chat = document.getElementById("chatContainer");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function sendMessage() {

    let input = document.getElementById("userInput");
    let chatBox = document.getElementById("chatBox");

    let userText = input.value.toLowerCase().trim();
    if (userText === "") return;

    // Show user message
    chatBox.innerHTML += `<div class="user"><span>${userText}</span></div>`;
    input.value = "";

    // Typing animation
    chatBox.innerHTML += `<div class="bot typing" id="typing">Typing...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {

        document.getElementById("typing").remove();

        let response = null;

        // Get all FAQ items
        const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach(item => {
            let question = item.querySelector(".faq-question").innerText.toLowerCase();
            let answer = item.querySelector(".faq-answer").innerText;

            // 🔥 Match logic (better than before)
            let words = userText.split(" ");

            words.forEach(word => {
                if (question.includes(userText)) {
                    response = answer;
                } else if (userText.split(" ").some(word => question.includes(word))) {
                    response = answer;
                }
            });
        });

        // Default response
        if (!response) {
            response = "Sorry, I couldn't find an exact answer. Please contact our support team.";
        }

        // Show bot reply
        chatBox.innerHTML += `<div class="bot"><span>${response}</span></div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    }, 800);
}


darkToggle.onclick = () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkToggle.classList.remove("fa-moon");
        darkToggle.classList.add("fa-sun");
    } else {
        darkToggle.classList.remove("fa-sun");
        darkToggle.classList.add("fa-moon");
    }
};




