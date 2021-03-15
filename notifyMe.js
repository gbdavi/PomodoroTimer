if (window.Notification&&Notification.permission !== "denied"){
	Notification.requestPermission(function(status){
		let n = new Notification('Timer', {
			body:'Acabou o tempo'
			//icon:''
		})
	})
}