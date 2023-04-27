import { 
         stuff,mto 
       }from "./main.js";


const req = (target,header) =>{

//let header;
//if (OBJ){
//    header = 'id=' + OBJ.id + '&' + 'name='+OBJ.name + '&' + 'state='+OBJ.state + '&' + 'quantity=' + OBJ.quantity;
//}    


        return new Promise((resolve)=>{
          
        let xmlh = new XMLHttpRequest();
            xmlh.open("GET", target+"?"+header,true)
            xmlh.send();
        
                xmlh.onreadystatechange = function(){
            if (xmlh.readyState == 4){
              if(xmlh.status >= 300){
                    console.log('No es posible establecer contacto con servidor');
                    resolve(false);
              }else{
                      let text = xmlh.responseText;
                   // let arr = JSON.parse(text);
                      console.log(text);
                      resolve(text);    
                   }
            }
          }
        });
    }



class Stuff{

    constructor(){
        this.created    = false;
        this.actived    = false;

        this.data = [];
        this.line = [];
    }

    async load(){

        if(this.created==false){
                                 this.create_Stuff();
                                 this.create_editor();
                                 this.create_table();
                                 this.created = true;
                               }
        let get = await req("http://localhost:3000/read");
        if(get){
                
                 this.data = JSON.parse(get);
                 console.log(this.data);
        }


    }

    create_Stuff(){

        let c_stuff = document.createElement("div");
            c_stuff.setAttribute("class",'c-stuff');
            c_stuff.setAttribute("id",'c-stuff');
            document.body.appendChild(c_stuff);
    
            c_stuff.innerHTML = '\
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

            document.getElementById("save").addEventListener('click',this.save);
    }

    create_table(){
       

        let c_stuff = document.getElementById("c-stuff");

        let contenedor = document.createElement("div");
            contenedor.setAttribute("class",'stuff-table');
            contenedor.setAttribute("id",'stuff-table');
            c_stuff.appendChild(contenedor);
    
            contenedor.innerHTML = '\
                                    <div class="div-stuff">\
                                      <div class="line-stuff">\
                                          <div class="camp-stuff w20">Search by name</div>\
                                      </div>\
                                      <div class="line-stuff">\
                                          <div class="camp-stuff w35"><input id="box_search" type="text"></div>\
                                          <span class="icon i_black s_30 icon-search"></span>\
                                      </div>\
                                      <div class="header-table">\
                                        <div class="camp-header w35">Name</div>\
                                        <div class="camp-header w35">Quantity</div>\
                                      </div>\
                                      <div id="c-table" class="c-table">\</div>\
                                    </div>\
                               ';
    }

    create_editor(){

        let c_editor = document.createElement("div");
            c_editor.setAttribute("class",'c-editor');
            c_editor.setAttribute("id",'c-editor');
            document.body.appendChild(c_editor);

         c_editor.innerHTML = '\
                                 <span id="x-editor" class="icon i_white s_40 icon-close"></span>\
                                 <div id="editor" class="editor">\
                                    <label>ID: </label>\
                                    <br><input id="id_"   type="text">\
                                    <br>\
                                    <label>NAME: </label>\
                                    <br>\
                                    <input  id="name_" type="text">\
                                    <br>\
                                    <label>CANTIDAD: </label>\
                                    <br>\
                                    <input  id="quantity_" type="text">\
                                    <br>\
                                    <label>STATE: </label>\
                                    <br>\
                                    <select id="state_">\
                                       <option hidden selected>Dropdown</option>\
                                        <option value="New">New</option>\
                                        <option value="Used">Used</option>\
                                        <option value="Broken">Broken</option>\
                                    </select>\
                                    <button id="save_">Save</button>\
                                 </div>\
                              ';

        document.getElementById('c-editor').style.display = "none";
        document.getElementById('x-editor').addEventListener("click",this.close_editor);
        document.getElementById('save_').addEventListener("click",this.save_editor);

    }
    
    open_editor(){
        let index = this.id.split('_')[1];
        document.getElementById('c-editor').style.display = "block";

        document.getElementById('id_').value = stuff.data[index].id;
        document.getElementById('name_').value = stuff.data[index].name;
        document.getElementById('state_').value = stuff.data[index].state;
        document.getElementById('quantity_').value = stuff.data[index].quantity;
       
    }

    close_editor(){
        document.getElementById('c-editor').style.display = "none";    
    }

    save_editor(){
        
        let name  = document.getElementById("name_").value.trim();
        let state = document.getElementById("state_").value;
        let quantity = document.getElementById("quantity_").value;

        if(name==""){alert("Debe llenar el campo 'Name' para continuar..."); return}
        if(quantity==""){alert("Debe llenar el campo 'Name' para continuar..."); return}
        if(quantity<0){alert("error no es permitido cantidades negativas..."); return}
        if(quantity>233){alert("error no es permitido cantidades superiores a 233..."); return}
                    

        id = parseInt(document.getElementById('id_').value) -1;
     
        let obj = {
                   id:             id,
                   name:         name,
                   state:       state,
                   quantity: quantity
                 };
 
         stuff.data[id] = obj;
         console.log(stuff.data);
 
         let header = 'id=' + obj.id + '&' + 'name='+obj.name + '&' + 'state='+obj.state + '&' + 'quantity=' + obj.quantity;
         let get = req("http://localhost:3000/edit",header);  
         if(get){
             alert('registro guardado con exito');
             stuff.write_table(stuff.data);
         }else{
             alert('error al guardar registro')
         }        

         stuff.close_editor();
    }

    async save(){

       if(document.getElementById("id").value!="") {alert('limpiar campos antes de guardar un nuevo registro'); return; }

       let name  = document.getElementById("name").value.trim();
       let state = document.getElementById("state").value;
       if(name==""){alert("Debe llenar el campo 'Name' para continuar..."); return}
       if(state=="Dropdown"){alert("Debe seleccionar el estado del elemento para continuar..."); return}
       
       let quantity = 0;
       
       let id = stuff.data.length +1;
       document.getElementById('id').value = id;
    
       let obj = {
                  id:             id,
                  name:         name,
                  state:       state,
                  quantity: quantity
                };

        stuff.data.push(obj);
        console.log(stuff.data);

        let header = 'id=' + obj.id + '&' + 'name='+obj.name + '&' + 'state='+obj.state + '&' + 'quantity=' + obj.quantity;
        let get = req("http://localhost:3000/save",header);  
        if(get){
            alert('registro guardado con exito');
            stuff.write_table(stuff.data);
        }else{
            alert('error al guardar registro')
        }
    
    }

    clear(){
        document.getElementById("state").value = "Dropdown";
        document.getElementById("id").value    = "";  
        document.getElementById("name").value  = "";  
    }

    clear_table(){

        for(let i=0; i<this.line.length; i++)
        {  
         if (this.line[i]==null) continue;  
         this.line[i].parentNode.removeChild(this.line[i]);      
        }  
        this.line.length = 0;

    }

    write_table(arr){

            this.clear_table();

            let  c_table = document.getElementById('c-table');
                 c_table.setAttribute("class",'c-table');
    
                  for(let i=0; i<arr.length; i++){
                      this.line[i] = document.createElement("div");
                      this.line[i].setAttribute("class","line-table");
                      this.line[i].setAttribute("id","line_"+i);
                      c_table.appendChild(this.line[i]);
                  
                      let name = document.createElement("div");
                          name.setAttribute("class","camp w35");
                          this.line[i].appendChild(name);
                      let quantity = document.createElement("div");
                          quantity.setAttribute("class","camp w35");
                          this.line[i].appendChild(quantity);

                      let New = document.createElement("span");
                          New.setAttribute("class","icon i_black s_30 icon-new");
                          this.line[i].appendChild(New);
                      let trash = document.createElement("span");
                          trash.setAttribute("class","icon i_black s_30 icon-delete");
                          trash.setAttribute("id","trash_" + i);
                          this.line[i].appendChild(trash);
                      let curva = document.createElement("span");
                          curva.setAttribute("class","icon i_black s_30 icon-curva");
                          curva.setAttribute("id","curva_" + i);
                          this.line[i].appendChild(curva);
                 
                      let selector = document.createElement("a");
                          selector.setAttribute("class","camp w10");
                          selector.setAttribute("id","selector_" + i);
                          this.line[i].appendChild(selector);
                          selector.innerHTML = "select";

                      if(arr[i].state=="New") New.setAttribute("class","icon i_black s_30 icon-new");
                      if(arr[i].state=="Used") New.setAttribute("class","icon i_black s_30 icon-used");
                      if(arr[i].state=="Broken") New.setAttribute("class","icon i_black s_30 icon-broken");


                      name.innerHTML     = arr[i].name;
                      quantity.innerHTML = arr[i].quantity;

                      // events...
                      trash.addEventListener("click",stuff.kill);
                      selector.addEventListener("click",stuff.open_editor);
                      curva.addEventListener("click",mto.open);

                  }
    
    }
    
    async kill(){
        let index = this.id.split('_')[1];
        let ok    = confirm("Esta seguro que desea eliminar el elemento " + stuff.data[index].name);
        if(ok){
               //stuff.data.splice(index, 1);
               //stuff.write_table(stuff.data);
               
               

               let header = 'index=' + index;
               let get = await req("http://localhost:3000/kill",header);
               if(get){
                        alert('registro eliminado con exito');
                        stuff.data = JSON.parse(get);    

                        stuff.write_table(stuff.data);
                }else{
                    alert('error al guardar registro')
                }
               

        }else   console.log('abort operation...');
    }





    }


const _Stuff = /*@__PURE__*/ new Stuff();

export { Stuff };