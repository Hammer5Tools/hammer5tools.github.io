fetch( 'https://api.github.com/repos/dertwist/Hammer5Tools/releases/latest' )
	.then( function( response )
	{
		if( !response.ok )
		{
			throw new Error( 'Failed to fetch github release' );
		}

		return response.json();
	} )
	.then( function( response )
	{
		for( const asset of response.assets )
		{
			if( asset.name === 'hammer5tools_setup.exe' )
			{
				document.getElementById( 'js-download' ).href = asset.browser_download_url;
				document.getElementById( 'js-download-header' ).href = asset.browser_download_url;

				const version = document.querySelector( '.download-version' );
				version.href = response.html_url;

				let string = `View release notes for ${response.tag_name}`;

				if( window.innerWidth > 500 )
				{
					const date = new Date( response.published_at );
					string += `, released on ${date.toLocaleDateString()}`;
				}

				version.textContent = string;

				break;
			}
		}
	} );
