const puppeteer = require('puppeteer');
const path = require("path");
const fs = require("fs");
const {prefix,prefix2,token,DEBUG} = require("./config.json");
const Discord = require("discord.js");

const dir = path.resolve("./index.html");
const dirAct = path.resolve("./");
// Sample script
const ggbScript = ["A = (2,2)", `Text("Hello world",(2,2),false,false)`]; 

const client = new Discord.Client();

var Endpoint,pageURl;

function ponerEndpointyURL(valor){
    Endpoint = valor[0];
    pageURl = valor[1];
}

async function abrirNavegador(){
    const browser = await puppeteer.launch({ headless: !DEBUG});
    const page = await browser.newPage();
    await page.goto('file://'+dir);
    await page.waitForFunction('window.ggbApplet != null');
    //console.log(page);

    const browserEndpoint = browser.wsEndpoint();
    const pageURl = page.url();

    await browser.disconnect();

    return [browserEndpoint,pageURl];
  };

client.once('ready', () =>{
    Endpoint =  abrirNavegador();
    
    Promise.resolve(Endpoint).then(ponerEndpointyURL);

    console.log('funcionando ando');
});

//El cliente se loggea en discord con mi token de aplicación
client.login(token);

client.on('message', async(message)=>{
    if(message.content.startsWith(`${prefix}`)){
        let comando = message.content.slice(1,message.content.length).split("$");

        const browser = await puppeteer.connect({ browserWSEndpoint: Endpoint}); 
        const pages = await browser.pages();
        const page = pages.find(page => page.url() === pageURl);

        let fotoPNG = await page.evaluate(async (script) => {
      
            window.ggbApplet.evalCommand(script);
      
            var fotoPNG = window.ggbApplet.getPNGBase64(1,false,undefined);
      
            return fotoPNG;
        }, comando.join("\n"));
        fs.writeFileSync("geogebra.png", fotoPNG, {encoding: 'base64'}, function(err){
          console.log("Imagen NO Creada");
        });
        
        message.channel.send('Listo.', {files: [dirAct+"/geogebra.png"]});
        await browser.disconnect();
    }else if(message.content.startsWith(`${prefix2}`)){
        let comando = message.content.slice(1,message.content.length);

        const browser = await puppeteer.connect({ browserWSEndpoint: Endpoint}); 
        const pages = await browser.pages();
        const page = pages.find(page => page.url() === pageURl);

        var exito = true;
        await page.evaluate(comando).catch((error)=>{
            if(DEBUG){
                console.log("Error al ejecutar codigo JS Prefijo: %");
                console.log(error);
            }
            message.channel.send('Hubo un error al ejecutar el codigo JS.');
            exito = false;
        });

        if(!exito) return;

        let fotoPNG = await page.evaluate(async (script) => {
      
            var fotoPNG = window.ggbApplet.getPNGBase64(1,false,undefined);
      
            return fotoPNG;
        }, comando);
            
        fs.writeFileSync("geogebra.png", fotoPNG, {encoding: 'base64'}, function(err){
            console.log("Imagen NO Creada");
        });
        
        message.channel.send('Listo.', {files: [dirAct+"/geogebra.png"]});
    }
}); 
