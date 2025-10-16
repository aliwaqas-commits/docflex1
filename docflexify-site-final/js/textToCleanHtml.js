
const rawInput = document.getElementById('rawInput');
const htmlOutput = document.getElementById('htmlOutput');
const preview = document.getElementById('preview');
const btnClean = document.getElementById('cleanBtn');
const btnCopy = document.getElementById('copyBtn');
const btnSampleText = document.getElementById('sampleTextBtn');
const btnSampleHtml = document.getElementById('sampleHtmlBtn');

const ALLOWED = new Set(['p','h1','h2','h3','h4','h5','h6','ul','ol','li','a','strong','b','em','i','code','pre','table','thead','tbody','tr','th','td']);

function sanitizeHtml(dirtyHtml){
  const temp = document.createElement('div');
  temp.innerHTML = dirtyHtml;

  function clean(node){
    if(node.nodeType === 3){ // text
      return document.createTextNode(node.nodeValue.replace(/\s+/g,' '));
    }
    if(node.nodeType !== 1){ return document.createTextNode(''); }
    const tag = node.tagName.toLowerCase();
    if(!ALLOWED.has(tag)){
      // recurse into children but skip this tag
      const frag = document.createDocumentFragment();
      for(const child of Array.from(node.childNodes)){
        frag.appendChild(clean(child));
      }
      return frag;
    }
    const el = document.createElement(tag);
    if(tag === 'a' && node.getAttribute('href')){
      el.setAttribute('href', node.getAttribute('href'));
      el.setAttribute('rel','noopener nofollow');
      el.setAttribute('target','_blank');
    }
    // copy children
    for(const child of Array.from(node.childNodes)){
      el.appendChild(clean(child));
    }
    return el;
  }

  const out = document.createElement('div');
  for(const child of Array.from(temp.childNodes)){
    out.appendChild(clean(child));
  }
  // remove empty nodes
  out.querySelectorAll('*').forEach(n=>{
    if(n.textContent.trim()==='' && n.children.length===0){ n.remove(); }
  });
  return out.innerHTML.trim();
}

function textToParagraphs(txt){
  const blocks = txt.replace(/\r\n/g,'\n').trim().split(/\n{2,}/);
  const html = blocks.map(b=>'<p>'+b.replace(/\n/g,'<br/>')+'</p>').join('\n');
  return html;
}

btnClean.addEventListener('click',()=>{
  const raw = rawInput.value;
  if(!raw.trim()){ alert('Paste text or HTML first.'); return; }
  let html;
  if(/<\s*[a-z][\s\S]*>/i.test(raw)){
    // looks like HTML (maybe Word paste) — sanitize
    html = sanitizeHtml(raw);
  } else {
    // plain text — wrap into paragraphs
    html = textToParagraphs(raw);
  }
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

btnSampleText.addEventListener('click',()=>{
  rawInput.value = `This is a plain text block.

Second paragraph. Line break ->
and another line.`;
});

btnSampleHtml.addEventListener('click',()=>{
  rawInput.value = `<p class="MsoNormal" style="margin-left:36pt"><span style="font-size:12pt;font-family:Calibri">Messy <b>Word</b> HTML with <span style="color:red">styles</span> and <i>inline</i> junk.</span></p>`;
});
