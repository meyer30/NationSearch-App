<?php
    header('Content-Type: application/json');

    $url = "https://restcountries.eu/rest/v2/name/united";

    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 

    $response=curl_exec($curl);
    
    curl_close($curl);
    
    echo $response;
?>