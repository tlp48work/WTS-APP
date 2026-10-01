(function(){
 function apply(){
  const logo=localStorage.getItem('wts_logo');
  document.querySelectorAll('.brand').forEach(el=>{if(logo){el.innerHTML=`<img class="site-logo" src="${logo}" alt="WAY TO SHINE">`}});
  const starIcon=localStorage.getItem('wts_star_icon'), tokenIcon=localStorage.getItem('wts_token_icon');
  document.querySelectorAll('[data-currency=star]').forEach(el=>{if(starIcon)el.innerHTML=`<img class="currency-icon" src="${starIcon}" alt="STAR">`});
  document.querySelectorAll('[data-currency=token]').forEach(el=>{if(tokenIcon)el.innerHTML=`<img class="currency-icon" src="${tokenIcon}" alt="TOKEN">`});
  const banners=(()=>{try{return JSON.parse(localStorage.getItem('wts_banners_v1')||'[]')}catch{return[]}})();
  if(banners.length){
   document.querySelectorAll('.hero-slider').forEach((hero)=>{const slides=[...hero.querySelectorAll('.slide')];slides.forEach((s,i)=>{if(banners[i%banners.length]){s.style.backgroundImage=`linear-gradient(135deg,rgba(15,10,30,.3),rgba(15,10,30,.12)),url("${banners[i%banners.length]}")`;s.style.backgroundSize='cover';s.style.backgroundPosition='center'}})});
   document.querySelectorAll('.banner').forEach((b,i)=>{b.style.backgroundImage=`linear-gradient(135deg,rgba(20,15,35,.18),rgba(20,15,35,.05)),url("${banners[i%banners.length]}")`;b.style.backgroundSize='cover';b.style.backgroundPosition='center'});
  }
 }
 document.addEventListener('DOMContentLoaded',apply);
})();
