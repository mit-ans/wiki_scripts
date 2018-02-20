function updateYears() {
  // Go through the speadsheet and increment each year by 1 wherever possible.
  // ONLY RUN THIS ONCE PER YEAR
  
  var dataFile = SpreadsheetApp.getActiveSpreadsheet();
  var rawDataSheet = dataFile.getSheetByName("Form Responses 1");
  
  var gradYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "6th Year"];
  var undergradYears = ["Sophomore", "Junior", "Senior", "Super-senior or graduated"];
  var gPrefix = "Grad:";
  var ng = gPrefix.length;
  var uPrefix = "Undergrad:";
  var nu = uPrefix.length;
  
  // Get the class standing column
  var headers = rawDataSheet.getDataRange().getValues().shift();
  var c = 1 + headers.indexOf("Year/Class Standing");
  
  // Go through the column and update the years of each student
  // whose class standing follows the usual format
  for (var r = 2; r <= rawDataSheet.getLastRow(); r++){
    var range = rawDataSheet.getRange(r, c);
    var val0 = range.getValue();
    gyear = val0.substring(ng+1,ng+1+8);
    uyear = val0.substring(nu+1);

    
    if ((gradYears.indexOf(gyear) == -1) && (undergradYears.indexOf(uyear) == -1)) {
          var val1 = val0;
    } else if (val0.substring(0, ng) == gPrefix) {
      // Then this is a grad student
      year0 = gyear;
       {
        gradIter: for (i = 0; i < gradYears.length; ++i) {
          if (year0 == gradYears[i]){
            // increment the year
            if (i < gradYears.length - 1){
              var year1 = gradYears[i + 1];
            } else {
              var year1 = year0 + "+";
            }
            break gradIter;
          }
        }
        // Forge a new grad string
        var suffix = val0.substring(ng+1+8);
        var val1 = gPrefix + " " + year1 + suffix;
      }
     
    } else if (val0.substring(0,nu) == uPrefix) {
      // Then this is an undergrad student
      year0 = uyear;
      undergradIter: for (i = 0; i < undergradYears.length; ++i) {
        if (year0 == undergradYears[i]){
        // Increment the year
         if (i < undergradYears.length - 1){
            var year1 = undergradYears[i + 1];
          } else {
            var year1 = "(graduated?)";
          }
          break undergradIter;
        }
      }
      // And create a new undergrad string
      var val1 = uPrefix + " " + year1;
    }
    
    // Now that the new value has been obtained, update the cell 
    Logger.log(val0 + " -> " + val1);
    range.setValue(val1);
    
  }
}

