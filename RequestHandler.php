<?php
    header('Content-Type: application/json');
    
    $url = "https://restcountries.eu/rest/v2/";

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
        
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
    $response=curl_exec($curl);
    curl_close($curl);


//    The search results should be displayed on an HTML page, 
//    and be sorted alphabetically by the country’s name and population. 
//    
//    Limit the api results to 50. 
//    
//    Filtering, sorting, and limiting should be done in PHP and the Rest Countries service
        
    
    echo $response;
?>