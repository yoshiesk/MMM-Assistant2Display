var A2D_=Function.prototype.bind.call(console.log,console,"[A2D]"),A2D=function(){};Module.register("MMM-Assistant2Display",{defaults:{debug:!1,useYoutube:!0,links:{useLinks:!1,displayDelay:6e4,scrollActivate:!1,scrollStep:25,scrollInterval:1e3,scrollStart:5e3},photos:{usePhotos:!1,displayDelay:1e4},volume:{useVolume:!1,volumePreset:"ALSA",myScript:null},briefToday:{useBriefToday:!1,welcome:"brief Today"},screen:{useScreen:!1,delay:3e5,turnOffDisplay:!0,ecoMode:!0,displayCounter:!0,text:"Auto Turn Off Screen:",displayBar:!0,displayStyle:"Text",detectorSleeping:!1,governorSleeping:!1,rpi4:!1},pir:{usePir:!1,gpio:21,reverseValue:!1},governor:{useGovernor:!1,sleeping:"powersave",working:"ondemand"},internet:{useInternet:!1,displayPing:!1,delay:12e4,scan:"google.fr",command:"pm2 restart 0",showAlert:!0},TelegramBot:{useTelecastSound:!1,TelecastSound:"TelegramBot.ogg"},cast:{useCast:!1,castName:"MagicMirror_A2D",port:8569},spotify:{useSpotify:!1,useIntegred:!1,useLibrespot:!1,connectTo:null,playDelay:3e3,minVolume:10,maxVolume:90,updateInterval:1e3,idleInterval:1e4,username:"",password:"",PATH:"../../../",TOKEN:"./spotify-token.json",CLIENT_ID:"",CLIENT_SECRET:"",deviceDisplay:"Listening on",usePause:!0}},start:function(){this.config=this.configAssignment({},this.defaults,this.config),this.volumeScript={OSX:"osascript -e 'set volume output volume #VOLUME#'",ALSA:"amixer sset -M 'PCM' #VOLUME#%",ALSA_HEADPHONE:"amixer sset -M 'Headphone' #VOLUME#%",ALSA_HDMI:"amixer sset -M 'HDMI' #VOLUME#%","HIFIBERRY-DAC":"amixer sset -M 'Digital' #VOLUME#%",PULSE:"amixer set Master #VOLUME#% -q",RESPEAKER_SPEAKER:"amixer -M sset Speaker #VOLUME#%",RESPEAKER_PLAYBACK:"amixer -M sset Playback #VOLUME#%"},this.helperConfig={debug:this.config.debug,volumeScript:this.config.volume.myScript?this.config.volume.myScript:this.volumeScript[this.config.volume.volumePreset],useA2D:this.useA2D,links:this.config.links,screen:this.config.screen,pir:this.config.pir,governor:this.config.governor,internet:this.config.internet,cast:this.config.cast,spotify:this.config.spotify,dev:this.config.dev},this.radioPlayer={play:!1,img:null,link:null},this.createRadio(),this.config.debug&&(A2D=A2D_);var e={sendSocketNotification:(e,i)=>{this.sendSocketNotification(e,i)},sendNotification:(e,i)=>{this.sendNotification(e,i)},radioStop:()=>this.radio.pause(),spotify:e=>{e?this.A2D.spotify.connected=!0:(this.A2D.spotify.connected=!1,this.A2D.spotify.librespot&&this.config.screen.useScreen&&!this.displayResponse.working()&&this.sendSocketNotification("SCREEN_LOCK",!1),this.A2D.spotify.librespot=!1)}};this.displayResponse=new Display(this.config,e),this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&(this.spotify=new Spotify(this.config.spotify,e,this.config.debug)),this.A2D=this.displayResponse.A2D,this.bar=null,this.checkStyle(),this.useA2D&&console.log("[A2D] initialized.")},getDom:function(){var e=document.createElement("div");e.id="A2D_DISPLAY";var i=document.createElement("div");i.id="A2D_SCREEN",this.config.screen.useScreen&&"Text"==this.config.screen.displayStyle||(i.className="hidden");var t=document.createElement("div");t.id="A2D_SCREEN_TEXT",t.textContent=this.config.screen.text,i.appendChild(t);var s=document.createElement("div");s.id="A2D_SCREEN_COUNTER",s.classList.add("counter"),s.textContent="--:--",i.appendChild(s);var o=document.createElement("div");o.id="A2D_BAR",this.config.screen.useScreen&&"Text"!=this.config.screen.displayStyle&&this.config.screen.displayBar||(o.className="hidden");var n=document.createElement("Bar"==this.config.screen.displayStyle?"meter":"div");n.id="A2D_SCREEN_BAR",n.classList.add(this.config.screen.displayStyle),"Bar"==this.config.screen.displayStyle&&(n.value=0,n.max=this.config.screen.delay),o.appendChild(n);var a=document.createElement("div");a.id="A2D_INTERNET",this.config.internet.useInternet&&this.config.internet.displayPing||(a.className="hidden");var r=document.createElement("div");r.id="A2D_INTERNET_TEXT",r.textContent="Ping: ",a.appendChild(r);var c=document.createElement("div");c.id="A2D_INTERNET_PING",c.classList.add("ping"),c.textContent="Loading ...",a.appendChild(c);var l=document.createElement("div");l.id="A2D_RADIO",l.className="hidden";var d=document.createElement("img");return d.id="A2D_RADIO_IMG",l.appendChild(d),e.appendChild(l),e.appendChild(i),e.appendChild(a),e.appendChild(o),e},getScripts:function(){return this.scanConfig(),["/modules/MMM-Assistant2Display/components/display.js","/modules/MMM-Assistant2Display/ui/"+(this.ui+"/"+this.ui+".js"),"/modules/MMM-Assistant2Display/components/youtube.js","/modules/MMM-Assistant2Display/components/progressbar.js","/modules/MMM-Assistant2Display/components/spotify.js","https://cdn.materialdesignicons.com/5.2.45/css/materialdesignicons.min.css","https://code.iconify.design/1/1.0.6/iconify.min.js"]},getStyles:function(){return["/modules/MMM-Assistant2Display/ui/"+this.ui+"/"+this.ui+".css","screen.css","font-awesome.css"]},getTranslations:function(){return{en:"translations/en.json",fr:"translations/fr.json",it:"translations/it.json"}},notificationReceived:function(e,i){if("DOM_OBJECTS_CREATED"==e&&this.sendSocketNotification("INIT",this.helperConfig),this.useA2D)switch(this.A2D=this.displayResponse.A2D,e){case"DOM_OBJECTS_CREATED":this.displayResponse.prepare(),this.config.screen.useScreen&&"Text"!=this.config.screen.displayStyle&&this.prepareBar(),this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&this.spotify.prepare();break;case"ASSISTANT_READY":this.onReady();break;case"ASSISTANT_LISTEN":case"ASSISTANT_THINK":this.A2D.speak=!0,this.config.useYoutube&&this.displayResponse.player&&this.displayResponse.player.command("setVolume",5),this.config.spotify.useSpotify&&this.A2D.spotify.librespot&&(this.A2D.spotify.targetVol=this.A2D.spotify.currentVol,this.config.spotify.useIntegred?this.sendSocketNotification("SPOTIFY_VOLUME",this.config.spotify.minVolume):this.sendNotification("SPOTIFY_VOLUME",this.config.spotify.minVolume)),this.A2D.radio&&(this.radio.volume=.1),this.A2D.locked&&this.displayResponse.hideDisplay();break;case"ASSISTANT_STANDBY":this.A2D.speak=!1,this.config.useYoutube&&this.displayResponse.player&&this.displayResponse.player.command("setVolume",100),this.config.spotify.useSpotify&&this.A2D.spotify.librespot&&(this.config.spotify.useIntegred?this.sendSocketNotification("SPOTIFY_VOLUME",this.A2D.spotify.targetVol):this.sendNotification("SPOTIFY_VOLUME",this.A2D.spotify.targetVol)),this.A2D.radio&&(this.radio.volume=.6),this.displayResponse.working()?this.displayResponse.showDisplay():this.displayResponse.hideDisplay();break;case"A2D":this.displayResponse.start(i),this.sendNotification("TV-STOP");break;case"A2D_STOP":this.A2D.locked&&(this.A2D.youtube.displayed&&this.displayResponse.player.command("stopVideo"),this.A2D.photos.displayed&&(this.displayResponse.resetPhotos(),this.displayResponse.hideDisplay()),this.A2D.links.displayed&&(this.displayResponse.resetLinks(),this.displayResponse.hideDisplay())),this.A2D.spotify.librespot&&(this.config.spotify.useIntegred?this.config.spotify.usePause?this.sendSocketNotification("SPOTIFY_PAUSE"):this.sendSocketNotification("SPOTIFY_STOP"):this.sendNotification("SPOTIFY_PAUSE")),this.A2D.radio&&this.radio.pause(),this.sendNotification("TV-STOP");break;case"A2D_ASSISTANT_BUSY":this.config.screen.useScreen&&!this.A2D.locked&&this.sendSocketNotification("SCREEN_STOP");break;case"A2D_ASSISTANT_READY":this.config.screen.useScreen&&!this.A2D.locked&&this.sendSocketNotification("SCREEN_RESET");break;case"A2D_VOLUME":this.config.volume.useVolume&&this.sendSocketNotification("SET_VOLUME",i);break;case"WAKEUP":this.config.screen.useScreen&&this.sendSocketNotification("SCREEN_WAKEUP");break;case"A2D_LOCK":this.config.screen.useScreen&&this.sendSocketNotification("SCREEN_LOCK",!0);break;case"A2D_UNLOCK":this.config.screen.useScreen&&this.sendSocketNotification("SCREEN_LOCK",!1);break;case"A2D_RADIO":if(this.A2D.youtube.displayed&&this.displayResponse.player.command("stopVideo"),this.A2D.spotify.librespot&&(this.config.spotify.useIntegred,this.sendSocketNotification("SPOTIFY_PAUSE")),i.link){if(i.img){var t=document.getElementById("A2D_RADIO_IMG");this.radioPlayer.img=i.img,t.src=this.radioPlayer.img}this.radioPlayer.link=i.link,this.radio.src=this.radioPlayer.link,this.radio.autoplay=!0}break;case"TELBOT_TELECAST":this.config.TelegramBot.useTelecastSound&&(this.radioPlayer.link="modules/MMM-Assistant2Display/components/"+this.config.TelegramBot.TelecastSound,this.radio.src=this.radioPlayer.link,this.radio.autoplay=!0);break;case"SPOTIFY_UPDATE_DEVICE":this.config.spotify.useSpotify&&!this.config.spotify.useIntegred&&i.name&&(i.name===this.config.spotify.connectTo?(this.A2D.spotify.currentVol=i.volume_percent,this.A2D.spotify.librespot||!this.config.screen.useScreen||this.displayResponse.working()||(this.sendSocketNotification("SCREEN_WAKEUP"),this.sendSocketNotification("SCREEN_LOCK",!0)),this.A2D.spotify.librespot||(this.A2D.spotify.librespot=!0)):(this.A2D.spotify.librespot&&this.config.screen.useScreen&&!this.displayResponse.working()&&this.sendSocketNotification("SCREEN_LOCK",!1),this.A2D.spotify.librespot&&(this.A2D.spotify.librespot=!1)));break;case"SPOTIFY_UPDATE_VOLUME":this.config.spotify.useSpotify&&!this.config.spotify.useIntegred&&this.A2D.spotify.librespot&&(this.A2D.spotify.currentVol=i);break;case"SPOTIFY_CONNECTED":this.config.spotify.useSpotify&&!this.config.spotify.useIntegred&&(this.A2D.spotify.connected=!0);break;case"SPOTIFY_DISCONNECTED":this.config.spotify.useSpotify&&!this.config.spotify.useIntegred&&(this.A2D.spotify.connected=!1,this.A2D.spotify.librespot&&this.config.screen.useScreen&&!this.displayResponse.working()&&this.sendSocketNotification("SCREEN_LOCK",!1),this.A2D.spotify.librespot=!1);break;case"A2D_SPOTIFY_PLAY":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&this.sendSocketNotification("SPOTIFY_PLAY");break;case"A2D_SPOTIFY_PAUSE":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&this.sendSocketNotification("SPOTIFY_PAUSE");break;case"A2D_SPOTIFY_STOP":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&(this.A2D.spotify.librespot?this.sendSocketNotification("SPOTIFY_STOP"):this.sendSocketNotification("SPOTIFY_PAUSE"));break;case"A2D_SPOTIFY_NEXT":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&this.sendSocketNotification("SPOTIFY_NEXT");break;case"A2D_SPOTIFY_PREVIOUS":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&this.sendSocketNotification("SPOTIFY_PREVIOUS");break;case"A2D_SPOTIFY_SHUFFLE":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&this.sendSocketNotification("SPOTIFY_SHUFFLE",!this.A2D.spotify.shuffle);break;case"A2D_SPOTIFY_REPEAT":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&(console.log(this.A2D.spotify),this.sendSocketNotification("SPOTIFY_REPEAT","off"==this.A2D.spotify.repeat?"track":"off"));break;case"A2D_SPOTIFY_TRANSFER":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&this.sendSocketNotification("SPOTIFY_TRANSFER",i);break;case"A2D_SPOTIFY_VOLUME":this.config.spotify.useSpotify&&this.config.spotify.useIntegred&&this.sendSocketNotification("SPOTIFY_VOLUME",i)}},socketNotificationReceived:function(e,i){switch(e){case"SCREEN_SHOWING":this.screenShowing();break;case"SCREEN_HIDING":this.screenHiding();break;case"SCREEN_TIMER":if(this.config.screen.useScreen&&"Text"==this.config.screen.displayStyle){document.getElementById("A2D_SCREEN_COUNTER").textContent=i}break;case"SCREEN_BAR":if(this.config.screen.useScreen)if("Bar"==this.config.screen.displayStyle){document.getElementById("A2D_SCREEN_BAR").value=this.config.screen.delay-i}else if("Text"!=this.config.screen.displayStyle){let e=(100-100*i/this.config.screen.delay)/100,t=moment(new Date(this.config.screen.delay-i)).format("mm:ss");this.bar.animate(e,{step:(e,i)=>{i.path.setAttribute("stroke",e.color),i.setText(this.config.screen.displayCounter?t:""),i.text.style.color=e.color}})}break;case"INTERNET_DOWN":this.sendNotification("SHOW_ALERT",{type:"alert",message:"Internet is DOWN ! Retry: "+i,title:"Internet Scan",timer:1e4}),this.sendSocketNotification("SCREEN_WAKEUP");break;case"INTERNET_RESTART":this.sendNotification("SHOW_ALERT",{type:"alert",message:"Internet is now available! Restarting Magic Mirror...",title:"Internet Scan",timer:1e4}),this.sendSocketNotification("SCREEN_WAKEUP");break;case"INTERNET_PING":document.getElementById("A2D_INTERNET_PING").textContent=i;break;case"SNOWBOY_STOP":this.sendNotification("ASSISTANT_STOP");break;case"SNOWBOY_START":this.sendNotification("ASSISTANT_START");break;case"CAST_START":this.displayResponse.castStart(i);break;case"CAST_STOP":this.displayResponse.castStop();break;case"SPOTIFY_PLAY":if(this.spotify.updateCurrentSpotify(i),!this.A2D.spotify.connected)return;i&&i.device&&i.device.name&&(this.A2D.spotify.repeat=i.repeat_state,this.A2D.spotify.shuffle=i.shuffle_state,i.device.name==this.config.spotify.connectTo?(this.A2D.spotify.currentVol=i.device.volume_percent,this.A2D.spotify.librespot||(this.A2D.spotify.librespot=!0),this.A2D.spotify.connected&&this.config.screen.useScreen&&!this.displayResponse.working()&&(this.sendSocketNotification("SCREEN_WAKEUP"),this.sendSocketNotification("SCREEN_LOCK",!0))):(this.A2D.spotify.connected&&this.A2D.spotify.librespot&&this.config.screen.useScreen&&!this.displayResponse.working()&&this.sendSocketNotification("SCREEN_LOCK",!1),this.A2D.spotify.librespot&&(this.A2D.spotify.librespot=!1)));break;case"SPOTIFY_IDLE":this.spotify.updatePlayback(!1),this.A2D.spotify.librespot&&this.config.screen.useScreen&&!this.displayResponse.working()&&this.sendSocketNotification("SCREEN_LOCK",!1),this.A2D.spotify.librespot=!1}},scanConfig:function(){this.useA2D=!1,this.ui="Windows",console.log("[A2D] Scan config.js file");var e=!1;for(let[i,t]of Object.entries(config.modules))"MMM-GoogleAssistant"==t.module&&(e=!0,"fullscreen_above"==t.position&&(this.ui="Fullscreen"),this.useA2D=!(!t.config.A2DServer||!t.config.A2DServer.useA2D||t.disabled)&&t.config.A2DServer.useA2D);e||console.log("[A2D][ERROR] GoogleAssistant not found!"),console.log("[A2D] Auto choice UI:",this.ui),this.useA2D||console.log("[A2D][ERROR] A2D is desactived!")},prepareBar:function(){"Bar"!=this.config.screen.displayStyle&&(this.bar=new ProgressBar[this.config.screen.displayStyle](document.getElementById("A2D_SCREEN_BAR"),{strokeWidth:"Line"==this.config.screen.displayStyle?2:5,trailColor:"#1B1B1B",trailWidth:1,easing:"easeInOut",duration:500,svgStyle:null,from:{color:"#FF0000"},to:{color:"#00FF00"},text:{style:{position:"absolute",left:"50%",top:"Line"==this.config.screen.displayStyle?"0":"50%",padding:0,margin:0,transform:{prefix:!0,value:"translate(-50%, -50%)"}}}}))},checkStyle:function(){["Text","Line","SemiCircle","Circle","Bar"].find(e=>e==this.config.screen.displayStyle)||(console.log("[A2D] displayStyle Error ! ["+this.config.screen.displayStyle+"]"),this.config.screen=Object.assign({},this.config.screen,{displayStyle:"Text"}))},configAssignment:function(e){for(var i,t,s=Array.prototype.slice.call(arguments,1);s.length;)for(t in i=s.shift())i.hasOwnProperty(t)&&("object"==typeof e[t]&&e[t]&&"[object Array]"!==Object.prototype.toString.call(e[t])&&"object"==typeof i[t]&&null!==i[t]?e[t]=this.configAssignment({},e[t],i[t]):e[t]=i[t]);return e},briefToday:function(){this.sendNotification("ASSISTANT_WELCOME",{key:this.config.briefToday.welcome})},onReady:function(){this.config.briefToday.useBriefToday&&this.briefToday()},screenShowing:function(){MM.getModules().enumerate(e=>{e.show(1e3,{lockString:"A2D_SCREEN"})})},screenHiding:function(){MM.getModules().enumerate(e=>{e.hide(1e3,{lockString:"A2D_SCREEN"})})},resume:function(){this.A2D.spotify.connected&&this.config.spotify.useIntegred&&(this.displayResponse.showSpotify(),A2D("Spotify is resumed."))},suspend:function(){this.A2D.spotify.connected&&this.config.spotify.useIntegred&&(this.displayResponse.hideSpotify(),A2D("Spotify is suspended."))},showRadio:function(){if(this.A2D=this.displayResponse.A2D,this.A2D.radio=this.radioPlayer.play,this.radioPlayer.img){var e=document.getElementById("A2D_RADIO");this.radioPlayer.play?e.classList.remove("hidden"):e.classList.add("hidden")}},createRadio:function(){this.radio=new Audio,this.radio.addEventListener("ended",()=>{A2D("Radio ended"),this.radioPlayer.play=!1,this.showRadio()}),this.radio.addEventListener("pause",()=>{A2D("Radio paused"),this.radioPlayer.play=!1,this.showRadio()}),this.radio.addEventListener("abort",()=>{A2D("Radio aborted"),this.radioPlayer.play=!1,this.showRadio()}),this.radio.addEventListener("error",e=>{A2D("Radio error: "+e),this.radioPlayer.play=!1,this.showRadio()}),this.radio.addEventListener("loadstart",()=>{A2D("Radio started"),this.radioPlayer.play=!0,this.radio.volume=.6,this.showRadio()})},getCommands:function(e){e.add({command:"restart",description:this.translate("RESTART_HELP"),callback:"tbRestart"}),this.config.screen.useScreen&&e.add({command:"wakeup",description:this.translate("WAKEUP_HELP"),callback:"tbWakeup"}),e.add({command:"hide",description:this.translate("HIDE_HELP"),callback:"tbHide"}),e.add({command:"show",description:this.translate("SHOW_HELP"),callback:"tbShow"}),e.add({command:"stop",description:this.translate("STOP_HELP"),callback:"tbStopA2D"}),e.add({command:"A2D",description:this.translate("A2D_HELP"),callback:"tbA2D"}),this.config.volume.useVolume&&e.add({command:"volume",description:this.translate("VOLUME_HELP"),callback:"tbVolume"})},tbRestart:function(e,i){i.args?(this.sendSocketNotification("RESTART",i.args),i.reply("TEXT",this.translate("RESTART_DONE"))):i.reply("TEXT",this.translate("RESTART_ERROR"))},tbWakeup:function(e,i){this.sendSocketNotification("SCREEN_WAKEUP"),i.reply("TEXT",this.translate("WAKEUP_REPLY"))},tbHide:function(e,i){var t=!1,s=!1;return i.args?"MMM-GoogleAssistant"==i.args||"MMM-Assistant2Display"==i.args?i.reply("TEXT",this.translate("DADDY")):(MM.getModules().enumerate(e=>{if(e.name==i.args){if(t=!0,e.hidden)return i.reply("TEXT",i.args+this.translate("HIDE_ALREADY"));if(e.lockStrings.length>0){if(e.lockStrings.forEach(t=>{"TB_A2D"==t&&(e.hide(500,{lockString:"TB_A2D"}),0==e.lockStrings.length&&(s=!0,i.reply("TEXT",i.args+this.translate("HIDE_DONE"))))}),!s)return i.reply("TEXT",i.args+this.translate("HIDE_LOCKED"))}else e.hide(500,{lockString:"TB_A2D"}),i.reply("TEXT",i.args+this.translate("HIDE_DONE"))}}),void(t||i.reply("TEXT",this.translate("MODULE_NOTFOUND")+i.args))):i.reply("TEXT",this.translate("MODULE_NAME"))},tbShow:function(e,i){var t=!1,s=!1;if(!i.args)return i.reply("TEXT",this.translate("MODULE_NAME"));MM.getModules().enumerate(e=>{if(e.name==i.args){if(t=!0,!e.hidden)return i.reply("TEXT",i.args+this.translate("SHOW_ALREADY"));if(e.lockStrings.length>0){if(e.lockStrings.forEach(t=>{"TB_A2D"==t&&(e.show(500,{lockString:"TB_A2D"}),0==e.lockStrings.length&&(s=!0,i.reply("TEXT",i.args+this.translate("SHOW_DONE"))))}),!s)return i.reply("TEXT",i.args+this.translate("SHOW_LOCKED"))}else e.show(500,{lockString:"TB_A2D"}),i.reply("TEXT",i.args+this.translate("SHOW_DONE"))}}),t||i.reply("TEXT",this.translate("MODULE_NOTFOUND")+i.args)},tbStopA2D:function(e,i){this.notificationReceived("A2D_STOP"),i.reply("TEXT",this.translate("STOP_A2D"))},tbA2D:function(e,i){if(i.args){var t={photos:[],urls:[],transcription:{},trysay:null,help:null},s=/^((http(s)?):\/\/)(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,o=s.test(i.args),n=s.test("http://"+i.args);o||n?(i.reply("TEXT",this.translate("A2D_OPEN")+i.args),console.log(i),t.transcription.transcription=" Telegram @"+i.message.from.username+": "+i.args,t.transcription.done=!0,t.urls[0]=o?i.args:"http://"+i.args,this.displayResponse.start(t)):i.reply("TEXT",this.translate("A2D_INVALID"))}else i.reply("TEXT","/A2D <link>")},tbVolume:function(e,i){if(i.args){var t=Number(i.args);if(!t&&0!=t||t<0||t>100)return i.reply("TEXT","/volume [0-100]");this.sendSocketNotification("SET_VOLUME",t),i.reply("TEXT","Volume "+t+"%")}else i.reply("TEXT","/volume [0-100]")}});
