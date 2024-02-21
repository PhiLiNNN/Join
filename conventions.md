# Coding Style Guide

## Bildernamen und Ordner
- Verwende Unterstriche für Bildernamen und Ordner.
  Beispiel: `login_logo`, `image_folder`

## CSS-Klassen
- Verwende Bindestriche für CSS-Klassen.
  Beispiel: `.logo-style`

## IDs
- Verwende Bindestriche für IDs und füge das Suffix `-id` hinzu.
  Beispiel: `logo-style-id`

## JavaScript
- Verwende CamelCase für JavaScript-Funktionsnamen und alle Deklarationen.
  Beispiel: `calculateTotalAmount()`

## Abstände und Längenbeschränkungen
- Halte zwei Leerzeichen zwischen Funktionen.
- Begrenze die Funktionslänge auf maximal 14 Zeilen.
- Begrenze die Gesamtlänge einer JavaScript-Datei auf maximal 400 Zeilen.

## Beispielstruktur
```javascript
function calculateTotalAmount(items) {
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total;
}

function formatUserName(user) {
  // ...
}

// Weitere Funktionen...