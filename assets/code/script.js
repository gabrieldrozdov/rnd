let activeDemo = "";
let activeDemoData = "";
let code = document.querySelector('.code');
let preview = document.querySelector('.preview');
let body = document.querySelector('body');
async function initDemo() {
	const pageHref = window.location.search;
	const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf('?')));
	if (searchParams.has('demo')) {
		activeDemo = searchParams.get('demo');
	} else {
		return
	}
	try {
		let response = await fetch(`./${activeDemo}`);
		response.text().then((html) => {
			activeDemoData = html;
			code.innerText = activeDemoData;
			preview.srcdoc = activeDemoData;
			let activeElement = document.querySelector(`[data-demo="${activeDemo}"]`);
			activeElement.dataset.active = 1;
			changeColors();
		});
	}
	catch(e) {
		alert("404");
	}
}
initDemo();

code.addEventListener('input', () => {
	preview.srcdoc = code.innerText;
})

let fontSize = 10;
function changeFontSize() {
	if (fontSize == 10) {
		fontSize = 15;
	} else if (fontSize == 15) {
		fontSize = 20;
	} else {
		fontSize = 10;
	}
	body.style.setProperty('--font-size', `${fontSize}px`);
}

let invert = false;
function invertColors() {
	invert = !invert;
	body.dataset.invert = invert;
}

function changeColors() {
	let r1 = Math.round(Math.random()*255);
	let g1 = Math.round(Math.random()*255);
	let b1 = Math.round(Math.random()*255);
	let r2 = 255-r1;
	let g2 = 255-g1;
	let b2 = 255-b1;
	body.style.setProperty('--primary', `oklch(100% 0.25 ${Math.random()*360})`);
	body.style.setProperty('--secondary', `oklch(50% 0.25 ${Math.random()*360})`);
}

function downloadDemo() {
    const blob = new Blob([code.innerText], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = activeDemo;
    link.click();
    URL.revokeObjectURL(link.href);
}

function newTab() {
	window.open(activeDemo, '_blank').focus()
}