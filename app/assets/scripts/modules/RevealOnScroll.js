import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {

	constructor(itemsToReveal, thresholdPercent) {
		this.thresholdPercent = thresholdPercent;
		this.itemsToReveal = itemsToReveal
		this.hideInitially();
		this.browserHeight = window.innerHeight;

		this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
		this.events();
	}

	events() {
		window.addEventListener('scroll', this.scrollThrottle)
		window.addEventListener('resize', debounce(() => {
			console.log("Resize just ran.");

			this.browserHeight = window.innerHeight;

		}, 333))
	}

	calcCaller() {

		console.log('Scroll function ran');

		this.itemsToReveal.forEach(item => {
			if (!item.isRevealed) {
				this.calculateIfScrolledTo(item);
			}
		})

	}

	calculateIfScrolledTo(item) {
		if (window.scrollY + this.browserHeight > item.offsetTop) {

			const scrollPercent = (item.getBoundingClientRect().top / this.browserHeight) * 100;

			if (scrollPercent < this.thresholdPercent) {
				console.log("Item was revealed");


				item.classList.add('reveal-item--is-visible');
				item.isRevealed = true;

				if (item.isLastItem) {
					window.removeEventListener('scroll', this.scrollThrottle);
				}
			}




		}
	}

	hideInitially() {
		this.itemsToReveal.forEach(item => {
			item.classList.add('reveal-item');
			item.isRevealed = false;
		})

		this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
	}
}

export default RevealOnScroll;