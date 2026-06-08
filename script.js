const { createApp } = Vue;

createApp({
    data() {
        return {
            // App states
            scrolled: false,
            menuActive: false,
            activeTab: 'all',
            modalActive: false,
            selectedProject: null,
            
            // Time states
            currentTime: '--:--:--',
            currentDate: 'Loading date...',
            
            // Contact form fields
            contactForm: {
                name: '',
                email: '',
                message: ''
            },
            
            // Centralized Projects and Homeworks database
            projects: [
                {
                    id: 'hw-cosmos-img',
                    title: 'AI生圖工作室',
                    category: 'homework',
                    categoryLabel: 'Course Homework',
                    shortDescription: '結合 Cosmos 與 Streamlit 開發的 AI 文本生成圖像工具。',
                    longDescription: '此課程作業使用 Python 配合 Streamlit 框架，建構一個 AI 圖像生成工作室。使用者可以輸入文字描述（Prompt），系統將呼叫 Cosmos 生成模型，將文本描述轉換成高品質的圖像，並提供方便的參數調整與下載功能。',
                    tags: ['Python', 'Streamlit', 'Cosmos AI', 'Text-to-Image'],
                    demoUrl: 'https://chenyu-hw3-cosmos-text2image.streamlit.app/',
                    githubUrl: 'https://github.com/ChenYuHsu413/hw3-cosmos-text2image',
                    previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/hw3-cosmos-text2image/main/screenshots/2026-06-04%20201852.png',
                    colorGradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                    date: '2026'
                },
                {
                    id: 'hw-linear-regression',
                    title: '線性回歸分析',
                    category: 'homework',
                    categoryLabel: 'Course Homework',
                    shortDescription: '基於 Streamlit 視覺化呈現線性回歸模型預測與訓練分析。',
                    longDescription: '此課程作業展示了機器學習中的線性回歸（Linear Regression）演算法。透過 Streamlit 網頁介面，動態呈現數據點分佈、擬合回歸線、損失函數收斂曲線，並允許使用者動態調整超參數以觀察模型學習成效。',
                    tags: ['Python', 'Streamlit', 'Machine Learning', 'Linear Regression'],
                    demoUrl: 'https://chenyu-hw4-linear-regression.streamlit.app/',
                    githubUrl: 'https://github.com/ChenYuHsu413/hw4-linear-regression',
                    previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/hw4-linear-regression/main/linear_regression_outliers.png',
                    colorGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    date: '2025'
                },
                {
                    id: 'hw-ml-algorithms',
                    title: '機器學習十大演算法互動式學習平台',
                    category: 'homework',
                    categoryLabel: 'Course Homework',
                    shortDescription: '涵蓋十大機器學習演算法的互動式視覺化學習平台。',
                    longDescription: '此課程作業建構了一個互動式機器學習教學平台，完整介紹十大經典機器學習演算法，包含線性回歸、邏輯回歸、決策樹、隨機森林、SVM、K-Means 等。使用者可透過視覺化圖表與即時參數調整，深入理解各演算法的運作原理與適用情境，兼具學習性與實用性。',
                    tags: ['Python', 'Machine Learning', 'Interactive', 'Data Visualization', 'Algorithms'],
                    demoUrl: 'https://ml-algorithm-learning.onrender.com/',
                    githubUrl: 'https://github.com/ChenYuHsu413/MLAlgorithmLearning',
                    previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/MLAlgorithmLearning/main/sources/demo_screenchot.png',
                    colorGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    date: '2026'
                },
                {
                    id: 'proj-yyx-cramschool',
                    title: '楊宜修國文文理補習班形象網站',
                    category: 'project',
                    categoryLabel: 'Personal Project',
                    shortDescription: '為文理補習班量身打造的現代化響應式形象官網。',
                    longDescription: '此專案是為楊宜修國文文理補習班設計的形象網站。網站採用響應式網頁設計（RWD），包含班級介紹、師資陣容、最新消息與聯絡表單，旨在提供家長與學生一個清晰、專業且易於瀏覽的補習班入口平台。',
                    tags: ['HTML5', 'CSS3', 'JavaScript', 'RWD', 'Institution'],
                    demoUrl: 'https://chenyuhsu413.github.io/YYXTest/',
                    githubUrl: 'https://github.com/ChenYuHsu413/YYXTest',
                    previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/YYXTest/main/sources/demo-screenshot.png',
                    colorGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    date: '2026'
                },
                {
                    id: 'proj-sulawesi-shrimp',
                    title: '蘇拉威西蝦形象網站',
                    category: 'project',
                    categoryLabel: 'Personal Project',
                    shortDescription: '介紹蘇拉威西觀賞蝦品種、飼養水質與生態環境的形象網站。',
                    longDescription: '此專案是一個專門為蘇拉威西觀賞蝦打造的介紹與形象展示網站。網站呈現了細緻的各類蝦種圖鑑、特有的飼養環境參數（如 pH 值、溫度、礦物質等）以及造景建議，以流暢的介面推廣觀賞蝦養殖愛好。',
                    tags: ['HTML5', 'CSS3', 'JavaScript', 'Sulawesi Shrimp', 'Aquarium'],
                    demoUrl: 'https://chenyuhsu413.github.io/SulawesiTest/',
                    githubUrl: 'https://github.com/ChenYuHsu413/SulawesiTest',
                    previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/SulawesiTest/main/sources/demo-screenshot.png',
                    colorGradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                    date: '2026'
                },
                {
                    id: 'proj-account-system',
                    title: '個人智慧記帳與股票追蹤系統',
                    category: 'project',
                    categoryLabel: 'Personal Project',
                    shortDescription: '整合日常記帳收支管理與即時股票數據追蹤的個人理財系統。',
                    longDescription: '此專案是一個整合性個人理財管理系統。除了提供直覺的每日收支記帳與分類統計圖表外，亦結合了股票數據追蹤功能，讓使用者能在單一平台上掌握日常消費狀況與股票投資組合的即時損益變動。',
                    tags: ['JavaScript', 'Chart.js', 'Stock API', 'Financial Tracker', 'RWD'],
                    demoUrl: 'https://chenyuhsu413.github.io/PersonalAccountSystem/',
                    githubUrl: 'https://github.com/ChenYuHsu413/PersonalAccountSystem',
                    previewImage: 'https://raw.githubusercontent.com/ChenYuHsu413/PersonalAccountSystem/main/docs/screenshot_bookkeeping.png',
                    colorGradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    date: '2026'
                }
            ]
        };
    },
    
    computed: {
        // Dynamic computed property for category filtering
        filteredProjects() {
            if (this.activeTab === 'all') {
                return this.projects;
            }
            return this.projects.filter(item => item.category === this.activeTab);
        }
    },
    
    methods: {
        // Header navigation handlers
        handleScroll() {
            this.scrolled = window.scrollY > 50;
        },
        toggleMenu() {
            this.menuActive = !this.menuActive;
        },
        scrollToSection(sectionId) {
            this.menuActive = false;
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight = this.scrolled ? 70 : 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        },
        
        // Detail Overlay Modal handlers
        openModal(project) {
            this.selectedProject = project;
            this.modalActive = true;
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        },
        closeModal() {
            this.modalActive = false;
            // Delay cleanup to allow scale animation to finish
            setTimeout(() => {
                this.selectedProject = null;
            }, 300);
            document.body.style.overflow = 'auto'; // Enable scrolling
        },
        
        // Form Handler
        submitContactForm() {
            alert(`Thank you for your message, ${this.contactForm.name}! I will get back to you at ${this.contactForm.email} as soon as possible.`);
            this.contactForm.name = '';
            this.contactForm.email = '';
            this.contactForm.message = '';
        },
        
        // Timer updates
        updateTime() {
            const now = new Date();
            
            this.currentTime = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(now);
            
            this.currentDate = new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(now);
        },
        
        // GSAP ScrollTrigger Entrance animations setup
        initGSAPAnimations() {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero section elements on-load sequence
            const tl = gsap.timeline();
            tl.to('.fade-in-up', {
                y: 0,
                opacity: 1,
                duration: 1.0,
                stagger: 0.15,
                ease: 'power3.out'
            });
            
            // Section Title Entrance Animations on Scroll
            gsap.utils.toArray('.section-header').forEach((header) => {
                gsap.fromTo(header, 
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: header,
                            start: 'top bottom-=80',
                            toggleActions: 'play none none reverse'
                        },
                        ease: 'power3.out'
                    }
                );
            });
            
            // Timeline entries slide-in animation
            gsap.utils.toArray('.timeline-item').forEach((item, index) => {
                gsap.fromTo(item, 
                    { x: -30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom-=60',
                            toggleActions: 'play none none reverse'
                        },
                        delay: index * 0.1,
                        ease: 'power2.out'
                    }
                );
            });
            
            // About statistics bounce
            gsap.utils.toArray('.stat-card').forEach((card, index) => {
                gsap.fromTo(card, 
                    { scale: 0.85, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.7,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom-=50',
                            toggleActions: 'play none none reverse'
                        },
                        delay: index * 0.1,
                        ease: 'back.out(1.7)'
                    }
                );
            });
        }
    },
    
    mounted() {
        // Initialize timer
        this.updateTime();
        this.timerInterval = setInterval(this.updateTime, 1000);
        
        // Bind scroll listener for sticky header
        window.addEventListener('scroll', this.handleScroll);
        
        // Run GSAP on next DOM rendering tick
        this.$nextTick(() => {
            this.initGSAPAnimations();
        });
    },
    
    unmounted() {
        // Clear listeners and timers
        clearInterval(this.timerInterval);
        window.removeEventListener('scroll', this.handleScroll);
    }
}).mount('#app');
