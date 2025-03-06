<?php
// Hata raporlamayı kapat
error_reporting(0);
ini_set('display_errors', 0);

// Çıktı tamponlamasını başlat
ob_start();

// CORS başlıklarını ayarla
header('Content-Type: application/json; charset=utf-8');

// CORS için origin kontrolü
$allowed_origins = [
    'http://localhost:5173',  // Development
    'http://localhost:4173',  // Vite preview
    'https://apphousedesign.com',  // Production
    'https://www.apphousedesign.com'  // Production www
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: https://apphousedesign.com');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// OPTIONS request için erken dönüş
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Sadece POST isteklerini kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

try {
    // Form verilerini al
    $data = [
        'name' => $_POST['name'] ?? null,
        'email' => $_POST['email'] ?? null,
        'phone' => $_POST['phone'] ?? null,
        'subject' => $_POST['subject'] ?? null,
        'message' => $_POST['message'] ?? null
    ];

    // Veri doğrulama
    $required = ['name', 'email', 'subject', 'message'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new Exception("$field alanı zorunludur.");
        }
    }

    // Email formatı kontrolü
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Geçersiz email formatı.');
    }

    // Dosya kontrolü
    if (!empty($_FILES['file'])) {
        // Hata kontrolü
        if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            switch ($_FILES['file']['error']) {
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    throw new Exception('Dosya boyutu çok büyük.');
                case UPLOAD_ERR_PARTIAL:
                    throw new Exception('Dosya eksik yüklendi.');
                case UPLOAD_ERR_NO_FILE:
                    throw new Exception('Dosya yüklenmedi.');
                default:
                    throw new Exception('Dosya yükleme hatası: ' . $_FILES['file']['error']);
            }
        }

        // Dosya türü kontrolü
        $allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
        ];

        if (!in_array($_FILES['file']['type'], $allowedTypes)) {
            throw new Exception('Desteklenmeyen dosya türü: ' . $_FILES['file']['type']);
        }

        // Dosya boyutu kontrolü (5MB)
        if ($_FILES['file']['size'] > 5 * 1024 * 1024) {
            throw new Exception('Dosya boyutu çok büyük (max: 5MB).');
        }

        $data['file'] = $_FILES['file'];
    }

    // Mailer sınıfını yükle
    require_once __DIR__ . '/../utils/Mailer.php';
    $mailer = new Mailer();

    // Maili gönder
    $mailer->sendContactForm($data);

    // Başarılı yanıt
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Mesajınız başarıyla gönderildi.'
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    // Hata yanıtı
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

// Tamponu sonlandır
ob_end_flush(); 