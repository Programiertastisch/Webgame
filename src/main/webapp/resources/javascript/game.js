function saveGameData() {
    const gameData = {
        enemyHealth,
        damage,
        kills,
        money,
        level,
        epRequire,
        baseEp
    };

    fetch('saveGameData.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Spielstand erfolgreich gespeichert.');
        } else {
            console.error('Fehler beim Speichern des Spielstands.');
        }
    })
    .catch(error => {
        console.error('Fehler beim Speichern des Spielstands: ' + error);
    });
const saveButton = document.getElementById('save-button');

// Füge einen Event-Listener hinzu, um auf Klicks auf den Save-Button zu reagieren
saveButton.addEventListener('click', function() {
    // Hier rufst du die Funktion auf, die den Spielstand speichert (die Funktion saveGameData)
    saveGameData();
});
}
