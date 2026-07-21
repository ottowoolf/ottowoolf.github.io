// Add your javascript here

window.darkMode = false;

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
const stickyClassesContainer = [
	"border-neutral-300/50",
	"bg-white/80",
	"dark:border-neutral-600/40",
	"dark:bg-neutral-900/60",
	"backdrop-blur-2xl",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

document.addEventListener("astro:page-load", () => {
	headerElement = document.getElementById("header");

	stickyHeaderFuncionality();
	applyMenuItemClasses();
	evaluateHeaderPosition();
	mobileMenuFunctionality();
	initScrollReveals();
	initProjectCursor();
	initMagneticButtons();
});

window.initMagneticButtons = () => {
	if (window.innerWidth < 768) return;

	const magnets = document.querySelectorAll('.magnetic-button');
	
	magnets.forEach((btn) => {
		const content = btn.querySelector('.magnetic-content');
		
		btn.addEventListener('mousemove', (e) => {
			const rect = btn.getBoundingClientRect();
			const h = rect.width / 2;
			const v = rect.height / 2;
			
			// Calculate distance from center of button
			const x = e.clientX - rect.left - h;
			const y = e.clientY - rect.top - v;
			
			// Move the button slightly towards cursor (30% pull)
			btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
			
			// Move text slightly more for parallax depth
			if (content) {
				content.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
			}
		});
		
		btn.addEventListener('mouseleave', () => {
			btn.style.transform = `translate3d(0px, 0px, 0px)`;
			if (content) {
				content.style.transform = `translate3d(0px, 0px, 0px)`;
			}
		});
	});
};

window.initProjectCursor = () => {
	const cursorPill = document.getElementById("project-cursor-pill");
	if (!cursorPill) return;

	// Do not bind cursor logic on mobile devices
	if (window.innerWidth < 768) return;

	const hoverElements = document.querySelectorAll(".project-card-hover");

	hoverElements.forEach((el) => {
		el.addEventListener("mouseenter", () => {
			cursorPill.classList.remove("opacity-0");
			cursorPill.classList.add("opacity-100");
		});

		el.addEventListener("mousemove", (e) => {
			cursorPill.style.transform = `translate3d(${e.clientX - cursorPill.offsetWidth / 2}px, ${e.clientY - cursorPill.offsetHeight / 2}px, 0)`;
		});

		el.addEventListener("mouseleave", () => {
			cursorPill.classList.remove("opacity-100");
			cursorPill.classList.add("opacity-0");
		});
	});
};

window.initScrollReveals = () => {
	const revealElements = document.querySelectorAll(".reveal-target");
	
	const revealOptions = {
		threshold: 0,
		rootMargin: "0px 0px -50px 0px"
	};

	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Remove Tailwind hidden state classes
				entry.target.classList.remove("opacity-0", "translate-y-10", "scale-95");
				
				// Add Tailwind visible state classes
				entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
				
				// Keep custom classes just in case, but rely on Tailwind
				entry.target.classList.remove("reveal-hidden");
				entry.target.classList.add("reveal-visible");
				
				observer.unobserve(entry.target);
			}
		});
	}, revealOptions);

	revealElements.forEach(el => {
		revealObserver.observe(el);
	});
};

window.stickyHeaderFuncionality = () => {
	window.addEventListener("scroll", () => {
		evaluateHeaderPosition();
	});
};

window.evaluateHeaderPosition = () => {
	if (window.scrollY > 16) {
		headerElement.firstElementChild.classList.add(...stickyClassesContainer);
		headerElement.firstElementChild.classList.remove(
			...unstickyClassesContainer,
		);
		headerElement.classList.add(...stickyClasses);
		headerElement.classList.remove(...unstickyClasses);
		document.getElementById("menu").classList.add("top-[56px]");
		document.getElementById("menu").classList.remove("top-[75px]");
	} else {
		headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
		headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
		headerElement.classList.add(...unstickyClasses);
		headerElement.classList.remove(...stickyClasses);
		document.getElementById("menu").classList.remove("top-[56px]");
		document.getElementById("menu").classList.add("top-[75px]");
	}
};

window.applyMenuItemClasses = () => {
	const menuItems = document.querySelectorAll("#menu a");
	for (let i = 0; i < menuItems.length; i++) {
		if (menuItems[i].pathname === window.location.pathname) {
			menuItems[i].classList.add("text-neutral-900", "dark:text-white");
		}
	}
	//:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
};

function mobileMenuFunctionality() {
	document.getElementById("openMenu").addEventListener("click", () => {
		openMobileMenu();
	});

	document.getElementById("closeMenu").addEventListener("click", () => {
		closeMobileMenu();
	});
}

window.openMobileMenu = () => {
	document.getElementById("openMenu").classList.add("hidden");
	document.getElementById("closeMenu").classList.remove("hidden");
	document.getElementById("menu").classList.remove("hidden");
	document.getElementById("mobileMenuBackground").classList.add("opacity-0");
	document.getElementById("mobileMenuBackground").classList.remove("hidden");

	setTimeout(() => {
		document
			.getElementById("mobileMenuBackground")
			.classList.remove("opacity-0");
	}, 1);
};

window.closeMobileMenu = () => {
	document.getElementById("closeMenu").classList.add("hidden");
	document.getElementById("openMenu").classList.remove("hidden");
	document.getElementById("menu").classList.add("hidden");
	document.getElementById("mobileMenuBackground").classList.add("hidden");
};
