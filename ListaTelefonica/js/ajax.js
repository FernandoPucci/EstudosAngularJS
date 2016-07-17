var get = function(url, callback){
	console.log('chamou2');
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.onreadystatechange === 4){ //comunicacao com sucesso
			callback(xhr.responseText, xhr.status);
		}
	};
	xhr.open('GET', url);
	xhr.send(null);
};