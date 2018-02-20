function update() {
  var dataFile = SpreadsheetApp.getActiveSpreadsheet();
  var rawDataSheet = dataFile.getSheetByName("Form Responses 1");
  var formatDataSheet = dataFile.getSheetByName("Student Information");
  
  var range = rawDataSheet.getDataRange();
  var rawRange = range.offset(1,1,range.getLastRow()-1,range.getLastColumn()-1);
  var formatRange = formatDataSheet.getRange(2, 1, range.getLastRow()-1,range.getLastColumn()-1)
  
  formatRange.clearContent();
  rawRange.copyTo(formatDataSheet.getRange("A2"),{contentsOnly:true});
  formatDataSheet.sort(2);
  
  // Below is text to eliminate visible area to only visible cells.
  
  formatDataSheet.deleteColumns(12,2);
  
  for (var r =2; r < formatDataSheet.getLastRow(); r++){
    if (!formatDataSheet.getRange(r, 1).getValue()){
      formatDataSheet.deleteRow(r);
      r--;}}
  
}

