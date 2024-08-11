document.addEventListener("DOMContentLoaded", function() {

	equippedWeapon = null;


	const weapons1 = [
		{ name: "Stock", addition: 0.1 },
		{ name: "Holzbogen", addition: 0.1 },
		{ name: "Holzschwert", addition: 0.2 },
		{ name: "Holzaxt", addition: 0.3 },
		{ name: "doppelseitigeholzaxt", addition: 0.4 },
	];
	const weapons2 = [
		{ name: "Steinschwert", addition: 0.7 },
		{ name: "Steinbogen", addition: 1 },
		{ name: "Zauberstab", addition: 1.3 },
		{ name: "steinAxt", addition: 1.9 },
		{ name: "doppelseitigesteinaxt", addition: 2.7 },
	];
	

	function drawWeapon() {
		const selectedWeaponIndex = weightedRandom(weaponProbabilities);
	const selectedWeapon = weapons1[selectedWeaponIndex];

	
	equippedWeapon = selectedWeapon;

	document.getElementById("weapon").textContent = `${selectedWeapon.name}`;
	document.getElementById("equipped-weapon").textContent = ` ${selectedWeapon.name}`;
}
	function weightedRandom(probabilities) {
		const total = probabilities.reduce((acc, probability) => acc + probability, 0);
		const random = Math.random() * total;
		let cumulativeProbability = 0;

		for (let i = 0; i < probabilities.length; i++) {
			cumulativeProbability += probabilities[i];
			if (random < cumulativeProbability) {
				return i;
			}
		}
	}

	const weaponProbabilities = [0.3, 0.3, 0.2, 0.1, 0.1];
	const selectedWeaponIndex = weightedRandom(weaponProbabilities);
	 selectedWeapon = weapons1[selectedWeaponIndex];



	function openTreasure() {
		if (money >= 1) {
			money -= 1;
			document.getElementById("money").textContent = money;
			drawWeapon();
		} else {
			alert("Du hast nicht genug Gold. Töte Gegner um Gold zu erhalten");
		}
	}

	document.getElementById("treasure-button").addEventListener("click", openTreasure);
});
