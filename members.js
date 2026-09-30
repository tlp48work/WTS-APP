const memberGroups={
  TLP48:{theme:'tlp',prefix:'tlp',gens:[1,2,3,4]},
  EDN48:{theme:'edn',prefix:'edn',gens:[1,2,3,4]}
};
function saveOshi(name,group){let list=JSON.parse(localStorage.getItem('wts_oshi')||'[]');if(!list.some(x=>x.name===name&&x.group===group)){list.push({name,group});localStorage.setItem('wts_oshi',JSON.stringify(list));alert(name+' ถูกเพิ่มใน Oshi List แล้ว');}else alert('สมาชิกคนนี้อยู่ใน Oshi List แล้ว');}
