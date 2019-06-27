<?php
header('Content-Type: application/json');

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';


$name = strip_tags($_POST['name']);
$email = strip_tags($_POST['email']);
$phone = strip_tags($_POST['phone']);
$type = strip_tags($_POST['formtype']);

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Recipients
    $mail->setFrom('hi@lemons.studio', 'Lemons.studio'); // Add a recipient
    $mail->addAddress($email, $name);
    $mail->addAddress('hi@lemons.studio');

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->CharSet = 'UTF-8';

    switch ($type) {
        case 'guide':
            $mail->Subject   = 'PDF';
            $mail->Body = 'Your PDF is attached to this letter. <br>' .
                        'Also, there is a link to it, just in case: ' .
                        '<a href="https://drive.google.com/open?id=1mqRXfRjrF4hjQ6LX3zaipuWucLfqppcu">link</a>';
            $file_to_attach = '../assets/pdf/Lemons_guide.pdf';
            $mail->AddAttachment( $file_to_attach , 'Lemons_guide.pdf' );
            break;
        
        case 'contact':
            $mail->Subject = '🍋 Lemons animation studio // Project request';
            $mail->Body = "
                Hi <strong>$name</strong>, we got your project request. We connect with you within next 24 hours. 
                <br><br>
                <strong>Your email:</strong> $email<br>
                <strong>Phone or Skype id:</strong> $phone
                <br><br>
                --
                <a href=\"https//lemons.studio\">Lemons.studio</a>";

            break;
    }

    $mail->send();

    echo json_encode([
        'status' => 'success',
        'message' => 'We\'ve got your message and will answer soon'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}