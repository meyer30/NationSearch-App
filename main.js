/// <reference path="jquery-3.1.1.js" />

function SearchUnited(){
    jQuery.ajax({
        type: "POST",
        url: 'RequestHandler.php',
        dataType: 'json',
        data: {searchBy: "name", searchVal: "united"},
        success: OnSuccess,
        error: OnFail
    });
}

function SearchBtn_Click() {
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML = "";
    var resultSumDiv = document.getElementById("div-result-summary");
    resultSumDiv.innerHTML = "";
    var errorDiv = document.getElementById("div-error");
    errorDiv.innerHTML = "";

    var nameStr = document.getElementById("nameInput").value;
    var codeStr = document.getElementById("codeInput").value;
    if(nameStr==="" && codeStr===""){
        AddErrorToView("Enter a name or code to search");
        return;
    }
    if(nameStr!==""){
        var searchVal = nameStr;
        var searchBy = "name";
    }
    else if(codeStr!==""){
        searchVal=codeStr;
        searchBy="code";
    }
    
    jQuery.ajax({
        type: "POST",
        url: 'RequestHandler.php',
        dataType: 'json',
        data: {searchBy: searchBy, searchVal: searchVal},
        success: OnSuccess,
        error: OnFail
    });
}

function OnSuccess(response) {
    var numNations;
    var regionDict = {};
    var subregionDict = {};
    if(Array.isArray(response)){
        numNations = response.length;
        for(var idx=0; idx<numNations; idx++){
            AddNationToView(response[idx]);
            IncrementDict(regionDict,response[idx].region);
            IncrementDict(subregionDict,response[idx].subregion);
        }   
    }
    else if(response.message!==""){
        AddErrorToView(response.message)
        return;
    }
    else {
        AddNationToView(response);
        numNations = 1;
        regionDict[response[region]]=1;
        regionDict[response[subregion]]=1;
    }
    AddResultSummaryToView(numNations, regionDict, subregionDict);
}

function IncrementDict(dict, key){
    if(isNaN(dict[key])){
        dict[key]=1;
    }
    else{
        dict[key]++;
    }
}

function OnFail(result) {
    AddErrorToView(result.responseText);
}

function AddNationToView(nation){ 
    var resultsDiv = document.getElementById('div-results');
    var innerhtml =  "<div class='resultBox div-nation'>";
    innerhtml += nation.name;
    innerhtml += "<div>"+nation.alpha2Code+"</div>";
    innerhtml += "<div>"+nation.alpha3Code+"</div>";
    innerhtml += "<img src='" +nation.flag+"'/>";
    innerhtml += "<div>"+nation.region+"</div>";
    innerhtml += "<div>"+nation.subregion+"</div>";
    innerhtml += "<div>"+nation.population+"</div>";
    for(var idx=0; idx<nation.languages.length; idx++){
        innerhtml += "<div>"+nation.languages[idx].name+"</div>";
    }       
    resultsDiv.innerHTML += innerhtml;
}

function AddResultSummaryToView(numNations, regionDict, subregionDict){
    var resultSumDiv = document.getElementById("div-result-summary");
    var innerHtml=numNations;
    for(key in regionDict){
        innerHtml +="<div>"+key+": "+regionDict[key]+"</div>";
    }
    for(key in subregionDict){
        innerHtml +="<div>"+key+": "+subregionDict[key]+"</div>";
    }
    resultSumDiv.innerHTML = innerHtml;
}

function AddErrorToView(errorMessage){
    var errorDiv = document.getElementById("div-error");
    errorDiv.innerHTML = errorMessage;
}