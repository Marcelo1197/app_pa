//INFO: funciones comunes de pa, unificar y mantener en un solo repo

import marked from 'marked';

//S: lib, encode ************************************************************
function encode64(data) {
  let r = "";
  for (let i=0; i<data.length; i+=3) {
    if (i+2==data.length) {
      r +=append3bytes(data.charCodeAt(i), data.charCodeAt(i+1), 0);
    } else if (i+1==data.length) {
      r += append3bytes(data.charCodeAt(i), 0, 0);
    } else {
      r += append3bytes(data.charCodeAt(i), data.charCodeAt(i+1),
      data.charCodeAt(i+2));
    }
  }
  return r;
}

function append3bytes(b1, b2, b3) {
  let c1 = b1 >> 2;
  let c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
  let c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
  let c4 = b3 & 0x3F;
  let r = "";
  r += encode6bit(c1 & 0x3F);
  r += encode6bit(c2 & 0x3F);
  r += encode6bit(c3 & 0x3F);
  r += encode6bit(c4 & 0x3F);
  return r;
}

function encode6bit(b) {
  if (b < 10) { return String.fromCharCode(48 + b); }
  b -= 10;
  if (b < 26) { return String.fromCharCode(65 + b); }
  b -= 26;
  if (b < 26) { return String.fromCharCode(97 + b); }
  b -= 26;
  if (b == 0) { return '-'; }
  if (b == 1) { return '_'; }
  return '?';
}

//S: lib: plantuml **********************************************************
//VER: https://plantuml.com/
function plantumlImgUrlPara(texto_diagrama) { //U: una url que se puede usar en img src=...
	texto_diagrama= texto_diagrama.replace(/&gt;/g,'>').replace(/&lt;/g,'<'); //A: los corchetes que reemplaza django
  const s= unescape(encodeURIComponent(texto_diagrama));
  const url= "http://www.plantuml.com/plantuml/img/"+encode64(window.deflate(s, 9));
  return url;
}

function plantumlImgHtmlPara(texto_diagrama) { //U: un tag img con la url del diagrama
	return `<div class="diagrama"><img src="${plantumlImgUrlPara(texto_diagrama)}" alt="diagrama"></div>`
}

const PLANTUML_REGEX= /(^|\n)\s*@start(uml|salt|gantt|mindmap|wbs)[^]+?@end\2.*\n/g; //U: cualquier diagrama de pantuml

function hashtagAMarkdownLink(hashtag, anchor) {
		return `[${hashtag}](/charla/${hashtag.slice(1)}${anchor||''})` //A: con forma de link markdown
}		

function usuarioAMarkdownLink(usuario) {
	const username = usuario.slice(1);//A: sin @
	//DBG:console.log(usuario, JSON.stringify(username), pk, UsuariosPk	)
		return `[${usuario}](/como/${username})`; //A: con forma de link markdown si existia
}	


function youtubeUrlAEmbed(yturl) { //U: html con video embebido para la url de youtube yturl
  const m= yturl.match(/[?&]v=([a-zA-Z0-9-_]+)/);
	//VER: https://getbootstrap.com/docs/4.0/utilities/embed/
	const html= `
 <div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${m[1]}?rel=0" allowfullscreen></iframe>
</div>
`;
	return html;
}

var HASHTAG_RE= /(^|\s)#([A-Za-záéíóúüñÁÉÍÓÚÜÑ0-9_\.]+)/g;
var USUARIO_RE= /(^|\s)@([A-Za-z0-9_\.-]+)/g;
export function markdownTransformarHTML(src, el_id) { //U: convierte "nuestro" markdown en html, pura y facil de debuggear
	//TODO: No reemplazar hash en urls
	var t= {src: src}
	t.txt_con_tags = t.src.replace(HASHTAG_RE, 
		(m,m1,m2) => (m1+hashtagAMarkdownLink('#'+m2, '#'+el_id))); 
	//A: busco y reemplazo hashtags con links markdown
	t.txt_con_usuarios = t.txt_con_tags.replace( USUARIO_RE,
		(m,m1,m2) => (m1+usuarioAMarkdownLink('@'+m2))); 
	//A: busco y reemplazo usuarios con links markdown
	t.txt_con_video = t.txt_con_usuarios.replace(/https:\/\/www.youtube.com\/watch\S+/g, youtubeUrlAEmbed);
	t.txt_con_diagramas = t.txt_con_video.replace(PLANTUML_REGEX, plantumlImgHtmlPara);
	t.markdown_generado = t.txt_con_diagramas
	t.markedHtml= marked(t.markdown_generado); //A: convierto markdown a html
	return t;
}


