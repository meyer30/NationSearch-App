<?php
    header('Content-Type: application/json');

    $url = "https://restcountries.eu/rest/v2/";
    //$url="https://restcountries.eu/rest/v2/name/united";
    
    //$nationName=filter_input(INPUT_POST, "name");
    
    $searchBy=filter_input(INPUT_POST, "searchBy");
    $searchVal=filter_input(INPUT_POST, "searchVal");
    if($searchVal==""){
        //todo return error message
    }
    
    switch($searchBy){
        case "name":
            $url = $url . "name/" . $searchVal;
            break;
        case "fullName":
            $url = $url . "name/" . $searchVal . "?fullText=true";
            break;
        case "code":
            $url .= "alpha/" . $searchVal;
            break;
        default:
            //error todo
            break;
    }
//    
//    if(nationName)
//    //if( isset($_POST['name']) && $_POST['name']!=""){
//    if( isset($_POST['name'])){
//        $url="https://restcountries.eu/rest/v2/name/united";
//        $url="https://restcountries.eu/rest/v2/name/" . $_POST['name'];
//        //$url .= "name/" . $_POST['name'];
////        if(isset($_POST['isFullName']) && $_POST['isFullName']){
////            $url .= "?fullText=true";
////        }
//    }
//    else if(isset($_POST['code'])){
//        $url .= "alpha/" . $_POST['code'];
//    }
//    else{
//        //send back all countries
//        $url .= "all";
//    }

        
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
    $response=curl_exec($curl);
    curl_close($curl);
    echo $response;
?>