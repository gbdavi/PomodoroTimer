// ----- Configs -----
var timerIndication,
notifications,
autoStartSequence,
dailyGoal,
soundOption,
volume,
pomodoroTime,
shortBreakTime,
longBreakTime;


//Armazenamento das config no navegador
const Storage = {
	get(key){
		return JSON.parse(localStorage.getItem(key))
	},

	set(configItems, valueItem){
		localStorage.setItem(configItems, JSON.stringify(valueItem))
	}
}


// ----- Injeção de log -----

var sessionLog,
startTimeLog,
endTimeLog

const inputLog = {
	sessionRequest() {
		if (pomodoroTurn == 1) {
			sessionLog = "Pomodoro"
		} else {
			if (shortBreakTurn == 1) {
				sessionLog = "Short Break"
			} else {
				if (longBreakTurn == 1) {
					sessionLog = "Long Break"
				}
			}
		}
	},


	timerMark() {
		splittedDate = Date().split(' ')
		dayWeek = splittedDate[0] == 'Sun' ? 'Sunday' : splittedDate[0] == 'Mon' ? 'Monday' : splittedDate[0] == 'Tue' ? 'Tuesday' : splittedDate[0] == 'Wed' ? 'Wednesday' : splittedDate[0] == 'Thu' ? 'Thursday' : splittedDate[0] == 'Fri' ? 'Friday' : splittedDate[0] == 'Sat' ? 'Saturday' : splittedDate[0]
		month = splittedDate[1] == 'Jan' ? 'January' : splittedDate[1] == 'Feb' ? 'February' : splittedDate[1] == 'Mar' ? 'March' : splittedDate[1] == 'Apr' ? 'April' : splittedDate[1] == 'May' ? 'May' : splittedDate[1] == 'Jun' ? 'June' : splittedDate[1] == 'Jul' ? 'July' : splittedDate[1] == 'Aug' ? 'August' : splittedDate[1] == 'Sep' ? 'September' : splittedDate[1] == 'Oct' ? 'October' : splittedDate[1] == 'Nov' ? 'November' : splittedDate[1] == 'Dec' ? 'December' : splittedDate[1]
		ordinal = splittedDate[2] == 1 ? 'st' : splittedDate[2] == 2 ? 'nd' : splittedDate[2] == 3 ? 'rd' : splittedDate[2] >= 4 ? 'th' : '';
		ampm = splittedDate[4].split(':')[0] >= 12 ? ' pm' : ' am'
		TimeLog = dayWeek + ', ' + month + ' ' + splittedDate[2] + ordinal + ' ' + splittedDate[3] + ', ' + splittedDate[4] + ampm;
		return TimeLog
	}
}

var logItems = Storage.get('logs')
var newLog,
arrayLogs

var logContainerLocate = document.querySelector('.logTable tbody')

const managementStorageLog = {
	addLog(){
		arrayLogs = Storage.get('logs')

		if (arrayLogs == undefined) {
			arrayLogs = []
		}

			newLog = {Session: sessionLog, Starts: startTimeLog, Ends: endTimeLog}

			arrayLogs.push(newLog)
			Storage.set('logs', arrayLogs)

			logItems = Storage.get('logs')
			app.refreshLogs()
			pomodoroTracker.pomodoroCounter()
			document.getElementById('cButton').disabled = false
	},

	clearLog(){
		arrayLogs = []
		Storage.set('logs', arrayLogs)
		logContainerLocate.innerHTML = `
			<tbody>nothing logged yet</tbody>
		`;
		pomodoroTracker.pomodoroCounter()
		document.getElementById('cButton').disabled = true
	}
}

const app = {

	createLogs(i){
		const html = `
			<td>${logItems[i].Session}</td>
			<td>${logItems[i].Starts}</td>
			<td>${logItems[i].Ends}</td>
			<td><input type="text" name=""></td>
		`

		const tr = document.createElement('tr')
			tr.innerHTML = html
			logContainerLocate.appendChild(tr)
	},

	refreshLogs(){
		logContainerLocate.innerHTML = `
			<th>Session</th>
			<th>Start time</th>
			<th>End time</th>
			<th>Description</th>
		`;
		if (logItems !== null){
			for (var i=0; i < logItems.length; i++){
				app.createLogs(i)
			}
		}
	}
}
//Contagem de Pomodoros concluidos
var pomodoros
var goalsContainerLocate = document.querySelector('.pomoGoalsContainer')

const pomodoroTracker = {
	pomodoroCounter(){
		pomodoros = 0
		if (Storage.get('logs') == null) {
			pomodoroTracker.addGoals()
		}
		else{		
			for (var i=0; i < Storage.get('logs').length; i++) {
				if (Storage.get('logs')[i].Session == 'Pomodoro' && Storage.get('logs')[i].Ends.split(',')[1] == inputLog.timerMark().split(',')[1]) {
					pomodoros++
				}
			}
			pomodoroTracker.addGoals()
		}
	},

	addGoals(){
		goalsContainerLocate.innerHTML = ''
		for (var i = 0; i < Number(Storage.get('dailyGoal')); i++) {		
			var createDiv = document.createElement("div");
			goalsContainerLocate.appendChild(createDiv).classList.add('pomoGoalsCircle');
		}
		pomodoroTracker.completedGoals()
	},

	completedGoals(){
		for (var i=0; i < pomodoros; i++){
			selectCompleted = goalsContainerLocate.children
			selectCompleted[i].classList.add('full')
		}
	}
}



if (logItems == null || logItems == undefined || logItems.length == 0) {
	console.log('clear')
	managementStorageLog.clearLog()	
}
else {
	console.log('refresh')
	app.refreshLogs()
	pomodoroTracker.pomodoroCounter()	
}

pomodoroTracker.pomodoroCounter()

//Definir Configurações
function setConfigs(value) {

	timerIndication = document.getElementById('chkbox1').checked;
	Storage.set('timerIndication', timerIndication);

	notifications = document.getElementById('chkbox2').checked;
	Storage.set('notifications', notifications);

	autoStartSequence = document.getElementById('chkbox3').checked;	
	Storage.set('autoStartSequence', autoStartSequence);

	dailyGoal = document.getElementById('inputNumber1').value;
	Storage.set('dailyGoal', dailyGoal);

	soundOption = document.getElementById('option1').value;
	Storage.set('soundOption', soundOption);

	volume = document.getElementById('option2').value;
	Storage.set('volume', volume);

	pomodoroTime = document.getElementById('inputNumber2').value;
	Storage.set('pomodoroTime', pomodoroTime);

	shortBreakTime = document.getElementById('inputNumber3').value;
	Storage.set('shortBreakTime', shortBreakTime);

	longBreakTime = document.getElementById('inputNumber4').value;
	Storage.set('longBreakTime', longBreakTime);

	Storage.set('userConfig', 'ready');

	if (value !== 'noOpen') {
		(settingsContainer());
	}
}	

if (Storage.get('userConfig') != "ready"){
	setConfigs('noOpen')
}

function resetConfigs() {
	document.getElementById('chkbox1').checked = true;

	document.getElementById('chkbox2').checked = true;

	document.getElementById('chkbox3').checked = false;	

	document.getElementById('inputNumber1').value = "1";

	document.getElementById('option1').value = "alarmwatch";

	document.getElementById('option2').value = "0.50";

	document.getElementById('inputNumber2').value = "25";

	document.getElementById('inputNumber3').value = "5";

	document.getElementById('inputNumber4').value = "10";

	(setConfigs());
}

function syncConfigContainer(){
	document.getElementById('chkbox1').checked = Storage.get('timerIndication');

	document.getElementById('chkbox2').checked = Storage.get('notifications');

	document.getElementById('chkbox3').checked = Storage.get('autoStartSequence');	

	document.getElementById('inputNumber1').value = Storage.get('dailyGoal');

	document.getElementById('option1').value = Storage.get('soundOption');

	document.getElementById('option2').value = Storage.get('volume');

	document.getElementById('inputNumber2').value = Storage.get('pomodoroTime');

	document.getElementById('inputNumber3').value = Storage.get('shortBreakTime');

	document.getElementById('inputNumber4').value = Storage.get('longBreakTime');
}

syncConfigContainer()

//----- Faq -----
function faqContainer(){
	document.querySelector('.overlay-box2').classList.toggle('active')
	document.getElementById('mainContent').classList.add('fixedSection')
	setTimeout(function() {document.querySelector('.content-box2').classList.toggle('transition');}, 0)
}

function closeFaqContainer(){
	document.querySelector('.content-box2').classList.toggle('transition')
	setTimeout(function() {document.getElementById('mainContent').classList.remove('fixedSection');}, 500)
	setTimeout(function() {document.querySelector('.overlay-box2').classList.toggle('active');}, 700)
}

// ----------------- Transição , display none depois de opacity

//----- Log -----
function logContainer(){
	document.querySelector('.overlay-box3').classList.toggle('active')
	document.getElementById('mainContent').classList.add('fixedSection')
	setTimeout(function() {document.querySelector('.content-box3').classList.toggle('transition');}, 0)
}

function closeLogContainer(){
	document.querySelector('.content-box3').classList.toggle('transition')
	setTimeout(function() {document.getElementById('mainContent').classList.remove('fixedSection');}, 500)
	setTimeout(function() {document.querySelector('.overlay-box3').classList.toggle('active');}, 700)
}



// ----- Testar Alarme -----

var soundSelectedTest;
var soundFileTest;
var volumeTest;


function soundFileLocateTest(){
	if (soundSelectedTest == "Alarm80s") {
		soundFileTest = document.getElementById("Alarm80s");
	} else {
		if (soundSelectedTest == "alarmclock") {
			soundFileTest = document.getElementById("alarmclock");
		} else {
			if (soundSelectedTest == "alarmwatch") {
				soundFileTest = document.getElementById("alarmwatch");
			} else {
				if (soundSelectedTest == "ding") {
					soundFileTest = document.getElementById("ding");
				} else {
					soundFileTest = document.getElementById("doorbell");
				}
			}
		}
	}
}

function soundTest(){
	if (soundFileTest == undefined){
		(soundFileLocateTest());
	}
	if (soundFileTest.duration > 0) {
		soundFileTest.pause();
		soundFileTest.currentTime = 0;
	}
	soundSelectedTest = document.getElementById('option1').value;
	(soundFileLocateTest());
	volumeTest = document.getElementById('option2').value;
	soundFileTest.volume = volumeTest;
	soundFileTest.play();
}

// ----- Reproduzir alarme -----

function alarm(){
	const soundSelected = Storage.get('soundOption');
	const volumeOption = Storage.get('volume');
	let soundFile = document.getElementById(soundSelected);
	soundFile.volume = volumeOption;
	soundFile.play();
}

// ----- Notificacoes -----

function notificationPermissionRequest(){
	if (Storage.get('notifications') == true) {
		console.log('notifications is allowed');
		if ("Notification" in window == true) {
			console.log('Notification is supported');
			if (Notification.permission == 'default') {
				console.log('notifications is default')
				Notification.requestPermission().then(function (permission) {
    			console.log(permission);
    			}
    			)
			}
		}
	}
}
(notificationPermissionRequest());

function browserNotificationPomodoro(){
	let title = 'Have a break!'
	let body = '00:00'
	let icon = './tomatoIcon.png'
	let noti = new Notification(title, {body,icon})
}

function browserNotificationBreak(){
	title = 'Your time is up!'
	body = '00:00'
	icon = './tomatoIcon.png'
	noti = new Notification(title, {body,icon})
}

// ---------------------------------------------------
document.getElementById('idPomodoro').classList.add('active');

var pomodoroTurn = 1;
var shortBreakTurn = 0;
var longBreakTurn = 0;

var min = Storage.get('pomodoroTime');
var minutes;
var numberMinutes = min.length;

if (numberMinutes == 1) {
	minutes = "0" + min;
} else {
	minutes = min;
}

var sec = "0";
var seconds;
var numberSeconds = sec.length;

if (numberSeconds == 1) {
	seconds = "0" + sec;
} else {
	seconds = sec;
}

document.getElementById('display').innerHTML = minutes + ":" + seconds;

var turn= 0;

function turnOn() {
	if (turn == 1){}
	else {
		turn = 1;
		(timer());
	}
}

function turnOff() {
	turn = 0;
}

function reset() {
	if (pomodoroTurn == 1) {
		turn = 0;
		min = Storage.get('pomodoroTime');
		sec = 0;

		(numbersTime());

		document.getElementById('display').innerHTML = minutes + ":" + seconds;
	}

	if (shortBreakTurn == 1) {
		turn = 0;
		min = Storage.get('shortBreakTime');
		sec = 0;

		(numbersTime());

		document.getElementById('display').innerHTML = minutes + ":" + seconds;
	}

	if (longBreakTurn == 1) {
		turn = 0;
		min = Storage.get('longBreakTime');
		sec = 0;

		(numbersTime());

		document.getElementById('display').innerHTML = minutes + ":" + seconds;
	}
	document.getElementById('titleDisplay').innerHTML = "TomatoTimer";
}

function numbersTime() {
	//Transformação de "min" em string e contagem de caracteres
	numberMinutes = min.toString().length;

	//Formatacao dos minutos
	if (numberMinutes == 1) {
		minutes = "0" + min;
		} 
		else {
			minutes = min;
		}

	//Transformação de "sec" em string e contagem de caracteres
	numberSeconds = sec.toString().length;

	//Formatacao dos segundos
	if (numberSeconds == 1) {
		seconds = "0" + sec;
	} 
	else {
		seconds = sec;
	}
}

function activeSettingsContainer(){
	document.querySelector('.overlay-box').classList.toggle('active');
	document.getElementById('mainContent').classList.add('fixedSection')
	setTimeout(function() {document.querySelector('.content-box').classList.toggle('transition')}, 0);
}

function settingsContainer() {
	document.querySelector('.content-box').classList.toggle('transition')
	setTimeout(function() {document.getElementById('mainContent').classList.remove('fixedSection');}, 500)
	setTimeout(function() {document.querySelector('.overlay-box').classList.toggle('active');}, 700);

	document.getElementById('chkbox1').checked = Storage.get('timerIndication');

	document.getElementById('chkbox2').checked = Storage.get('notifications');

	document.getElementById('chkbox3').checked = Storage.get('autoStartSequence');

	document.getElementById('inputNumber1').value = Storage.get('dailyGoal');

	document.getElementById('option1').value = Storage.get('soundOption');

	document.getElementById('option2').value = Storage.get('volume');

	document.getElementById('inputNumber2').value = Storage.get('pomodoroTime');

	document.getElementById('inputNumber3').value = Storage.get('shortBreakTime');

	document.getElementById('inputNumber4').value = Storage.get('longBreakTime');

	app.refreshLogs()
	pomodoroTracker.pomodoroCounter()
}

var isWorking = 0;

function  timer() {
	if (inputLog.sessionRequest() == undefined) {
		inputLog.sessionRequest()
		startTimeLog = inputLog.timerMark()
	}

	if (isWorking == 0) {
		isWorking = 1
		setTimeout(timerMath, 1000);
		function timerMath() {
			isWorking = 0
			if (turn == 1) {
				if (min + sec != 0) {

					sec -= 1;

					if (sec < 0) {
						sec = 59;
						min -= 1;
					}

					//formatação dos numeros
					(numbersTime());
							
					//Display
					document.getElementById('display').innerHTML = minutes + ":" + seconds;
					
					if (Storage.get("timerIndication") == true) {
						document.getElementById('titleDisplay').innerHTML = "(" + minutes + ":" + seconds + ")" + " " + "TomatoTimer";
					}
					else {
						document.getElementById('titleDisplay').innerHTML = "TomatoTimer";
					}

					(timer());	
				}
				else {
					document.getElementById('titleDisplay').innerHTML = "TomatoTimer";
					(alarm());

					endTimeLog = inputLog.timerMark()
					managementStorageLog.addLog()

					turn = 0;
					if (pomodoroTurn == 1){
						(browserNotificationPomodoro())
					}
					if (shortBreakTurn == 1 || longBreakTurn ==1){
						(browserNotificationBreak())
					}
					if (Storage.get('autoStartSequence') == true) {
						timerCycle()
					}
				}
			}
		}
	}
}

function timerVerify() {
	try {
		if (timerTurn == 0) {
			timerTurn = 1
			timer()

		}
		else {	
			(timer());
		}
	}
	catch(err) {}
}

function pomodoro() {
	document.getElementById('idLongBreak').classList.remove('active');
	document.getElementById('idShortBreak').classList.remove('active');
	document.getElementById('idPomodoro').classList.add('active');
	min = Storage.get('pomodoroTime');
	sec = 0;

	(numbersTime());

	document.getElementById('display').innerHTML = minutes + ":" + seconds;

	(turnOn());

	pomodoroTurn = 1;
	shortBreakTurn = 0;
	longBreakTurn = 0;

	(timerVerify());

	inputLog.sessionRequest()
	startTimeLog = inputLog.timerMark()
}

function shortBreak(){
	document.getElementById('idLongBreak').classList.remove('active');
	document.getElementById('idPomodoro').classList.remove('active');
	document.getElementById('idShortBreak').classList.add('active');
	min = Storage.get('shortBreakTime');
	sec = 0;

	(numbersTime());

	document.getElementById('display').innerHTML = minutes + ":" + seconds;

	(turnOn());

	pomodoroTurn = 0;
	shortBreakTurn = 1;
	longBreakTurn = 0;

	(timerVerify());

	inputLog.sessionRequest()
	startTimeLog = inputLog.timerMark()
}

function longBreak(){
	document.getElementById('idPomodoro').classList.remove('active');
	document.getElementById('idShortBreak').classList.remove('active');
	document.getElementById('idLongBreak').classList.add('active');
	min = Storage.get('longBreakTime');
	sec = 0;

	(numbersTime());

	document.getElementById('display').innerHTML = minutes + ":" + seconds;

	(turnOn());

	pomodoroTurn = 0;
	shortBreakTurn = 0;
	longBreakTurn = 1;
	
	(timerVerify());

	inputLog.sessionRequest()
	startTimeLog = inputLog.timerMark()
}

var countTimerCycle = 0;
var cycleConfig = 0;
var countLoopCycle;

function timerCycle() {
	countTimerCycle++
	if (cycleConfig == 0) {
		if (pomodoroTurn == 1) {
			countTimerCycle = 2
			cycleConfig = 1
		}
		if (shortBreakTurn == 1 || longBreakTurn == 1) {
			countTimerCycle = 1
			cycleConfig = 1
		}
		}
	if (countTimerCycle == 1 || countTimerCycle == 3 || countTimerCycle == 5 || countTimerCycle == 7) {
		console.log('pomodoro')
		pomodoro()
	}
	if (countTimerCycle == 2 || countTimerCycle == 4 || countTimerCycle == 6) {
		console.log('shortBreak')
		shortBreak()
	}
	if (countTimerCycle == 8) {
		console.log('longBreak')
		longBreak()
		countTimerCycle = 0
	}
}


// Atalhos de Teclado
window.addEventListener('keydown', (e) => {
	if(e.keyCode == 32 && e.target == document.body) {
    	e.preventDefault();
  	}
	if (!e.repeat) {
		switch(e.key){
			case 'P' :
				pomodoro()
				break;
			case 'S' :
				shortBreak()
				break;
			case 'L' :
				longBreak()
				break;
			case 'R' :
				reset()
				break;
			case ' ' :
				if (turn == 1) {
					turnOff()
				}
				else {
					turnOn()
				}
				console.log('Space')
				break;
			default: break;
		}
	}
	else {
		switch(e.key){
			case 'P' :
				pomodoro()
				break;
			case 'S' :
				shortBreak()
				break;
			case 'L' :
				longBreak()
				break;
			case 'R' :
				reset()
				break;
			case ' ' :
				break;
			default: break;
		}
	}
})

//linha 270 terminar

//Adicionar atalho de teclado

//Salvar descrição dos logs quando atualizar pagina

//Possivel modificação de design https://tomatoi.st/1j8pssa

//Ir salvando as versões no gitHub (O problema é não esquecer de fazer isso).

//Fazer estilo para mobile (Mais chato)