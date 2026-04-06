// FETCH CODE
let activeFile = "";
let activeFileData = "";
let code = document.querySelector('.code-content');
let preview = document.querySelector('.preview-content');
let body = document.querySelector('body');
async function initDemo() {
	const pageHref = window.location.search;
	const searchParams = new URLSearchParams(pageHref.substring(pageHref.indexOf('?')));
	if (searchParams.has('file')) {
		activeFile = searchParams.get('file');
	} else {
		return
	}
	try {
		let response = await fetch(`./${activeFile}`);
		response.text().then((html) => {
			activeFileData = html;
			code.innerText = activeFileData;
			preview.srcdoc = activeFileData;
			let activeElement = document.querySelector(`[data-file="${activeFile}"]`);
			activeElement.dataset.active = 1;
			body.dataset.active = 1;
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

// COLORS
let invert = false;
function invertColors() {
	invert = !invert;
	body.dataset.invert = invert;
}
function changeColors() {
	if (Math.random() < .5) {
		body.style.setProperty('--primary', `oklch(100% 0.25 ${Math.random()*360})`);
		body.style.setProperty('--secondary', `oklch(50% 0.25 ${Math.random()*360})`);
	} else {
		body.style.setProperty('--primary', `oklch(50% 0.25 ${Math.random()*360})`);
		body.style.setProperty('--secondary', `oklch(100% 0.25 ${Math.random()*360})`);
	}
}
function lightMode() {
	body.style.setProperty('--primary', `white`);
	body.style.setProperty('--secondary', `black`);
}
function darkMode() {
	body.style.setProperty('--primary', `black`);
	body.style.setProperty('--secondary', `white`);
}

// FULLSCREEN PANELS
function togglePanel(id) {
	let panel = document.querySelector("#"+id);
	if (parseInt(panel.dataset.active) == 1) {
		panel.dataset.active = 0;
	} else {
		panel.dataset.active = 1;
	}
}

// NAV SETTINGS
function randomFile() {
	let files = document.querySelectorAll('.nav-links a');
	let randomFile = files[Math.floor(Math.random()*files.length)];
	window.location.href = `${randomFile.getAttribute('href')}`;
}

// CODE SETTINGS
let textWrap = false;
function wrapText() {
	textWrap = !textWrap;
	code.dataset.wrap = textWrap;
}
function resetCode() {
	location.reload();
}
function downloadCode() {
    const blob = new Blob([code.innerText], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = activeFile;
    link.click();
    URL.revokeObjectURL(link.href);
}

// PREVIEW SETTINGS
function rerunCode() {
	preview.srcdoc = code.innerText;
}
function newTab() {
	window.open(activeFile, '_blank').focus()
}

// MOBILE
function hideMobile() {
	let mobile = document.querySelector('.mobile-notice');
	mobile.style.display = 'none';
}