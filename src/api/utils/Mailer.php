<?php
class Mailer {
    private $config;
    private $mailer;

    public function __construct() {
        try {
            $this->config = require __DIR__ . '/../config/mail.php';
            error_log('Mail Config: ' . print_r($this->config, true));
            
            // PHPMailer kullanımı için gerekli dosyaları include et
            require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/Exception.php';
            require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/PHPMailer.php';
            require_once __DIR__ . '/../vendor/phpmailer/phpmailer/src/SMTP.php';

            $this->mailer = new PHPMailer\PHPMailer\PHPMailer(true);
            $this->setupMailer();
        } catch (Exception $e) {
            error_log('Mailer Constructor Error: ' . $e->getMessage());
            throw $e;
        }
    }

    private function setupMailer() {
        try {
            // Server ayarları
            $this->mailer->SMTPDebug = 0; // Debug çıktısını kapatalım
            $this->mailer->Debugoutput = function($str, $level) {
                error_log("PHPMailer Debug [$level]: $str");
            };
            $this->mailer->isSMTP();
            $this->mailer->Host = $this->config['smtp']['host'];
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = $this->config['smtp']['username'];
            $this->mailer->Password = $this->config['smtp']['password'];
            $this->mailer->SMTPSecure = $this->config['smtp']['secure'];
            $this->mailer->Port = $this->config['smtp']['port'];
            $this->mailer->CharSet = 'UTF-8';

            // Varsayılan gönderici
            $this->mailer->setFrom(
                $this->config['smtp']['from_email'],
                $this->config['smtp']['from_name']
            );

            error_log('SMTP Setup completed');
        } catch (Exception $e) {
            error_log('Mailer Setup Error: ' . $e->getMessage());
            throw new Exception('Mailer yapılandırma hatası: ' . $e->getMessage());
        }
    }

    public function sendContactForm($data) {
        try {
            error_log('Sending Contact Form. Data: ' . print_r($data, true));

            // Alıcı mail adresi
            $this->mailer->addAddress($this->config['smtp']['from_email']);
            
            // Mail içeriği
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'Yeni İletişim Formu: ' . $data['subject'];
            
            // HTML mail template
            $body = "
                <h2>İletişim Formu Detayları</h2>
                <p><strong>İsim:</strong> {$data['name']}</p>
                <p><strong>E-posta:</strong> {$data['email']}</p>
                " . (!empty($data['phone']) ? "<p><strong>Telefon:</strong> {$data['phone']}</p>" : "") . "
                <p><strong>Konu:</strong> {$data['subject']}</p>
                <p><strong>Mesaj:</strong><br>{$data['message']}</p>
            ";

            // Dosya eki varsa bilgisini ekle
            if (!empty($data['file'])) {
                $body .= "<p><strong>Ek Dosya:</strong> {$data['file']['name']} ({$this->formatFileSize($data['file']['size'])})</p>";
            }
            
            $this->mailer->Body = $body;
            $this->mailer->AltBody = strip_tags($body);

            // Dosya eki varsa ekle
            if (!empty($data['file']) && $data['file']['error'] === UPLOAD_ERR_OK) {
                $this->mailer->addAttachment(
                    $data['file']['tmp_name'],
                    $data['file']['name'],
                    'base64',
                    $data['file']['type']
                );
            }

            // Maili gönder
            $result = $this->mailer->send();
            error_log('Mail sent successfully');
            return true;

        } catch (Exception $e) {
            error_log('Mail Send Error: ' . $e->getMessage());
            throw new Exception('Mail gönderme hatası: ' . $e->getMessage());
        }
    }

    private function formatFileSize($bytes) {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, 2) . ' ' . $units[$pow];
    }
} 