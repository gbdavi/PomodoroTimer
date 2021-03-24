// ----- Configs -----
var timerIndication,
notificacions,
autoStartSequence,
dailyGoal,
soundOption,
volume,
pomodoroTime,
shortBreakTime,
longBreakTime;

const Storage = {
	get(key){
		return JSON.parse(localStorage.getItem(key))
	},

	set(configItems, valueItem){
		localStorage.setItem(configItems, JSON.stringify(valueItem))
	}
}

function setConfigs() {

	timerIndication = document.getElementById('chkbox1').checked;
	Storage.set('timerIndication', timerIndication);

	notificacions = document.getElementById('chkbox2').checked;
	Storage.set('notificacions', notificacions);

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

	(settingsContainer());
	(reset());
}	

if (Storage.get('userConfig') != "ready"){
	(setConfigs());
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
// ----- Teste de Audio -----

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

function settingsContainer() {
	document.querySelector('.overlay-box').classList.toggle('active');

	document.getElementById('chkbox1').checked = Storage.get('timerIndication');

	document.getElementById('chkbox2').checked = Storage.get('notificacions');

	document.getElementById('chkbox3').checked = Storage.get('autoStartSequence');

	document.getElementById('inputNumber1').value = Storage.get('dailyGoal');

	document.getElementById('option1').value = Storage.get('soundOption');

	document.getElementById('option2').value = Storage.get('volume');

	document.getElementById('inputNumber2').value = Storage.get('pomodoroTime');

	document.getElementById('inputNumber3').value = Storage.get('shortBreakTime');

	document.getElementById('inputNumber4').value = Storage.get('longBreakTime');
}

function  timer() {
	setTimeout(timerMath, 1000);
	function timerMath() {
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
				turn = 0;
			}
		}
	}
}

function timerVerify() {
	try {
		if (timerTurn == 0) {
			timerTurn = 1;
			(timer());
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
}


//Corrigir bugs (mais dificil kkk).
//Fazer o ciclo do Pomodoro com as pausas certas (easy)
//Fazer log das execuções dos tempos com data de inicio, finalização e quantidades de ciclos
//Adicionar notificação ao zerar o tempo(adicionar opção no painel de configuração).
//Ir salvando as versões no gitHub (O problema é não esquecer de fazer isso).
//Fazer estilo para mobile (Mais chato)