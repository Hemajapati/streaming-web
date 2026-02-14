function login() {
            const user = document.getElementById("username").value.trim();
            const pass = document.getElementById("password").value.trim();
            const error = document.getElementById("error");
            if (user === "hemaja" && pass === "1234") {
                document.getElementById("loginScreen").style.display = "none";
            } else {
                error.innerText = "Invalid Username or Password";
            }
        }

        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('active');
            document.getElementById('overlay').classList.toggle('active');
        }

        function navigateTo(pageId, navElement) {
            // 1. Scroll to top immediately
            window.scrollTo(0,0);

            // 2. Hide all pages
            const pages = document.querySelectorAll('.page-view');
            pages.forEach(page => page.classList.remove('active'));

            // 3. Show target page
            const targetPage = document.getElementById(pageId + '-page');
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // 4. Update Sidebar Active State
            if (navElement) {
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active-nav'));
                navElement.classList.add('active-nav');
            }

            // 5. Close Sidebar if open
            const sidebar = document.getElementById('sidebar');
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
            
            // 6. Reset Filters
            const tabs = targetPage.querySelectorAll('.sub-nav-tab');
            tabs.forEach(t => t.classList.remove('active'));
            if(tabs.length > 0) tabs[0].classList.add('active');
            
            const cards = targetPage.querySelectorAll('.card');
            cards.forEach(c => c.classList.remove('hidden'));
        }

        function switchTab(element) {
            const filter = element.getAttribute('data-filter');
            const page = element.closest('.page-view');
            
            // Update visual
            page.querySelectorAll('.sub-nav-tab').forEach(t => t.classList.remove('active'));
            element.classList.add('active');

            // Filter
            page.querySelectorAll('.card').forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        document.addEventListener("DOMContentLoaded", () => {
            // Slider Logic
            const slider = document.querySelector('.hero-slider');
            if(slider) {
                const slides = slider.querySelectorAll('.hero-slide');
                let idx = 0;
                setInterval(() => {
                    if(!slider.offsetParent) return;
                    slides.forEach(s => s.classList.remove('active'));
                    idx = (idx + 1) % slides.length;
                    slides[idx].classList.add('active');
                }, 4000);
                
                slider.querySelector('.next').onclick = () => {
                    slides.forEach(s => s.classList.remove('active'));
                    idx = (idx + 1) % slides.length;
                    slides[idx].classList.add('active');
                };
                slider.querySelector('.prev').onclick = () => {
                    slides.forEach(s => s.classList.remove('active'));
                    idx = (idx - 1 + slides.length) % slides.length;
                    slides[idx].classList.add('active');
                };
            }

            // Tab Click Listeners
            document.querySelectorAll('.sub-nav-tab').forEach(tab => {
                tab.addEventListener('click', function() { switchTab(this); });
            });
        });
  