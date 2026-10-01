(function(){
 async function apply(){
  try{
   if(!window.WTSCloud)return;
   const [s,bs]=await Promise.all([WTSCloud.settings(),WTSCloud.banners()]);
   const brand=s.brand||{};
   if(brand.logo_url){document.querySelectorAll('.brand').forEach(el=>el.innerHTML=`<img class="site-logo" src="${brand.logo_url}" alt="WAY TO SHINE">`);let f=document.querySelector('link[rel="icon"]');if(!f){f=document.createElement('link');f.rel='icon';document.head.appendChild(f)}f.href=brand.logo_url}
   if(brand.star_icon_url)document.querySelectorAll('[data-currency=star]').forEach(el=>el.innerHTML=`<img class="currency-icon" src="${brand.star_icon_url}" alt="STAR">`);
   if(brand.token_icon_url)document.querySelectorAll('[data-currency=token]').forEach(el=>el.innerHTML=`<img class="currency-icon" src="${brand.token_icon_url}" alt="TOKEN">`);
   if(bs.length){document.querySelectorAll('.hero-slider').forEach(hero=>[...hero.querySelectorAll('.slide')].forEach((slide,i)=>{const b=bs[i%bs.length];slide.style.backgroundImage=`linear-gradient(135deg,rgba(15,10,30,.35),rgba(15,10,30,.12)),url("${b.image_url}")`;slide.style.backgroundSize='cover';slide.style.backgroundPosition='center'}));document.querySelectorAll('.banner').forEach((b,i)=>{const x=bs[i%bs.length];b.style.backgroundImage=`linear-gradient(135deg,rgba(20,15,35,.18),rgba(20,15,35,.05)),url("${x.image_url}")`;b.style.backgroundSize='cover';b.style.backgroundPosition='center'});}
  }catch(e){console.warn('WTS brand cloud load:',e.message)}
 }
 document.addEventListener('DOMContentLoaded',apply);
})();
