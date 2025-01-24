$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // EmailJS integration for the contact form
    $("#contact-form").submit(function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        emailjs.init("q5oYKU7NsKgd5T7NE"); // Replace with your EmailJS Public Key

        emailjs.sendForm('service_83midog', 'template_99obhoa', '#contact-form') // Replace 'service_id' and 'template_id' with your actual IDs
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset(); // Reset the form
                alert("Thank you for reaching out! We received your message:We’ll get back to you shortly..!!");
            }, function (error) {
                console.error('FAILED...', error);
                alert("Form Submission Failed! Please try again.");
            });
    });

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Vishal Gupta";
            $("#favicon").attr("href", "assets/images/eyesopen.png");
        } else {
            document.title = "There is more!!";
            $("#favicon").attr("href", "assets/images/eyesclosed.png");
        }
    });

    // Typed.js effect
    var typed = new Typed(".typing-text", {
        strings: ["Web Development", "Backend Development", "Software Engineering", "Mobile Application Development"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    async function fetchData(type = "skills") {
        let response;
        type === "skills"
            ? response = await fetch("skills.json")
            : response = await fetch("./projects/projects.json");
        const data = await response.json();
        return data;
    }

    function showSkills(skills) {
        let skillsContainer = document.getElementById("skillsContainer");
        let skillHTML = "";
        skills.forEach(skill => {
            skillHTML += `
            <div class="bar">
                  <div class="info">
                    <img src=${skill.icon} alt="skill" />
                    <span>${skill.name}</span>
                  </div>
                </div>`;
        });
        skillsContainer.innerHTML = skillHTML;
    }

    function showProjects(projects) {
        let projectsContainer = document.querySelector("#work .box-container");
        let projectHTML = "";
        projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
            projectHTML += `
            <div class="box tilt">
          <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
          <div class="content">
            <div class="tag">
            <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>`;
        });
        projectsContainer.innerHTML = projectHTML;

        // Tilt.js effect
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });

        // ScrollReveal animation
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });

        srtop.reveal('.work .box', { interval: 200 });
    }

    fetchData().then(data => {
        showSkills(data);
    });

    fetchData("projects").then(data => {
        showProjects(data);
    });

    // Tilt.js effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });

    // Disable developer mode
    document.onkeydown = function (e) {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
            return false;
        }
    };
});
