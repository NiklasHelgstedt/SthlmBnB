<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}"); header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}"); exit(0);
}



$response = file_get_contents("php://input");
 
 echo $response;
 
 $request = json_decode($response);
 
 $fname = $request->fname;
 $lname = $request->lname;
 $email = $request->email;
 $tele = $request->tele;
 $adults = $request->adults;
 $kids = $request->kids;
 $orderid = $request->orderid;
 $indate = $request->indate;
 $outdate = $request->outdate;
 $roomid = $request->roomid;
 $totalprice = $request->totalprice;


$user = 'root';
$password = 'root';
$db = 'sthlmbnb';
$host = 'localhost';

$connection = mysqli_connect($host, $user, $password, $db);
if(!connection){
    echo "<h3>" . mysqli_connect_error() . "</h3>"; exit;

}
mysqli_set_charset($connection, "utf8");

$query = "INSERT INTO bookings VALUES('$fname', '$lname', '$email', '$tele', '$adults', '$kids', '$orderid', '$indate', '$outdate', '$roomid', '$totalprice')";

mysqli_query($connection, $query) or die(mysqli_error($connection));
?>
