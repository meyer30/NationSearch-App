/// <reference path="jquery-3.1.1.js" />
NationArray = [];

function OutputMessage() {
  window.alert("button clickeds");
};


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
    
//    
// 
//At the bottom of the page show the total number of countries and list all regions and subregions contained in the results with the number of times it appeared. 
    
    if(Array.isArray(response)){     
        for(var idx=0; idx<response.length; idx++){
            AddNationToView(response[idx]);
        }   
    }
    else{
        AddNationToView(response);
    }
}

function OnFail(result) {
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML += result.responseText;
}

function AddNationToView(nation){ 
    
//    For each country displayed include: the full name, alpha code 2, alpha code 3, flag image (scaled to fit display), 
//    region, subregion, population, and a list of its languages. 
    var resultsDiv = document.getElementById('div-results');
    resultsDiv.innerHTML += "<div>"+nation.name+"</div>";
    resultsDiv.innerHTML += "<div>"+nation.alpha2Code+"</div>";
    resultsDiv.innerHTML += "<div>"+nation.alpha3Code+"</div>";
    resultsDiv.innerHTML += "<img src='" +nation.flag+"'/>";
    resultsDiv.innerHTML += "<div>"+nation.region+"</div>";
    resultsDiv.innerHTML += "<div>"+nation.subregion+"</div>";
    resultsDiv.innerHTML += "<div>"+nation.population+"</div>";
        for(var idx=0; idx<nation.languages.length; idx++){
            resultsDiv.innerHTML += "<div>"+nation.languages[idx]+"</div>";
        }       
}