/* =========================================
   DEVOPS PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });


        /* Close menu after clicking a link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });

    }


    /* =========================================
       TYPING EFFECT
    ========================================= */

    const terminalCommand = document.querySelector(
        ".terminal-body p:last-child"
    );

    const heroTitle = document.querySelector(".hero h2");

    const roles = [
        "DevOps Engineer",
        "Kubernetes Engineer",
        "Cloud Enthusiast",
        "Linux Administrator",
        "Infrastructure Engineer"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function typeRole() {

        if (!heroTitle) {
            return;
        }

        const currentRole = roles[roleIndex];

        if (!deleting) {

            heroTitle.textContent =
                currentRole.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeRole, 1800);

                return;
            }

        } else {

            heroTitle.textContent =
                currentRole.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {
                    roleIndex = 0;
                }

            }
        }

        const speed = deleting ? 50 : 90;

        setTimeout(typeRole, speed);
    }

    typeRole();


    /* =========================================
       PROJECT FILTER
    ========================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter =
                button.dataset.filter;


            /* Active button */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            /* Filter projects */

            projectCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {

                    card.style.display = "block";

                    setTimeout(() => {

                        card.classList.add("show");

                    }, 10);

                } else {

                    card.classList.remove("show");

                    card.style.display = "none";

                }

            });

        });

    });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".section, .skill-card, .project-card, .timeline-item, .education-card"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("reveal-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll("nav a");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId =
                            entry.target.getAttribute("id");


                        navigationLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                "#" + currentId
                            ) {

                                link.classList.add("active");

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =========================================
       TERMINAL COMMAND INTERACTION
    ========================================= */

    const terminal =
        document.querySelector(".terminal");

    if (terminal) {

        terminal.addEventListener("click", () => {

            terminal.classList.toggle("terminal-active");

        });

    }


    /* =========================================
       PROJECT CARD CLICK
    ========================================= */

    projectCards.forEach(card => {

        card.addEventListener("click", event => {

            /*
             * Don't interfere with GitHub links.
             */

            if (
                event.target.closest("a")
            ) {
                return;
            }

            card.classList.toggle("project-selected");

        });

    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElements =
        document.querySelectorAll(".current-year");

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(element => {

        element.textContent = currentYear;

    });


    /* =========================================
       TERMINAL COMMAND SIMULATION
    ========================================= */

    const terminalBody =
        document.querySelector(".terminal-body");


    if (terminalBody) {

        const commands = [
            "kubectl get nodes",
            "docker ps",
            "systemctl status docker",
            "kubectl get pods -A",
            "aws ec2 describe-instances"
        ];

        let commandIndex = 0;


        terminalBody.addEventListener("dblclick", () => {

            const command =
                commands[commandIndex];

            const commandLine =
                document.createElement("p");

            commandLine.innerHTML = `
                <span class="green">
                    root@portfolio
                </span>:
                <span class="blue">~</span>$
                ${command}
            `;


            const output =
                document.createElement("p");

            output.classList.add("terminal-output");

            output.innerHTML =
                getTerminalResponse(command);


            terminalBody.appendChild(commandLine);

            terminalBody.appendChild(output);

            commandIndex++;

            if (commandIndex >= commands.length) {
                commandIndex = 0;
            }


            terminalBody.scrollTop =
                terminalBody.scrollHeight;

        });

    }


    /* =========================================
       TERMINAL RESPONSES
    ========================================= */

    function getTerminalResponse(command) {

        if (command.includes("kubectl get nodes")) {

            return `
                proxy-ms-01&nbsp;&nbsp;
                <span class="green">Ready</span><br>

                proxy-ms-02&nbsp;&nbsp;
                <span class="green">Ready</span><br>

                proxy-ms-03&nbsp;&nbsp;
                <span class="green">Ready</span><br>

                proxy-wk-01&nbsp;&nbsp;
                <span class="green">Ready</span><br>

                proxy-wk-02&nbsp;&nbsp;
                <span class="green">Ready</span>
            `;

        }


        if (command.includes("docker ps")) {

            return `
                CONTAINER ID&nbsp;&nbsp;&nbsp;
                IMAGE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                STATUS<br>

                a82d12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                nginx&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="green">Up</span><br>

                b91f22&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                backend&nbsp;&nbsp;&nbsp;
                <span class="green">Up</span>
            `;

        }


        if (
            command.includes("systemctl")
        ) {

            return `
                docker.service -
                Docker Application Container Engine<br>
                Active:
                <span class="green">active (running)</span>
            `;

        }


        if (
            command.includes("kubectl get pods")
        ) {

            return `
                kube-system&nbsp;&nbsp;
                coredns&nbsp;&nbsp;
                <span class="green">Running</span><br>

                kube-system&nbsp;&nbsp;
                kube-proxy&nbsp;
                <span class="green">Running</span><br>

                kube-system&nbsp;&nbsp;
                metrics-server&nbsp;
                <span class="green">Running</span>
            `;

        }


        if (
            command.includes("aws")
        ) {

            return `
                AWS infrastructure:
                <span class="green">Connected</span>
            `;

        }


        return `
            Command executed:
            <span class="green">OK</span>
        `;

    }

});
