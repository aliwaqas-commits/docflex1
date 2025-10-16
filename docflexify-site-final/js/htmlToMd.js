
const htmlInput = document.getElementById('htmlInput');
const mdOutput = document.getElementById('mdOutput');
const btnConvert = document.getElementById('convertBtn');
const btnCopy = document.getElementById('copyBtn');
const btnSample = document.getElementById('sampleBtn');

function domToMd(node){
  if(node.nodeType === 3){ // text
    return node.nodeValue.replace(/\s+/g,' ').trim();
  }
  if(node.nodeType !== 1){ return ''; }
  const tag = node.tagName.toLowerCase();
  let md = '';
  switch(tag){
    case 'h1': md += '# ' + iterate(node) + '\n\n'; break;
    case 'h2': md += '## ' + iterate(node) + '\n\n'; break;
    case 'h3': md += '### ' + iterate(node) + '\n\n'; break;
    case 'h4': md += '#### ' + iterate(node) + '\n\n'; break;
    case 'h5': md += '##### ' + iterate(node) + '\n\n'; break;
    case 'h6': md += '###### ' + iterate(node) + '\n\n'; break;
    case 'strong':
    case 'b': md += '**' + iterate(node) + '**'; break;
    case 'em':
    case 'i': md += '*' + iterate(node) + '*'; break;
    case 'code':
      if(node.parentElement && node.parentElement.tagName.toLowerCase()==='pre'){
        md += '```\n' + node.textContent + '\n```\n\n';
      } else {
        md += '`' + node.textContent + '`';
      }
      break;
    case 'pre': md += '```\n' + node.textContent + '\n```\n\n'; break;
    case 'a': md += '[' + (iterate(node)||node.textContent) + '](' + (node.getAttribute('href')||'#') + ')'; break;
    case 'ul':
      for(const li of node.children){ md += '- ' + iterate(li) + '\n'; }
      md += '\n'; break;
    case 'ol':
      let i=1; for(const li of node.children){ md += i++ + '. ' + iterate(li) + '\n'; }
      md += '\n'; break;
    case 'br': md += '  \n'; break;
    case 'p': md += iterate(node) + '\n\n'; break;
    case 'table':
      // very naive table
      const rows = Array.from(node.querySelectorAll('tr')).map(tr=>Array.from(tr.children).map(td=>td.textContent.trim()));
      if(rows.length){
        md += rows[0].join(' | ') + '\n' + rows[0].map(()=> '---').join(' | ') + '\n';
        for(let r=1;r<rows.length;r++) md += rows[r].join(' | ') + '\n';
        md += '\n';
      }
      break;
    default:
      md += iterate(node);
  }
  return md;
}
function iterate(node){
  let out='';
  for(const child of node.childNodes){ out += domToMd(child); }
  return out.trim();
}

btnConvert.addEventListener('click',()=>{
  const html = htmlInput.value.trim();
  if(!html){ alert('Paste some HTML first.'); return; }
  const temp = document.createElement('div');
  temp.innerHTML = html;
  mdOutput.value = iterate(temp);
  btnCopy.disabled = false;
});
btnCopy.addEventListener('click',()=>{
  navigator.clipboard.writeText(mdOutput.value||'').then(()=>{
    btnCopy.textContent='Copied!';
    setTimeout(()=>btnCopy.textContent='Copy Markdown',1200);
  });
});
btnSample.addEventListener('click',()=>{
  htmlInput.value = `<h1>Welcome</h1><p><strong>Bold</strong> and <em>italic</em> with a <a href=\"#\">link</a>.</p><ul><li>One</li><li>Two</li></ul>`;
});
