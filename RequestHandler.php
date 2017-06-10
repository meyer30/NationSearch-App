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
    //$url = "https://restcountries.eu/rest/v2/all";
    
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
    $response=curl_exec($curl);
    curl_close($curl);    
    if($curl===false){
        //todo error on querying server
    }

    $jsonAry = json_decode($response,true);
    $numNations = count($jsonAry);
    if($numNations>1){
        // Filtering, sorting, and limiting should be done in PHP and the Rest Countries service        
        function cmp($a, $b)
        {
            $nameCmpResult=strcmp($a['name'], $b['name']);
            if($nameCmpResult==0){
                return $a['population'] < $b['population'];
            }
            else{
                return $nameCmpResult;
            }
        }

        usort($jsonAry, "cmp");
        if($numNations>50){
            // todo Limit the api results to 50. 
        }
    }
    
    echo json_encode($jsonAry);
?>