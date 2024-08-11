document.addEventListener("DOMContentLoaded", function() {
	
	let baseEnemyHealth = 100;
	let enemyHealth = baseEnemyHealth;
	mult = 0.1;
	damage = 0.1; // Initialer Schaden mit einer Nachkommastelle
	let autoAttackInterval = null; // Variable zur Speicherung des Intervalls für den automatischen Angriff
	let isAutoAttacking = false; // Variable zur Verfolgung des automatischen Angriffszustands
	let kills = 0;
	money = 0;
	let baseLevel = 1;
	let level = baseLevel;
	let epRequire = 50;
	let baseEp = 0;
	let ep = baseEp;
	
			

	// Funktion zum Zurücksetzen des Gegners und Verdoppeln der Lebenspunkte
	function resetEnemy() {
		baseEnemyHealth += 100; // Verdopple die Grundlebenspunkte für den nächsten Gegner
		enemyHealth = baseEnemyHealth;
		document.getElementById("enemy-health").textContent = enemyHealth;
		kills += 1;
		document.getElementById("kills").textContent = kills; // Aktualisiere die Anzeige für Kills
		money += 1;
		document.getElementById("money").textContent = money;
		baseEp +=2;
		ep = baseEp;
		document.getElementById("ep").textContent = ep;
		document.getElementById("epRequire").textContent = "/" +" "+  epRequire;
		levelUp()
		const epPercentage = (ep / epRequire) * 100;
		updateLevelBar(epPercentage)
        console.log("Yeah")
		
	}

	// Funktion zum Starten oder Stoppen des automatischen Angriffs
	function toggleAutoAttack() {
		if (isAutoAttacking) {
			clearInterval(autoAttackInterval);
			document.getElementById("auto-attack-button").textContent = "Start";
		} else {
			autoAttackInterval = setInterval(function() {
				// Überprüfe, ob der Gegner noch Lebenspunkte hat
				if (enemyHealth > 0) {
					// Füge den aktuellen Schaden zu den Lebenspunkten des Gegners hinzu
					enemyHealth -= damage;
					enemyHealth = parseFloat(enemyHealth.toFixed(0));
					// Wenn die Lebenspunkte des Gegners unter 0 fallen, setze sie auf 0
					if (enemyHealth < 0) {
						enemyHealth = 0;
					}
					updateDamage()
					updateHealthBar(enemyHealth);
					damage = parseFloat(damage.toFixed(1));
					// Aktualisiere die Lebenspunkte des Gegners im HTML
					document.getElementById("enemy-health").textContent = enemyHealth;

					// Überprüfe, ob der Gegner keine Lebenspunkte mehr hat
					if (enemyHealth <= 0) {
						// Respawn des nächsten Gegners mit verdoppelten Lebenspunkten nach 2 Sekunden
						resetEnemy();
					}

					document.getElementById("damage").textContent = damage.toFixed(1);
					const healthPercentage = (enemyHealth / baseEnemyHealth) * 100;
					updateHealthBar(healthPercentage);
				}
			}, 200); // Automatischer Angriff alle 500 Millisekunden (0,5 Sekunden)
			document.getElementById("auto-attack-button").textContent = "Stopp";
		}
		isAutoAttacking = !isAutoAttacking;
	}

	// Funktion, die aufgerufen wird, wenn der Angriffsbutton geklickt wird
	document.getElementById("attack-button").addEventListener("click", function() {
		// Überprüfe, ob der Gegner noch Lebenspunkte hat
		if (enemyHealth > 0) {
			// Füge den aktuellen Schaden zu den Lebenspunkten des Gegners hinzu
			enemyHealth -= damage;
			enemyHealth = parseFloat(enemyHealth.toFixed(0));
			// Wenn die Lebenspunkte des Gegners unter 0 fallen, setze sie auf 0
			if (enemyHealth < 0) {
				enemyHealth = 0;
			}

			// Erhöhe den Schaden um 0,1 und runde auf eine Nachkommastelle
			updateDamage()
			updateHealthBar(enemyHealth);
			damage = parseFloat(damage.toFixed(1));


			// Aktualisiere die Lebenspunkte des Gegners im HTML
			document.getElementById("enemy-health").textContent = enemyHealth;

			// Überprüfe, ob der Gegner keine Lebenspunkte mehr hat
			if (enemyHealth <= 0) {
				// Respawn des nächsten Gegners mit verdoppelten Lebenspunkten nach 2 Sekunden
				resetEnemy();
			}
			// Aktualisiere den angezeigten Schaden im HTML
			document.getElementById("damage").textContent = damage.toFixed(1);
			const healthPercentage = (enemyHealth / baseEnemyHealth) * 100;
			updateHealthBar(healthPercentage);
		}
	});
	function updateDamage() {
		if (equippedWeapon) {
			damage += 0.1 + equippedWeapon.addition; // Berechne den neuen Basis-Schaden
		} else {
			damage += 0.1; // Wenn keine Waffe ausgerüstet ist, verwende den Standardwert
		}
		document.getElementById("damage").textContent = damage.toFixed(1);
	}
	
	function showDamage() {
  const damageDisplay = document.getElementById("damageDisplay");
  const multElement = document.getElementById("mult");
  
  if (equippedWeapon) {
    mult = 0.1 + equippedWeapon.addition; // Berechne den neuen Basis-Schaden
  } else {
    mult = 0.1; // Wenn keine Waffe ausgerüstet ist, verwende den Standardwert
  }

  multElement.textContent = mult.toFixed(1);

  // Zeige den Bereich an
  multElement.style.opacity = 1;

  // Starte die Verblassungsanimation nach einer kurzen Verzögerung
  setTimeout(function() {
    multElement.style.transition = "opacity 0.1s ease-in-out";
    multElement.style.opacity = 0; // Ändere die Opazität, um das Element verblassen zu lassen
  }, 100);
}


	
	
		
	function levelUp(){
		if(ep >= epRequire){
			level = baseLevel + 1;
			document.getElementById("level").textContent = level;
			baseLevel = level;
			baseEp = 0;
			ep = baseEp;
			document.getElementById("ep").textContent = ep;
			epRequire+=50;
			const epPercentage = (ep / epRequire) * 100;
			updateLevelBar(epPercentage)
		}
		
	}
	
	document.getElementById("auto-attack-button").addEventListener("click", toggleAutoAttack);
	
	function showClickFeedback(message) {
    const feedbackElement = document.getElementById("mult");
    feedbackElement.textContent = message;
    feedbackElement.style.opacity = 1; 
    setTimeout(function() {
        feedbackElement.style.opacity = 0; 
    }, 2000);
}

// Funktion, die aufgerufen wird, wenn der Angriffsbutton geklickt wird
document.getElementById("attack-button").addEventListener("click", function() {
    
    showDamage()
    const currentDamage = mult.toFixed(1);
    document.getElementById("mult").textContent = currentDamage;
    const feedbackMessage = `+ ${currentDamage}`;
    showClickFeedback(feedbackMessage);

});
document.getElementById("auto-attack-button").addEventListener("click", function() {
    // Rest des Codes bleibt unverändert ...

    // Aktualisiere den angezeigten Schaden im HTML und zeige das Feedback an
    showDamage()
    const currentDamage = mult.toFixed(1);
    document.getElementById("mult").textContent = currentDamage;
    const feedbackMessage = `+ ${currentDamage}`;
    showClickFeedback(feedbackMessage);

});

	function updateHealthBar(healthPercentage) {
		const progressBar = document.querySelector('.progress-bar');
		progressBar.style.width = healthPercentage + '%';
		progressBar.setAttribute('aria-valuenow', healthPercentage);
	}
	function updateLevelBar(epPercentage) {
    const progressBar = document.querySelector('.progress-bar-level');
    progressBar.style.width = epPercentage + '%'; // Du kannst den Füllstand anpassen, wenn du die Levelanforderungen definierst.
    progressBar.setAttribute('aria-valuenow', epPercentage); // Aktualisiere den Wert entsprechend.

}
});
