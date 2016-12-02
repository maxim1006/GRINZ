(function() {
    /*Mocks*/
    let model = {
        children: [
            {
                text: "Configuration Params v 2",
                type: "brunch",
                state: 'opened',
                children: [
                    {
                        text: "Parameters Deploying Edit v 8.yaml",
                        type: "leaf",
                        state: "selected"
                    },
                    {
                        text: "Debug Config 4.conf",
                        type: "brunch",
                        children: [
                            {
                                text: "Parameters Deploying Edit v 8.yaml",
                                type: "leaf",
                                state: "selected"
                            },
                            {
                                text: "Debug Config 4.conf",
                                type: "leaf"
                            },
                            {
                                text: "Image.jpg",
                                type: "leaf"
                            }
                        ]
                    },
                    {
                        text: "Image.jpg",
                        type: "leaf"
                    }
                ]
            },
            {
                text: "Configuration Params v 1",
                type: "brunch",
                children: [
                    {
                        text: "1",
                        type: "leaf"
                    },
                    {
                        text: "2",
                        type: "leaf",
                    },
                    {
                        text: "3",
                        type: "leaf"
                    }
                ]
            },
            {
                text: "Configuration Params v 0",
                type: "brunch",
                children: [
                    {
                        text: "1",
                        type: "leaf"
                    },
                    {
                        text: "2",
                        type: "leaf",
                    },
                    {
                        text: "3",
                        type: "leaf"
                    }
                ]
            },
            {
                text: "Another One Folder",
                type: "brunch",
                children: [
                    {
                        text: "1",
                        type: "leaf"
                    },
                    {
                        text: "2",
                        type: "leaf",
                    },
                    {
                        text: "3",
                        type: "leaf"
                    }
                ]
            }
        ]
    };
    /********/


    let $treeWrapper = $('#treeWrapper'),
        $tree;



    function init() {
        $treeWrapper.append(createHTMLTree());

        $tree = $treeWrapper.find('.tree');

        bindEvents();

        //show init file
        $treeWrapper
            .find('.tree__leaf._selected').click();
    }

    init();



    function bindEvents() {
        $treeWrapper.on('click', '.tree__brunch', function(e) {

            e.stopPropagation();

            let $this = $(this),
                $childrenList = $(this).children('.tree__brunch-list');

            if ($this.hasClass('_opened')) {
                $childrenList
                    .slideUp({
                        duration: 200,
                        complete() {
                            $this.removeClass('_opened');
                        }
                    });
            } else {
                $childrenList
                    .slideDown({
                        duration: 200,
                        complete() {
                            $this.addClass('_opened');
                        }
                    });
            }
        });

        $treeWrapper.on('click', '.tree__leaf', function(e) {
            let $this = $(this),
                code;

            e.stopPropagation();

            $treeWrapper
                .find('.tree__leaf._selected')
                .removeClass('_selected');

            $this.addClass('_selected');
        });
    }



    /*Helpers*/
    function createHTMLTree() {
        let tree = '<ul class="tree">',
            level = 1;

        model.children.forEach((el, idx, arr) => {
            if (el.type === 'brunch') {
            tree += `<li data-level="${level}" class="tree__brunch ${el.state ? '_' + el.state: ''}">
                             ${el.text}
                             ${createTreeChildren(el.children, level)}
                         </li>`;
        } else if (el.type === 'leaf') {
            tree += `<li data-level="${level}" class="tree__leaf ${el.state ? '_' + el.state: ''}">
                             <span class="tree__leaf-text">${el.text}</span>
                         </li>`;
        }
    });

        return tree += '</ul>';
    }

    function createTreeChildren(model, level) {

        if (!model || !model.length) return;

        level++;

        let tree = `<ul class="tree__brunch-list">`;

        model.forEach((el, idx, arr) => {
            if (el.type === 'brunch') {
            tree += `<li data-level="${level}" class="tree__brunch ${el.state ? '_' + el.state: ''}">
                             ${el.text}
                             ${createTreeChildren(el.children, level)}
                         </li>`;
        } else if (el.type === 'leaf') {
            tree += `<li data-level="${level}" class="tree__leaf ${el.state ? '_' + el.state: ''}">
                             <span class="tree__leaf-text">${el.text}</span>
                         </li>`;
        }
    });

        tree += `</ul>`;

        return tree;
    }
    /*********/




})();