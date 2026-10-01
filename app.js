(function(){
const seed={
 tlp:[{gen:'Generation 1',name:'TLP Member 01',real:'Real Name',age:'—',kami:'',bio:'TLP48 Member',image:''},{gen:'Generation 1',name:'TLP Member 02',real:'Real Name',age:'—',kami:'',bio:'TLP48 Member',image:''},{gen:'Generation 2',name:'TLP Member 03',real:'Real Name',age:'—',kami:'',bio:'TLP48 Member',image:''},{gen:'Generation 2',name:'TLP Member 04',real:'Real Name',age:'—',kami:'',bio:'TLP48 Member',image:''},{gen:'Generation 3',name:'TLP Member 05',real:'Real Name',age:'—',kami:'',bio:'TLP48 Member',image:''},{gen:'Generation 4',name:'TLP Member 06',real:'Real Name',age:'—',kami:'',bio:'TLP48 Member',image:''}],
 edn:[{gen:'Generation 1',name:'EDN Member 01',real:'Real Name',age:'—',kami:'',bio:'EDN48 Member',image:''},{gen:'Generation 1',name:'EDN Member 02',real:'Real Name',age:'—',kami:'',bio:'EDN48 Member',image:''},{gen:'Generation 2',name:'EDN Member 03',real:'Real Name',age:'—',kami:'',bio:'EDN48 Member',image:''},{gen:'Generation 2',name:'EDN Member 04',real:'Real Name',age:'—',kami:'',bio:'EDN48 Member',image:''},{gen:'Generation 3',name:'EDN Member 05',real:'Real Name',age:'—',kami:'',bio:'EDN48 Member',image:''},{gen:'Generation 4',name:'EDN Member 06',real:'Real Name',age:'—',kami:'',bio:'EDN48 Member',image:''}],
 songs:{tlp:[{title:'TLP48 1st Single',cost:2,desc:'TLP48 Audio Version'},{title:'Tulips Shine',cost:2,desc:'TLP48 Audio Version'},{title:'Blue Flower',cost:3,desc:'TLP48 Audio Version'}],edn:[{title:'EDN48 1st Single',cost:2,desc:'EDN48 Audio Version'},{title:'Eden Shine',cost:2,desc:'EDN48 Audio Version'},{title:'Purple Star',cost:3,desc:'EDN48 Audio Version'}]}
};
function get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v===null?d:v}catch(e){return d}}
function set(k,v){localStorage.setItem(k,JSON.stringify(v))}
if(!localStorage.getItem('wts_members'))set('wts_members',seed);
if(!localStorage.getItem('wts_songs'))set('wts_songs',seed.songs);
if(localStorage.getItem('wts_token')===null)localStorage.setItem('wts_token','10');
if(localStorage.getItem('wts_stars')===null)localStorage.setItem('wts_stars','100');
if(localStorage.getItem('wts_major')===null)localStorage.setItem('wts_major','5');
const bg=localStorage.getItem('wts_bg'); if(bg) document.documentElement.style.setProperty('--wts-bg',bg); window.WTS={get,set,seed};
})();
