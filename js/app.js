//burger
let burger = document.querySelector('.header__burger');
let cross = document.querySelector('.header__top-cross');
let mobMenu = document.querySelector('.header__mobile');

let body = document.querySelector('body');

burger.onclick = function () {
	body.classList.add('opened');

	body.classList.add('scroll-hidden');
};
cross.onclick = function () {
	body.classList.remove('opened');

	body.classList.remove('scroll-hidden');
};

const tabs = document.getElementById('tabs');
const content = document.querySelectorAll('.content__item');

const changeClass = (el, tabs) => {
	for (let i = 0; i < tabs.children.length; i++) {
		tabs.children[i].classList.remove('active');
	}
	el.classList.add('active');
};

const listener = (tabs, content) => {
	tabs.addEventListener('click', (e) => {
		const currentTab = e.target.dataset.btn;
		changeClass(e.target, tabs);
		for (let i = 0; i < content.length; i++) {
			content[i].classList.remove('active');
			if (content[i].dataset.content === currentTab) {
				content[i].classList.add('active');
			}
		}
	});
};

listener(tabs, content);

// End of Tabs

const getTopElement = (element) => {
	let clientTop = document.documentElement.clientTop;
	return element.getBoundingClientRect().top + window.pageYOffset - clientTop;
};

// End Of getTopElement

const sectionWordStart = getTopElement(document.querySelector('.word')) - 400;
const sectionWordContent = sectionWordStart;
const sectionWordEnd = sectionWordStart + sectionWordContent;
let words = document.querySelectorAll('.word__span');

const oneWord = sectionWordContent;
const twoWord = sectionWordContent + 100;
const threeWord = sectionWordContent + 200;
const fourWord = sectionWordContent + 300;
const fiveWord = sectionWordContent + 400;
const sixWord = sectionWordContent + 500;
const sevenWord = sectionWordContent + 600;

window.addEventListener('resize', () => {
	window.removeEventListener('scroll', wordListeneer);

	const sectionWordStart = getTopElement(document.querySelector('.word')) - 400;
	const sectionWordContent = sectionWordStart;
	const sectionWordEnd = sectionWordStart + sectionWordContent;

	const oneWord = sectionWordContent;
	const twoWord = sectionWordContent + 100;
	const threeWord = sectionWordContent + 200;
	const fourWord = sectionWordContent + 300;
	const fiveWord = sectionWordContent + 400;
	const sixWord = sectionWordContent + 500;
	const sevenWord = sectionWordContent + 600;

	wordListeneer(
		sectionWordStart,
		sectionWordContent,
		sectionWordEnd,
		words,
		oneWord,
		twoWord,
		threeWord,
		fourWord,
		fiveWord,
		sixWord,
		sevenWord
	);
});

function wordListeneer(
	sectionWordStart,
	sectionWordContent,
	sectionWordEnd,
	words,
	oneWord,
	twoWord,
	threeWord,
	fourWord,
	fiveWord,
	sixWord,
	sevenWord
) {
	window.addEventListener('scroll', () => {
		if (oneWord <= window.pageYOffset && twoWord > window.pageYOffset) {
			words[0].classList.add('active');
		} else words[0].classList.remove('active');

		if (twoWord <= window.pageYOffset && threeWord > window.pageYOffset) {
			words[1].classList.add('active');
		} else words[1].classList.remove('active');

		if (threeWord <= window.pageYOffset && fourWord > window.pageYOffset) {
			words[2].classList.add('active');
		} else words[2].classList.remove('active');

		if (fourWord <= window.pageYOffset && fiveWord > window.pageYOffset) {
			words[3].classList.add('active');
		} else words[3].classList.remove('active');

		if (fiveWord <= window.pageYOffset && sixWord > window.pageYOffset) {
			words[4].classList.add('active');
		} else words[4].classList.remove('active');

		if (sixWord <= window.pageYOffset && sevenWord > window.pageYOffset) {
			words[5].classList.add('active');
		} else words[5].classList.remove('active');

		if (
			sevenWord <= window.pageYOffset &&
			sevenWord + 100 > window.pageYOffset
		) {
			words[6].classList.add('active');
		} else words[6].classList.remove('active');
	});
}

wordListeneer(
	sectionWordStart,
	sectionWordContent,
	sectionWordEnd,
	words,
	oneWord,
	twoWord,
	threeWord,
	fourWord,
	fiveWord,
	sixWord,
	sevenWord
);

const constellation = (element) => {
	window.addEventListener('scroll', (e) => {
		element.style.setProperty('--rotation', window.scrollY);
	});
};

document.querySelectorAll('.constellation').forEach(constellation);

const navbar = document.querySelector('.header');

window.onscroll = function () {
	const top = window.scrollY;
	if (top == 0) {
		navbar.classList.remove('header-background');
	} else {
		navbar.classList.add('header-background');
	}
};

const formEl = document.getElementById('form');
const emailEl = document.getElementById('email');
const buttonEl = document.getElementById('button');
const loaderEl = document.getElementById('loader');
const checkedEl = document.getElementById('checked');

formEl.addEventListener('submit', async (event) => {
	event.preventDefault();
	console.log('submitted', emailEl.value);

	// сменить текст кнопки
	buttonEl.innerHTML =
		'<div id="loader" class="lds-ring"><div></div><div></div><div></div><div></div></div>';

	await fetch('https://api-eu.customer.io/v1/webhook/a5a02b55d37837cb', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: emailEl.value,
			createdAt: new Date().toISOString(),
			formName: 'Site newsletter form',
		}),
	});

	// сменить текст кнопки
	buttonEl.innerHTML = `<svg id="checked" width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.7121 0.507124C26.4675 1.21537 26.5058 2.40194 25.7976 3.1574L10.5632 19.4074C10.2087 19.7855 9.71358 20 9.19532 20C8.67705 20 8.1819 19.7855 7.82744 19.4074L1.38212 12.5324C0.67388 11.7769 0.712156 10.5904 1.46762 9.88212C2.22308 9.17388 3.40964 9.21216 4.11789 9.96762L9.19532 15.3835L23.0618 0.592616C23.7701 -0.162844 24.9566 -0.20112 25.7121 0.507124Z" fill="#3A3A3A"/></svg>`;

	// очистить инпут
	setTimeout(() => {
		buttonEl.innerHTML = 'Subscribe';
		emailEl.value = '';
	}, 4 * 1000);
});
