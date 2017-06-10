<?php
    header('Content-Type: application/json');
    
    function sendErrorMessage($errorMessage)
    {
        $jsonAry['message']=$errorMessage;
        echo json_encode($jsonAry);
    }
   
    $searchVal=filter_input(INPUT_POST, "searchVal");
    if($searchVal==""){
        sendErrorMessage("No search value found.");
        return;
    }

    $url = "https://restcountries.eu/rest/v2/";    
    $searchBy=filter_input(INPUT_POST, "searchBy");
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
            sendErrorMessage("No search by method found.");
            return;
    }
    
    
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
    $response=curl_exec($curl);
    curl_close($curl);    
    if($curl===false){
        sendErrorMessage("There was error when requesting from https://restcountries.eu");
        return;
    }

    $jsonAry = json_decode($response,true);
    $numNations = count($jsonAry);
    if(array_key_exists('status',$jsonAry)){
        if($jsonAry['status']==404){
            $jsonAry['message']="No nations found.";
        }
    }
    else if($numNations>1){ 
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
            $keyAry= array();
            for($key=50; $key<$numNations; $key++){
                $keyAry[$key]="";
            }
            $jsonAry=array_diff_key($jsonAry,$keyAry);
        }
    }

    
    echo json_encode($jsonAry);
?>