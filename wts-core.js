(function(){
  const KEYS={members:'wts_member_accounts_v1',fans:'wts_fan_accounts_v1',sessionType:'wts_session_type',sessionUser:'wts_session_user'};
  window.WTS={
    get(k,d){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch{return d}},
    set(k,v){localStorage.setItem(k,JSON.stringify(v))},
    esc(v){return String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c]))},
    session(){const t=localStorage.getItem('wts_session_type'),u=localStorage.getItem('wts_session_user');if(!u)return null;const key=t==='member'?'wts_member_accounts_v1':'wts_fan_accounts_v1';return this.get(key,[]).find(x=>x.username===u)||null},
    type(){return localStorage.getItem('wts_session_type')||''},
    logout(){['wts_session_type','wts_session_user','wts_logged','wts_username'].forEach(k=>localStorage.removeItem(k));location.href='login.html'},
    fmt(n){return Number(n||0).toLocaleString('en-US')},
    fileToData(file,cb){if(!file)return cb('');const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(file)},
    initBalances(){if(localStorage.getItem('wts_token')===null)localStorage.setItem('wts_token','10');if(localStorage.getItem('wts_star')===null)localStorage.setItem('wts_star','100')}
  };
})();
