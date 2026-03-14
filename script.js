
// 深色模式切换
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 获取系统深色模式状态
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 设置初始深色模式状态
    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        updateParticlesColor(isDark ? 'dark' : 'light');
    }
    setTheme(mediaQuery.matches);
    
    // 持续监听系统深色模式状态
    mediaQuery.addEventListener('change', (e) => {
        setTheme(e.matches);
    });
    
    // 切换深色模式
    themeToggle.addEventListener('click', function(e) {
        // 防止重复点击
        if (this.classList.contains('active')) return;
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const isDarkMode = currentTheme !== 'light';
        
        // 波纹效果
        this.classList.add('active');
        
        // 让波纹动画先开始
        setTimeout(() => {
            // 手动切换深色模式
            if (isDarkMode) {
                // 切换到浅色模式
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                // 切换到深色模式
                document.documentElement.removeAttribute('data-theme');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
            
            // 更新粒子颜色
            updateParticlesColor(isDarkMode ? 'light' : 'dark');
            
            // 添加旋转动画
            themeIcon.classList.add('rotate');
            setTimeout(() => {
                themeIcon.classList.remove('rotate');
            }, 500);
            
            // 波纹动画完成后移除active类
            setTimeout(() => {
                this.classList.remove('active');
            }, 600);
            
        }, 100); // 给波纹动画一点启动时间
    });
}

// 更新粒子颜色
function updateParticlesColor(theme) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (theme === 'light') {
            particle.style.background = 'hsla(204, 100%, 40%, 0.05)';
        } else {
            particle.style.background = 'hsla(180, 100%, 50%, 0.1)';
        }
    });
}

// 创建粒子背景
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机大小和位置
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // 根据当前主题设置颜色
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            particle.style.background = 'hsla(204, 100%, 40%, 0.05)';
        } else {
            const hue = 180 + Math.random() * 40; // 蓝色调范围
            particle.style.background = `hsla(${hue}, 100%, 60%, 0.1)`;
        }
        
        particlesContainer.appendChild(particle);
    }
}

// 页面标题动画效果
function initTitleAnimation() {
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    
    if (mainTitle) {
        // 添加渐变动画
        const gradientAnimation = () => {
            const hue = Math.floor(Math.random() * 60) + 180;
            const accentColor = `hsl(${hue}, 100%, 50%)`;
            const secondaryColor = `hsl(${(hue + 40) % 360}, 100%, 65%)`;
            
            mainTitle.style.background = `linear-gradient(90deg, ${accentColor}, ${secondaryColor}, ${accentColor})`;
            mainTitle.style.backgroundClip = 'text';
            mainTitle.style.webkitBackgroundClip = 'text';
            mainTitle.style.backgroundSize = '200% 100%';
            mainTitle.style.animation = 'gradientShift 3s ease-in-out infinite';
        };
        
        // 创建渐变动画关键帧
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        
        // 初始动画
        setTimeout(gradientAnimation, 1000);
        
        // 鼠标悬停效果
        mainTitle.addEventListener('mouseenter', () => {
            mainTitle.style.transform = 'scale(1.02)';
            mainTitle.style.textShadow = '0 8px 16px rgba(0, 212, 255, 0.3)';
        });
        
        mainTitle.addEventListener('mouseleave', () => {
            mainTitle.style.transform = 'scale(1)';
            mainTitle.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
    }
    
    if (subtitle) {
        // 副标题淡入效果
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(10px)';
        subtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            subtitle.style.opacity = '0.9';
            subtitle.style.transform = 'translateY(0)';
        }, 800);
        
        // 鼠标悬停效果
        subtitle.addEventListener('mouseenter', () => {
            subtitle.style.color = 'var(--accent)';
            subtitle.style.transform = 'translateX(5px)';
        });
        
        subtitle.addEventListener('mouseleave', () => {
            subtitle.style.color = 'var(--text-secondary)';
            subtitle.style.transform = 'translateX(0)';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initTitleAnimation();
    
    // 卡片悬停效果
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.tool-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 0 20px var(--accent-glow)';
            }
            
            // 添加发光效果
            this.style.boxShadow = 
                '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px var(--accent-glow)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.tool-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = 'none';
            }
            
            // 恢复原始阴影
            this.style.boxShadow = 'var(--glass-shadow)';
        });
    });

    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 观察所有卡片
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // 创建粒子背景
    createParticles();

    // 添加按钮跳转功能
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // 计算并显示工具数量
    const toolCount = document.querySelectorAll('.tool-card').length;
    const toolCountElement = document.getElementById('toolCount');
    if (toolCountElement) {
        toolCountElement.innerText = toolCount;
    }

    // 加载并显示版本信息
    fetch('version.json')
        .then(response => {
            console.log('Fetch response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Version data:', data);
            const versionElement = document.getElementById('versionInfo');
            console.log('Version element:', versionElement);
            if (versionElement) {
                versionElement.innerText = `版本: ${data.version} | 更新时间: ${data.lastUpdated}`;
                versionElement.style.margin = '0.5rem 0';
                versionElement.style.fontSize = '0.85rem';
                versionElement.style.color = 'var(--text-secondary)';
                console.log('Version info updated');
            } else {
                console.error('versionInfo element not found');
            }
        })
        .catch(error => {
            console.error('加载版本信息失败:', error);
        });

    // 标签悬停效果
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px var(--accent-glow)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // 检测滚动并显示提示
    const scrollHint = document.createElement('div');
    scrollHint.textContent = '如果无法滚动页面，可能是与 SmoothScroll 等平滑滚动插件冲突，可以在插件内针对该网站不启用。';
    scrollHint.style.position = 'fixed';
    scrollHint.style.right = '2rem';
    scrollHint.style.background = 'var(--nav-bg)';
    scrollHint.style.backdropFilter = 'blur(20px) saturate(180%)';
    scrollHint.style.webkitBackdropFilter = 'blur(20px) saturate(180%)';
    scrollHint.style.border = '1px solid var(--glass-border)';
    scrollHint.style.borderRadius = '20px';
    scrollHint.style.padding = '0.8rem 1.2rem';
    scrollHint.style.color = 'var(--text)';
    scrollHint.style.fontSize = '0.9rem';
    scrollHint.style.opacity = '0';
    scrollHint.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    scrollHint.style.zIndex = '1001';
    scrollHint.style.maxWidth = '320px';
    scrollHint.style.wordWrap = 'break-word';
    scrollHint.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
    scrollHint.style.transform = 'translateY(-10px)';
    scrollHint.style.pointerEvents = 'none';
    scrollHint.style.cursor = 'pointer';

    let hasScrolled = false;
    const initialScrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    function getCurrentScrollTop() {
        return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    // 淡出并移除提示框
    function dismissScrollHint() {
        scrollHint.style.opacity = '0';
        scrollHint.style.transform = 'translateY(-10px)';
        window.removeEventListener('scroll', onScrollWhileHintShown);
        document.removeEventListener('scroll', onScrollWhileHintShown, true);
        setTimeout(() => {
            if (scrollHint.parentNode) scrollHint.parentNode.removeChild(scrollHint);
        }, 500);
    }

    // 提示框显示后检测滚动
    function onScrollWhileHintShown() {
        dismissScrollHint();
    }

    // 监听位移
    function onScrollTracking() {
        hasScrolled = true;
        window.removeEventListener('scroll', onScrollTracking);
        document.removeEventListener('scroll', onScrollTracking, true);
    }
    window.addEventListener('scroll', onScrollTracking, { passive: true });
    document.addEventListener('scroll', onScrollTracking, { passive: true, capture: true });

    // 15秒后，若未发生过任何滚动则显示提示
    setTimeout(() => {
        const scrolledByPosition = getCurrentScrollTop() !== initialScrollTop;
        if (!hasScrolled && !scrolledByPosition) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 60;
            scrollHint.style.top = (navbarHeight + 10) + 'px';

            document.body.appendChild(scrollHint);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    scrollHint.style.opacity = '1';
                    scrollHint.style.transform = 'translateY(0)';
                    scrollHint.style.pointerEvents = 'auto';
                });
            });

            // 点击关闭
            scrollHint.addEventListener('click', dismissScrollHint);
            // 页面真实滚动时淡出
            window.addEventListener('scroll', onScrollWhileHintShown, { passive: true });
            document.addEventListener('scroll', onScrollWhileHintShown, { passive: true, capture: true });
        }
    }, 15000);
});

// 添加窗口调整大小时的重置
window.addEventListener('resize', function() {
    const particles = document.querySelector('.particles');
    if (particles) {
        particles.remove();
        createParticles();
    }
});