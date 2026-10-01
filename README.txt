WAY TO SHINE • PUBLIC BUILD

โครงสร้างเดิมของ WAY TO SHINE Animated ถูกคงไว้ และเพิ่ม Social Timeline, Member Account, Fan Account, Admin CMS, Spark, Shop, Merchandise, Star Shop, Major Vote, Music file picker และ Schedule

ADMIN CODE: WTS-ADMIN-2026

สมาชิก: Admin สร้าง username/password ให้จาก ADMIN > MEMBERS
แฟนคลับ: สมัครเองที่ REGISTER

หมายเหตุระบบข้อมูล:
รุ่นนี้ทำงานได้ทันทีบน Vercel ในโหมด browser storage (localStorage) สำหรับการทดลอง/ต้นแบบ public UI ข้อมูลของแต่ละอุปกรณ์ยังไม่แชร์ข้ามเครื่อง
หากจะใช้เป็นระบบสาธารณะจริงที่ผู้ใช้ทุกคนเห็นข้อมูลเดียวกัน ต้องต่อฐานข้อมูล + authentication + file storage (เช่น Supabase/Firebase) ก่อนเปิดระบบโหวต/เงิน/บัญชีจริง
ไฟล์เลือกเพลง/รูปใช้ file picker ของเครื่อง ซึ่งบน Android สามารถเลือกไฟล์จาก Google Drive ได้ถ้า Drive แสดงเป็นแหล่งไฟล์ของเครื่อง
