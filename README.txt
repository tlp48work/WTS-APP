WAY TO SHINE • PUBLIC STATIC BUILD

โครงสร้างเดิมของ WAY TO SHINE Animated ถูกคงไว้ และเพิ่มระบบ Social Account / Timeline / Shop / STAR / Major Vote / Schedule / Admin

LOGIN เดียว:
- Fan account สมัครเองผ่าน register.html
- Member account สร้างโดย Admin แล้วใช้ login.html เดียวกับแฟนคลับ
- Login สำเร็จจะเข้า account.html โดยอัตโนมัติ

MEMBER ACCOUNT:
- ไม่มี Kami-Oshi / Oshi / จำนวนสะสมบนหน้า Member Account
- เปลี่ยนรูปโปรไฟล์และ Cover ได้
- ลงโพสต์ใน Timeline พร้อมรูป/วิดีโอได้
- โพสต์ย้อนหลังแสดงในหน้า Account

FAN ACCOUNT:
- Kami-Oshi ต่อท้ายชื่อ
- Oshi List
- STAR / TOKEN / Inventory
- เปลี่ยนรูปโปรไฟล์และ Cover ได้
- ซื้อ STAR ด้วย TOKEN
- ซื้อ Merchandise ด้วย TOKEN และสุ่ม Item เข้า Inventory

ADMIN:
รหัสเริ่มต้น: WTS-ADMIN-2026
- เปลี่ยน Logo
- เปลี่ยนไอคอน STAR / TOKEN
- เพิ่ม Banner สูงสุด 10 รูป
- สร้าง Member Account
- แก้ชื่อ/รหัส Member และลบได้
- เพิ่มเพลง + ปก + ไฟล์เสียงผ่านตัวเลือกไฟล์ของเครื่อง/Drive
- สร้าง Major Vote + เวลาเริ่ม/จบ + Pause/Resume/End
- เพิ่ม Merchandise + รูป + ราคา TOKEN + Reward TOKEN + Stock + ช่วงเวลาขาย + ตัวเลือกสุ่ม
- เพิ่ม/แก้ไข/ลบ Schedule สูงสุด 5 งานรวม
- ลบ Timeline Post

สำคัญสำหรับ Public:
ชุดนี้เป็น Static Frontend จึงเก็บข้อมูลใน browser/localStorage ของอุปกรณ์นั้น ๆ การเปิดเว็บ Public ไม่ได้ทำให้ข้อมูล Admin/Timeline/คะแนนแชร์ข้ามเครื่องโดยอัตโนมัติ
หากต้องการ Social Network / Voting / Account แบบ production ที่ข้อมูลทุกคนใช้ร่วมกัน ต้องเชื่อม Backend/Database/Authentication เช่น Supabase/Firebase และควรย้ายไฟล์สื่อไป Storage
