<?php
$exhibit_name=$_POST['exhibit_name'];
$institute_name=$_POST['institute_name'];
$address=$_POST['address'];
$fullname=$_POST['name'];
$email=$_POST['email'];
$number=$_POST['number'];
$number_of_exhibitors=$_POST['number_of_exhibitor'];
$area=$_POST['area'];
$any_special=$_POST['any_special'];
$message=$_POST['message'];
 $conn=new mysqli('localhost','root','','exhibitform');
 if($conn->connect_error) {
   die('connection Failed: ' .$conn->connect_error);            
}
else {
   if($stmt=$conn->prepare("insert into exhibition(exhibitname,institutename,address,fullname,emailid,number,noofexhibitors,area,requirements,message) VALUES(?,?,?,?,?,?,?,?,?,?)")){
    $stmt->bind_param("sssssiiiss",$exhibit_name,$institute_name,$address,$fullname,$email,$number,$number_of_exhibitors,$area,$any_special,$message);
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