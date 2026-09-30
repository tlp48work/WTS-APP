
function slider(){let s=[...document.querySelectorAll('.slide')],d=[...document.querySelectorAll('.dot')];if(!s.length)return;let i=0;function go(n){i=n;s.forEach((x,k)=>x.classList.toggle('on',k==i));d.forEach((x,k)=>x.classList.toggle('on',k==i))}go(0);d.forEach((x,k)=>x.onclick=()=>go(k));setInterval(()=>go((i+1)%s.length),5000)}
function user(){return JSON.parse(localStorage.getItem('wts_user')||'null')}function save(u){localStorage.setItem('wts_user',JSON.stringify(u))}
document.addEventListener('DOMContentLoaded',slider);
