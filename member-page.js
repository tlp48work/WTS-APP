const data={
 TLP48:{theme:'tlp',title:'TLP48 MEMBERS',back:'tlp48.html',zone:'TULIPS ZONE'},
 EDN48:{theme:'edn',title:'EDN48 MEMBERS',back:'edn48.html',zone:'EDEN CLUB'}
};
const group=document.body.dataset.group||'TLP48', cfg=data[group];
const names={1:['Member 01','Member 02','Member 03','Member 04'],2:['Member 05','Member 06','Member 07','Member 08'],3:['Member 09','Member 10','Member 11','Member 12'],4:['Member 13','Member 14','Member 15','Member 16']};
const bannerNames=[...names[1],...names[2]];
let current=0;
function avatarText(n){return n.replace('Member ','M')}
function renderBanner(){const n=bannerNames[current%bannerNames.length];document.querySelector('#memberBannerName').textContent=n;document.querySelector('#memberBannerGen').textContent='GENERATION '+(current<4?1:2);document.querySelector('#memberBanner').className='member-banner '+cfg.theme+' b'+(current%4);current++;}
function render(){const root=document.querySelector('#memberGroups');root.innerHTML=Object.keys(names).map(g=>`<section class="generation"><div class="generation-head"><div><span class="eyebrow">${group}</span><h2>GENERATION ${g}</h2></div><span class="gen-count">${names[g].length} MEMBERS</span></div><div class="member-grid">${names[g].map((n,i)=>`<article class="member-card"><div class="member-avatar ${cfg.theme}">${avatarText(n)}</div><div class="member-info"><b>${n}</b><small>${group} • Generation ${g}</small><div class="member-meta"><span>AGE —</span><span>REAL NAME —</span></div><div class="member-actions"><button onclick="saveOshi('${n}','${group}')">♡ Oshi</button><button onclick="showProfile('${n}','${g}')">PROFILE</button></div></div></article>`).join('')}</div></section>`).join('')}
function showProfile(n,g){document.querySelector('#profileName').textContent=n;document.querySelector('#profileGen').textContent=`${group} • Generation ${g}`;document.querySelector('#profileModal').classList.add('show')}
function closeProfile(){document.querySelector('#profileModal').classList.remove('show')}
function saveOshi(name,grp){let list=JSON.parse(localStorage.getItem('wts_oshi')||'[]');if(!list.some(x=>x.name===name&&x.group===grp)){list.push({name,group:grp});localStorage.setItem('wts_oshi',JSON.stringify(list));alert(name+' ถูกเพิ่มใน Oshi List แล้ว')}else alert('สมาชิกคนนี้อยู่ใน Oshi List แล้ว')}
setInterval(renderBanner,4500); renderBanner(); render();
