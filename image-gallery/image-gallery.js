var script = document.createElement('script');
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
script.onload = () => {
    ((self) => {
        'use strict';

        const classes = {
            style: 'custom-style',
            wrapper: 'custom-wrapper',
            customImage: 'custom-image',
            overlay: 'overlay',
            imageOverlay: 'image-overlay',
            overlayCloseButton: 'close',
            visibleImage:'visible',
        };

        const selectors = Object.keys(classes).reduce((createdSelector, key) => (
            createdSelector[key] = `.${classes[key]}`, createdSelector
        ), {
            appendLocation: 'body',
        });

        self.init = () => {
            self.reset();
            self.buildCSS();
            self.buildHTML();
            self.setEvents();
        };

        self.reset = () => {
            const { style, wrapper, customImage, overlay, imageOverlay, overlayCloseButton } = selectors;
            $(`${style}, ${wrapper}, ${customImage}, ${overlay}, ${imageOverlay}, ${overlayCloseButton}`).remove();
        };

        self.buildCSS = () => {
            const { wrapper, customImage, overlay, imageOverlay, overlayCloseButton,visibleImage } = selectors;
            const customStyle = `
                body{
                    background-color:#242223
                }
                ${wrapper} {
                    columns:300px;
                }
                ${customImage} {
                    width:100%;
                    margin-bottom:1em;
                    transition: transform 0.3s ease;
                }
                ${customImage}:hover {
                    transform:scale(1.05);
                    cursor:pointer;
                }
                ${overlay} {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    visibility: hidden;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                ${imageOverlay} {
                    position:fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 80%;
                    max-height: 80%;
                    box-shadow: 0 0 20px black;
                }
                ${overlayCloseButton} {
                    position: absolute;
                    top: 30px;
                    right: 40px;
                    font-size: 40px;
                    color: white;
                    cursor: pointer;
                }
                ${ overlay }${ visibleImage } {
                    opacity: 1;
                    visibility: visible;
                }
            `;
            $('<style>').addClass(classes.style).html(customStyle).appendTo('head');
        };

        self.buildHTML = () => {
            let imagesHTML = '';

            for (let i = 0; i < 50; i++) {
                imagesHTML += `
                    <img class ="${classes.customImage}"src="https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 1000)}" alt="">
                `;
            }

            const outerHtml = `
                <div class="${classes.wrapper}">
                    ${imagesHTML}
                </div>
                <div class=${classes.overlay}>
                    <span class="${classes.overlayCloseButton}">&times;</span>
                    <img src="" class="${classes.imageOverlay}">
                </div>
                `;

            $(selectors.appendLocation).append(outerHtml);
        };

        self.setEvents = () => {
            $(selectors.customImage).on('click', function () {
                const src = $(this).attr('src')
                $(selectors.imageOverlay).attr('src', src);
                $(selectors.overlay).addClass(classes.visibleImage);
            });

            $(selectors.overlayCloseButton).on('click', () => {
                $(selectors.overlay).removeClass(classes.visibleImage);
            });
        };

        self.init();
    })({});
};
document.head.appendChild(script);
