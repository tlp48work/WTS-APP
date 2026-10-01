(function(){
  const members = Array.from({length:12},(_,i)=>({id:'member-'+(i+1),name:'NAME',group:i%2?'TLP48':'EDN48'}));
  const votes = JSON.parse(localStorage.getItem('wts_spark_votes_v1')||'{}');
  const isLogged = localStorage.getItem('wts_logged')==='1';
  const userStars = Number(localStorage.getItem('wts_star')||0);
  const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function fmt(n){return Number(n||0).toLocaleString('en-US')}
  function rank(){return [...members].sort((a,b)=>(votes[b.id]||0)-(votes[a.id]||0));}
  function sendStar(id){
    if(!isLogged){
      const back=location.pathname.split('/').pop()||'spark.html';
      location.href='login.html?return='+encodeURIComponent(back); return;
    }
    const available=Number(localStorage.getItem('wts_star')||0);
    if(available<1){alert('STAR ของคุณไม่พอ');return;}
    let amount=prompt('ใส่จำนวน STAR ที่ต้องการส่ง\nSTAR คงเหลือ: '+fmt(available),'1');
    if(amount===null)return;
    amount=Math.floor(Number(amount));
    if(!Number.isFinite(amount)||amount<1||amount>available){alert('จำนวน STAR ไม่ถูกต้อง');return;}
    votes[id]=(votes[id]||0)+amount;
    localStorage.setItem('wts_spark_votes_v1',JSON.stringify(votes));
    localStorage.setItem('wts_star',available-amount);
    render();
  }
  function card(m,compact=false){
    const score=votes[m.id]||0;
    return `<article class="spark-member ${compact?'compact':''}">
      <div class="spark-avatar">?</div>
      <div class="spark-member-info"><b>NAME</b><small>${m.group}</small><span>⭐ ${fmt(score)} STAR</span></div>
      <button class="send-star" data-id="${m.id}">Send Star</button>
    </article>`;
  }
  function render(){
    const full=$('#spark-full-list'); if(full) full.innerHTML=rank().map((m,i)=>`<div class="spark-row"><div class="rank-no">${i+1}</div><div class="spark-avatar small">?</div><div class="spark-row-info"><b>NAME</b><small>${m.group}</small><span>⭐ ${fmt(votes[m.id]||0)} STAR</span></div><button class="send-star" data-id="${m.id}">Send Star</button></div>`).join('');
    const preview=$('#spark-preview-members'); if(preview) preview.innerHTML=members.slice(0,7).map(m=>card(m,true)).join('');
    const featured=$('#spark-featured'); if(featured){const top=rank()[0];featured.innerHTML=`<div class="featured-avatar">?</div><div class="featured-name">NAME</div><div class="featured-group">${top.group}</div><div class="featured-score">⭐ ${fmt(votes[top.id]||0)} STAR</div><button class="send-star featured-btn" data-id="${top.id}">Send Star</button>`;}
    $$('.send-star').forEach(b=>b.onclick=()=>sendStar(b.dataset.id));
    const balance=$('#spark-star-balance'); if(balance) balance.textContent=fmt(localStorage.getItem('wts_star')||0);
  }
  document.addEventListener('DOMContentLoaded',render);
  window.WTSSpark={render,sendStar};
})();
