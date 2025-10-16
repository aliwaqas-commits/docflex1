
// Minimal Markdown to HTML using a simple ruleset, then print to PDF via browser
const mdInput = document.getElementById('mdInput');
const preview = document.getElementById('preview');
const btnPrev = document.getElementById('previewBtn');
const btnPrint = document.getElementById('printBtn');
const btnSample = document.getElementById('sampleBtn');

function mdToHtml(md){
  // very lightweight converter (headings, bold, italic, code, lists, links)
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
  html = html.replace(/\n\s*\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br/>');
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
  html = '<p>'+html+'</p>';
  return html;
}

btnPrev.addEventListener('click',()=>{
  const md = mdInput.value.trim();
  if(!md){ alert('Paste some Markdown first.'); return; }
  preview.innerHTML = mdToHtml(md);
  btnPrint.disabled = false;
});

btnPrint.addEventListener('click',()=>{
  const w = window.open('', '_blank', 'width=900,height=700');
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document</title>
  <style>
  body{{ font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#111; padding:24px; }}
  h1,h2,h3,h4,h5,h6{{ margin:0 0 10px }}
  p{{ margin:0 0 12px }}
  code{{ background:#f5f5f5; padding:2px 6px; border-radius:4px }}
  </style></head><body>${preview.innerHTML}</body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
  w.focus(); w.print();
});

btnSample.addEventListener('click',()=>{
  mdInput.value = `# Proposal\n\n**Client:** ACME Ltd.\n**Date:** 2025-10-16\n\n## Scope\n- Discovery\n- Implementation\n\n## Notes\nInline code: \`npm run build\`\n\n[DocFlexify](https://docflexify.vercel.app)`;
});
