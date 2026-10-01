(function(){
 const esc=v=>WTSCloud.esc(v),fmt=n=>Number(n||0).toLocaleString('en-US');
 async function render(){
  const featured=document.getElementById('spark-featured'),list=document.getElementById('spark-full-list'),preview=document.getElementById('spark-preview-members');
  if(!featured&&!list&&!preview)return;
  try{const [members,scores,me]=await Promise.all([WTSCloud.members(),WTSCloud.sparkScores(),WTSCloud.session()]);const rows=members.map(m=>({...m,score:Number(scores[m.id]||0)})).sort((a,b)=>b.score-a.score);
   const top=rows[0];
   if(featured)featured.innerHTML=top?`<div class="spark-feature-card"><div class="spark-big-avatar" ${top.avatar_url?`style="background-image:url('${esc(top.avatar_url)}')"`:''}>${top.avatar_url?'':esc((top.display_name||'N')[0])}</div><div class="spark-big-name">${esc(top.display_name||'NAME')}</div><div class="spark-big-score">⭐ ${fmt(top.score)} STAR</div><button class="primary" onclick="sendSpark('${top.id}')">Send Star</button></div>`:'<div class="spark-feature-card"><div class="spark-big-avatar">?</div><div class="spark-big-name">NAME</div><div class="spark-big-score">0 STAR</div></div>';
   if(preview)preview.innerHTML=rows.slice(0,8).map(m=>`<a class="spark-preview-card" href="account.html?member=${encodeURIComponent(m.username)}"><div class="spark-preview-avatar" ${m.avatar_url?`style="background-image:url('${esc(m.avatar_url)}')"`:''}>${m.avatar_url?'':esc((m.display_name||'N')[0])}</div><b>${esc(m.display_name||'NAME')}</b><small>${fmt(m.score)} STAR</small></a>`).join('');
   if(list)list.innerHTML=rows.length?rows.map((m,i)=>`<article class="spark-row"><div class="spark-rank">${i+1}</div><div class="spark-avatar" ${m.avatar_url?`style="background-image:url('${esc(m.avatar_url)}')"`:''}>${m.avatar_url?'':esc((m.display_name||'N')[0])}</div><div class="spark-row-info"><b>${esc(m.display_name||'NAME')}</b><small>${esc(m.group_name)} · ${fmt(m.score)} STAR</small></div><button class="primary" onclick="sendSpark('${m.id}')">Send Star</button></article>`).join(''):'<div class="timeline-empty">ยังไม่มีสมาชิก</div>';
  }catch(e){if(featured)featured.innerHTML='<div class="timeline-empty">เชื่อมต่อ Spark ไม่สำเร็จ</div>'}
 }
 window.sendSpark=async id=>{try{const me=await WTSCloud.session();if(!me){location.href='login.html?return=spark.html';return}if(me.role!=='fan'){alert('เฉพาะแฟนคลับเท่านั้น');return}const n=prompt('จำนวน STAR ที่ต้องการส่ง','1');if(n===null)return;await WTSCloud.sendMemberStar(id,Number(n));alert('ส่ง STAR สำเร็จ');render()}catch(e){alert(e.message)}};
 document.addEventListener('DOMContentLoaded',render);window.WTSSpark={render};
})();
