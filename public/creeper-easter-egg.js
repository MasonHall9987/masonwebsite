document.addEventListener('DOMContentLoaded', () => {
    const creeperImgSrc = '/images/icon-creeper.png'; // Adjusted path for public folder
    const creeperAppearIntervalMin = 15000; // Minimum time in ms before creeper might appear (e.g., 15 seconds)
    const creeperAppearIntervalMax = 45000; // Maximum time in ms (e.g., 45 seconds)
    const peekDuration = 1500; // How long the creeper peeks in ms (1.5 seconds)
    const disappearDuration = 1000; // How long it takes to fully disappear after peeking or if not clicked (1 second)
    const slideInAmount = 80; // How many pixels the creeper slides in

    let creeperElement = null;
    let isCreeperActive = false;
    let creeperTimeoutId = null;

    function createCreeper() {
        if (isCreeperActive) return;
        isCreeperActive = true;

        creeperElement = document.createElement('img');
        creeperElement.src = creeperImgSrc;
        creeperElement.style.position = 'fixed';
        creeperElement.style.zIndex = '9999'; // Ensure it's on top
        creeperElement.style.cursor = 'pointer';
        creeperElement.style.width = '100px'; // Adjust size as needed
        creeperElement.style.height = 'auto';
        creeperElement.style.transition = `transform ${peekDuration / 1000}s ease-in-out`;

        // Randomly choose a side
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let initialX = '';
        let initialY = '';
        let targetX = '';
        let targetY = '';

        // Position creeper off-screen initially and set target for peeking
        switch (side) {
            case 0: // Top
                creeperElement.style.top = `-${creeperElement.style.width}`;
                creeperElement.style.left = Math.random() * (window.innerWidth - parseInt(creeperElement.style.width)) + 'px';
                initialY = `-${parseInt(creeperElement.style.width)}px`;
                targetY = `${slideInAmount}px`;
                break;
            case 1: // Right
                creeperElement.style.right = `-${creeperElement.style.width}`;
                creeperElement.style.top = Math.random() * (window.innerHeight - 100) + 'px'; // 100 is approx height
                initialX = `-${parseInt(creeperElement.style.width)}px`;
                targetX = `${slideInAmount}px`;
                break;
            case 2: // Bottom
                creeperElement.style.bottom = `-${creeperElement.style.width}`;
                creeperElement.style.left = Math.random() * (window.innerWidth - parseInt(creeperElement.style.width)) + 'px';
                initialY = `-${parseInt(creeperElement.style.width)}px`;
                targetY = `${slideInAmount}px`; // Negative because it's bottom
                break;
            case 3: // Left
                creeperElement.style.left = `-${creeperElement.style.width}`;
                creeperElement.style.top = Math.random() * (window.innerHeight - 100) + 'px';
                initialX = `-${parseInt(creeperElement.style.width)}px`;
                targetX = `${slideInAmount}px`;
                break;
        }

        document.body.appendChild(creeperElement);

        // Animate peek
        setTimeout(() => {
            if (!creeperElement) return; // Might have been clicked and removed
            switch (side) {
                case 0: creeperElement.style.transform = `translateY(${targetY})`; break;
                case 1: creeperElement.style.transform = `translateX(-${targetX})`; break; // Negative for right side
                case 2: creeperElement.style.transform = `translateY(-${targetY})`; break; // Negative for bottom side
                case 3: creeperElement.style.transform = `translateX(${targetX})`; break;
            }
        }, 50); // Short delay to ensure transition applies

        // Set timeout to make it disappear if not clicked
        const disappearTimeoutId = setTimeout(() => {
            hideCreeper(false);
        }, peekDuration + 500); // Give some time to see it before it hides

        creeperElement.onclick = () => {
            clearTimeout(disappearTimeoutId); // Don't hide if clicked
            explodeAndRedirect();
        };
    }

    function hideCreeper(instant = false) {
        if (!creeperElement) return;

        if (instant) {
            if (creeperElement.parentNode) {
                creeperElement.parentNode.removeChild(creeperElement);
            }
            creeperElement = null;
            isCreeperActive = false;
            scheduleNextCreeper();
            return;
        }

        // Animate slide out
        creeperElement.style.transition = `transform ${disappearDuration / 1000}s ease-in-out`;
        creeperElement.style.transform = 'translate(0,0)'; // Back to its original off-screen spot

        setTimeout(() => {
            if (creeperElement && creeperElement.parentNode) {
                creeperElement.parentNode.removeChild(creeperElement);
            }
            creeperElement = null;
            isCreeperActive = false;
            scheduleNextCreeper(); // Schedule the next appearance
        }, disappearDuration);
    }

    function explodeAndRedirect() {
        if (!creeperElement) return;

        // 1. Visual effect on current page (e.g., a quick green flash)
        const flashOverlay = document.createElement('div');
        flashOverlay.style.position = 'fixed';
        flashOverlay.style.top = '0';
        flashOverlay.style.left = '0';
        flashOverlay.style.width = '100vw';
        flashOverlay.style.height = '100vh';
        flashOverlay.style.backgroundColor = 'rgba(0, 255, 0, 0.7)'; // Green explosion flash
        flashOverlay.style.zIndex = '10000';
        flashOverlay.style.opacity = '1';
        flashOverlay.style.transition = 'opacity 0.2s ease-out';
        document.body.appendChild(flashOverlay);

        // Hide creeper immediately
        creeperElement.style.display = 'none';

        // After flash, remove overlay and redirect
        setTimeout(() => {
            flashOverlay.style.opacity = '0';
            setTimeout(() => {
                if (flashOverlay.parentNode) {
                    flashOverlay.parentNode.removeChild(flashOverlay);
                }
                // Redirect to the fake 404 page
                window.location.href = '/fake-404.html'; // Adjusted path for public folder
            }, 200); // Wait for opacity transition to finish
        }, 150); // Duration of the flash

        // Clean up creeper related things
        if (creeperElement && creeperElement.parentNode) {
            creeperElement.parentNode.removeChild(creeperElement);
        }
        creeperElement = null;
        isCreeperActive = false;
        clearTimeout(creeperTimeoutId); // Stop further scheduling until page reloads
    }

    function scheduleNextCreeper() {
        if (creeperTimeoutId) {
            clearTimeout(creeperTimeoutId);
        }
        const nextAppearanceTime = Math.random() * (creeperAppearIntervalMax - creeperAppearIntervalMin) + creeperAppearIntervalMin;
        creeperTimeoutId = setTimeout(() => {
            createCreeper();
        }, nextAppearanceTime);
    }

    // Start the cycle
    scheduleNextCreeper();

    // Optional: Clear timeout if user navigates away to prevent errors
    window.addEventListener('beforeunload', () => {
        if (creeperTimeoutId) {
            clearTimeout(creeperTimeoutId);
        }
        // Hide creeper instantly if it's visible
        if (isCreeperActive && creeperElement) {
           hideCreeper(true);
        }
    });
}); 