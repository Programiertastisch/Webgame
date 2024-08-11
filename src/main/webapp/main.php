<?php
// Pfad zur Datei mit den Gegnerbildern
$gegnerDatei = 'Gegner.json';

// Lese die Datei ein und hole die Pfade
$gegnerPfade = file($gegnerDatei, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

// Wähle einen zufälligen Gegner aus der Liste
$zufaelligerGegner = $gegnerPfade[array_rand($gegnerPfade)];

// Verwende den absoluten Pfad für das Bild
$absoluterPfad = $_SERVER['DOCUMENT_ROOT'] . '/' . $zufaelligerGegner;

// Überprüfe, ob die Lebenspunkte auf 0 fallen und wechsle den Gegner

    // Gib den Pfad des aktuellen Gegners als JSON zurück
    echo json_encode(['neuerGegnerPfad' => $absoluterPfad]);

?>





