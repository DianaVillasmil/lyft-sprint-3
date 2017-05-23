const tablero = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

const ANCHO = tablero[0].length;
const ALTO = tablero.length;
const MIN_X = 0;
const MAX_X = ANCHO - 1;
const MIN_Y = 0;
const MAX_Y = ALTO - 1;

const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

const phone = document.getElementById('phone');
const become = document.getElementById('become');
const formulario = document.getElementById('formulario');
const xCoord = document.getElementById('x-coord');
const yCoord = document.getElementById('y-coord');
const start = document.getElementById('start');

become.addEventListener('click', register);
start.addEventListener('click', comenzar);

var auto;
var terminado = false;

function Auto(posicion_x, posicion_y) {

	function marcarTablero(x,y) {
		tablero[y][x] = 1;
		setTimeout(function(){
			dibujarTablero();
		},0);
		
	}

	this.posicion_x = posicion_x;
	this.posicion_y = posicion_y;	
	marcarTablero(posicion_x, posicion_y);

	this.avanzar = function(){
		if(this.posicion_y < MAX_Y) {
			this.posicion_y++;
		}
		marcarTablero(this.posicion_x, this.posicion_y);
	}
	this.ir_izquierda = function() {
		if(this.posicion_x > MIN_X) {
			this.posicion_x--;
		}
		marcarTablero(this.posicion_x, this.posicion_y);
	}
	this.ir_derecha = function() {
		if(this.posicion_x < MAX_X) {
			this.posicion_x++;
		}
		marcarTablero(this.posicion_x, this.posicion_y);
	}
	this.retroceder = function() {
		if(this.posicion_y > MIN_Y) {
			this.posicion_y--;
		}
		marcarTablero(this.posicion_x, this.posicion_y);
	}
}

function comenzar(event){
	if (xCoord.value != '' && yCoord.value != '') {
		const x = parseInt(xCoord.value);
		const y = parseInt(yCoord.value);

		if (x >= MIN_X && x <= MAX_X && y >= MIN_Y && y <= MAX_Y) {
			auto = new Auto(x,y);
			window.addEventListener('keydown', checkKey);
		} else {
			alert('Coordenadas inválidas');
		}
	} else {
		alert('Coordenadas X y Y requeridas');
	}
	
}

function dibujarTablero(){
	limpiarFormulario();
	const table = document.createElement('table');

	var lleno = !terminado;

	tablero.forEach(function(fila,y){
		const tr = document.createElement('tr');

		fila.forEach(function(celda,x){
			const td = document.createElement('td');
			switch (tablero[y][x]) {
				case 0:
					td.setAttribute('class', 'virgen');
					lleno = false;
					break;
				case 1:
					td.setAttribute('class', 'visitado');
					break;
				default:
					break;
			}

			if (auto.posicion_x == x && auto.posicion_y == y) {
				td.setAttribute('class', 'auto');
			}

			tr.appendChild(td);
		});
		table.appendChild(tr);
	});

	formulario.appendChild(table);

	if (lleno) {
		terminado = true;
		setTimeout(function(){
			alert ('Felicidades, has llenado el tablero');
		},0)
		
	}
}

function limpiarFormulario(){
	while (formulario.hasChildNodes()) {
		formulario.removeChild(formulario.lastChild);
	}
}	

function checkKey(e) {

    e = e || window.event;

    switch (e.keyCode) {
    	case LEFT_ARROW:
    		e.preventDefault();
    		e.stopPropagation();
    		auto.ir_izquierda();
    		return false;
    		break;
    	case UP_ARROW:
    		e.preventDefault();
    		e.stopPropagation();
    		auto.retroceder();
    		return false;
    		break;
    	case RIGHT_ARROW:
    		e.preventDefault();
    		e.stopPropagation();
    		auto.ir_derecha();
    		return false;
    		break;
    	case DOWN_ARROW:
    		e.preventDefault();
    		e.stopPropagation();
    		auto.avanzar();
    		return false;
    		break;
    	default:
    		break;
    }

    return false;

}

function register(){
	if (phone.value != '') {
		if (parseInt(phone.value.trim()).toString().length == 9 && phone.value.trim().length == 9) {			
			alert('Gracias por registrarte!');
			phone.value = '';
		} else {
			alert('El número debe contener 9 dígitos');
		}
	} else {
		alert('Telféfono móvil requerido');
	}
}