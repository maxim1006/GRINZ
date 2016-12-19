(function() {

    let btnAdd = document.getElementById("buttonAddTextToCol"),
        btnRemove = document.getElementById("buttonRemoveTextFromCol"),
        par = document.createElement("p"),
        sections = document.querySelectorAll('section');


    par.innerText = (new Array(200)).join('La ');


    btnAdd.addEventListener('click', addText);
    btnRemove.addEventListener('click', removeText);


    function addText(e) {
          [...sections].forEach((section) => {
              section.appendChild(par.cloneNode(true));
          });
    }

    function removeText(e) {
        [...sections].forEach((section) => {
            section.removeChild(section.lastChild);
        });
    }

})();