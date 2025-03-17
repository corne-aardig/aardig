// Eenvoudige script voor logo weergave
// Dit gebruikt een vereenvoudigde aanpak zonder afhankelijkheid van ASCII-art

// Het logo in een string (als fallback indien geen SVG beschikbaar is)
const logoText = `aardig`;

// Maak een box met tekst
function createBox(text, headerText = "Developed by aardig", footerText = "www.aardig.amsterdam") {
  const maxLength = Math.max(text.length + 4, headerText.length + 4, footerText.length + 4);
  
  // Box characters
  const topLeft = '╔';
  const topRight = '╗';
  const bottomLeft = '╚';
  const bottomRight = '╝';
  const horizontal = '═';
  const vertical = '║';
  
  // Create top border
  let output = topLeft + horizontal.repeat(maxLength - 2) + topRight + '\n';
  
  // Add the logo text centered
  const textPaddingLeft = Math.floor((maxLength - text.length - 2) / 2);
  const textPaddingRight = maxLength - text.length - 2 - textPaddingLeft;
  output += vertical + ' ' + ' '.repeat(textPaddingLeft) + text + ' '.repeat(textPaddingRight) + ' ' + vertical + '\n';
  
  // Add spacing line
  output += vertical + ' ' + ' '.repeat(maxLength - 4) + ' ' + vertical + '\n';
  
  // Add header text centered
  const headerPaddingLeft = Math.floor((maxLength - headerText.length - 2) / 2);
  const headerPaddingRight = maxLength - headerText.length - 2 - headerPaddingLeft;
  output += vertical + ' ' + ' '.repeat(headerPaddingLeft) + headerText + ' '.repeat(headerPaddingRight) + ' ' + vertical + '\n';
  
  // Add footer text centered
  const footerPaddingLeft = Math.floor((maxLength - footerText.length - 2) / 2);
  const footerPaddingRight = maxLength - footerText.length - 2 - footerPaddingLeft;
  output += vertical + ' ' + ' '.repeat(footerPaddingLeft) + footerText + ' '.repeat(footerPaddingRight) + ' ' + vertical + '\n';
  
  // Create bottom border
  output += bottomLeft + horizontal.repeat(maxLength - 2) + bottomRight;
  
  return output;
}

// Poging om logo te laden of val terug op tekst
try {
  // Toon de box met logo tekst
  console.log("%c" + createBox(logoText), "font-family: monospace; font-size: 16px;");
  
  // Ook tonen hoe het er uit zou kunnen zien met een grotere box
  console.log("\nHier is het met meer ruimte:");
  console.log("%c" + createBox("   " + logoText + "   "), "font-family: monospace; font-size: 16px;");
  
  // Ook een alternatief tonen met tekst boven en onder
  console.log("\nAls alternatief kun je dit gebruiken:");
  console.log("%c╔═══════════════════════════════════╗\n║    Developed by aardig           ║\n║           www.aardig.amsterdam    ║\n╚═══════════════════════════════════╝", "font-family: monospace; font-size: 16px;");
} catch (e) {
  console.error("Fout bij het weergeven van logo:", e);
}