NUMO CUSTOMER WEBSITE - DIRECT ADMIN NEOSTYLE V1

Tujuan:
- Website customer baru dengan design style seperti neotestweb.
- Guna logo dan gambar produk yang Madden bagi.
- Guna sistem sedia ada untuk stock, promo price dan hot selling.
- Customer TIDAK direct reseller / round robin.
- Customer terus PM admin Telegram: @ownernumoventures.

FILE WEBSITE:
1. index.html
2. index2.html
3. app2.js
4. app.js
5. numologo.png
6. netflix.jpg
7. youtube.jpg
8. disney.jpg
9. sooka.jpg
10. viu.jpg
11. iqiyi.jpg
12. spotify.jpg

FILE APPS SCRIPT PATCH:
- AppsScript_Website_Control_V10_DIRECT_ADMIN_LEAD.gs

CARA DEPLOY WEBSITE BARU:
1. Buat folder/domain/subdomain baru untuk website direct admin.
2. Upload semua file website di atas ke folder/domain tersebut.
3. Pastikan semua file berada dalam folder yang sama.
4. Buka website dan test:
   - Pakej keluar
   - Promo sync
   - Hot Selling keluar kalau ada aktif dalam HOT_SELLING_CONTROL
   - Button Order Sekarang buka modal PM Admin
   - Button Copy Mesej berfungsi
   - Button Buka Telegram pergi ke admin

CARA AKTIFKAN LEAD LOG DIRECT ADMIN:
1. Buka Apps Script untuk Website Control API sedia ada.
2. Backup code lama dahulu.
3. Replace code lama dengan AppsScript_Website_Control_V10_DIRECT_ADMIN_LEAD.gs.
4. Deploy semula Apps Script.
5. Kalau guna deployment sedia ada, URL /exec boleh kekal sama.
6. Jika URL /exec berubah, update API_URL dalam app2.js.

NOTA PENTING:
- Website tetap boleh buka Telegram walaupun Apps Script V10 belum deploy.
- Tapi kalau V10 belum deploy, lead direct admin tidak akan masuk sheet LEADS.
- Selepas V10 deploy, setiap order dari website ini akan masuk LEADS dengan Status = DIRECT_ADMIN dan Reseller Code = ADMIN.
- Website ini tidak panggil assignReseller, jadi tidak kacau round robin reseller dan tidak tambah lead count reseller.

SETTING YANG BOLEH EDIT:
- app2.js:
  ADMIN_TELEGRAM_USERNAME
  API_URL
  Text hero/FAQ/bundle/trust card
UPDATE V2 - AUTO TELEGRAM MESSAGE
- Customer tak perlu copy mesej lagi.
- Bila customer tekan Order Sekarang, website akan create direct admin lead dan terus buka Telegram admin.
- Mesej order siap-siap masuk dalam text field Telegram. Customer hanya perlu tekan send.
- Admin panel yang sama masih control stock, promo price dan Hot Selling untuk website ini.
