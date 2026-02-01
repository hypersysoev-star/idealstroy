// === СЛАЙДЕР СРАВНЕНИЯ ИЗОБРАЖЕНИЙ ===
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.comparison-handle');
        const beforeWrap = slider.querySelector('.comparison-before-wrap');
        const beforeImg = slider.querySelector('.comparison-before');
        let isDragging = false;
        
        // Установка начальной позиции
        function setPosition(percentage) {
            percentage = Math.max(0, Math.min(100, percentage));
            handle.style.left = percentage + '%';
            beforeWrap.style.width = percentage + '%';
            
            // Корректировка позиции изображения "до"
            const containerWidth = slider.querySelector('.comparison-images').offsetWidth;
            beforeImg.style.width = containerWidth + 'px';
        }
        
        // Получение позиции курсора
        function getPosition(e) {
            const rect = slider.getBoundingClientRect();
            const x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
            return (x / rect.width) * 100;
        }
        
        // Начало перетаскивания
        function startDrag(e) {
            isDragging = true;
            slider.style.cursor = 'ew-resize';
            e.preventDefault();
        }
        
        // Перетаскивание
        function onDrag(e) {
            if (!isDragging) return;
            setPosition(getPosition(e));
        }
        
        // Конец перетаскивания
        function stopDrag() {
            isDragging = false;
            slider.style.cursor = 'default';
        }
        
        // События мыши
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
        
        // События касания (тач)
        handle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', onDrag);
        document.addEventListener('touchend', stopDrag);
        
        // Клик на слайдер для быстрого перехода
        slider.addEventListener('click', function(e) {
            if (e.target !== handle && !handle.contains(e.target)) {
                setPosition(getPosition(e));
            }
        });
        
        // Корректировка при изменении размера окна
        window.addEventListener('resize', function() {
            const currentPercent = parseFloat(handle.style.left) || 50;
            setPosition(currentPercent);
        });
        
        // Инициализация
        setPosition(50);
    });
});
