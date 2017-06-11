/// <reference path="jquery-3.1.1.js" />
function SearchBtn_Click() {
    ClearResults();
    
    var searchMthd = document.getElementById("selSearchMethod").value;
    var searchVal = document.getElementById("searchValInput").value;
    
    if(searchVal===""){
        AddErrorToView("Enter a name or code to search");
        return;
    }
    jQuery.ajax({
        type: "POST",
        url: 'RequestHandler.php',
        dataType: 'json',
        data: {searchBy: searchMthd, searchVal: searchVal},
        success: OnSuccess,
        error: OnFail
    });
}

function ClearResults() {
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML = "";
    var resultSumDiv = document.getElementById("div-result-summary");    
    resultSumDiv = document.getElementById("div-result-summary")
    var errorDiv = document.getElementById("div-error");
    errorDiv.innerHTML = "";
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

    var nationHtml =  
        "<div class='resultBox div-nation'>" +
            "<h2>"+nation.name+"</h2>" +
            "<img src='" +nation.flag+"'/>" +
            "<table>" +
                "<tr>" +
                    "<td>Alpha codes:</td>" +
                    "<td>"+nation.alpha2Code+"<br/>"+nation.alpha3Code+"</td>" +
                "</tr>"+
                "<tr>" +
                    "<td>Region:</td>" +
                    "<td>"+nation.region+"</td>" +
                "</tr>"+
                "<tr>" +
                    "<td>Subregion:</td>" +
                    "<td>"+nation.subregion+"</td>" +
                "</tr>" +
                "<tr>" +
                    "<td>Population:</td>" +
                    "<td>"+nation.population+"</td>" +
                "</tr>" +
                "<tr>" +
                    "<td>Languages:</td>" +
                    "<td>";
    
    for(var idx=0; idx<nation.languages.length; idx++){
        nationHtml += nation.languages[idx].name+"<br/>";
    }
    nationHtml += "</td></tr></table></div>";
    
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML += nationHtml;
}

function AddResultSummaryToView(numNations, regionDict, subregionDict){
    
    var innerHtml=
        "<label>Number nations: </label>" + numNations +"<br/>" +
        "<label>Regions appearing: </label><br/>";
    for(key in regionDict){
        innerHtml +="<div class='div-region'>"+key+": "+regionDict[key]+"</div>";
    }
    innerHtml+="<label>Subregions appearing:</label><br/>";
    for(key in subregionDict){
        innerHtml +="<div class='div-subregion'>"+key+": "+subregionDict[key]+"</div>";
    }
    
    var resultSumDiv = document.getElementById("div-result-summary");
    resultSumDiv.innerHTML = innerHtml;
}

function AddErrorToView(errorMessage){
    var errorDiv = document.getElementById("div-error");
    errorDiv.innerHTML = errorMessage;
}