# Akış Şeması

Visio benzeri akış şeması çizme aracı. Canlı: https://mycosmosshop.github.io/akis-semasi/

- Tek dosya: `index.html`. draw.io'nun gömülü editörünü (embed.diagrams.net, JSON protokolü) iframe'de açar; üstteki çubuk sarmalayıcıya ait.
- Sarmalayıcı: çoklu çizim (localStorage `akis-cizimler`), şablonlar (hazır + kullanıcının), antet (şirket adı/logo, `akis-antet`), dışa aktarma (PNG/SVG xml gömülü, PDF yazdırma, .drawio), dosyadan açma, Supabase ile isteğe bağlı bulut eşitleme (kurulum: `BULUT.md`; anahtar kullanıcının tarayıcısında).
- Editör `configure=1` ile açılır: `compressXml:false` (sarmalayıcı XML'i okur/düzenler) ve varsayılan çizgi atlama (`jumpStyle=arc`).
- Visio: içe aktarma draw.io'nun kendi içe aktarıcısıyla (`load` mesajına `data:application/vnd.visio;base64,…`); dışa aktarma sarmalayıcıdaki kendi VSDX yazıcısıyla (`vsdxYap`; draw.io'nunki yalnızca Atlassian'da açık). Sınamak için LibreOffice: `soffice --headless --convert-to png x.vsdx`.
- Yapay zekâ: Google Gemini (kullanıcının kendi anahtarı, `akis-yz`); görsel/PDF/XLSX ya da metin → JSON (adımlar/bağlantılar) → `akistanXml` yerleşimi. Anahtarsızken metin satır satır çizilir.
- Excel çıktısı (ExcelJS, CDN'den): antetli iş akışı formu + "Rapor" sayfası. Antet iki stilde: klasik ve kurumsal şerit (koyu ad bandı · başlık · açık doküman no bandı · gri alt bilgi). Şirket adı/renk/logo/alt bilgi kullanıcının tarayıcısındaki Antet ayarından ya da "İçe aktar" ile yüklenen antet JSON'undan (`tur: akis-antet`) gelir; depoya şirket adı ya da antet dosyası koyma. Antet şekilleri `antet=1` stiliyle işaretli, akış adımı sayılmaz.
- Çizgi atlama: draw.io'da çizgi yalnızca kendi stilinde jumpStyle varsa ve kendinden önceki çizgiyi keserse atlar; `ac()` açılışta jumpStyle'ı olmayan çizgilere `arc` ekler, "Atlama yok" `jumpStyle=none` yazar.
- Visio benzeri araçlar: şekil verileri (sorumlu/sure/maliyet/durum → draw.io `<object>` öznitelikleri, VSDX'te Shape Data), durum renkleri, diyagram raporu, katmanlar VSDX'e aktarılır.
- Bu bulut ortamından embed.diagrams.net, github.io, jsdelivr ve Gemini’ye erişim yok; sınamada Playwright `route` ile editörü sahte protokol sayfasıyla, CDN’leri npm’den indirilen dosyalarla, Gemini’yi sahte cevapla değiştir (Chromium için `/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell`).
- Yayın: GitHub Pages, `main` dalının kökü. Push = yayın.
- Editörü sıfırdan yazma; draw.io'nun yapamadığı bir şey gerekirse sarmalayıcıya ekle (embed protokolü: https://www.drawio.com/doc/faq/embed-mode).
- Kullanıcıyla Türkçe konuş; arayüz metinleri Türkçe.
- Depo herkese açık: sır, anahtar, müşteri adı koyma.
