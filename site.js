
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".hero-slider").forEach(slider=>{
    const slides=[...slider.querySelectorAll(".hero-slide")];
    if(!slides.length)return;
    let i=0;
    slides.forEach((s,n)=>s.classList.toggle("active",n===0));
    setInterval(()=>{slides[i].classList.remove("active");i=(i+1)%slides.length;slides[i].classList.add("active")},5000);
  });
  document.querySelectorAll("[data-scroll]").forEach(b=>b.addEventListener("click",()=>{
    document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"})
  }));
});
