/**
 * Copyright (c) 2006-2024, JGraph Holdings Ltd
 * Copyright (c) 2006-2024, draw.io AG
 */
// null'ing of global vars need to be after init.js
window.ICONSEARCH_PATH = null;
window.ICON_SERVICE_PATH = null;

// ---------- Akış Şeması eklentisi: çizgi atlama seçenekleri ----------
// Seçili çizgi(ler)e uygulanır: sağ tık menüsünde "Çizgi atlama" alt menüsü,
// satır içi "Bağlantı" penceresinde simgeli "Atlama" ve "Atlama boyutu" bölümleri.
(function()
{
	if (typeof Menus === 'undefined' || typeof mxUtils === 'undefined')
	{
		return;
	}

	var dikey = '<path d="M14 3V25" stroke-width="1.2" opacity=".55"/>';
	var ikon = function(yol)
	{
		return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" ' +
			'fill="none" stroke="#333" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + dikey + '<path d="' + yol + '"/></svg>');
	};
	var ATLAMA = [
		{v: 'arc', ad: 'Yay', yol: 'M2 16H9A5 5 0 0 1 19 16H26'},
		{v: 'gap', ad: 'Boşluk', yol: 'M2 16H10M18 16H26'},
		{v: 'sharp', ad: 'Köşeli', yol: 'M2 16H9L14 9L19 16H26'},
		{v: 'line', ad: 'Köprü', yol: 'M2 16H8L10 11H18L20 16H26'},
		{v: 'none', ad: 'Atlama yok', yol: 'M2 16H26'}];
	var BOYUT = [
		{v: '6', ad: 'Küçük', yol: 'M2 16H11A3 3 0 0 1 17 16H26'},
		{v: '10', ad: 'Orta', yol: 'M2 16H9A5 5 0 0 1 19 16H26'},
		{v: '16', ad: 'Büyük', yol: 'M2 16H6A8 8 0 0 1 22 16H26'}];

	var seciliCizgiler = function(graph)
	{
		var sonuc = [], hucreler = graph.getSelectionCells();

		for (var i = 0; i < hucreler.length; i++)
		{
			if (graph.getModel().isEdge(hucreler[i]))
			{
				sonuc.push(hucreler[i]);
			}
		}

		return sonuc;
	};

	// Uygular ve yeni çizilen çizgilerin de aynı ayarı alması için styleChanged yayınlar
	var uygula = function(ui, anahtar, deger)
	{
		var graph = ui.editor.graph, cizgiler = seciliCizgiler(graph);

		if (cizgiler.length == 0)
		{
			return;
		}

		graph.getModel().beginUpdate();

		try
		{
			graph.setCellStyles(anahtar, deger, cizgiler);

			if (anahtar == 'jumpSize')
			{
				var st = graph.getCurrentCellStyle(cizgiler[0]);

				if (mxUtils.getValue(st, 'jumpStyle', 'none') == 'none')
				{
					graph.setCellStyles('jumpStyle', 'arc', cizgiler);
				}
			}
		}
		finally
		{
			graph.getModel().endUpdate();
		}

		ui.fireEvent(new mxEventObject('styleChanged', 'keys', [anahtar], 'values', [deger], 'cells', cizgiler));
	};

	// Sağ tık menüsü
	var hucreOgeleri = Menus.prototype.addPopupMenuCellItems;

	Menus.prototype.addPopupMenuCellItems = function(menu, cell, evt)
	{
		hucreOgeleri.apply(this, arguments);

		var ui = this.editorUi, graph = ui.editor.graph, cizgiler = seciliCizgiler(graph);

		if (cizgiler.length == 0 || cizgiler.length != graph.getSelectionCount())
		{
			return;
		}

		var st = graph.getCurrentCellStyle(cizgiler[0]);
		var tur = mxUtils.getValue(st, 'jumpStyle', 'none');
		var boy = String(mxUtils.getValue(st, 'jumpSize', '6'));
		var ekle = function(liste, anahtar, secili, ust)
		{
			for (var i = 0; i < liste.length; i++)
			{
				(function(o)
				{
					menu.addItem(o.ad + (o.v == secili ? '  ✓' : ''), ikon(o.yol), function() { uygula(ui, anahtar, o.v); }, ust);
				})(liste[i]);
			}
		};

		menu.addSeparator();
		var alt = menu.addItem('Çizgi atlama', null, null);
		ekle(ATLAMA, 'jumpStyle', tur, alt);
		menu.addSeparator(alt);
		ekle(BOYUT, 'jumpSize', boy, alt);
	};

	// Satır içi "Bağlantı" penceresi: çizgi şekli bölümünün arkasına atlama bölümleri
	if (typeof InlineToolbar !== 'undefined' && typeof Format !== 'undefined')
	{
		var izgara = InlineToolbar.prototype.buildIconGrid;

		InlineToolbar.prototype.buildIconGrid = function(body, items, active, apply)
		{
			var sonuc = izgara.apply(this, arguments);

			if (items != null && items.length > 0 && Format.connectionImage != null &&
				items[0].img == Format.connectionImage.src && this.currentState != null)
			{
				var st = this.graph.getCurrentCellStyle(this.currentState.cell);
				var tur = mxUtils.getValue(st, 'jumpStyle', 'none');
				var boy = String(mxUtils.getValue(st, 'jumpSize', '6'));
				var bolum = function(baslik, liste, anahtar, secili)
				{
					var cizgi = document.createElement('div');
					cizgi.style.height = '1px';
					cizgi.style.backgroundColor = 'light-dark(#d0d0d0, #505050)';
					cizgi.style.margin = '6px 0';
					body.appendChild(cizgi);

					var yazi = document.createElement('div');
					yazi.style.fontSize = '11px';
					yazi.style.margin = '0 0 4px 2px';
					yazi.style.color = 'light-dark(#666, #aaa)';
					mxUtils.write(yazi, baslik);
					body.appendChild(yazi);

					var ogeler = [], etkin = -1;

					for (var i = 0; i < liste.length; i++)
					{
						ogeler.push({img: ikon(liste[i].yol), title: baslik + ': ' + liste[i].ad,
							keys: anahtar == 'jumpSize' ? ['jumpSize', 'jumpStyle'] : ['jumpStyle'],
							values: anahtar == 'jumpSize' ? [liste[i].v, tur == 'none' ? 'arc' : tur] : [liste[i].v]});

						if (liste[i].v == secili)
						{
							etkin = i;
						}
					}

					izgara.call(this, body, ogeler, etkin, apply);
				};

				bolum.call(this, 'Çizgi atlama', ATLAMA, 'jumpStyle', tur);
				bolum.call(this, 'Atlama boyutu', BOYUT, 'jumpSize', boy);
			}

			return sonuc;
		};
	}
})();
