function viewThis() {
	
	d3.select("#py1-lg")
		.style("background-image","url('TfL-PyR-lg.png')");
		
	d3.select("#mainArticleDate")
		.text("Tue, 2nd Jan 2018");
		
	d3.select("#mainArticleTitle")
		.text("Next PyR event");
		
}



























//query variables
var SITE = "http://onelink.tfl.gov.uk/sites/custex/anate/";
var method = "GetListItems";
var list = "PyR website content";
var fieldsToRead = "<ViewFields>" +
			"<FieldRef Name='Title' />" +
			"<FieldRef Name='Content' />" +
			"<FieldRef Name='Tags' />" +
		"</ViewFields>";
var query = "<Query>" +
				"<Where>" +
					"<Neq>" +
						"<FieldRef Name='ID'/><Value Type='Number'>0</Value>" + 
					"</Neq>" +
				"</Where>" +
				"<OrderBy>" + 
					"<FieldRef Name='Title'/>" +
				"</OrderBy>" +
			"</Query>";
			
    $().SPServices({
        operation: method,
        async: false,
		webURL: SITE,
        listName: list,
        CAMLViewFields: fieldsToRead,
		CAMLRowLimit: 600,
		CAMLQuery: query,
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function() {
                var elTitle = ($(this).attr("ows_Title"));
				var elContent = ($(this).attr("ows_Content"));
				var elTags = ($(this).attr("ows_Tags"));
				$("#data").append("<tr>" +
							"<td>" + elTitle + "</td>" +
							"<td>" + elContent + "</td>" +
							"<td>" + elTags + "</td>" +
							"</tr>");
            });
        }
    });

/*
function GetSearchResults() {

var typedVal = document.getElementById("searchbox").value;
query3 = "<Query>" +
			"<Where>" +
				"<Or>" +
					"<Contains>" +
						"<FieldRef Name='Element_x0020_Name' /><Value Type='Text'>" + typedVal.toUpperCase() + "</Value>" +
					"</Contains>" +
					"<Contains>" +
						"<FieldRef Name='Product_x0020_Element_x0020_Desc' /><Value Type='Text'>" + typedVal.toUpperCase() + "</Value>" +
					"</Contains>" +
				"</Or>" +
			"</Where>" +
		"</Query>";
		
	var tableLength = d3.select("#searchResultsTab").node().rows.length;
	
	while(tableLength > 1) {
		d3.select("#searchResultsTab").node().deleteRow(1);
		tableLength = d3.select("#searchResultsTab").node().rows.length;
	}	
	
    $().SPServices({
        operation: method,
        async: false,
		webURL: SITE,
        listName: list2,
        CAMLViewFields: fieldsToRead3,
		CAMLRowLimit: 600,
		CAMLQuery: query3,
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function() {
				var pElem = ($(this).attr("ows_Element_x0020_Name")).toUpperCase();
				var pLink = ($(this).attr("ows_Link"));
				var pDesc = ($(this).attr("ows_Product_x0020_Element_x0020_Desc")).toUpperCase();
				if(!pLink) {
					$("#searchResultsTab").append("<tr>" +
								"<td>" + ($(this).attr('ows_Element_x0020_Name')) + "</td>" +
								"<td>" + ($(this).attr('ows_Product_x0020_Element_x0020_Desc')) + "</td>" +
								"</tr>");
				} else {
					$("#searchResultsTab").append("<tr>" +
								"<td><a href=" + pLink.substr(0,pLink.indexOf(",")) + " target='_blank'>" + ($(this).attr('ows_Element_x0020_Name')) + "</a></td>" +
								"<td>" + ($(this).attr('ows_Product_x0020_Element_x0020_Desc')) + "</td>" +
								"</tr>");				
				}
            });
        }
    });
	
} //end of GetSearchResults function

function nextLevel1(x) {

	d3.selectAll(".optionBox")
		.style("background-image","radial-gradient(lightblue 0%, rgb(17,59,146) 75%)");
	d3.selectAll("#prodName, #prodElement")
		.style("opacity","0.2")
		.style("pointer-events","none");

	var tableLength = d3.select("#data").node().rows.length;
	
	while(tableLength > 1) {
		d3.select("#data").node().deleteRow(1);
		tableLength = d3.select("#data").node().rows.length;
	}
	
	d3.select("#prodName").selectAll(".optionBox").remove();
	d3.select("#prodElement").selectAll(".optionBox").remove();
	
	d3.select(x)
		.style("background-image","radial-gradient(white 0%, red 75%)");

	d3.select("#prodName")
		.style("opacity", 1)
		.style("pointer-events", "unset");
		
	chosenFam = d3.select(x).select(".optionText").node().innerHTML;
	chosenFam = chosenFam.substr(0,chosenFam.length - 25);
	query = "<Query>" +
			"<Where>" +
				"<Or>" +
					"<Eq>" +
						"<FieldRef Name='Product_x0020_Family' /><Value Type='Choice'>" + chosenFam + "</Value>" +
					"</Eq>" +
					"<Eq>" +
						"<FieldRef Name='Sub_x0020_Family' /><Value Type='Choice'>" + chosenFam + "</Value>" +
					"</Eq>" +
				"</Or>" +
			"</Where>" +
		"</Query>";
	GetData();
	
	var tableInfo = Array.prototype.map.call(document.querySelectorAll('#data tr'), function(tr){
		return Array.prototype.map.call(tr.querySelectorAll('td'), function(td){
			return td.innerHTML;
		});
	});
	
	buildProds(tableInfo);
	
}

function nextLevel2(x, theBox) {

	d3.selectAll("#prodName, #prodElement")
		.selectAll(".optionBox")
		.style("background-image","radial-gradient(lightblue 0%, rgb(17,59,146) 75%)");

	var tableLength = d3.select("#elementsTab").node().rows.length;
	
	while(tableLength > 1) {
		d3.select("#elementsTab").node().deleteRow(1);
		tableLength = d3.select("#elementsTab").node().rows.length;
	}
	
	d3.select("#prodElement").select(".rightCol").selectAll(".optionBox").remove();
		
	d3.select(theBox)
		.style("background-image","radial-gradient(white 0%, red 75%)");

	d3.select("#prodElement")
		.style("opacity", 1)
		.style("pointer-events", "unset");
	
	query2 = "<Query>" +
			"<Where>" +
				"<Eq>" +
					"<FieldRef Name='Product_x0020_Name0' /><Value Type='Choice'>" + x + "</Value>" +
				"</Eq>" +
			"</Where>" +
		"</Query>";	
		
	GetElements();
	
	var tableInfo = Array.prototype.map.call(document.querySelectorAll('#elementsTab tr'), function(tr){
		return Array.prototype.map.call(tr.querySelectorAll('td'), function(td){
			return td.innerHTML;
		});
	});
	
	buildElems(tableInfo);
	
}

function buildProds(tab) {

	d3.select("#prodName")
		.select(".rightCol")
		.selectAll(".optionBox")
		.data(tab.filter(function(d,i) { return i > 0; }))
		.enter().append("div")
		.attr("class", "optionBox")
		.on("click", function(d,i) {
			nextLevel2(tab.filter(function(d,i) { return i > 0; })[i][0], this)
			d3.select("#prodNameInfoTab").selectAll(".detailsCol2")
				.text("")
				.html("");
			
			d3.select("#detailsProdName")
				.html(d[0]);
			d3.select("#detailsProdDesc")
				.html(d[3]);
			d3.select("#detailsProdCav")
				.html(d[4]);
			d3.select("#detailsProdMgr")
				.html(d[5]);
			d3.select("#detailsProdRdmp")
				.append("a")
					.attr("href",d[6].substr(0,d[6].indexOf(",")))
					.text("Link to roadmap");
		})
		.append("div")
		.attr("class", "optionText")
		.text(function(d,i) { return tab.filter(function(d,i) { return i > 0; })[i][0]; })
		.append("div")
			.attr("class","info")
			.attr("data-toggle","modal")
			.attr("data-target","#prodNameInfo")
			.text("ⓘ");
}

function buildElems(tab) {

	d3.select("#prodElement")
		.select(".rightCol")
		.selectAll(".optionBox")
		.data(tab.filter(function(d,i) { return i > 0; }))
		.enter().append("div")
		.attr("class", "optionBox")
		.attr("data-toggle","modal")
		.attr("data-target","#myModal")
		.on("click", function(d,i) {
			d3.select("#prodElement").selectAll(".optionBox")
				.style("background-image","radial-gradient(lightblue 0%, rgb(17,59,146) 75%)");
				
			d3.select(this)
				.style("background-image","radial-gradient(white 0%, red 75%)");
			
			d3.select("#detailsTab").selectAll(".detailsCol2")
				.text("")
				.html("");
			
			d3.select("#detailsName")
				.html(d[0]);
			d3.select("#detailsLink")
				.append("a")
					.attr("href",d[1].substr(0,d[1].indexOf(",")).replace(/&amp;/g, '&'))
					.attr("target","_blank")
					.text("Link to product");
			d3.select("#detailsReq")
				.append("a")
					.attr("href",d[2].substr(0,d[2].indexOf(",")))
					.text("Link to requirements");
			d3.select("#detailsDesign")
				.append("a")
					.attr("href",d[3].substr(0,d[3].indexOf(",")))
					.text("Link to design");
			d3.select("#detailsDesc")
				.html(d[4]);
			d3.select("#detailsSec")
				.html(d[5]);
		})

			.append("div")
				.attr("class", "optionText")
				.html(function(d,i) { return tab.filter(function(d,i) { return i > 0; })[i][0]; });
}

function GetElements() {
	
    $().SPServices({
        operation: method,
        async: false,
		webURL: SITE,
        listName: list2,
        CAMLViewFields: fieldsToRead2,
		CAMLRowLimit: 600,
		CAMLQuery: query2,
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function() {
				var pElem = ($(this).attr("ows_Element_x0020_Name"));
				var pLink = ($(this).attr("ows_Link"));
				var pReq = ($(this).attr("ows_Link_x0020_to_x0020_requirements"));
				var pDesign = ($(this).attr("ows_Element_x0020_Design"));
				var pDesc = ($(this).attr("ows_Product_x0020_Element_x0020_Desc"));
				var pSec = ($(this).attr("ows_TfL_x0020_Security_x0020_Classif"));
				$("#elementsTab").append("<tr>" +
							"<td>" + pElem + "</td>" +
							"<td>" + pLink + "</td>" +
							"<td>" + pReq + "</td>" +
							"<td>" + pDesign + "</td>" +
							"<td>" + pDesc + "</td>" +
							"<td>" + pSec + "</td>" +
							"</tr>");
            });
        }
    });
	
} //end of GetElements function

function hideDetails() {
	d3.select("#details").style("display","none");
}*/