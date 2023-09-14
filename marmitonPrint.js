// ressources :
//
// https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension
//
(() => {
	//
	// Check and set a global guard variable.
	// If this content script is injected into the same page again,
	// it will do nothing next time.
	//
	if (window.hasRun) {
		return;
	}

	window.hasRun = true;

	let section = document.createElement ( "section" );

	let div = document.createElement ( "div" );
	section.appendChild ( div );
	div.style.display = "flex";
	div.style.height = "150px";
	div.style.alignItems = "center";
	div.style.justifyContent = "space-between";

	let content = document.getElementById ( "content" );
	let msg = document.createElement ( "p" );

	if ( !content )
	{
		return 1;
	}

	try
	{
		let mainImg = content.getElementsByClassName ( "SHRD__sc-dy77ha-0" )[ 0 ].cloneNode ( true );
		mainImg.style.width = "auto";
		mainImg.style.height = "150px";
		div.appendChild ( mainImg );
	}
	catch ( e )
	{
		msg.innerHTML += "picture " + e;
	}

	try
	{
		let title = content.getElementsByClassName ( "RCP__sc-l87aur-2" )[ 0 ].cloneNode ( true );
		title.style.paddingLeft = "10px";
		title.style.paddingRight = "10px";
		title.style.marginBottom = "0";
		title.style.display = "flex";
		title.style.flexDirection = "column";
		title.firstChild.removeChild ( title.firstChild.lastChild );
		let nb = content.getElementsByClassName ( "SHRD__sc-w4kph7-5" )[ 0 ].cloneNode ( true );
		title.appendChild ( nb );
		div.appendChild ( title );
	}
	catch ( e )
	{
		msg.innerHTML += "title " + e;
	}

	try
	{
		let res = content.getElementsByClassName ( "RCP__sc-vgpd2s-0" )[ 0 ].cloneNode ( true );
		section.appendChild ( res );
	}
	catch ( e )
	{
		msg.innerHTML += "ressources " + e;
	}

	try
	{
		let actions = content.getElementsByTagName ( "ul" )[ 0 ].cloneNode ( true );
		section.appendChild ( actions );
	}
	catch ( e )
	{
		msg.innerHTML += "actions " + e;
	}

	try{
		let qr = document.createElement ( "img" );
		div.appendChild ( qr );
		qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+encodeURI ( window.location.origin+window.location.pathname );
	}catch ( e ) {
		msg.innerHTML += "qr " + e;
	}

	section.appendChild ( msg );
	document.body.appendChild ( section );
})();


