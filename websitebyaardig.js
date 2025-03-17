// ASCII art logo display script met kleiner logo
const logo = `                                                     %%%%%  %%%%%%                
                                                    %%%%%  %%%%%%                
    @%%%%%%        %%%%%%%     @%%%%  @%%    %%%%%% %%%%%  %%%%%%    @%%%%@ %%%%%
 %%%%%%%%%%%%   @%%%%%%%%%%%@  @%%%%%%%%%  @%%%%%%%%%%%%%  %%%%%%  %%%%%%%%%%%%%%
%%%%%%  %%%%%%  %%%%%@ @%%%%%  @%% @%%%%% @%%%%%%%%%% @%%  %%%%%% %%%%%%%%%%%%%%%
  %%%%%%%@ %%%    %%%%%%%  %%  %%%%%%%    %%%%%%   %%%%%%  %%%%%% %%%%%%   %%%%%%
%%%%%%%%%%%%%%  %%%%%%%%%%%%%  %%%%%%     %%%%%%   %%%%%%  %%%%%% %%%%%%   %%%%%%
%%%%%  %%%%%%% %%%%%%  %%%%%%  %%%%%%     %%%%%%% %%%%%%%  %%%%%%  %%%%%%%%%% %%%
%%%%%%%%%%%%%% %%%%%%%%%%%%%%@ %%%%%%      %%%%%%%%%%%%%%  %%%%%%   %%%%%%%%%%%%%
 @%%%%%%%%%%%%   %%%%%%@%%%%%@ @%%%%%       @%%%%%%%%%%%%  %%%%%%  %%%%%%% %%%%%%
                                                                   %%%%%%%%%%%%%%
                                                                   @%%%%%%%%%%%@ 
      %%%            %%                                                @%%%%     
      %%%%%%%%%%%%%%%%%%                                                         
         %%%%%%%%%%%@`;

// Functie om logo in een kader te plaatsen met tekst
function createFramedLogo(title = "Developed by aardig", footer = "www.aardig.amsterdam") {
  const lines = logo.split('\n');
  const maxWidth = Math.max(...lines.map(line => line.length));
  
  // Kader karakters
  const topLeft = '╔';
  const topRight = '╗';
  const bottomLeft = '╚';
  const bottomRight = '╝';
  const horizontal = '═';
  const vertical = '║';
  
  // Maak bovenkant van kader
  let result = topLeft + horizontal.repeat(maxWidth + 2) + topRight + '\n';
  
  // Voeg logo toe met verticale randen
  lines.forEach(line => {
    const padding = ' '.repeat(maxWidth - line.length);
    result += vertical + ' ' + line + padding + ' ' + vertical + '\n';
  });
  
  // Voeg lege regel toe voor wat ruimte
  result += vertical + ' ' + ' '.repeat(maxWidth) + ' ' + vertical + '\n';
  
  // Voeg titel toe (gecentreerd)
  const titlePaddingLeft = Math.floor((maxWidth - title.length) / 2);
  const titlePaddingRight = maxWidth - title.length - titlePaddingLeft;
  result += vertical + ' ' + ' '.repeat(titlePaddingLeft) + title + ' '.repeat(titlePaddingRight) + ' ' + vertical + '\n';
  
  // Voeg footer toe (gecentreerd)
  const footerPaddingLeft = Math.floor((maxWidth - footer.length) / 2);
  const footerPaddingRight = maxWidth - footer.length - footerPaddingLeft;
  result += vertical + ' ' + ' '.repeat(footerPaddingLeft) + footer + ' '.repeat(footerPaddingRight) + ' ' + vertical + '\n';
  
  // Maak onderkant van kader
  result += bottomLeft + horizontal.repeat(maxWidth + 2) + bottomRight;
  
  return result;
}

// Toon het logo in de console met monospace lettertype voor correcte weergave
console.log("%c" + createFramedLogo(), "font-family: monospace; white-space: pre;");