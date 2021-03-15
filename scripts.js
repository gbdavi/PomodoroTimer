

document.getElementById('idPomodoro').classList.add('active');

var pomodoroTurn = 1;
var shortBreakTurn = 0;
var longBreakTurn = 0;

var min = "25";
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
		min = 25;
		sec = 0;

		(numbersTime());

		document.getElementById('display').innerHTML = minutes + ":" + seconds;
	}

	if (shortBreakTurn == 1) {
		turn = 0;
		min = 5;
		sec = 0;

		(numbersTime());

		document.getElementById('display').innerHTML = minutes + ":" + seconds;
	}

	if (longBreakTurn == 1) {
		turn = 0;
		min = 10;
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
				document.getElementById('titleDisplay').innerHTML = "(" + minutes + ":" + seconds + ")" + " " + "TomatoTimer";
				(timer());				
			}
			else {
				document.getElementById('beep').play();
				document.getElementById('titleDisplay').innerHTML = "TomatoTimer";
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
	min = 25;
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
	min = 5;
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
	min = 10;
	sec = 0;

	(numbersTime());

	document.getElementById('display').innerHTML = minutes + ":" + seconds;

	(turnOn());

	pomodoroTurn = 0;
	shortBreakTurn = 0;
	longBreakTurn = 1;
	
	(timerVerify());
}

//Corrigir bugs (mais dificil kkk)
//Criar a aba settings
//Adicionar notificação ao zerar o tempo(adicionar opção no painel de configuração).
//Salvar no gitHub.