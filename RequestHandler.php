<?php
    header('Content-Type: application/json');

    $url = "https://restcountries.eu/rest/v2/";
    
    if( isset($_POST['name'])){
        $url .= "name/" . $_POST['name'];
        if(isset($_POST['isFullName']) && $_POST['isFullName']){
            $url .= "?fullText=true";
        }
    }
    else if(isset($_POST['code'])){
        $url .= "alpha/" . $_POST['code'];
    }
    else{
        //dummy response.  Parameter wasn't passed in.
        $url = "https://restcountries.eu/rest/v2/name/united";
    }

        
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 

    $response=curl_exec($curl);
    
    curl_close($curl);
    
    echo $response;
?>