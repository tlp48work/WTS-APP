const songs=[
 ['01','FIRST SHINE','EDN48 / TLP48 Original','2'],
 ['02','FLOWER OF YOU','EDN48 / TLP48 Original','2'],
 ['03','WAY TO SHINE','Special Audio Version','3'],
 ['04','SPARK','Spark of the Month Song','2'],
 ['05','ONE MORE LIGHT','Member Unit Song','3'],
 ['06','SEE YOU AGAIN','Graduation / Special Audio','2']
];
const tokenKey='wts_token';
function tokens(){return Number(localStorage.getItem(tokenKey)||'10')}
function renderSongs(){document.querySelector('#tokenCount').textContent=tokens();document.querySelector('#songList').innerHTML=songs.map((s,i)=>{let open=localStorage.getItem('wts_song_'+i)==='1';return `<article class="song-card ${open?'open':''}"><div class="song-art ${document.body.dataset.group==='EDN48'?'edn':'tlp'}"><span>${s[0]}</span></div><div class="song-main"><span class="song-tag">${s[2]}</span><h3>${s[1]}</h3><p>AUDIO VERSION • ${s[3]} TOKEN</p>${open?`<button class="play-btn" onclick="playSong('${s[1]}')">▶ PLAY AUDIO</button>`:`<button class="unlock-btn" onclick="unlockSong(${i})">🔒 UNLOCK WITH ${s[3]} TOKEN</button>`}</div></article>`}).join('')}
function unlockSong(i){let cost=Number(songs[i][3]),t=tokens();if(t<cost){alert('TOKEN ไม่พอ');return}localStorage.setItem(tokenKey,t-cost);localStorage.setItem('wts_song_'+i,'1');renderSongs()}
function playSong(n){alert('กำลังเล่น AUDIO: '+n+' (ระบบเสียงจริงสามารถเชื่อมไฟล์เพลงภายหลังได้)')}
renderSongs();
