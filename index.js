// --- Loading Screen Animation ---
const messages = [
    { main: "We're getting things ready for you", sub: "" },
    { main: "This might take a few seconds", sub: "Don't close this page" }
];
let current = 0;
const mainText = document.getElementById("mainText");
const subText = document.getElementById("subText");
function showNextMessage() {
    const { main, sub } = messages[current];
    mainText.style.opacity = 0;
    subText.style.opacity = 0;
    setTimeout(() => {
        mainText.textContent = main;
        subText.textContent = sub;
        mainText.style.animation = "none";
        subText.style.animation = "none";
        void mainText.offsetWidth;
        mainText.style.animation = "loaderfadeinout 2s ease-in-out forwards";
        subText.style.animation = "loaderfadeinout 2s ease-in-out forwards";
        if (current === 1) {
            mainText.style.animation = "loaderfade 2s ease-in-out forwards";
            subText.style.animation = "loaderfade 2s ease-in-out forwards";
        }
        current = current + 1;
        if (current >= messages.length) return;
        setTimeout(showNextMessage, 2000);
    }, 500);
}
setTimeout(showNextMessage, 1000);

// --- Navigation & Mobile Menu ---
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
            header.querySelector('.nav-menu').classList.add('py-2');
            header.querySelector('.nav-menu').classList.remove('py-3');
        } else {
            header.classList.remove('shadow-lg');
            header.querySelector('.nav-menu').classList.remove('py-2');
            header.querySelector('.nav-menu').classList.add('py-3');
        }
    });
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('.mobile-menu-icon');
        if (mobileMenu.classList.contains('hidden')) {
            icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('.mobile-menu-icon').setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });
    });
});

// --- Dropdown & Card Logic ---
function toggleDropdown() {
    document.getElementById("dropdownOptions").classList.toggle("hidden");
}
function selectOption(label, value) {
    document.getElementById("dropdownSelected").textContent = label;
    toggleDropdown();
    const selector = document.getElementById('cardSelector');
    selector.value = value;
    selector.dispatchEvent(new Event('change'));
    const cards = document.querySelectorAll('.card-popup');
    cards.forEach(card => {
        card.classList.add('scale-95', 'opacity-0');
    });
    if (value) {
        const card = document.getElementById(value);
        if (card) {
            card.classList.remove('hidden');
            setTimeout(() => {
                card.classList.remove('scale-95', 'opacity-0');
                card.classList.add('scale-100', 'opacity-100');
            }, 10);
        }
    }
}
window.addEventListener('click', function (e) {
    const button = document.getElementById('dropdownButton');
    const options = document.getElementById('dropdownOptions');
    if (button && !button.contains(e.target)) {
        options.classList.add('hidden');
    }
});

// --- Zero Two Bot Embed & Chat ---
let embed = {
    avatar: 'https://api.deutscher775.de/presence/1368272424855932999/avatar',
    author: 'Zero Two',
    badge: 'BOT',
    content: 'This is a <span class="text-pink-400 font-semibold">Discord-like embed</span> with some dummy text. You can use this area to display bot responses, information, or anything else!',
    timestamp: 'Today at 12:34'
};
document.addEventListener('DOMContentLoaded', function () {
    const zerotwoProfile = document.getElementById('zerotwo-profile');
    if (zerotwoProfile) {
        fetch('https://api.deutscher775.de/presence/1368272424855932999/avatar')
            .then(response => response.json())
            .then(json => {
                zerotwoProfile.src = json.avatar;
            })
            .catch(error => console.error('Error loading profile image:', error));
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const selector = document.getElementById('cardSelector');
    const cards = document.querySelectorAll('.card-popup');
    if (selector) {
        selector.addEventListener('change', function () {
            cards.forEach(card => {
                card.classList.add('hidden');
                card.classList.remove('scale-100', 'opacity-100');
                card.classList.add('scale-95', 'opacity-0');
            });
            if (this.value) {
                if (this.value === 'astroid') {
                    window.open('https://astroid.cc', '_blank');
                    setTimeout(() => {
                        toggleDropdown();
                        selectOption("Zero Two", "zerotwo");
                    }, 500);
                } else if (this.value === 'zerotwo') {
                    const zerotwoCard = document.getElementById('zerotwo');
                    if (zerotwoCard) {
                        zerotwoCard.classList.remove('hidden');
                        setTimeout(() => {
                            zerotwoCard.classList.remove('scale-95', 'opacity-0');
                            zerotwoCard.classList.add('scale-100', 'opacity-100');
                        }, 10);
                    }
                }
            }
        });
    }
});
window.addEventListener('load', () => {
    const zerotwoCard = document.getElementById('zerotwo');
    const selector = document.getElementById('cardSelector');
    if (selector) {
        selector.value = 'zerotwo';
        selector.dispatchEvent(new Event('change'));
    }
    if (zerotwoCard) {
        zerotwoCard.classList.remove('hidden');
        setTimeout(() => {
            zerotwoCard.classList.remove('scale-95', 'opacity-0');
            zerotwoCard.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
});
function buildEmbed(embed, content, fields) {
    embed.content = content || embed.content;
    embed.timestamp = 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const chatWrapper = document.getElementById('chat-wrapper');
    if (!chatWrapper) return;
    const embedDiv = document.createElement('div');
    embedDiv.className = 'flex items-start mb-4';
    let fieldsHtml = '';
    if (Array.isArray(fields) && fields.length > 0) {
        fieldsHtml = `<div class=\"grid grid-cols-1 gap-2 mt-2\">` +
            fields.map(f =>
                `<div><span class=\"font-semibold text-pink-300\">${f.name}:</span><span class=\"text-gray-200\">${f.value}</span></div>`
            ).join('') +
            `</div>`;
    }
    fetch(embed.avatar)
        .then(response => response.json())
        .then(json => {
            const avatarBase64 = json.avatar;
            embedDiv.innerHTML = `<div class=\"flex-1\"><div class=\"bg-[#23272a] border-l-4 border-pink-400 rounded-lg p-4 shadow-md\"><div class=\"flex items-center mb-2\"><img src=\"${avatarBase64}\" alt=\"Bot Avatar\" class=\"w-8 h-8 rounded-full mr-2\"><span class=\"font-semibold text-white\">${embed.author}</span><span class=\"ml-2 text-xs bg-pink-500 text-white px-2 py-0.5 rounded\">${embed.badge || 'BOT'}</span></div><div class=\"text-gray-200 mb-2\">${embed.content}</div>${fieldsHtml}<div class=\"mt-2 text-xs text-gray-400\">${embed.timestamp}</div></div></div>`;
            chatWrapper.appendChild(embedDiv);
        })
        .catch(error => {
            console.error('Error loading embed avatar:', error);
        });
}
document.addEventListener('DOMContentLoaded', function() {
    const commandInterface = document.getElementById('command-interface');
    if (!commandInterface) return;
    commandInterface.addEventListener('keydown', function (event) {
        let commands = ["/help","/coding-stats","/add-app",];
        const menuId = 'command-menu';
        let menu = document.getElementById(menuId);
        if (menu) menu.remove();
        if (event.key === 'Tab') {
            event.preventDefault();
            const value = this.value.trim();
            const match = commands.find(cmd => cmd.startsWith(value));
            if (match) {
                this.value = match;
                if (menu) menu.remove();
            }
        } else if (event.key === 'Enter') {
            event.preventDefault();
            const value = this.value.trim();
            const chatWrapper = document.getElementById('chat-wrapper');
            if (commands.includes(value)) {
                const userMsg = document.createElement('div');
                userMsg.className = 'mb-2 text-right';
                userMsg.innerHTML = `<span class=\"inline-block bg-pink-200 text-pink-900 px-3 py-1 rounded-lg\">${value}</span>`;
                chatWrapper.appendChild(userMsg);
                if (value === '/help') {
                    buildEmbed(embed, 'Here are some commands you can use:', [
                        { name: '/help', value: 'Show this help message' },
                        { name: '/coding-stats', value: 'Show your coding stats (with dummy data)' },
                        { name: '/add-app', value: 'Get the invite link for Zero Two' }
                    ]);
                    chatWrapper.scrollTop = chatWrapper.scrollHeight;
                }
                if (value === '/coding-stats') {
                    const wakatimeData = {"data": [{"languages": [{ "name": "HTML", "text": "1 hrs 1 mins", "percent": 93.34 },{ "name": "Python", "text": "0 hrs 4 mins", "percent": 6.66 }],"grand_total": { "text": "1 hrs 6 mins" }},{"languages": [],"grand_total": { "text": "0 hrs 0 mins" }},{"languages": [],"grand_total": { "text": "0 hrs 0 mins" }},{"languages": [],"grand_total": { "text": "0 hrs 0 mins" }},{"languages": [{ "name": "HTML", "text": "0 hrs 28 mins", "percent": 83.12 },{ "name": "Python", "text": "0 hrs 4 mins", "percent": 10.81 },{ "name": "JSON", "text": "0 hrs 1 mins", "percent": 4.39 },{ "name": "JavaScript", "text": "0 hrs 1 mins", "percent": 1.68 }],"grand_total": { "text": "0 hrs 34 mins" }},{"languages": [{ "name": "HTML", "text": "0 hrs 3 mins", "percent": 100 }],"grand_total": { "text": "0 hrs 3 mins" }},{"languages": [{ "name": "HTML", "text": "0 hrs 44 mins", "percent": 93.35 },{ "name": "unknown", "text": "0 hrs 3 mins", "percent": 6.65 }],"grand_total": { "text": "0 hrs 47 mins" }},{"languages": [{ "name": "HTML", "text": "1 hrs 1 mins", "percent": 65.8 },{ "name": "unknown", "text": "0 hrs 32 mins", "percent": 34.2 }],"grand_total": { "text": "1 hrs 33 mins" }},],"cumulative_total": { "text": "4 hrs 3 mins" }};
                    const total = wakatimeData.cumulative_total.text;
                    const languageMap = {};
                    wakatimeData.data.forEach(day => {
                        (day.languages || []).forEach(lang => {
                            if (!languageMap[lang.name]) {
                                languageMap[lang.name] = { name: lang.name, seconds: 0, text: lang.text };
                            }
                            languageMap[lang.name].text = lang.text;
                        });
                    });
                    const languages = Object.values(languageMap);
                    const topLangs = languages.slice(0, 3).map(lang => ({name: lang.name,value: lang.text}));
                    buildEmbed(embed,`WakaTime Stats (last week | dummy data):<br>Total: <span class=\"text-pink-400\">${total}</span>`,topLangs,);
                }
                chatWrapper.scrollTop = chatWrapper.scrollHeight;
                this.value = '';
                if (menu) menu.remove();
            }
            if (value === '/add-app') {
                const inviteLink = 'https://discord.com/oauth2/authorize?client_id=1368272424855932999';
                const botInviteEmbed = document.createElement('div');
                botInviteEmbed.className = 'flex items-start mb-4';
                botInviteEmbed.innerHTML = `<div class=\"flex-1\"><div class=\"bg-[#23272a] border-l-4 border-pink-400 rounded-lg p-4 shadow-md\"><div class=\"text-gray-200 mb-2\">Click the button below to add Zero Two as application!</div><div class=\"mt-2 text-xs text-gray-400\">${embed.timestamp}</div></div><a href=\"${inviteLink}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"inline-block bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors\" style=\"margin-top:5px;\">Add Zero Two</a></div>`;
                chatWrapper.appendChild(botInviteEmbed);
                chatWrapper.scrollTop = chatWrapper.scrollHeight;
                this.value = '';
                window.open(inviteLink, '_blank');
            }
        } else {
            const value = this.value.trim();
            const filtered = commands.filter(cmd => cmd.startsWith(value) && value.length > 0);
            if (menu) menu.remove();
            if (filtered.length > 0) {
                menu = document.createElement('div');
                menu.id = menuId;
                menu.style.position = 'absolute';
                menu.style.background = '#fff';
                menu.style.border = '1px solid #ccc';
                menu.style.borderRadius = '0.5rem';
                menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                menu.style.zIndex = 1000;
                menu.style.left = this.offsetLeft + 'px';
                menu.style.top = (this.offsetTop + this.offsetHeight) + 'px';
                menu.style.minWidth = this.offsetWidth + 'px';
                menu.style.maxHeight = '180px';
                menu.style.overflowY = 'auto';
                menu.style.fontSize = '1rem';
                filtered.forEach(cmd => {
                    const item = document.createElement('div');
                    item.textContent = cmd;
                    item.style.padding = '0.5rem 1rem';
                    item.style.cursor = 'pointer';
                    item.onmousedown = e => {
                        e.preventDefault();
                        this.value = cmd;
                        this.focus();
                        menu.remove();
                    };
                    item.onmouseover = () => item.style.background = '#f3f4f6';
                    item.onmouseout = () => item.style.background = '';
                    menu.appendChild(item);
                });
                this.parentNode.appendChild(menu);
            }
        }
    });
});

// --- Project Filter ---
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-gradient-to-r', 'from-pink-500', 'to-purple-600', 'text-white');
                btn.classList.add('bg-white/80', 'backdrop-blur-sm', 'text-gray-700', 'border', 'border-gray-200');
            });
            this.classList.add('active', 'bg-gradient-to-r', 'from-pink-500', 'to-purple-600', 'text-white');
            this.classList.remove('bg-white/80', 'backdrop-blur-sm', 'text-gray-700', 'border', 'border-gray-200');
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                const shouldShow = filter === 'all' || categories.includes(filter);
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    projectCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// --- Main Content & Animation ---
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({behavior: 'smooth',block: 'start'});
            }
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
                if (mobileMenuIcon) {
                    mobileMenuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                }
            }
        });
    });
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (!nav) return;
        const navMenu = nav.querySelector('.nav-menu');
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
            if (navMenu) {
                navMenu.classList.add('py-3');
                navMenu.classList.remove('py-4');
            }
        } else {
            nav.classList.remove('nav-scrolled');
            if (navMenu) {
                navMenu.classList.remove('py-3');
                navMenu.classList.add('py-4');
            }
        }
    });
    const observerOptions = {threshold: 0.1,rootMargin: '0px 0px -50px 0px'};
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    const animateElements = document.querySelectorAll('.skill-card-modern, .skill-item, .showcase-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        if (loadingScreen && mainContent) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'scale(1.1)';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.style.display = 'block';
                mainContent.style.opacity = '0';
                setTimeout(() => {
                    mainContent.style.transition = 'opacity 0.8s ease-in-out';
                    mainContent.style.opacity = '1';
                }, 100);
            }, 500);
        }
    }, 3000);
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.particle');
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.5 * (index + 1);
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
    const yearElements = document.querySelectorAll('script');
    yearElements.forEach(script => {
        if (script.textContent.includes('document.write(new Date().getFullYear())')) {
            const yearSpan = document.createElement('span');
            yearSpan.textContent = new Date().getFullYear();
            script.parentNode.replaceChild(yearSpan, script);
        }
    });
});

// --- Banner & API ---
let cached_banner = localStorage.getItem('banner_url');
if (cached_banner) {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const heroBanner = document.getElementById('hero-banner');
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    if (heroBanner) heroBanner.src = cached_banner;
    if (document.body) document.body.classList.remove('hidden');
    const transition_secs = 0.2;
    setTimeout(() => {
        if (heroBanner) {
            heroBanner.style.opacity = 1;
            heroBanner.style.filter = 'brightness(0.3) blur(10px)';
        }
    }, transition_secs * 1000);
    fetch('https://api.deutscher775.de/presence/690123872674119710/banner')
        .then(response => response.json())
        .then(data => {
            const bannerUrl = data.banner ? data.banner : '';
            if (cached_banner != bannerUrl) {
                localStorage.setItem('banner_url', bannerUrl);
                if (heroBanner) heroBanner.src = bannerUrl;
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
        });
} else {
    fetch('https://api.deutscher775.de/presence/690123872674119710/banner')
        .then(response => response.json())
        .then(data => {
            const bannerUrl = data.banner ? data.banner : '';
            if (cached_banner != bannerUrl) {
                localStorage.setItem('banner_url', bannerUrl);
                const heroBanner = document.getElementById('hero-banner');
                if (heroBanner) heroBanner.src = bannerUrl;
            }
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.animation = "fadeOut 0.5s forwards";
            }
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.style.display = 'block';
            }
            const transition_secs = 0.2;
            setTimeout(() => {
                const heroBanner = document.getElementById('hero-banner');
                if (heroBanner) {
                    heroBanner.style.opacity = 1;
                    heroBanner.style.filter = 'brightness(0.3) blur(10px)';
                }
            }, transition_secs * 1000);
        })
        .catch(error => {
            console.error('Request failed:', error);
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.animation = "fadeOut 0.5s forwards";
            }
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.style.display = 'block';
            }
        });
}
// --- ENDE ---

