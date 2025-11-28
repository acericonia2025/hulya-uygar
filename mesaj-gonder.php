<?php
// XAMPP MySQL bağlantısı
$sunucu = "localhost";
$kullanici = "root";
$sifre = "";
$veritabani = "mesaj_db";

header('Content-Type: text/html; charset=utf-8');

try {
    // MySQL PDO bağlantısı
    $conn = new PDO("mysql:host=$sunucu;dbname=$veritabani;charset=utf8", $kullanici, $sifre);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Form gönderimi
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $mesaj = trim($_POST["mesaj"]);

        if ($mesaj == "") {
            die("<div style='color: #ff4444; text-align: center; padding: 20px; font-family: Arial;'>
                    <i class='fa-solid fa-triangle-exclamation'></i><br>
                    Mesaj boş olamaz! 💔
                </div>");
        }

        // Mesaj uzunluğu kontrolü
        if (strlen($mesaj) > 1000) {
            die("<div style='color: #ff4444; text-align: center; padding: 20px; font-family: Arial;'>
                    <i class='fa-solid fa-triangle-exclamation'></i><br>
                    Mesaj çok uzun! (Maksimum 1000 karakter)
                </div>");
        }

        // SQL sorgusu - ID'yi belirtmeden sadece mesajı ekle
        $sql = "INSERT INTO mesajlar (mesaj) VALUES (:mesaj)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':mesaj', $mesaj, PDO::PARAM_STR);
        
        if ($stmt->execute()) {
            // Başarılı mesajı
            echo "<div style='
                color:rgb(248, 248, 248); 
                text-align: center; 
                padding: 30px; 
                font-family: Arial; 
                background: rgba(0,200,81,0.1);
                border-radius: 15px;
                border: 2px solidrgb(22, 22, 22);
                margin: 20px;
            '>
                <div style='font-size: 3em; margin-bottom: 10px;'>💖</div>
                <div style='font-size: 1.5em; font-weight: bold; margin-bottom: 10px;'>
                    Mesajın ulaştı!
                </div>
                <div style='opacity: 0.8; font-size: 0.9em;'>
                    Bu mesaj kalbimde ve veritabanında sonsuza kadar saklanacak...
                </div>
            </div>";
            
            // Otomatik yönlendirme için JavaScript
            echo "<script>
                setTimeout(function() {
                    window.location.href = 'mesaj-form.html';
                }, 3000);
            </script>";
            
        } else {
            $errorInfo = $stmt->errorInfo();
            echo "<div style='color: #ff4444; text-align: center; padding: 20px; font-family: Arial;'>
                    <i class='fa-solid fa-bug'></i><br>
                    Veritabanı hatası: " . $errorInfo[2] . "<br>
                    Lütfen tabloyu kontrol edin.
                </div>";
        }
    }
    
} catch(PDOException $e) {
    // Özel hata mesajları
    if ($e->getCode() == 1049) {
        die("<div style='color: #ff4444; text-align: center; padding: 20px; font-family: Arial;'>
                <i class='fa-solid fa-database'></i><br>
                Veritabanı bulunamadı!<br>
                Lütfen önce phpMyAdmin'den 'mesaj_db' veritabanını oluşturun.
             </div>");
    }
    elseif ($e->getCode() == '42S02') { // Tırnak içinde yaz
        die("<div style='color: #ff4444; text-align: center; padding: 20px; font-family: Arial;'>
                <i class='fa-solid fa-table'></i><br>
                Tablo bulunamadı!<br>
                Lütfen 'mesajlar' tablosunu oluşturun.
             </div>");
    }
    else {
        die("<div style='color: #ff4444; text-align: center; padding: 20px; font-family: Arial;'>
                <i class='fa-solid fa-exclamation-triangle'></i><br>
                Bağlantı hatası: " . $e->getMessage() . "
             </div>");
    }
}
?>