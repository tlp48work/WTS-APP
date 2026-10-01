(function(){
  window.WTS={
    get(k,d){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch{return d}},
    set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){alert('พื้นที่จัดเก็บในเบราว์เซอร์ไม่พอ กรุณาใช้รูป/ไฟล์ขนาดเล็กลง');return false}},
    esc(v){return String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[c]))},
    session(){const t=localStorage.getItem('wts_session_type'),u=localStorage.getItem('wts_session_user');if(!u)return null;const key=t==='member'?'wts_member_accounts_v1':'wts_fan_accounts_v1';return this.get(key,[]).find(x=>x.username===u)||null},
    type(){return localStorage.getItem('wts_session_type')||''},
    logout(){['wts_session_type','wts_session_user','wts_logged','wts_username'].forEach(k=>localStorage.removeItem(k));location.href='index.html'},
    fmt(n){return Number(n||0).toLocaleString('en-US')},
    fileToData(file,cb){if(!file)return cb('');const r=new FileReader();r.onload=()=>cb(r.result);r.onerror=()=>cb('');r.readAsDataURL(file)},
    wallet(username){const all=this.get('wts_wallets_v1',{});if(!all[username]){all[username]={star:100,token:10,majorToken:0,inventory:[]};this.set('wts_wallets_v1',all)}return all[username]},
    saveWallet(username,w){const all=this.get('wts_wallets_v1',{});all[username]=w;this.set('wts_wallets_v1',all)},
    initFan(a){const w=this.wallet(a.username);if(w.star==null)w.star=100;if(w.token==null)w.token=10;this.saveWallet(a.username,w)},
    imageInput(id,cb){const el=document.getElementById(id);this.fileToData(el?.files?.[0],cb)},
    now(){return Date.now()}
  };
})();
