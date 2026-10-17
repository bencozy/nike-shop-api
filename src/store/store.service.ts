import { Injectable } from '@nestjs/common';
import {
  CartItem,
  Order,
  Product,
  SEED_PRODUCTS,
  ShippingAddress,
} from './seed-data.js';

@Injectable()
export class StoreService {
  private readonly products: Product[] = structuredClone(SEED_PRODUCTS);
  private cart: CartItem[] = [];
  private shippingAddress: ShippingAddress | null = null;
  private orders: Order[] = [];
  private cartItemSeq = 1;
  private orderSeq = 1;

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  searchProductsByName(name?: string): Product[] {
    const query = name?.trim().toLowerCase();
    if (!query) {
      return this.products;
    }
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(query),
    );
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getCartTotals() {
    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return { items: this.cart, subtotal, itemCount: this.cart.reduce((n, i) => n + i.quantity, 0) };
  }

  addToCart(input: {
    productId: string;
    size: number;
    color: string;
    quantity: number;
  }): CartItem {
    const product = this.getProduct(input.productId);
    if (!product) {
      throw new Error('PRODUCT_NOT_FOUND');
    }
    if (!product.sizes.includes(input.size)) {
      throw new Error('INVALID_SIZE');
    }
    if (!product.colors.includes(input.color)) {
      throw new Error('INVALID_COLOR');
    }
    if (input.quantity < 1) {
      throw new Error('INVALID_QUANTITY');
    }

    const existing = this.cart.find(
      (item) =>
        item.productId === input.productId &&
        item.size === input.size &&
        item.color === input.color,
    );

    if (existing) {
      existing.quantity += input.quantity;
      return existing;
    }

    const item: CartItem = {
      id: `cart-${this.cartItemSeq++}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: input.size,
      color: input.color,
      quantity: input.quantity,
    };
    this.cart.push(item);
    return item;
  }

  removeFromCart(itemId: string): boolean {
    const before = this.cart.length;
    this.cart = this.cart.filter((item) => item.id !== itemId);
    return this.cart.length < before;
  }

  clearCart(): void {
    this.cart = [];
  }

  getShippingAddress(): ShippingAddress | null {
    return this.shippingAddress;
  }

  updateShippingAddress(address: ShippingAddress): ShippingAddress {
    this.shippingAddress = { ...address };
    return this.shippingAddress;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  purchase(): Order {
    if (this.cart.length === 0) {
      throw new Error('EMPTY_CART');
    }
    if (!this.shippingAddress) {
      throw new Error('MISSING_SHIPPING');
    }

    const subtotal = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shippingFee = subtotal >= 150 ? 0 : 9.99;
    const order: Order = {
      id: `ord-${this.orderSeq++}`,
      items: structuredClone(this.cart),
      shippingAddress: structuredClone(this.shippingAddress),
      subtotal,
      shippingFee,
      total: Number((subtotal + shippingFee).toFixed(2)),
      status: 'paid',
      createdAt: new Date().toISOString(),
    };
    this.orders.unshift(order);
    this.clearCart();
    return order;
  }
}
