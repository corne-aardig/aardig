function createTextFrame(title = "Developed by aardig", footer = "www.aardig.amsterdam", width = 40) {
  width = Math.max(width, title.length + 4, footer.length + 4);
  
  const topLeft = '╔';
  const topRight = '╗';
  const bottomLeft = '╚';
  const bottomRight = '╝';
  const horizontal = '═';
  const vertical = '║';
  
  let result = topLeft + horizontal.repeat(width - 2) + topRight + '\n';
  
  result += vertical + ' '.repeat(width - 2) + vertical + '\n';
  
  const titlePaddingLeft = Math.floor((width - 2 - title.length) / 2);
  const titlePaddingRight = width - 2 - title.length - titlePaddingLeft;
  result += vertical + ' '.repeat(titlePaddingLeft) + title + ' '.repeat(titlePaddingRight) + vertical + '\n';
  
  const footerPaddingLeft = Math.floor((width - 2 - footer.length) / 2);
  const footerPaddingRight = width - 2 - footer.length - footerPaddingLeft;
  result += vertical + ' '.repeat(footerPaddingLeft) + footer + ' '.repeat(footerPaddingRight) + vertical + '\n';
  
  result += vertical + ' '.repeat(width - 2) + vertical + '\n';
  
  result += bottomLeft + horizontal.repeat(width - 2) + bottomRight;
  
  return result;
}

console.log("%c" + createTextFrame(), "font-family: monospace; white-space: pre;");