import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DRINKS = [
  {
    id: 1,
    name: "Кофе",
    price: 10,
    emoji: "☕",
    desc: "Насыщенный и бодрящий",
    color: "#8B4513",
    bg: "#FFF8F0",
    image: "https://cdn.poehali.dev/projects/b3e20e85-827d-46a5-bd6a-fb2a0bf5c7f2/files/326ac8bd-ea8d-4a32-9f75-fc70c365bc3e.jpg",
  },
  {
    id: 2,
    name: "Мятный чай",
    price: 8,
    emoji: "🌿",
    desc: "Освежающий и успокаивающий",
    color: "#2D7A4F",
    bg: "#F0FFF6",
    image: "https://cdn.poehali.dev/projects/b3e20e85-827d-46a5-bd6a-fb2a0bf5c7f2/files/d8c3d6a8-a3d7-4470-80b6-34db0f33ccdd.jpg",
  },
  {
    id: 3,
    name: "Какао",
    price: 7,
    emoji: "🍫",
    desc: "Тёплый и уютный вкус",
    color: "#6B3A2A",
    bg: "#FFF5F0",
    image: "https://cdn.poehali.dev/projects/b3e20e85-827d-46a5-bd6a-fb2a0bf5c7f2/files/220e242a-d72a-4448-8331-7f5d9bb4ddb8.jpg",
  },
  {
    id: 4,
    name: "Чёрный чай",
    price: 7,
    emoji: "🫖",
    desc: "Классический и крепкий",
    color: "#3D2B1F",
    bg: "#FFF9F5",
    image: "https://cdn.poehali.dev/projects/b3e20e85-827d-46a5-bd6a-fb2a0bf5c7f2/files/100e722f-1370-494b-bc8b-a70ae2910153.jpg",
  },
  {
    id: 5,
    name: "Зелёный чай",
    price: 9,
    emoji: "🍵",
    desc: "Лёгкий и полезный",
    color: "#4A7C59",
    bg: "#F2FFF5",
    image: "https://cdn.poehali.dev/projects/b3e20e85-827d-46a5-bd6a-fb2a0bf5c7f2/files/4b0856f8-d10e-4dad-bec5-7ee2f8f356f3.jpg",
  },
  {
    id: 6,
    name: "Цикорий",
    price: 8,
    emoji: "🌾",
    desc: "Без кофеина, мягкий вкус",
    color: "#A0714F",
    bg: "#FDF6EE",
    image: "https://cdn.poehali.dev/projects/b3e20e85-827d-46a5-bd6a-fb2a0bf5c7f2/files/0900a3b5-f43b-4a85-bc86-ba1abd42e287.jpg",
  },
];

type CartItem = { drink: (typeof DRINKS)[0]; qty: number };
type Section = "home" | "menu" | "cart" | "about";

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<(typeof DRINKS)[0] | null>(null);
  const [orderDone, setOrderDone] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.drink.price, 0);

  function addToCart(drink: (typeof DRINKS)[0]) {
    setCart((prev) => {
      const existing = prev.find((i) => i.drink.id === drink.id);
      if (existing)
        return prev.map((i) =>
          i.drink.id === drink.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { drink, qty: 1 }];
    });
    setSelectedDrink(null);
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.drink.id !== id));
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) =>
      prev.map((i) =>
        i.drink.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  }

  function placeOrder() {
    setOrderDone(true);
    setCart([]);
    setTimeout(() => {
      setOrderDone(false);
      setSection("home");
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSection("home")}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">☕</span>
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: "'Cormorant', serif", color: "hsl(25, 85%, 38%)" }}
            >
              Уютная кружка
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {(["home", "menu", "about"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  section === s
                    ? "text-white"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                }`}
                style={
                  section === s
                    ? { backgroundColor: "hsl(25, 85%, 38%)" }
                    : {}
                }
              >
                {{ home: "Главная", menu: "Меню", about: "О нас" }[s]}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setSection("cart")}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50 transition-all text-sm font-medium"
          >
            <Icon name="ShoppingBag" size={16} />
            Корзина
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                style={{ backgroundColor: "hsl(25, 85%, 38%)" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex border-t border-stone-100 px-4 py-2 gap-1 overflow-x-auto">
          {(["home", "menu", "cart", "about"] as Section[]).map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                section === s ? "text-white" : "text-stone-500 bg-stone-50"
              }`}
              style={
                section === s ? { backgroundColor: "hsl(25, 85%, 38%)" } : {}
              }
            >
              {
                {
                  home: "Главная",
                  menu: "Меню",
                  cart: `Корзина${cartCount > 0 ? ` (${cartCount})` : ""}`,
                  about: "О нас",
                }[s]
              }
            </button>
          ))}
        </div>
      </header>

      {/* HOME */}
      {section === "home" && (
        <main>
          <section className="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-6 border border-amber-100">
              <span>✨</span> Свежее меню каждый день
            </div>
            <h1
              className="text-6xl md:text-7xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Cormorant', serif", color: "hsl(20, 15%, 12%)" }}
            >
              Тепло в каждой <br />
              <span style={{ color: "hsl(25, 85%, 38%)" }}>кружке</span>
            </h1>
            <p className="text-stone-500 text-lg mb-8 max-w-md mx-auto">
              5 авторских напитков — от бодрящего кофе до ароматного мятного чая
            </p>
            <button
              onClick={() => setSection("menu")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              style={{ backgroundColor: "hsl(25, 85%, 38%)" }}
            >
              Смотреть меню
              <Icon name="ArrowRight" size={20} />
            </button>
          </section>

          <section className="max-w-5xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "Clock", title: "Быстро", desc: "Готовим за 3–5 минут" },
              { icon: "Heart", title: "С душой", desc: "Натуральные ингредиенты" },
              { icon: "Sparkles", title: "Вкусно", desc: "Проверено сотнями гостей" },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-stone-100 p-6 flex items-start gap-4 hover:border-stone-200 hover:shadow-sm transition-all animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(180, 83, 30, 0.1)" }}
                >
                  <Icon name={f.icon} size={20} style={{ color: "hsl(25, 85%, 38%)" }} />
                </div>
                <div>
                  <div className="font-semibold text-stone-800 mb-1">{f.title}</div>
                  <div className="text-stone-500 text-sm">{f.desc}</div>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-stone-50 py-16">
            <div className="max-w-5xl mx-auto px-4">
              <h2
                className="text-3xl font-bold text-center mb-2"
                style={{ fontFamily: "'Cormorant', serif" }}
              >
                Популярные напитки
              </h2>
              <p className="text-stone-500 text-center mb-8 text-sm">
                Нажми на карточку, чтобы заказать
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {DRINKS.map((d, i) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDrink(d)}
                    className="rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-md hover:scale-105 transition-all text-left animate-slide-up"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div
                      className="aspect-square overflow-hidden"
                      style={{ backgroundColor: d.bg }}
                    >
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="font-semibold text-stone-800 text-sm">
                        {d.name}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">{d.desc}</div>
                      <div
                        className="mt-2 font-bold text-sm"
                        style={{ color: "hsl(25, 85%, 38%)" }}
                      >
                        {d.price} ₽
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* MENU */}
      {section === "menu" && (
        <main className="max-w-5xl mx-auto px-4 py-10">
          <div className="mb-8 animate-slide-up">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              Наше меню
            </h1>
            <p className="text-stone-500">Выбери напиток и добавь в корзину</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DRINKS.map((d, i) => (
              <div
                key={d.id}
                className="rounded-2xl border border-stone-100 bg-white overflow-hidden hover:shadow-lg transition-all animate-slide-up group"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ backgroundColor: d.bg }}
                >
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-bold shadow"
                    style={{ backgroundColor: d.color }}
                  >
                    {d.price} ₽
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{d.emoji}</span>
                    <h3 className="text-xl font-semibold text-stone-800">{d.name}</h3>
                  </div>
                  <p className="text-stone-500 text-sm mb-4">{d.desc}</p>
                  <button
                    onClick={() => setSelectedDrink(d)}
                    className="w-full py-2.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    style={{ backgroundColor: "hsl(25, 85%, 38%)" }}
                  >
                    Заказать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* CART */}
      {section === "cart" && (
        <main className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
          <h1
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Корзина
          </h1>

          {orderDone && (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Заказ принят!</h2>
              <p className="text-green-600">Готовим твой напиток...</p>
            </div>
          )}

          {!orderDone && cart.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-stone-500 text-lg mb-6">Корзина пуста</p>
              <button
                onClick={() => setSection("menu")}
                className="px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: "hsl(25, 85%, 38%)" }}
              >
                Перейти в меню
              </button>
            </div>
          )}

          {!orderDone && cart.length > 0 && (
            <>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.drink.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-stone-100 bg-white hover:border-stone-200 transition-all animate-slide-up"
                  >
                    <div
                      className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ backgroundColor: item.drink.bg }}
                    >
                      <img
                        src={item.drink.image}
                        alt={item.drink.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                        {item.drink.emoji} {item.drink.name}
                      </div>
                      <div className="text-stone-400 text-sm">
                        {item.drink.price} ₽ / шт.
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.drink.id, -1)}
                        className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-all"
                      >
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="w-6 text-center font-semibold text-stone-800">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => changeQty(item.drink.id, 1)}
                        className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-all"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <div className="font-bold text-stone-800 w-16 text-right">
                      {item.qty * item.drink.price} ₽
                    </div>
                    <button
                      onClick={() => removeFromCart(item.drink.id)}
                      className="text-stone-300 hover:text-red-400 transition-colors"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-stone-100 p-5 bg-stone-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-stone-500">Итого:</span>
                  <span className="text-2xl font-bold text-stone-800">
                    {cartTotal} ₽
                  </span>
                </div>
                <button
                  onClick={placeOrder}
                  className="w-full py-4 rounded-xl text-white font-semibold text-lg hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md"
                  style={{ backgroundColor: "hsl(25, 85%, 38%)" }}
                >
                  Оплатить {cartTotal} ₽
                </button>
                <p className="text-center text-stone-400 text-xs mt-3">
                  Онлайн-оплата • Безопасно
                </p>
              </div>
            </>
          )}
        </main>
      )}

      {/* ABOUT */}
      {section === "about" && (
        <main className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
          <h1
            className="text-4xl font-bold mb-6"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            О нас
          </h1>
          <div className="rounded-2xl overflow-hidden mb-8 bg-amber-50 flex items-center justify-center py-16">
            <span className="text-8xl">☕</span>
          </div>
          <div className="space-y-4 text-stone-600 leading-relaxed">
            <p className="text-lg">
              <strong className="text-stone-800">«Уютная кружка»</strong> — место,
              где время замедляется, а каждый глоток приносит удовольствие.
            </p>
            <p>
              Мы предлагаем простое меню из 5 любимых напитков: насыщенный кофе,
              ароматный мятный чай, тёплое какао, крепкий чёрный и лёгкий зелёный
              чай.
            </p>
            <p>
              Все напитки готовятся из натуральных ингредиентов и подаются с
              теплотой. Заказывайте онлайн — это быстро и удобно.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { num: "5", label: "напитков в меню" },
              { num: "3 мин", label: "среднее время" },
              { num: "100%", label: "натуральное" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center rounded-2xl border border-stone-100 p-5"
              >
                <div
                  className="text-3xl font-bold"
                  style={{
                    color: "hsl(25, 85%, 38%)",
                    fontFamily: "'Cormorant', serif",
                  }}
                >
                  {s.num}
                </div>
                <div className="text-stone-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Order Dialog */}
      <Dialog
        open={!!selectedDrink}
        onOpenChange={(o) => !o && setSelectedDrink(null)}
      >
        <DialogContent className="rounded-3xl max-w-sm border-0 shadow-2xl p-0 overflow-hidden">
          {selectedDrink && (
            <>
              <div
                className="aspect-[4/3] overflow-hidden"
                style={{ backgroundColor: selectedDrink.bg }}
              >
                <img
                  src={selectedDrink.image}
                  alt={selectedDrink.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <DialogHeader className="mb-4">
                  <DialogTitle
                    className="text-2xl font-bold flex items-center gap-2"
                    style={{ fontFamily: "'Cormorant', serif" }}
                  >
                    {selectedDrink.emoji} {selectedDrink.name}
                  </DialogTitle>
                  <p className="text-stone-500 text-sm">{selectedDrink.desc}</p>
                </DialogHeader>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-stone-500 text-sm">Цена:</span>
                  <span
                    className="text-3xl font-bold"
                    style={{
                      color: "hsl(25, 85%, 38%)",
                      fontFamily: "'Cormorant', serif",
                    }}
                  >
                    {selectedDrink.price} ₽
                  </span>
                </div>
                <button
                  onClick={() => {
                    addToCart(selectedDrink);
                    setSection("cart");
                  }}
                  className="w-full py-3.5 rounded-xl text-white font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
                  style={{ backgroundColor: "hsl(25, 85%, 38%)" }}
                >
                  Добавить в корзину
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-stone-100 py-8 mt-10">
        <div className="max-w-5xl mx-auto px-4 text-center text-stone-400 text-sm">
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: "1.1em" }}>
            ☕ Уютная кружка
          </span>
          <span className="mx-2">·</span>
          Меню напитков
        </div>
      </footer>
    </div>
  );
}