const snowContainer = /** @type {HTMLDivElement} */ (
	document.getElementById("snow-container")
);

function createSnowflake() {
	const snowflake = document.createElement("div");
	snowflake.classList.add("snowflake");

	const size = Math.random() * 8 + 4;

	snowflake.style.width = `${size}px`;
	snowflake.style.height = `${size}px`;

	snowflake.style.left = `${Math.random() * 100}%`;
	snowflake.style.animationDuration = `${Math.random() * 4 + 6}s`;
	snowflake.style.opacity = String(Math.random() * 0.5 + 0.3);
	snowflake.style.background = `rgba(255, 255, 255, ${snowflake.style.opacity})`;

	snowflake.style.filter = `blur(${Math.random() * 2}px)`;

	snowContainer.appendChild(snowflake);

	// коли @keyframes закінчився
	snowflake.addEventListener("animationend", () => {
		snowflake.remove();
	});
}

const snowflakeInterval = setInterval(createSnowflake, 150);

let snowflakeCount = 0;

const maxSnowflakes = Math.max(
	Math.floor(window.innerWidth / 65),
	Math.floor(window.innerHeight / 65)
);

function manageSnowflakes() {
	if (snowflakeCount < maxSnowflakes) {
		createSnowflake();
		snowflakeCount++;
	} else {
		clearInterval(snowflakeInterval);
	}
}

setInterval(manageSnowflakes, 150);

const textInput = /** @type {HTMLInputElement} */ (
	document.getElementById("textInput")
);

const autoupdateRadios = /** @type {NodeListOf<HTMLInputElement>} */ (
	document.getElementsByName("autoupdate")
);

const showLogCheckbox = /** @type {HTMLInputElement} */ (
	document.getElementById("showLog")
);

const logList = /** @type {HTMLOListElement} */ (
	document.getElementById("logList")
);

const logText = /** @type {HTMLHeadingElement} */ (
	document.getElementById("logText")
);

let autoupdateMode = "keypress";

/**
 * @type {string[]}
 */
let log = [];

autoupdateRadios.forEach((radio) => {
	radio.addEventListener("change", () => {
		if (radio.checked) {
			autoupdateMode = radio.value;

			attachInputEvent();
		}
	});
});

function attachInputEvent() {
	textInput.removeEventListener("input", handleKeyPress);
	textInput.removeEventListener("blur", handleBlur);

	if (autoupdateMode === "keypress") {
		textInput.addEventListener("input", handleKeyPress);
	} else {
		textInput.addEventListener("blur", handleBlur);
	}
}

function handleKeyPress() {
	addLogEntry(textInput.value);
}

function handleBlur() {
	addLogEntry(textInput.value);
}

/**
 * @param {string} value
 */
function addLogEntry(value) {
	if (value.trim() === "") return;

	log.push(value);

	updateLogDisplay();
}

function updateLogDisplay() {
	logList.innerHTML = "";

	log.forEach((entry, index) => {
		const li = document.createElement("li");
		li.textContent = entry;

		li.addEventListener("mousedown", (e) => {
			// Ліва кнопка миші
			if (e.button === 0) {
				li.style.fontWeight = "bold";
			}
		});

		li.addEventListener("mouseup", () => {
			li.style.fontWeight = "normal";
		});

		li.addEventListener("mouseleave", () => {
			li.style.fontWeight = "normal";
		});

		logList.appendChild(li);
	});
}

attachInputEvent();

showLogCheckbox.addEventListener("change", () => {
	const state = showLogCheckbox.checked ? "block" : "none";

	logList.style.display = state;
	logText.style.display = state;
});

if (!showLogCheckbox.checked) {
	logList.style.display = "none";
	logText.style.display = "none";
}
