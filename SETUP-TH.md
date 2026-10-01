# WAY TO SHINE — เปิด Public แบบใช้งานจริง

## 1) Supabase
สร้าง Project ใหม่ แล้วไปที่ SQL Editor → วางไฟล์ `supabase/schema.sql` ทั้งไฟล์ → Run

## 2) Authentication
Supabase → Authentication → Providers → Email เปิด Email/Password
สำหรับทดสอบเร็ว ๆ ปิด Confirm email ได้ก่อน

## 3) ตั้งค่าเว็บ
เปิด `supabase-config.js` แล้วแทนที่
- `https://YOUR-PROJECT.supabase.co`
- `YOUR_SUPABASE_ANON_PUBLIC_KEY`

## 4) สร้าง Admin คนแรก
สมัครผ่าน `register.html` หนึ่งบัญชี แล้วใน Supabase SQL Editor รัน:

```sql
update public.profiles
set role='admin'
where username='ชื่อผู้ใช้ของคุณ';
```

จากนั้น Login บัญชีนี้แล้วเปิด `admin.html`

## 5) Vercel Environment Variables
ใส่ 3 ตัวนี้ใน Project Settings → Environment Variables:

`SUPABASE_URL`
`SUPABASE_ANON_KEY`
`SUPABASE_SERVICE_ROLE_KEY`

Service Role Key ใช้เฉพาะ Vercel Server/API เท่านั้น ห้ามใส่ใน `supabase-config.js`

## 6) Deploy
อัปโหลดทุกไฟล์ใน ZIP ขึ้น GitHub repo เดิม แล้ว Deploy จาก branch `main`

หลังตั้งค่าแล้วข้อมูลจะเป็น Cloud Database ไม่ใช่ localStorage:
- Login / Account
- Member Timeline
- STAR
- TOKEN
- Oshi / Kami-Oshi
- Inventory
- Shop / Merchandise
- Major Vote
- Music unlock
- Admin
- Banner / Logo / Currency
- Member profile / cover
- Schedule

## หมายเหตุ
ระบบไฟล์ใช้ Supabase Storage และเลือกไฟล์จากโทรศัพท์ได้ตามปกติ โดยตัวเลือกไฟล์ของ Android สามารถเปิด Drive ได้หากเครื่องมี Google Drive/ตัวจัดการไฟล์รองรับ
