<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}"); header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}"); exit(0);
}

$user = 'root';
$password = 'root';
$db = 'sthlmbnb';
$host = 'localhost';


$connection = mysqli_connect($host, $user, $password, $db);
if(!connection){
    echo "<h3>" . mysqli_connect_error() . "</h3>"; exit;

}
mysqli_set_charset($connection, "utf8");

$query = "SELECT * FROM rooms";

$result = mysqli_query($connection, $query);
$data = array();
while($row = $result->fetch_assoc()) {
  $data[] = $row;
}
echo json_encode($data);
?>