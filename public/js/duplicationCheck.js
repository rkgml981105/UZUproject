
let modal = document.getElementById("dupcheck");
let btn = document.getElementById("dupcheckbtn");
let okbtn = document.getElementById("okbtn");


    function modalResize() {
        let browserwidth = window.innerWidth + "px";
        let browserheight = window.innerHeight+ "px";
        
        modal.style.width = browserwidth;
        modal.style.height = browserheight;
    }

    btn.onclick = function() {
        modalResize();
        modal.style.display = "block";
        
        window.onresize = function() {
            modalResize();
        }
    }
    
    okbtn.onclick = function() {
        modal.style.display = "none";
    }


    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    