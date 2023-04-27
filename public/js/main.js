
 import{Logo} from './logo.js';
  import{Stuff} from './stuff.js';
   import{Mto}    from './mtos.js';


export let logo;
export let stuff;
export let mto;


load();

async function load(){

    logo = new Logo();
    stuff = new Stuff();
    mto   = new Mto();

    let w1 = await logo.load();
    let w2 = await stuff.load();
    let w3 = await mto.load();

    stuff.write_table(stuff.data);
    
}
