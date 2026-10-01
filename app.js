(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body=document.body;
  body.classList.add('wts-ready');
  if(!reduce) requestAnimationFrame(()=>body.classList.add('wts-enter'));

  // page transition: tap -> soft flash -> next page
  document.querySelectorAll('a[href]').forEach(a=>{
    const href=a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return;
    a.addEventListener('click',function(e){
      if(e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const url=new URL(href,location.href);
      if(url.origin!==location.origin) return;
      e.preventDefault();
      if(reduce){location.href=href;return;}
      document.body.classList.add('wts-leave');
      const veil=document.createElement('div'); veil.className='wts-transition';
      veil.innerHTML='<span>✦</span><small>WAY TO SHINE</small>';
      document.body.appendChild(veil);
      setTimeout(()=>location.href=href,260);
    });
  });

  // tactile ripple for buttons/cards/menu items
  document.querySelectorAll('a,.btn,button,.card,.club-card,.event').forEach(el=>{
    el.addEventListener('pointerdown',function(e){
      if(reduce) return;
      const r=el.getBoundingClientRect();
      const dot=document.createElement('i'); dot.className='wts-ripple';
      dot.style.left=(e.clientX-r.left)+'px'; dot.style.top=(e.clientY-r.top)+'px';
      el.appendChild(dot); setTimeout(()=>dot.remove(),500);
    });
  });

  // gentle reveal as sections enter viewport
  if(!reduce && 'IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('wts-show');io.unobserve(e.target)}}),{threshold:.08});
    document.querySelectorAll('.section,.card,.club-card,.banner,.spark,.event,.menu-extra a,.quick a').forEach((el,i)=>{el.classList.add('wts-reveal');el.style.setProperty('--wts-delay',Math.min(i*35,280)+'ms');io.observe(el)});
  }

  // nicer refresh button feedback
  document.querySelectorAll('.refresh').forEach(b=>b.addEventListener('click',()=>{b.classList.add('wts-spin');setTimeout(()=>b.classList.remove('wts-spin'),500)}));
})();
