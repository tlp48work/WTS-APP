(function(){
  if(!window.supabase || !window.WTS_SUPABASE) return;
  const sb=supabase.createClient(WTS_SUPABASE.url,WTS_SUPABASE.anonKey);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function user(){const {data}=await sb.auth.getUser();return data?.user||null}
  async function profile(){const u=await user();if(!u)return null;const {data}=await sb.from('profiles').select('*').eq('id',u.id).single();return data||null}
  async function session(){const p=await profile();return p?{...p,id:p.id}:null}
  async function signIn(identifier,password){
    let email=identifier.trim();
    if(!email.includes('@')){
      const {data:p,error}=await sb.from('profiles').select('id,username,role').eq('username',email).maybeSingle();
      if(error)throw error;
      if(!p)throw new Error('ไม่พบบัญชีนี้');
      if(p.role!=='member')throw new Error('บัญชีแฟนคลับกรุณาใช้ Email ในการ Login');
      email=`${p.username.toLowerCase()}@member.waytoshine.local`;
    }
    const {error}=await sb.auth.signInWithPassword({email,password});if(error)throw error;
    return session();
  }
  async function signUp({username,email,password,displayName}){
    if(!/^[a-zA-Z0-9._-]{3,32}$/.test(username))throw new Error('Username ใช้ตัวอักษรอังกฤษ ตัวเลข . _ - เท่านั้น');
    const {data,error}=await sb.auth.signUp({email,password,options:{data:{username,display_name:displayName||username,role:'fan',group_name:'FAN'}}});
    if(error)throw error;
    if(!data.session) return {needsEmailConfirm:true};
    return session();
  }
  async function signOut(){await sb.auth.signOut();location.href='index.html'}
  async function wallet(){const u=await user();if(!u)return null;const {data,error}=await sb.from('wallets').select('*').eq('user_id',u.id).single();if(error)throw error;return data}
  async function members(group){let q=sb.from('profiles').select('*').eq('role','member').order('display_name');if(group)q=q.eq('group_name',group);const {data,error}=await q;if(error)throw error;return data||[]}
  async function timeline(group){let q=sb.from('posts').select('id,body,media_url,media_type,star_count,comment_count,created_at,member:profiles!posts_member_id_fkey(id,username,display_name,group_name,avatar_url)').order('created_at',{ascending:false}).limit(50);if(group)q=q.eq('member.group_name',group);const {data,error}=await q;if(error)throw error;return data||[]}
  async function createPost(body,file){const p=await profile();if(!p||p.role!=='member')throw new Error('เฉพาะสมาชิกเท่านั้นที่โพสต์ได้');let media_url=null,media_type=null;if(file){const ext=(file.name.split('.').pop()||'bin').toLowerCase();const path=`${p.id}/${crypto.randomUUID()}.${ext}`;const {error}=await sb.storage.from('post-media').upload(path,file,{upsert:false,contentType:file.type});if(error)throw error;media_url=sb.storage.from('post-media').getPublicUrl(path).data.publicUrl;media_type=file.type.startsWith('video/')?'video':'image';}const {data,error}=await sb.from('posts').insert({member_id:p.id,body,media_url,media_type}).select().single();if(error)throw error;return data}
  async function sendStar(postId,amount){const {data,error}=await sb.rpc('send_star',{p_post:postId,p_amount:Number(amount)});if(error)throw error;return data}
  async function sendMemberStar(memberId,amount){const {data,error}=await sb.rpc('send_member_star',{p_member:memberId,p_amount:Number(amount)});if(error)throw error;return data}
  async function addComment(postId,body){const u=await user();if(!u)throw new Error('กรุณา Login');const {error}=await sb.from('comments').insert({post_id:postId,user_id:u.id,body});if(error)throw error;return true}
  async function comments(postId){const {data,error}=await sb.from('comments').select('id,body,created_at,user:profiles!comments_user_id_fkey(display_name,username,avatar_url)').eq('post_id',postId).order('created_at');if(error)throw error;return data||[]}
  async function updateProfile(fields){const u=await user();if(!u)throw new Error('Login required');const payload={};if(fields.display_name!==undefined)payload.display_name=fields.display_name;if(fields.avatar_url!==undefined)payload.avatar_url=fields.avatar_url;if(fields.cover_url!==undefined)payload.cover_url=fields.cover_url;if(fields.kami_oshi!==undefined)payload.kami_oshi=fields.kami_oshi;const {data,error}=await sb.from('profiles').update(payload).eq('id',u.id).select().single();if(error)throw error;return data}
  async function upload(bucket,file,userPath){const u=await user();if(!u)throw new Error('Login required');const ext=(file.name.split('.').pop()||'bin').toLowerCase();const path=userPath||`${u.id}/${crypto.randomUUID()}.${ext}`;const {error}=await sb.storage.from(bucket).upload(path,file,{upsert:true,contentType:file.type});if(error)throw error;return sb.storage.from(bucket).getPublicUrl(path).data.publicUrl}
  async function oshi(){const u=await user();if(!u)return [];const {data,error}=await sb.from('oshi_list').select('member:profiles!oshi_list_member_id_fkey(id,username,display_name,group_name,avatar_url)').eq('fan_id',u.id);if(error)throw error;return (data||[]).map(x=>x.member)}
  async function setOshi(memberIds,kamiId){const u=await user();if(!u)throw new Error('Login required');await sb.from('oshi_list').delete().eq('fan_id',u.id);if(memberIds?.length){const rows=memberIds.map(id=>({fan_id:u.id,member_id:id}));const {error}=await sb.from('oshi_list').insert(rows);if(error)throw error;}const {error}=await sb.from('profiles').update({kami_oshi:kamiId||null}).eq('id',u.id);if(error)throw error;return true}
  async function packages(){const {data,error}=await sb.from('star_packages').select('*').eq('active',true).order('token_price');if(error)throw error;return data||[]}
  async function buyStarPackage(id){const {data,error}=await sb.rpc('buy_star_package',{p_package:id});if(error)throw error;return data}
  async function merch(){const now=new Date().toISOString();const {data,error}=await sb.from('merchandise').select('*').eq('active',true).or(`start_at.is.null,start_at.lte.${now}`).or(`end_at.is.null,end_at.gte.${now}`).gt('stock',0).order('created_at',{ascending:false});if(error)throw error;return data||[]}
  async function buyMerch(id){const {data,error}=await sb.rpc('buy_merch',{p_merch:id});if(error)throw error;return data}
  async function inventory(){const u=await user();if(!u)return [];const {data,error}=await sb.from('inventory').select('*').eq('user_id',u.id).order('created_at',{ascending:false});if(error)throw error;return data||[]}
  async function events(){const {data,error}=await sb.from('major_events').select('*').order('start_at',{ascending:true});if(error)throw error;return data||[]}
  async function castVote(eventId,candidateId,amount){const {data,error}=await sb.rpc('cast_major_vote',{p_event:eventId,p_candidate:candidateId||null,p_amount:Number(amount)});if(error)throw error;return data}
  async function settings(){const {data,error}=await sb.from('site_settings').select('key,value');if(error)throw error;return Object.fromEntries((data||[]).map(x=>[x.key,x.value]))}
  async function banners(){const {data,error}=await sb.from('banners').select('*').eq('active',true).order('sort_order');if(error)throw error;return data||[]}
  async function sparkScores(){const {data,error}=await sb.from('spark_scores').select('member_id,star_count');if(error)throw error;return Object.fromEntries((data||[]).map(x=>[x.member_id,x.star_count]))}
  async function schedules(group){let q=sb.from('schedules').select('*').order('event_date').order('event_time').limit(5);if(group)q=q.eq('group_name',group);const {data,error}=await q;if(error)throw error;return data||[]}
  async function songs(group){let q=sb.from('songs').select('*').eq('active',true).order('release_date',{ascending:false});if(group)q=q.eq('group_name',group);const {data,error}=await q;if(error)throw error;return data||[]}
  async function unlockSong(id){const {data,error}=await sb.rpc('unlock_song',{p_song:id});if(error)throw error;return data}
  async function isUnlocked(id){const u=await user();if(!u)return false;const {data}=await sb.from('song_unlocks').select('song_id').eq('user_id',u.id).eq('song_id',id).maybeSingle();return !!data}
  async function adminCreateMember(payload){const {data:{session:s}}=await sb.auth.getSession();const r=await fetch('/api/admin/create-member',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${s?.access_token||''}`},body:JSON.stringify(payload)});const d=await r.json();if(!r.ok)throw new Error(d.error||'create_member_failed');return d}
  async function adminDeleteUser(userId){const {data:{session:s}}=await sb.auth.getSession();const r=await fetch('/api/admin/delete-user',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${s?.access_token||''}`},body:JSON.stringify({userId})});const d=await r.json();if(!r.ok)throw new Error(d.error||'delete_user_failed');return d}
  window.WTSCloud={sb,esc,user,profile,session,signIn,signUp,signOut,wallet,members,timeline,createPost,sendStar,sendMemberStar,addComment,comments,updateProfile,upload,oshi,setOshi,packages,buyStarPackage,merch,buyMerch,inventory,events,castVote,settings,sparkScores,banners,schedules,songs,unlockSong,isUnlocked,adminCreateMember,adminDeleteUser};
})();
