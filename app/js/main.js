document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM fully loaded and parsed");

    // scroll toTop
    let toTobButton = document.getElementById('return-to-top');

    window.addEventListener('scroll', () => {
        window.pageYOffset || document.documentElement.scrollTop;
        window.onscroll = function () {
            scrollFunction()
        };
    });
    toTobButton.addEventListener('click', topFunction);
    function scrollFunction() {
        if (window.scrollY >= 300) {
            toTobButton.style.display = 'block';
        } else {
            toTobButton.style.display = 'none';
        }
    }
    function topFunction(e) {
        e.preventDefault();
        let scrollToTop = window.setInterval(function () {
                let pos = window.pageYOffset;
                if (pos > 0 && pageYOffset >= 10) {
                    window.scrollTo(0, pos - 40);
                } else {
                    window.clearInterval(scrollToTop);
                }
            },
            9
        )
    }



    //slow scroll
    function scrollTo(element) {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.getBoundingClientRect().top + window.pageYOffset,
        });
    }
    const getHref = (e, el) => {
        e.preventDefault();
        let sectionToScroll = document.querySelector(el.getAttribute('href'));
        scrollTo(sectionToScroll);
    };
    let itemMenu = document.querySelectorAll('.header nav a');
    itemMenu.forEach(el => el.addEventListener('click', e => {
        e.preventDefault();
        getHref(e, el);
    }));



    //Slick Slider
    $('.your-class').slick({

    });

});