(function(){
  const KEY='wts_timeline_v1';
  const ACC='wts_member_accounts_v1';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const fmtDate=d=>new Intl.DateTimeFormat('th-TH',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(d));
  function posts(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}}
  function accounts(){try{return JSON.parse(localStorage.getItem(ACC)||'[]')}catch{return []}}
  function current(){const u=localStorage.getItem('wts_member_session'); if(!u)return null; return accounts().find(a=>a.username===u)||null}
  function initials(n){return String(n||'M').trim().slice(0,1).toUpperCase()}
  function media(p){if(!p.media)return ''; const url=esc(p.media); if(/\.(mp4|webm|ogg)(\?|#|$)/i.test(p.media)) return `<video class="timeline-media" controls playsinline src="${url}"></video>`; return `<img class="timeline-media" src="${url}" alt="Post media" loading="lazy" onerror="this.style.display='none'">`}
  function card(p){return `<article class="timeline-post" data-id="${esc(p.id)}">
    <div class="timeline-post-head"><div class="timeline-avatar" style="${p.photo?'background-image:url('+encodeURI(p.photo)+')':''}">${p.photo?'':esc(initials(p.name))}</div><div class="timeline-author"><b>${esc(p.name)}</b><small>${esc(p.group)} · ${fmtDate(p.createdAt)}</small></div><button class="timeline-more" aria-label="More">•••</button></div>
    ${p.text?`<div class="timeline-text">${esc(p.text).replace(/\n/g,'<br>')}</div>`:''}${media(p)}
    <div class="timeline-actions"><span>⭐ <b>${Number(p.stars||0).toLocaleString()}</b> STAR</span><span>♡ <b>${Number(p.comments||0)}</b> Comments</span></div>
    <div class="timeline-buttons"><button class="timeline-action" data-star="${esc(p.id)}">⭐ Send Star</button><button class="timeline-action" data-comment="${esc(p.id)}">💬 Comment</button></div>
  </article>`}
  function render(root){
    const group=root.dataset.group||'ALL';
    let list=posts().filter(p=>group==='ALL'||p.group===group).sort((a,b)=>b.createdAt-a.createdAt);
    root.innerHTML=`<div class="timeline-head"><div><span class="timeline-kicker">WAY TO SHINE</span><h2>Timeline</h2></div><button class="timeline-filter" type="button" title="Refresh">☷</button></div>`+
      `<div class="timeline-login-row">${current()?`<span>เข้าสู่ระบบในชื่อ <b>${esc(current().name)}</b></span><button class="timeline-small" id="memberLogout">Logout</button>`:`<span>สมาชิกสามารถลงโพสต์ได้เมื่อเข้าสู่ระบบ</span><a class="timeline-small" href="member-login.html?return=${encodeURIComponent(location.pathname.split('/').pop()+'#timeline')}">Member Login</a>`}</div>`+
      (current()?`<form class="timeline-composer" id="timelineForm"><div class="timeline-compose-top"><div class="timeline-avatar">${esc(initials(current().name))}</div><textarea id="postText" maxlength="1000" placeholder="${esc(current().name)} กำลังคิดอะไรอยู่?" required></textarea></div><div class="timeline-compose-tools"><input id="postMedia" type="url" placeholder="ลิงก์รูป/วิดีโอ (ถ้ามี)"><button class="timeline-post-btn">POST</button></div></form>`:'')+
      `<div class="timeline-list">${list.length?list.map(card).join(''):`<div class="timeline-empty"><div>✦</div><b>ยังไม่มีโพสต์</b><span>สมาชิกสามารถเป็นคนแรกที่ลงโพสต์ได้</span></div>`}</div>`;
    const form=$('#timelineForm',root); if(form)form.onsubmit=e=>{e.preventDefault();const me=current();if(!me)return;const arr=posts();arr.push({id:'post-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name:me.name,group:me.group,photo:me.photo||'',text:$('#postText',root).value.trim(),media:$('#postMedia',root).value.trim(),createdAt:Date.now(),stars:0,comments:0});localStorage.setItem(KEY,JSON.stringify(arr));render(root)};
    const out=$('#memberLogout',root);if(out)out.onclick=()=>{localStorage.removeItem('wts_member_session');render(root)};
    $$('[data-star]',root).forEach(btn=>btn.onclick=()=>{const arr=posts(),p=arr.find(x=>x.id===btn.dataset.star);if(!p)return;p.stars=Number(p.stars||0)+1;localStorage.setItem(KEY,JSON.stringify(arr));render(root)});
    $$('[data-comment]',root).forEach(btn=>btn.onclick=()=>{const arr=posts(),p=arr.find(x=>x.id===btn.dataset.comment);if(!p)return;const c=prompt('เขียนความคิดเห็น');if(c===null)return;p.comments=Number(p.comments||0)+1;localStorage.setItem(KEY,JSON.stringify(arr));render(root)});
  }
  function boot(){ $$('.timeline').forEach(render); }
  document.addEventListener('DOMContentLoaded',boot);
  window.WTSTimeline={render,posts};
})();
