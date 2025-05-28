<div style="text-align:center;"><img src="images/GUI_exe.png" alt="Exe icon" width="100"></div>

# User Guide: Giraffe Warmer Maintenance Application 

## Table of Contents
[1. Installation](#installation)<br>
[2. Interface Overview](#interface-overview)<br>
[3. Basic Operations](#basic-operations)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Filtering Serial Numbers](#filtering-serial-numbers)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Performing Actions](#performing-actions)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Viewing Maintenance Logs](#viewing-maintenance-logs)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Submitting Maintenance Checks](#submitting-maintenance-checks)<br>
[4. Error Handling](#error-handling)<br>
[5. Exiting the Application](#exiting-the-application)<br>
[6. Troubleshooting](#troubleshooting)<br>

<a id="installation"></a>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
## 1. Installation
- **Executable File**: Double-click on the `.exe` file provided to launch the application. 
- **Interface Overview**: Upon launch, you'll see the main window with various components.

<a id="interface-overview"></a>

## 2. Interface Overview

- **Title**: Displays "GE Giraffe Warmer Maintenance" at the top.
- **Serial Numbers List**: Lists all managed serial numbers and their status.
- **Filter and Action Buttons**: Buttons above the serial number list for filtering and to the right of the list for actions on the serial numbers.
- **Logs and Maintenance Sections**: Sections for viewing logs and performing maintenance; located below the serial number list.<br>
 <img src="images/GUI.png" alt="GUI Interface" width="400">
<br>

<a id="basic-operations"></a>

## 3. Basic Operations

<a id="filtering-serial-numbers"></a>

### **Filtering Serial Numbers**

- **Show All**: Display all serial numbers and date of next maintenance. Due maintenance is listed in red.
<img src="images/GUI_showall.png" alt="Filtering Serial Numbers - show all" width="450">
<br>

- **Show Due Maintenance**: Filter and display only serial numbers due for maintenance.
<img src="images/GUI_showdue.png" alt="Filtering Serial Numbers - show duw" width="450">
<br>
<a id="performing-actions"></a>

### **Performing Actions**
1. Click **Add Serial Number** to add a serial number to the list. Adding is logged on **Save**.   
 <img src="images/GUI_add.png" alt="Add Serial Number" width="725">

or  

1. Select a serial number by clicking it.
2. Click the button corresponding to the desired action. Actions are logged. 
 <img src="images/GUI_actions.png" alt="Actions" width="450"> 
<br>

 - **Retire Serial Number**: Mark a serial number as retired. Can no longer maintenance.
 	You cannot retire a serial number that is already retired.
 <img src="images/GUI_alreadyretired.png" alt="Already Retired" width="550">
<br><br><br><br><br><br><br><br><br><br><br><br>

 - **Reactivate Serial Number**: Activate a retired serial number. Remove from retirement.
 You cannot reactivate a serial number that is already active.
 <img src="images/GUI_alreadyactive.png" alt="Already Active" width="550">
<br>

 - **Delete Serial Number**: Remove a serial number from the list. Must confirm.
 <img src="images/GUI_confirmdelete.png" alt="Confirm Delete" width="650">
<br><br><br><br><br><br><br><br><br><br><br>
<a id="viewing-maintenance-logs"></a>

### **Viewing Maintenance Logs**

- **View All Logs**: See all maintenance logs. Failed checks will log in red. Scroll over or press the right arrow key on your keyboard to see entire log.
<img src="images/GUI_alllog.png" alt="All Maintenance Logs" width="1000">
<br>
- **View Serial Logs**: View logs for a specific serial number. 
<img src="images/GUI_seriallog.png" alt="Serial Log" width="1000">
<br>

- If a serial number does not have a log, it will be blank.
<img src="images/GUI_noseriallog.png" alt="Empty Serial Log" width="1000">
<br>

- Must select serial number first, or will receive an error.
<img src="images/GUI_mustselect.png" alt="Select first for Serial Log" width="600">
<br>

### **Submitting Maintenance Checks**

1. Select a serial number.

2. Click **Perform Maintenance**.
<br>
<img src="images/GUI_almostmaintenance.png" alt="Perform maintenance" width="450">
<br><br><br><br><br><br><br>

3. Enter values for maintenance checks. Can verify the values will pass the check by clicking **Check** beside each entry. These checks are not logged.<br>
<img src="images/GUI_performmaintenance1.png" alt="Perform maintenance" width="450">
<br>

  - Calibration Check fail
<br>
  <img src="images/GUI_calibrationcheck1.png" alt="Calibration Check" width="450">
<br>

  - Software Update fail
<br>
  <img src="images/GUI_softwarecheck1.png" alt="Software Check" width="450">
<br>

  - Sensor Check fail
<br>
  <img src="images/GUI_sensorcheck1.png" alt="Sensor Check" width="450">
<br>

4. Click **Submit Maintenance**. Maintenance is logged. If a test is failed, it will still submit and be logged.
<img src="images/GUI_submitbad.png" alt="Perform maintenance - Submit with fail" width="450">
<br>
 - The serial number will remain red and stay in the **Due Maintenance** list when filtered.
 <img src="images/GUI_afterbad.png" alt="Failed maintenance" width="450">
<br>
 - Check the logs to determine reason for fail. This is an example of checking the **serial log**.
 <img src="images/GUI_seriallogafterbad.png" alt="Perform maintenance - Submit with fail" width="1000">
<br>
 - You may need to scroll over to determine the reason for fail.
 <img src="images/GUI_seriallogafterbad_scroll.png" alt="Perform maintenance - Submit with fail" width="450">
  - Redo the maintenance according to machine manual instructions for reason of fail (recalibration, etc.)
  - Check logs after successful maintenance.

   - You can check the **serial log**:
   <img src="images/GUI_seriallogaftergood.png" alt="Perform maintenance - view serial logs" width="1000">
<br>
   - You can also check by clicking **View All Logs**
   <img src="images/GUI_logaftergood.png" alt="Perform maintenance - view all logs" width="1000">
<br>

 - If all tests are passed, the serial number is removed from the Due Maintenance list and no longer red.
 <img src="images/GUI_submitgood.png" alt="Perform maintenance - Submit sucessful" width="450">
<br><br><br><br><br><br><br><br>

 - **Maintenance Frequency**: Assumed one year from last maintenance. If you try to perform maintenance early, you will need to confirm.
 <img src="images/GUI_earlymaintenance.png" alt="Confirm early maintenance" width="750">
<br>

 - **Retirement**: You cannot perform maintenance on retired serial numbers.
 <img src="images/GUI_retired.png" alt="No maintenance for retired" width="700">

<a id="error-handling"></a>

## 4. Error Handling

- **Confirmation Dialogs**: Confirms critical actions like deleting a serial number. See [Performing Actions](#performing-actions).

- **Invalid Actions**: Alerts for attempting to perform actions without first selecting a serial number, or trying to perform maintenance on retired serial numbers. See [Performing Actions](#performing-actions).

- **Invalid Inputs**: Alerts for incorrect dates, formats and, serial numbers when adding a serial number.
	- Invalid dates
<br>
	<img src="images/GUI_futuredate.png" alt="Future date" width="300">
	<br>

	- Invalid formats
<br>
	<img src="images/GUI_invaliddate.png" alt="Invalid date" width="300">
	<br>

	- Invalid serial number
<br>
	<img src="images/GUI_exists.png" alt="Serial number exists" width="400">

<br>

<a id="exiting-the-application"></a>

## 5. Exiting the Application

- All actions, maintenance, logs, and new serial numbers are automatically saved.
- Close the window by clicking the `x` in the top right corner.

<a id="troubleshooting"></a>

## 6. Troubleshooting

- **Database Errors**: The database `giraffe_warmer_maintenance.db` is generated for accessibility.
- **GUI Issues**: 
 	1. Close the message box window and try again.
 	2. Restart the application.