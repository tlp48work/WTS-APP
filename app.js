/* WAY TO SHINE • shared client system
   Static/Public-ready frontend. For multi-device persistence, connect the same data model to a backend later. */
const WTS={
  accounts:'wts_accounts_v2', posts:'wts_timeline_v2', settings:'wts_settings_v2',
  events:'wts_events_v2', merch:'wts_merch_v2', schedule:'wts_schedule_v2',
  votes:'wts_major_votes_v2', spark:'wts_spark_v2'
};
const $=id=>document.getElementById(id);
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
function current(){const u=localStorage.getItem('wts_current_user');return u?read(WTS.accounts,{users:[]}).users.find(x=>x.username===u)||null:null}
function settings(){return read(WTS.settings,{appName:'WAY TO SHINE',logo:'',starLogo:'⭐',tokenLogo:'🪙',banners:[]})}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function fmt(n){return Number(n||0).toLocaleString('en-US')}
function requireLogin(){if(!current()){location.href='login.html?return='+encodeURIComponent(location.pathname+location.search);return false}return true}
function logout(){localStorage.removeItem('wts_current_user');location.href='index.html'}
function login(username,password){const d=read(WTS.accounts,{users:[]});const u=d.users.find(x=>x.username===username&&x.password===password);if(!u)return false;localStorage.setItem('wts_current_user',u.username);return true}
function saveUser(user){const d=read(WTS.accounts,{users:[]});const i=d.users.findIndex(x=>x.username===user.username);if(i>=0)d.users[i]=user;else d.users.push(user);save(WTS.accounts,d)}
function defaultUser(fields){return Object.assign({id:uid(),role:'fan',group:'',name:'NAME',username:'',password:'',avatar:'',cover:'',stars:0,token:0,major:0,oshiList:[],kamiOshi:'',inventory:[]},fields)}
function applyBrand(){const s=settings();document.querySelectorAll('[data-app-name]').forEach(x=>x.textContent=s.appName||'WAY TO SHINE');document.querySelectorAll('[data-logo]').forEach(x=>x.innerHTML=s.logo?`<img src="${s.logo}" alt="">`:'✦');document.querySelectorAll('[data-star-logo]').forEach(x=>x.innerHTML=s.starLogo||'⭐');document.querySelectorAll('[data-token-logo]').forEach(x=>x.innerHTML=s.tokenLogo||'🪙');if(s.banners?.length){document.querySelectorAll('[data-admin-banner]').forEach((x,i)=>{x.style.backgroundImage=`url(${s.banners[i%s.banners.length]})`;x.classList.add('has-image')})}}
function addPost(text,image='',video='',group=''){const u=current();if(!u||u.role!=='member')return false;const p=read(WTS.posts,[]);p.unshift({id:uid(),author:u.username,name:u.name,group:u.group||group,avatar:u.avatar||'',text,image,video,stars:0,comments:0,createdAt:new Date().toISOString()});save(WTS.posts,p);return true}
function postsFor(group){return read(WTS.posts,[]).filter(p=>!group||p.group===group)}
function sendStarToMember(username,amount){const fan=current();if(!fan||fan.role!=='fan')return {ok:false,msg:'เฉพาะแฟนคลับเท่านั้น'};amount=Number(amount);if(!Number.isFinite(amount)||amount<1)return {ok:false,msg:'จำนวน STAR ไม่ถูกต้อง'};if(fan.stars<amount)return {ok:false,msg:'STAR ไม่พอ'};const d=read(WTS.accounts,{users:[]});const member=d.users.find(x=>x.username===username&&x.role==='member');if(!member)return {ok:false,msg:'ไม่พบสมาชิก'};fan.stars-=amount;member.stars=Number(member.stars||0)+amount;d.users=d.users.map(x=>x.username===fan.username?fan:x.username===member.username?member:x);save(WTS.accounts,d);return {ok:true}}
function buyStar(amount){const u=current();amount=Number(amount);const cost=amount; if(!u||u.role!=='fan')return {ok:false,msg:'เฉพาะแฟนคลับ'};if(u.token<cost)return {ok:false,msg:'TOKEN ไม่พอ'};u.token-=cost;u.stars+=amount;saveUser(u);return {ok:true}}
function applyAccountState(){const u=current();document.querySelectorAll('[data-user-name]').forEach(x=>x.textContent=u?.name||'GUEST');document.querySelectorAll('[data-user-avatar]').forEach(x=>{x.innerHTML=u?.avatar?`<img src="${u.avatar}" alt="">`:'○'});document.querySelectorAll('[data-user-stars]').forEach(x=>x.textContent=fmt(u?.stars));document.querySelectorAll('[data-user-token]').forEach(x=>x.textContent=fmt(u?.token));}
function memberNameWithBadge(m){return `${escapeHtml(m.name)}${m.kamiOshi==='__SELF__'?' <span class="kami-badge">KAMI-OSHI</span>':''}`}
window.WTS={read,save,uid,current,settings,escapeHtml,fmt,requireLogin,logout,login,saveUser,defaultUser,applyBrand,addPost,postsFor,sendStarToMember,buyStar,applyAccountState,memberNameWithBadge};
document.addEventListener('DOMContentLoaded',()=>{applyBrand();applyAccountState()});
