class Logo{

    constructor(){
        this.created    = false;
        this.actived    = false;
    }

    load(){

        if(this.created==false){
                                 this.create_Logo();
                                 this.created = true;
                               }
       
    }

    create_Logo(){

        let c_logo = document.createElement("div");
            c_logo.setAttribute("class",'c-logo');
            c_logo.setAttribute("id",'c-logo');
            document.body.appendChild(c_logo);
    
            c_logo.innerHTML = '\
                                <div class="c-poster">\
                                    <div class="c-img"><img id="baul_img" src="img/logo.png"></div>\
                                    <button id="btn-in">ingresar</button>\
                                </div>\
                                \
                                <div class = "c-relative">\
                                  <div class = "c-waves">\
                                    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\
                                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">\
                                    <defs>\
                                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />\
                                    </defs>\
                                        <g class="parallax">\
                                          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>\
                                          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>\
                                          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>\
                                          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"/>\
                                        </g>\
                                    </svg>\
                                  </div>\
                                </div>\
                                \
                               ';

         document.getElementById('btn-in').addEventListener('click',this.close);
      // c_logo.style.display = "none";

    }


    close(){
            document.getElementById("c-logo").style.left = "-100%";
            this.actived = false;   
           }


}


const _Logo = /*@__PURE__*/ new Logo();

export { Logo };