import { 
    stuff,
    mto 
  }from "./main.js";


  class Mto{

    constructor(){
        this.created    = false;
        this.actived    = false;

        this.data = [];
        this.line = [];
    }

    async load(){

        if(this.created==false){
                                 this.create_Mto();
                                 this.create_table();
                                 this.created = true;
                               }


        // let get = await req("http://localhost:3000/read_mto");
        // if(get){
        //          this.data = JSON.parse(get);
        //          console.log(this.data);
        // }

    }

    create_Mto(){

        let c_mto = document.createElement("div");
        c_mto.setAttribute("class",'c-mto');
        c_mto.setAttribute("id",'c-mto');
        document.body.appendChild(c_mto);

        c_mto.innerHTML = '\
                            <span id="x-mto" class="icon i_black s_40 icon-close"></span>\
                            <div class="mto">\
                                <h1 id="title_mto"></h1>\
                                <div id="c-desc">\
                                    <label>Descripcion</label><br>\
                                    <input id="descripcion"type="text">\
                                    <span>+</span>\
                                    <span>-</span>\
                                </div>\
                              <div class="header-table">\
                                <div class="camp-header w35">Description</div>\
                                <div class="camp-header w5">+</div>\
                                <div class="camp-header w5">-</div>\
                                <div class="camp-header w20">quantity</div>\
                              </div>\
                              <div id="c-table_mto" class="c-table">\</div>\
                            </div>\
                           ';

        document.getElementById('x-mto').addEventListener("click",this.close);

        /*
        c_mto.innerHTML = '\
                              <h1 class="title">Stuff</h1>\
                              <div class="div-stuff">\
                                <div class="line-stuff">\
                                    <div class="camp-stuff w10 h20">ID</div>\
                                    <div class="camp-stuff w35 h20">Name</div>\
                                    <div class="camp-stuff w35 h20">State</div>\
                                </div>\
                                <div class="line-stuff">\
                                    <div class="camp-stuff w10"><input  id="id"   type="text"></div>\
                                    <div class="camp-stuff w35"><input  id="name" type="text"></div>\
                                    <div class="camp-stuff w35">\
                                      <select id="state">\
                                       <option hidden selected>Dropdown</option>\
                                        <option value="New">New</option>\
                                        <option value="Used">Used</option>\
                                        <option value="Broken">Broken</option>\
                                       </select>\
                                    </div>\
                                    <div class="camp-stuff w35"><button id="save">Save</button>\</div>\
                                </div>\
                              </div>\
                           ';        
                           */

            this.close();
    }

    close(){

        document.getElementById("c-mto").style.display = 'none';
    }

    open(){

        let index = this.id.split('_')[1];
        document.getElementById('c-mto').style.display = "block";
        document.getElementById("title_mto").innerHTML = "Movements of " + stuff.data[index].name;

    }

    clear_table(){

        for(let i=0; i<this.line.length; i++)
        {  
         if (this.line[i]==null) continue;  
         this.line[i].parentNode.removeChild(this.line[i]);      
        }  
        this.line.length = 0;

    }

    create_table(){

        this.clear_table();

        let  c_table = document.getElementById('c-table_mto');
             c_table.setAttribute("class",'c-table');

              //for(let i=0; i<arr.length; i++){
              //
              // }

    }



}


const _Mto = /*@__PURE__*/ new Mto();

export { Mto };