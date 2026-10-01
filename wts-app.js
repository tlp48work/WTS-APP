(function(){
  const DB='wts_db_v3';
  const defaults={settings:{appName:'WAY TO SHINE',logo:'',starLogo:'',tokenLogo:'',banners:[]},members:[],songs:[],events:[],merch:[],schedule:[],posts:[],fans:[],spark:{votes:{},members:[]}};
  function load(){try{return Object.assign({},defaults,JSON.parse(localStorage.getItem(DB)||'{}'))}catch(e){return JSON.parse(JSON.stringify(defaults))}}
  function save(d){localStorage.setItem(DB,JSON.stringify(d));}
  function uid(p='id'){return p+'_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,7)}
  function user(){try{return JSON.parse(localStorage.getItem('wts_session')||'null')}catch(e){return null}}
  function setUser(u){localStorage.setItem('wts_session',JSON.stringify(u)); if(u){localStorage.setItem('wts_logged','1');localStorage.setItem('wts_role',u.role||'fan');}else{localStorage.removeItem('wts_logged');localStorage.removeItem('wts_role')}}
  function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function fmt(n){return Number(n||0).toLocaleString('en-US')}
  function fileData(file,cb){if(!file)return cb('');const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(file)}
  window.WTS={load,save,uid,user,setUser,esc,fmt,fileData,DB};

  function injectSettings(){const d=load(); document.querySelectorAll('[data-wts-brand]').forEach(el=>el.textContent=d.settings.appName||'WAY TO SHINE'); if(d.settings.logo){document.querySelectorAll('[data-wts-logo]').forEach(el=>{el.src=d.settings.logo;el.style.display='block'});} if(d.settings.banners?.length){document.querySelectorAll('[data-wts-banner]').forEach((el,i)=>{el.style.backgroundImage=`url("${d.settings.banners[i%d.settings.banners.length]}")`;el.classList.add('has-image')})}}
  function postCard(p){
    const d=load(); const m=d.members.find(x=>x.id===p.memberId); const name=p.name||m?.name||'NAME'; const group=p.group||m?.group||'';
    const avatar=p.avatar||m?.avatar||''; const media=p.media||'';
    return `<article class="timeline-post" data-post="${p.id}"><div class="post-head"><div class="post-avatar">${avatar?`<img src="${avatar}" alt="">`:'<span>●</span>'}</div><div class="post-meta"><b>${esc(name)}</b><small>${esc(group)} · ${new Date(p.createdAt).toLocaleString('th-TH',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</small></div><button class="post-more" onclick="WTS.toggleMore('${p.id}')">•••</button></div><div class="post-text">${esc(p.text||'').replace(/\n/g,'<br>')}</div>${media?`<div class="post-media"><img src="${media}" alt="Post media"></div>`:''}<div class="post-stats"><span>⭐ ${fmt(p.stars||0)} STAR</span><span>💬 ${fmt((p.comments||[]).length)} Comments</span></div><div class="post-actions"><button onclick="WTS.sendPostStar('${p.id}')">⭐ Send Star</button><button onclick="WTS.commentPost('${p.id}')">💬 Comment</button></div></article>`;
  }
  function renderTimeline(group,root){const d=load(); let posts=d.posts.filter(p=>!group||p.group===group).sort((a,b)=>b.createdAt-a.createdAt); if(!posts.length){root.innerHTML='<div class="timeline-empty"><div>✦</div><b>Timeline</b><span>ยังไม่มีโพสต์จากสมาชิก</span></div>';return} root.innerHTML=posts.map(postCard).join('');}
  window.WTS.renderTimeline=renderTimeline; window.WTS._postCard=postCard;
  window.WTS.toggleMore=function(id){const d=load();const p=d.posts.find(x=>x.id===id);if(!p)return;const u=user(); if(u?.role==='member'&&u.memberId===p.memberId){if(confirm('ลบโพสต์นี้หรือไม่?')){d.posts=d.posts.filter(x=>x.id!==id);save(d);location.reload();}}};
  window.WTS.sendPostStar=function(id){const u=user();if(!u){location.href='login.html?return='+encodeURIComponent(location.pathname.split('/').pop());return} const d=load(); const p=d.posts.find(x=>x.id===id);if(!p)return;let amount=prompt('จำนวน STAR ที่ต้องการส่ง', '1');amount=Math.floor(Number(amount));const fan=d.fans.find(x=>x.id===u.id);if(!fan||amount<1||fan.star<amount)return alert('STAR ไม่เพียงพอ');fan.star-=amount;p.stars=(p.stars||0)+amount;save(d);alert('ส่ง STAR แล้ว ✨');location.reload();};
  window.WTS.commentPost=function(id){const u=user();if(!u){location.href='login.html?return='+encodeURIComponent(location.pathname.split('/').pop());return} const text=prompt('เขียนความคิดเห็น');if(!text)return;const d=load();const p=d.posts.find(x=>x.id===id);if(p){p.comments=p.comments||[];p.comments.push({id:uid('c'),name:u.name,text,createdAt:Date.now()});save(d);location.reload()}};
  function setupComposer(){const form=document.querySelector('[data-post-form]');if(!form)return;const u=user();const d=load();if(!u||u.role!=='member'){form.style.display='none';return}const m=d.members.find(x=>x.id===u.memberId);form.style.display='block';form.querySelector('[data-post-name]').textContent=m?.name||u.name;form.addEventListener('submit',e=>{e.preventDefault();const text=form.querySelector('textarea').value.trim();const file=form.querySelector('input[type=file]').files[0];if(!text&&!file)return;fileData(file,data=>{const dd=load();dd.posts.push({id:uid('post'),memberId:u.memberId,name:m?.name||u.name,group:m?.group||u.group,avatar:m?.avatar||'',text,media:data,stars:0,comments:[],createdAt:Date.now()});save(dd);location.reload()})});}
  function boot(){injectSettings();setupComposer();const root=document.querySelector('[data-timeline]');if(root)renderTimeline(root.dataset.timeline||'',root)}
  document.addEventListener('DOMContentLoaded',boot);
})();
