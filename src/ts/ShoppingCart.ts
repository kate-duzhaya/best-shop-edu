import { ProductToCart } from "./product";
import { TOTAL_FOR_DISCOUNT, DISCOUNT_PERCENT, SHIPPING_PRICE } from "./config";

type CartListener = (cart: ProductToCart[]) => void;

class ShoppingCart {
  storageKey: string;
  private readonly _listeners: CartListener[] = [];

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  subscribe(listener: CartListener) {
    this._listeners.push(listener);
    listener(this.getCart());
  }

  getCart(): ProductToCart[] {
    const cart: string | ProductToCart[] | null = localStorage.getItem(
      this.storageKey,
    );
    return cart ? (JSON.parse(cart) as ProductToCart[]) : [];
  }

  private _saveCart(cart: ProductToCart[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this._listeners.forEach((listener) => listener(cart));
  }

  isProductInCart(productId: string): boolean {
    const cart = this.getCart();
    return cart.some((obj) => obj.id === productId);
  }

  add(product: ProductToCart): void {
    const cart = this.getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
      existingItem.total += product.total;
    } else {
      cart.push(product);
    }
    this._saveCart(cart);
  }

  remove(productId: string): void {
    const cart = this.getCart();
    const newCart = this.isProductInCart(productId)
      ? cart.filter((obj) => obj.id !== productId)
      : cart;
    this._saveCart(newCart);
  }

  getTotalItemsCount(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  clear() {
    const cart = this.getCart();
    cart.length = 0;
    this._saveCart(cart);
  }

  increment(productId: string) {
    const cart = this.getCart();
    const item = cart.find((obj) => obj.id === productId);
    if (item && item.quantity < 50) {
      item.quantity += 1;
      item.total = item.quantity * item.price;
      this._saveCart(cart);
    }
  }

  decrement(productId: string) {
    const cart = this.getCart();
    const item = cart.find((obj) => obj.id === productId);
    if (item) {
      item.quantity -= 1;
      item.total = item.quantity * item.price;

      if (item.quantity <= 0) {
        this.remove(productId);
        return;
      }

      this._saveCart(cart);
    }
  }

  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.total, 0);
  }

  getDiscount() {
    const total = this.getSubtotal();
    return total >= TOTAL_FOR_DISCOUNT ? (DISCOUNT_PERCENT * total) / 100 : 0;
  }

  getTotal() {
    return this.getSubtotal() - this.getDiscount() + SHIPPING_PRICE;
  }
}

export const shoppingCart = new ShoppingCart("shoppingCart");
