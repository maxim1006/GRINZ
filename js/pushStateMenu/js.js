document.addEventListener("DOMContentLoaded", function(event) {
    var nav = document.querySelector('.nav');

    var content = document.querySelector('.content');

    var contents = {
        item1: 'Content of item1',
        item2: 'Content of item2',
        item3: 'Content of item3'
    };

    nav.addEventListener('click', function(e) {

        var target = e.target,
            linkHref = target.getAttribute('href'),
            state = {
                page: linkHref
            };

        if (target.tagName !== 'A') {
            return;
        }

        history.pushState(state, '', state.page); //1-объект ссылок, 2-описание, 3-относительная ссылка
        updateState(linkHref);

        e.preventDefault();
    });

    window.addEventListener('popstate', function(e) {
        if (e.state) {
            updateState(e.state.page);
        } else {
            updateState();
        }
    });

    function updateState(link) {
        content.innerHTML = contents[link] || "";
        updateStateButtons(link);
    }

    function updateStateButtons(link) {
        [].slice.call(document.querySelectorAll('a')).forEach(function(e) {
             if (e.getAttribute('href') === link) {
                 e.classList.add('_active')
             } else {
                 e.classList.remove('_active')
             }
        });
    }
});

