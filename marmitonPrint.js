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

	let divIngredients = document.createElement ( "div" );
	section.appendChild ( divIngredients );
	divIngredients.id = "ox223252_ingredients";
	divIngredients.style.display = "flex";
	divIngredients.style.flexWrap = "wrap";
	divIngredients.style.alignItems = "center";
	divIngredients.style.justifyContent = "space-between";

	let actions = document.createElement ( "ol" );
	section.appendChild ( actions );

	let content = document.getElementById ( "content" );
	let msg = document.createElement ( "p" );


	if ( !content )
	{
		return 1;
	}

	try
	{ // main picture
		let mainImg = document.getElementById ( "recipe-media-viewer-thumbnail-0" ).cloneNode ( true );
		mainImg.style.width = "auto";
		mainImg.style.height = "150px";
		div.appendChild ( mainImg );
	}
	catch ( e )
	{
		msg.appendChild ( document.createTextNode ( "picture " + e ) );
	}

	try
	{ // title
		let title = content.getElementsByClassName ( "main-title" )[ 0 ].cloneNode ( true );
		title.style.paddingLeft = "10px";
		title.style.paddingRight = "10px";
		title.style.marginBottom = "0";
		title.style.display = "flex";
		title.style.flexDirection = "column";
		let nb = content.getElementsByClassName ( "recipe-ingredients__qt-counter__value" )[ 0 ].value;
		title.appendChild ( document.createTextNode ( nb + " personnes" ) );
		div.appendChild ( title );
	}
	catch ( e )
	{
		msg.appendChild ( document.createTextNode ( "title " + e ) );
	}

	try
	{ // ingredients
		let res = content.getElementsByClassName ( "card-ingredient" );

		for ( let r of res )
		{
			divIngredients.appendChild ( r.cloneNode ( true ) );
		}
	}
	catch ( e )
	{
		msg.appendChild ( document.createTextNode ( "ressources " + e ) );
	}

	try
	{ // actions
		for ( let a of content.getElementsByClassName ( "recipe-step-list__container" ) )
		{
			let li = document.createElement ( "li" );
			actions.appendChild ( li );
			a = a.getElementsByTagName ( "p" )[ 0 ];
			li.appendChild ( document.createTextNode ( a.innerHTML ) );
		}
	}
	catch ( e )
	{
		msg.appendChild ( document.createTextNode ( "actions " + e ) );
	}

	try
	{ // Qr code
		let qr = document.createElement ( "img" );
		div.appendChild ( qr );
		qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+encodeURI ( window.location.origin+window.location.pathname );
	}
	catch ( e )
	{
		msg.appendChild ( document.createTextNode ( "qr " + e ) );
	}

	let els = []
	els.push ( ...section.getElementsByClassName ( "lazyload" ) );
	els.push ( ...section.getElementsByClassName ( "lazyloaded" ) );
	for ( el of els )
	{
		el.classList.remove ( "lazyload" );
		el.classList.remove ( "lazyloaded" );
		el.src = el.dataset.src;
	}

	section.appendChild ( msg );
	document.body.appendChild ( section );
})();


