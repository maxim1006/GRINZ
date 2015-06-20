(function() {

    var btnAdd1 = document.getElementById("buttonAddTextToCol1");
    var btnAdd2 = document.getElementById("buttonAddTextToCol2");
    var btnRemove1 = document.getElementById("buttonRemoveTextFromCol1");
    var btnRemove2 = document.getElementById("buttonRemoveTextFromCol2");
    var main1 = document.querySelector('.main1');
    var section = document.querySelector('.section');
    var par = document.createElement("p");
    par.innerText = (new Array(200)).join('La ');

    var arrAdd = [btnAdd1, btnAdd2];
    var arrRemove = [btnRemove1, btnRemove2];


    Array.prototype.forEach.call(arrAdd, function(btn) {
        btn.addEventListener('click', addText);
    });

    Array.prototype.forEach.call(arrRemove, function(btn) {
        btn.addEventListener('click', removeText);
    });

    function addText(e) {
          if (e.target.id === "buttonAddTextToCol1") {
              main1.appendChild(par.cloneNode(true))
          }  else {
              section.appendChild(par.cloneNode(true))
          }
    }

    function removeText(e) {
        if (e.target.id === "buttonRemoveTextFromCol1") {
            main1.removeChild(main1.lastChild);
        }  else {
            section.removeChild(section.lastChild);
        }
    }

})();