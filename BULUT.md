# Buluta kayıt kurulumu (Supabase)

Çizimlerin her cihazda görünmesi için bir kez yapılır. Ücretsiz plan yeterli.

1. https://supabase.com adresinde hesap açın, **New project** ile proje oluşturun.
2. Sol menüden **SQL Editor**'ü açın, aşağıdakini yapıştırıp **Run** deyin:

```sql
create table cizimler (
  id text primary key,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  ad text not null,
  xml text not null,
  guncel bigint not null
);
alter table cizimler enable row level security;
create policy "kendi cizimlerim" on cizimler for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
```

3. **Authentication › URL Configuration** bölümünde **Site URL** alanına
   `https://mycosmosshop.github.io/akis-semasi/` yazın (giriş bağlantısı bu sayfaya döner).
4. **Project Settings › API** bölümünden **Project URL** ve **anon / publishable key** değerlerini kopyalayın.
5. Uygulamada **☁ Bulut** düğmesine basın, bu iki değeri ve e-postanızı girin, **Giriş bağlantısı gönder** deyin.
   E-postadaki bağlantıya tıklayınca eşitleme başlar.

Notlar:
- Anahtarlar bu depoya yazılmaz; yalnızca sizin tarayıcınızda saklanır. anon anahtarı herkese açık olacak şekilde tasarlanmıştır, verileri yukarıdaki satır güvenliği (RLS) kuralı korur: herkes yalnızca kendi çizimlerini görür.
- Aynı çizim iki cihazda değiştirilirse en son kaydedilen geçerli olur.
- Antet bilgileri ve kendi şablonlarınız şimdilik yalnızca o tarayıcıda saklanır.
