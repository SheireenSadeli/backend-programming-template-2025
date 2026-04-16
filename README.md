# Quiz Back-End Programming 1
# Gacha System

Daftar endpoint yang tersedia dalam sistem Gacha beserta parameter yang diperlukan:

## 1. Endpoint untuk Registrasi User Baru
-> mendaftarkan user ke sistem agar mendapatkan userId
1. Endpoint: POST /api/users
2. URL: localhost:5000/api/users
4. Parameter: email, full_name, password, confirm_password
3. Input: Request Body (dibagian raw)
```json
{
  "email": "string (email)",
  "full_name": "string (nama lengkap)",
  "password": "string (minimal 8 karakter)",
  "confirm_password": "string (harus sama dengan password)"
}
```
## 2. Endpoint untuk Menambahkan Daftar Reward
-> menambahkan stok hadiah baru ke sistem
1. Endpoint: POST /api/gacha/admin/prizes
2. URL: localhost:5000/api/gacha/admin/prizes
3. Parameter: name, quota
4. Input: Request Body (dibagian raw)
```json
{
  "name": "string (nama hadiah)",
  "quota": "number (jumlah stok)"
}
```

## 3. Endpoint untuk Memutar Gacha
-> melakukan undian untuk mendapatkan hadiah berdasarkan winchance nya
1. Endpoint: POST /api/gacha
2. URL: localhost:5000/api/gacha
3. Parameter: userId, userName
4. Input: Request Body (dibagian raw)
```json
{
  "userId": "string (id user)",
  "userName": "string (nama user)"
}
```
## 4. Endpoint untuk Melihat History Gacha User
-> dapat diakses user untuk mengetahui histori gacha yang sudah dilakukan beserta informasi
   hadiah yang dimenangkannya
1. Endpoint: GET /api/gacha/history/:userId
2. URL: localhost:5000/api/gacha/history/:userId
3. Parameter: userId (dimasukkan kedalam url)

## 5. Endpoint untuk Menampilkan Daftar Hadiah
-> melihat daftar hadiah dan kuota pemenang yang tersisa untuk setiap hadiah tersebut
1. Endpoint: GET /api/gacha/prizes
2. URL: localhost:5000/api/gacha/prizes
3. Parameter/Input: tidak ada

## 6. Endpoint untuk Menampilkan Daftar Pemenang
-> melihat daftar user yang berhasil memenangkan setiap hadiah dengan nama yang disamarkan
   secara acak
1. Endpoint: GET /api/gacha/winners
2. URL: localhost:5000/api/gacha/winners
3. Parameter/Input: tidak ada


# Penjelasan singkat sistem gacha
1. User registrasi untuk mendapatkan userId
2. User melakukan gacha dengan menggunakan userId yang sudah didapat 
   (hanya bisa 5x per hari)
   -> Sistem menggunakan Timestamp pada field createdAt untuk menghitung jumlah log gacha
      setiap user per hari, sehingga batasan maksimal 5 kali gacha bisa terhitung secara akurat dan otomatis reset setiap berganti hari
3. User bisa melihat history gacha nya dengan menggunakan endpoint:
    GET /api/gacha/history/:userId
4. User bisa melihat daftar hadiah dan jumlah tersisanya dengan menggunakan endpoint:
    GET /api/gacha/prizes
5. User bisa melihat daftar pemenang dengan menggunakan endpoint:
    GET /api/gacha/winners