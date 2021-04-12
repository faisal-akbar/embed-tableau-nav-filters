let viz;

const vizUrl = "https://public.tableau.com/views/SuperstoreDashboard_16179869127700/Overview"

const vizContainer = document.getElementById("viz-container")

const options = {
    device: "desktop",
    hideTabs: true,
//   Category: ["Technology", "Office Supplies"],
  onFirstInteractive: function () {
    console.log("Viz loaded successfully");
    document.getElementById("segmentChoices").disabled = false;
    document.getElementById("export").disabled = false;
    document.getElementById("regionChoices").disabled = false;
    document.getElementById("categoryChoices").disabled = false;
    document.getElementById("minValue").disabled = false;
    document.getElementById("maxValue").disabled = false;
    document.getElementById("filterButton").disabled = false;

  },
}

const initViz=()=>{
        viz = new tableau.Viz(vizContainer, vizUrl, options);
}


// Segment Filter
function segmentFilter(segment){
    let sheet = viz.getWorkbook().getActiveSheet();
            if (segment === "") {
                worksheetArray = sheet.getWorksheets();
                worksheetArray.map(view => view.clearFilterAsync('Segment'))
                } else {
                sheet.applyFilterAsync("Segment", segment, tableau.FilterUpdateType.REPLACE);
            }
}


// Region Filter
function regionFilter(region){
  let sheet = viz.getWorkbook().getActiveSheet();
          if (region === "") {
              worksheetArray = sheet.getWorksheets();
              worksheetArray.map(view => view.clearFilterAsync('Region'))
              } else {
              sheet.applyFilterAsync("Region", region, tableau.FilterUpdateType.REPLACE);
          }
}

// Category Filter
function categoryFilter(category){
  let sheet = viz.getWorkbook().getActiveSheet();
          if (category === "") {
              worksheetArray = sheet.getWorksheets();
              worksheetArray.map(view => view.clearFilterAsync('Category'))
              } else {
              sheet.applyFilterAsync("Category", category, tableau.FilterUpdateType.REPLACE);
          }
}


function getRangeValues() {
  const activeSheet = viz.getWorkbook().getActiveSheet()
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[0];

  const minValue = document.getElementById("minValue").value/100;
  const maxValue = document.getElementById("maxValue").value/100;
  console.log(minValue, maxValue);
  //   get the workbook

  sheetToFilter
    .applyRangeFilterAsync("AGG(Profit Ratio)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter applied!"))

}



document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValues);


// Export to pdf:
const pdfExport = document.getElementById("pdfExport")
const generatePDF=()=> viz.showExportPDFDialog()
pdfExport.addEventListener("click", generatePDF);

// Export to powerpoint:
const powerPointExport = document.getElementById("powerPointExport")
const generatePowerPoint=()=> viz.showExportPowerPointDialog()
powerPointExport.addEventListener("click", generatePowerPoint);


const crossTabExport = document.getElementById("crossTabExport")
const generateCrossTab=()=> viz.showExportCrossTabDialog()
crossTabExport.addEventListener("click", generateCrossTab);



// Switch the viz to the sheet specified
const switchView=(sheetName)=> {
  let workbook = viz.getWorkbook();

  if(sheetName=='Commission Model'){
    document.getElementById('filterContainer').style.visibility="hidden";
    workbook.activateSheetAsync(sheetName);

  }

  else {
    document.getElementById('filterContainer').style.visibility="visible";
    workbook.activateSheetAsync(sheetName);
  }
  
}

// Call that function when the page has finished loading
document.addEventListener("DOMContentLoaded", initViz());

