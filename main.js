/// <reference path="jquery-3.1.1.js" />
NationArray = [];

function OutputMessage() {
  window.alert("button clickeds");
};

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
    var nameStr = document.getElementById("nameInput").value;
    var codeStr = document.getElementById("codeInput").value;
    if(nameStr==="" && codeStr===""){
        window.alert("Enter a name or code to search");
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
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML = "";
    var numNations;
//At the bottom of the page show the total number of countries and    
// list all regions and subregions contained in the results with the number of times it appeared. 
    
    if(Array.isArray(response)){
        numNations = response.length;
        for(var idx=0; idx<numNations; idx++){
            AddNationToView(response[idx]);
        }   
    }
    else{
        numNations = 1;
        AddNationToView(response);
    }
    AddResultSummaryToView(numNations);
}

function OnFail(result) {
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML += result.responseText;
}

function AddNationToView(nation){ 
    var resultsDiv = document.getElementById('div-results');
    var innerhtml =  "<div class='div-nation'>";
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

function AddResultSummaryToView(numNations){
    var resultSumDiv = document.getElementById("div-result-summary");
    resultSumDiv.innerHTML = numNations;
}