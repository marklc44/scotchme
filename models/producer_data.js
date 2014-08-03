var producers = [
	{
		name: 'Aberfeldy',
		url: 'http://en.wikipedia.org/wiki/Aberfeldy_distillery',
		image:'http://www.drinksupermarket.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/b/aberfeldy-12-yo-highland-single-malt-scotch-whisky-70cl.jpg',
		region: 'Highland'
	},
	{
		name: 'Aberlour',
		url: 'http://www.aberlour.com/',
		image: 'http://www.aberlour.com/wp-content/themes/aberlour/img/header-logo.png',
		region: 'Speyside'
	},
	{
		name: 'AnCnoc',
		url: 'http://ancnoc.com/',
		image: 'http://ancnoc.com/content/images/branding/logo.svg',
		region: 'Speyside'
	},
	{
		name: 'Ardbeg',
		url: 'http://www.ardbeg.com/ardbeg/',
		image: 'http://www.ardbeg.com/ardbeg/themes/ardbeg/images/roundel.jpg',
		region: 'Islay'
	},
	{
		name: 'Ardmore',
		url: 'http://www.ardmorewhisky.com/index.aspx',
		image: 'http://www.ardmorewhisky.com/Images/age_ver_logo.jpg',
		region: 'Highland'
	},
	{
		name: 'Isle of Arran',
		url: 'http://www.arranwhisky.com/',
		image: 'http://www.arranwhisky.com/sites/default/files/arran-logo-brown-web.png',
		region: 'Islands'
	},
	{
		name: 'Auchentoshan',
		url: 'http://www.auchentoshan.com/',
		image: 'http://www.auchentoshan.com/media/8793/central-hero-images-core-range-12yo.png',
		region: 'Lowland'
	},
	{
		name: 'Auchroisk',
		url: 'http://en.wikipedia.org/wiki/Auchroisk_distillery',
		image: 'https://www.sfwtc.com/images/sites/sfwtc/labels/t5049306w5_1.jpg',
		region: 'Speyside'
	},
	{
		name: 'Aultmore',
		url: 'http://en.wikipedia.org/wiki/Aultmore_distillery',
		image: 'http://upload.wikimedia.org/wikipedia/commons/3/3d/Aultmore_Distillery_-_geograph.org.uk_-_86359.jpg',
		region: 'Highland'
	},
	{
		name: 'Balblair',
		url: 'http://www.balblair.com/',
		image: 'http://www.whisky-drinker.com/pages/wp-content/uploads/2012/07/balblair.jpg',
		region: 'Highland'
	},
	{
		name: 'Balmenach',
		url: 'http://en.wikipedia.org/wiki/Balmenach_distillery',
		image: 'http://www.specialistwhisky.com/images/uploads/Balmenach/SW-Balmenach-12-b2.jpg',
		region: 'Speyside'
	},
	{
		name: 'Belvenie',
		url: 'https://us.thebalvenie.com/',
		image: 'https://us.thebalvenie.com/uploads/expressions/508e6606f2614.png',
		region: 'Speyside'
	},
	{
		name: 'BenNevis',
		url: 'http://www.bennevisdistillery.com/',
		image: 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Ben_Nevis_montgomerie%27s.jpg/1024px-Ben_Nevis_montgomerie%27s.jpg',
		region: 'Highland'
	},
	{
		name: 'Benriach',
		url: 'http://www.benriachdistillery.co.uk/'
		image: 'http://www.benriachdistillery.co.uk/images/BenRiach_Heredotus_Fumosus',
		region: 'Speyside'
	},
	{
		name: 'Benrinnes',
		url: 'http://en.wikipedia.org/wiki/Benrinnes_distillery',
		image: 'http://blog.thewhiskyexchange.com/tweblog/wp-content/uploads/2009/10/benrinnes-bot-box-091.jpg',
		region: 'Speyside'
	},
	{
		name: 'Benromach',
		url: 'http://www.benromach.com/',
		image: 'http://www.benromach.com/images/benromach-organic.png',
		region: 'Speyside'
	},
	{
		name: 'Bladnoch',
		url: 'http://www.bladnoch.co.uk/',
		image: 'http://www.scotchwhiskyexpress.com/shopimages/sections/thumbnails/bladnoch-distillery-ii.jpg',
		region: 'Lowland'
	},
	{
		name: 'BlairAthol',
		url: 'http://en.wikipedia.org/wiki/Blair_Athol_distillery',
		image: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Blair_Athol.JPG/480px-Blair_Athol.JPG',
		region: 'Highland'
	},
	{
		name: 'Bowmore',
		url: 'http://www.bowmore.com/',
		image: 'http://www.bowmore.com/Content/images/logo.png',
		region: 'Islay'
	},
	{
		name: 'Bruichladdich',
		url: 'http://www.bruichladdich.com/',
		image: 'http://www.bruichladdich.com/components/com_virtuemart/shop_image/product/resized/Port_Charlotte_S_51f25e197b2b2-213x280.jpg',
		region: 'Islay'
	},
	{
		name: 'Bunnahabhain',
		url: 'http://bunnahabhain.com/',
		image: 'http://premiumspirits.files.wordpress.com/2009/08/bunnahabhain25yearoldboxlowres.jpg',
		region: 'Islay'
	},
	{
		name: 'Caol Ila',
		url: 'http://en.wikipedia.org/wiki/Caol_Ila_distillery',
		image: 'http://www.ozonodrinks.com.ar/prod_images/0000000821_1.jpg',
		region: 'Islay'
	},
	{
		name: 'Cardhu',
		url: 'http://www.cardhuwhisky.com/gateway.php',
		image: 'http://www.thegreenwellystop.co.uk/whiskyshop/images/uploads/Cardhu/Dec12-Cardhu12-1.jpg',
		region: 'Speyside'
	},
	{
		name: 'Clynelish',
		url: 'http://en.wikipedia.org/wiki/Clynelish_distillery',
		image: 'http://www.whisky-online.com/images/products/377-2660clynelish14yearoldbox.jpg',
		region: 'Highland'
	},
	{
		name: 'Craigallechie',
		url: 'http://en.wikipedia.org/wiki/Craigellachie_distillery',
		image: 'http://www.scotchwhisky.net/images/bots/craigellachie.jpg',
		region: 'Speyside'
	},
	{
		name: 'Cragganmore',
		url: 'http://en.wikipedia.org/wiki/Cragganmore_distillery',
		image: 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Cragganmore.jpg/440px-Cragganmore.jpg',
		region: 'Speyside'
	}
];






