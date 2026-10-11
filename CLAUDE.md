# Akış Şeması

Visio benzeri akış şeması çizme aracı. Canlı: https://mycosmosshop.github.io/akis-semasi/

- Tek dosya: `index.html`. draw.io'nun gömülü editörünü (embed.diagrams.net, JSON protokolü) iframe'de açar; üstteki çubuk sarmalayıcıya ait.
- Sarmalayıcı: çoklu çizim (localStorage `akis-cizimler`), şablonlar (hazır + kullanıcının), antet (şirket adı/logo, `akis-antet`), dışa aktarma (PNG/SVG xml gömülü, PDF yazdırma, .drawio), dosyadan açma, Supabase ile isteğe bağlı bulut eşitleme (kurulum: `BULUT.md`; anahtar kullanıcının tarayıcısında).
- Bu bulut ortamından embed.diagrams.net ve github.io'ya erişim yok; sınamada editörü Playwright `route` ile sahte bir protokol sayfasıyla değiştir.
- Yayın: GitHub Pages, `main` dalının kökü. Push = yayın.
- Editörü sıfırdan yazma; draw.io'nun yapamadığı bir şey gerekirse sarmalayıcıya ekle (embed protokolü: https://www.drawio.com/doc/faq/embed-mode).
- Kullanıcıyla Türkçe konuş; arayüz metinleri Türkçe.
- Depo herkese açık: sır, anahtar, müşteri adı koyma.
