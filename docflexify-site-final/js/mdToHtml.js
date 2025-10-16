
const mdInput = document.getElementById('mdInput');
const htmlOutput = document.getElementById('htmlOutput');
const preview = document.getElementById('preview');
const btnConvert = document.getElementById('convertBtn');
const btnCopy = document.getElementById('copyBtn');
const btnSample = document.getElementById('sampleBtn');

function mdToHtml(md){
  let html = md;
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
  // paragraphs
  html = html.replace(/\n\s*\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br/>');
  html = '<p>'+html+'</p>';
  return html;
}

btnConvert.addEventListener('click',()=>{
  const md = mdInput.value.trim();
  if(!md){ alert('Paste some Markdown first.'); return; }
  const html = mdToHtml(md);
  htmlOutput.value = html;
  preview.innerHTML = html;
  btnCopy.disabled = false;
});

btnCopy.addEventListener('click',()=>{
  navigator.clipboard.writeText(htmlOutput.value||'').then(()=>{
    btnCopy.textContent = 'Copied!';
    setTimeout(()=>btnCopy.textContent='Copy HTML', 1200);
  });
});

btnSample.addEventListener('click',()=>{
  mdInput.value = `# Headline

This is **bold**, this is *italic*, and here is \`inline code\`.

- Bullet 1
- Bullet 2

[DocFlexify](https://docflexify.vercel.app)`;
});
