<?php
$fullName=$_POST['fullName'];
$eMailId=$_POST['eMailId'];
$contactNumber=$_POST['contactNumber'];
$a=$_POST['events'];
$events=implode(",",$a);
$registrationFee=$_POST['registrationFee'];
$transactionId=$_POST['transactionId'];
 $conn = new mysqli('localhost','root', '', 'registrationform');
if($conn->connect_error) {
      die('connection Failed: ' .$conn->connect_error);            
}
else {
   if($stmt=$conn->prepare("insert into registration(fullName,eMAilId,contactNumber,events,registrationFee,transactionId) VALUES(?,?,?,?,?,?)")){
   $stmt->bind_param("ssisis",$fullName,$eMailId,$contactNumber,$events,$registrationFee,$transactionId);
    $stmt->execute();
    echo "New record inserted successfully";
    
   $stmt->close();
   $conn->close();
  } 
  else {
      printf("Errormessage: %s\n",$conn->error);
  }
}
?>