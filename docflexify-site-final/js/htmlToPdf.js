
const htmlInput2 = document.getElementById('htmlInput');
const preview2 = document.getElementById('preview');
const btnPrev2 = document.getElementById('previewBtn');
const btnPrint2 = document.getElementById('printBtn');
const btnSample2 = document.getElementById('sampleBtn');

btnPrev2.addEventListener('click',()=>{
  const html = htmlInput2.value.trim();
  if(!html){ alert('Paste some HTML first.'); return; }
  preview2.innerHTML = html;
  btnPrint2.disabled = false;
});
btnPrint2.addEventListener('click',()=>{
  const w = window.open('', '_blank', 'width=900,height=700');
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document</title>
  <style>
  body{{ font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#111; padding:24px; }}
  h1,h2,h3,h4,h5,h6{{ margin:0 0 10px }}
  p{{ margin:0 0 12px }}
  table{{ border-collapse: collapse; width:100% }}
  th,td{{ border:1px solid #ddd; padding:6px }}
  </style></head><body>${preview2.innerHTML}</body></html>`;
  w.document.open(); w.document.write(html); w.document.close();
  w.focus(); w.print();
});
btnSample2.addEventListener('click',()=>{
  htmlInput2.value = `<article><h1>Statement of Work</h1><p>Date: 2025-10-16</p><h2>Scope</h2><ul><li>Research</li><li>Build</li><li>QA</li></ul></article>`;
});
