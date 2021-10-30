var selectedRow = null
const alarm = document.getElementById('alarm');

alarm.addEventListener('click', setAlarm);

function setAlarm(e) {
    //e.preventDefault();
    const time = document.getElementById('medTime').value;
    // alarmTime = new Date(time.value);
    //alarmTime = new timen.value;
    console.log(`Take Meds at ${time}`);
    // now = new Date().toLocaleTimeString('en-US', { hour12: false, 
    //     hour: "numeric", 
    //     minute: "numeric"});
    
    // if (String(time) == String(now)) {
    //     console.log("True");
    // }

    var inter = setInterval(function(){
        currentTime = getDateTime();
        if (String(time) == String(currentTime)) {
                 console.log("I did it?");
                 Push.create("Did you TakeYaPill?", {
                    body: "Hey mate! It's time for your medicine. Don't forget to drink some water also.",
                    icon: '/icon.png',
                    timeout: 8000,
                    onClick: function () {
                        window.focus();
                        this.close();
                    }
                });
                 clearInterval(inter);
             }
    }, 1000);
}

// function showNotification() {
//     const notification = new Notification("Take Meds", {
//         body: "Time to take meds"

//     });
// }

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = hour+':'+minute;  
     return dateTime;
}

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["medName"] = document.getElementById("medName").value;
    formData["medDesc"] = document.getElementById("medDesc").value;
    formData["medDate"] = document.getElementById("medDate").value;
    formData["medTime"] = document.getElementById("medTime").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("medList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.medName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.medDesc;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.medDate;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.medTime;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("medName").value = "";
    document.getElementById("medDesc").value = "";
    document.getElementById("medDate").value = "";
    document.getElementById("medTime").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("medName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("medDesc").value = selectedRow.cells[1].innerHTML;
    document.getElementById("medDate").value = selectedRow.cells[2].innerHTML;
    document.getElementById("medTime").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.medName;
    selectedRow.cells[1].innerHTML = formData.medDesc;
    selectedRow.cells[2].innerHTML = formData.medDate;
    selectedRow.cells[3].innerHTML = formData.medTime;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this Medicine ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("medList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("medName").value == "") {
        isValid = false;
        document.getElementById("medNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("medNameValidationError").classList.contains("hide"))
            document.getElementById("medNameValidationError").classList.add("hide");
    }
    return isValid;
}