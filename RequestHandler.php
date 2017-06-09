<?php
    header('Content-Type: application/json');

    $url = "https://restcountries.eu/rest/v2/name/united";

    $x = "https://restcountries.eu/rest/v2/name/aruba?fullText=true";
    
    if(true){
        //search by name
        $url = "https://restcountries.eu/rest/v2/name/united";
    }
        
    if(false){
        //if by full name
        $url += "name/aruba?fullText=true";
    }
    

        
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 

    $response=curl_exec($curl);
    
    curl_close($curl);
    
    echo $response;
?>