import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyHeader {
	constructor() {
		this.siteHeader = document.querySelector('.site-header');
		this.pageSections = document.querySelectorAll('.page-section');
		this.browserHeight = window.innerHeight;
		this.previousScrollY = window.scrollY;
		this.events();

	}

	events() {
		window.addEventListener('scroll', throttle(() => this.runOnScroll(), 300));


		window.addEventListener('resize', debounce(() => {
			console.log("Resize just ran.");

			this.browserHeight = window.innerHeight;

		}, 333))
	}

	runOnScroll() {

		this.determineScrollDirection();

		if (window.scrollY > 60) {
			this.siteHeader.classList.add('site-header--dark');

		} else {
			this.siteHeader.classList.remove('site-header--dark');
		}

		this.pageSections.forEach(pageSection => this.calcSection(pageSection));
	}

	determineScrollDirection() {
		if (window.scrollY > this.previousScrollY) {
			this.scrollDirection = 'down';
		} else {
			this.scrollDirection = 'up';
		}

		this.previousScrollY = window.scrollY;

	}

	calcSection(pageSection) {
		if (window.scrollY + this.browserHeight > pageSection.offsetTop && window.scrollY < pageSection.offsetTop + pageSection.offsetHeight) {
			const scrollPercent = pageSection.getBoundingClientRect().top / this.browserHeight * 100

			if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection === 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
				const matchingLink = pageSection.getAttribute('data-matching-link');
				document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove('is-current-link'));
				document.querySelector(matchingLink).classList.add('is-current-link')
			}
		}
	}

}

export default StickyHeader;