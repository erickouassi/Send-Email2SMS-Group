var ssData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template"); // Get Data from other sheet
var subjectLine = ssData.getRange("B1").getValue(); // Get Value from other sheet 
var templateText = ssData.getRange("B2").getValue(); // Get Value from other sheet
var quotaLeft = MailApp.getRemainingDailyQuota(); // Emails quota to send
//Logger.log(quotaLeft);

// Data row[i] variables for getSheetByName("Emails")

    var Email = 0;  // For all the emails; change number to match colum number
    var Name = 1; // For all the names; change number to match colum number
    var ClassTittle = 2; // For all the classes titles; change number to match colum number
    var Check = 3;
            

function sendEmails() {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails").activate();
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Active sheet
  var lr = ss.getLastRow(); // Last row
  var data = ss.getRange("A2:D" + lr).getValues();    // Active Data range , Add row and change "D" to the last column 
      data = data.filter(function(r){ return r[Check] == false});
      data.forEach(function(row){
  var messageBody = templateText.replace("{name}" ,row[Name])
                                .replace("{title}" ,row[ClassTittle]); // Message body
                                      //  .replace("{tag}" ,Data variables); // Create new tags in Message body
   

//Logger.log(messageBody);
  MailApp.sendEmail(row[Email], subjectLine, messageBody); // Send email

 });

}      
	
