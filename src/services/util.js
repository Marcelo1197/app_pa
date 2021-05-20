//INFO: utilidades generales 

const P_SEP_RE= /([^A-Za-z0-9_\.+\$-])/;
function parse_p(p, sepRe) { return p.split(sepRe || P_SEP_RE).slice(1); }
function get_p_impl(dst,p,wantsCreate,max,sepRe) { //U: trae un valor en un "path" de kv/arrays anidados
  var parts= Array.isArray(p) ? p : parse_p(p,sepRe);
	if (parts.length && parts[parts.length-1]=="") { parts.pop(); }
	//A: p empieza con un separador 
	dst= dst!=null ? dst : wantsCreate ? (parts[0]=="[" ? [] : {} ) : null;
	max= max||0;
	var dstp= dst;
  for (var i=1; dstp!=null && i<parts.length-max; i+=2)  { var k= parts[i]; var t= parts[i+1]; 
    //DBG logm("DBG",1,"LIB set_p",{k: k, t: t, i: i, dstp: dstp});
		var x= dstp[k];
		if (x==null && wantsCreate && i<parts.length-1) { x= dstp[k]= (t=="[" ? [] : {} ); }
		dstp= x; 
  }
	//A: dstp tiene el objeto donde hay que poner el valor
  //DBG logm("DBG",1,"LIB set_p",{p: p, dstp: dstp});
	return [dstp,dst];
}

export function get_p(dst,p,wantsCreate,sepRe) { //U: trae un valor en un "path" de kv/arrays anidados
	return get_p_impl(dst,p,wantsCreate,null,sepRe)[0];
}

export function set_p(dst,p,v,wantsIfNotSet,sepRe) { //U: pone un valor en un "path" de kv/arrays anidados
  var parts= Array.isArray(p) ? p : parse_p(p,sepRe);
	//A: p empieza con un separador => parts[0] se ignora, parts[i] es tipo, parts[i+1] clave
	var dd= get_p_impl(dst,p,1,1,sepRe);	
	var dstp= dd[0];
  //DBG logm("DBG",1,"LIB set_p",{p: p, dstp: dstp});
	try {
		var k= parts[parts.length-1];
 	 	if (wantsIfNotSet && dstp[k]!=null) { }
 	 	else { if (k=="+") {dstp.push(v)} else if (k=="-") {dstp.unshift(v)} else { dstp[k]= v; } }
	} catch (ex) { logmex("ERR",1,"set_p",{dst: dst,p:p,parts:parts,dstp: dstp},ex) }

	return dd[1];
}

export function set_p_all(dst,kv) { dst= dst || {}; //U: kv= path->v
	fold(kv,function (v,k) { set_p(dst,k,v); }); 
	return dst;
}



