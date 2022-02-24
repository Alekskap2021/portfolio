window.addEventListener(`DOMContentLoaded`, (e) => {
	e.preventDefault();

	//fixed menu animation
	function setMenuAnimation() {
		const clientW = document.documentElement.clientWidth,
			menuW = +window.getComputedStyle(document.querySelector('.menu')).width.slice(0, -2),
			menu = document.querySelector('.menu');

		window.addEventListener(`scroll`, () => {
			if (window.pageYOffset > 0) {
				menu.style.setProperty(`--transform-menu-divider`, `scaleX(${(clientW / menuW).toFixed(3)})`);
			} else {
				menu.style.setProperty(`--transform-menu-divider`, `scaleX(1)`);
			}
		});
	}
	setMenuAnimation();
	//

	//function for get sections height
	function getHeightStyle(elem) {
		const h = +window.getComputedStyle(document.querySelector(elem)).height.slice(0, -2);
		return h;
	}
	//

	//padding for anchor-link
	if (document.documentElement.clientWidth > 767) {
		document.querySelector('html').style.scrollPaddingTop = `${(getHeightStyle('.menu') - 1)}px`;
	}
	//

	//function for change menu-item styles
	function changeMenuItem(menu) { //where menu is the height of the fixed menu
		window.addEventListener(`scroll`, () => {
			const footerH = getHeightStyle(`footer`),
				scrollTop = window.pageYOffset,
				clientH = document.documentElement.clientHeight,
				scrollH = document.documentElement.scrollHeight,
				sections = document.querySelectorAll('section');


			sections.forEach(section => { //switch active class on link
				if (section.getBoundingClientRect().y - menu <= 0 || clientH + scrollTop >= scrollH - footerH) {
					document.querySelectorAll('.nav-menu a').forEach(link => {
						link.classList.remove(`active`);
						if (section.getAttribute(`id`) == link.getAttribute(`data`)) {
							link.classList.add(`active`);
						}
					});
				}
			});
		});
		document.querySelectorAll('.nav-menu a').forEach(link => { //close menu on link click
			link.addEventListener(`click`, () => {
				if (document.querySelector('.menu').classList.contains(`mobile-active`)) {
					document.querySelector('.menu').classList.remove(`mobile-active`);
					document.querySelector('.mobile-burger').classList.remove(`mobile-active`);
					document.querySelector('body').style.overflow = ``;
				}
			});
		});
	}

	if (document.documentElement.clientWidth > 767) {
		changeMenuItem(getHeightStyle(`.menu`));
	} else {
		changeMenuItem(1);
	}


	//constructor to quickly add and change skills cards
	function skills() {
		class skillsCard {
			constructor(logoSrc, logoAlt, imgDescr, parent) {
				this.logoSrc = logoSrc;
				this.logoAlt = logoAlt;
				this.imgDescr = imgDescr;
				this.parent = document.querySelector(parent);
			}

			render(count) { //count is the number of stars under the cards
				const skillsItem = document.createElement(`div`),
					stars = document.createElement(`div`);
				skillsItem.classList.add(`skills-item`);
				stars.classList.add(`skills-item-stars`);

				skillsItem.innerHTML = `
					<img src=${this.logoSrc} alt=${this.logoAlt} class="skills-item-img"/>
					<div class="skills-item-descr"> ${this.imgDescr} </div>
				`;

				for (let i = 1; i <= 5; i++) {
					if (i <= count) {
						stars.innerHTML += `
						<img src="img/icons/Star-black.png" alt="star-black" class="star"/>
					`;
					} else {
						stars.innerHTML += `
						<img src="img/icons/Star-grey.png" alt="star-grey" class="star"/>
						`;
					}
				}

				skillsItem.append(stars);
				this.parent.append(skillsItem);
			}
		}

		new skillsCard("img/icons/jsps.png", "JS", "JavaScript", ".skills .skills-wrapper").render(3);
		new skillsCard("img/icons/reactps.png", "React", "React JS", ".skills .skills-wrapper").render(0);
		new skillsCard("img/icons/htmlps.png", "html", "HTML", ".skills .skills-wrapper").render(4);
		new skillsCard("img/icons/cssps.png", "cssps", "CSS", ".skills .skills-wrapper").render(4);
	}
	skills();

	//Mobile-burger
	document.querySelector('.mobile-burger').addEventListener(`click`, (e) => {

		document.querySelector('.mobile-burger').classList.toggle(`mobile-active`);
		document.querySelector('.menu').classList.toggle(`mobile-active`);

		if (document.querySelector('.mobile-burger').classList.contains(`mobile-active`)) {
			document.querySelector('body').style.overflow = `hidden`;
			document.querySelector('.menu').addEventListener(`touchmove`, (e) => {
				e.preventDefault();
			});
		} else {
			document.querySelector('body').style.overflow = ``;
		}
	});
	//

	//Confirm about not adaptive on mob
	if (document.documentElement.clientWidth < 767) {
		document.querySelectorAll('section.portfolio a img').forEach(link => {
			link.addEventListener(`click`, (e) => {
				console.log(e.target.getAttribute(`data-lang`));
				if (e.target.classList.contains(`not-adaptive`) && e.target.getAttribute(`data-lang`)) {
					const mobileConfirm = confirm(`Сайт, который вы пытаетесь посетить, не оптимизирован для мобильных устройств. Нажмите ОК, чтобы перейти`);
					if (mobileConfirm == false) {
						e.preventDefault();
					}
				} else {
					const mobileConfirm = confirm(`The site you are trying to visit is not mobile friendly. Click ok to go`);
					if (mobileConfirm == false) {
						e.preventDefault();
					}
				}
			});
		});
	}
	//

});