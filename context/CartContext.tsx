'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { Product } from '@/types/product';

export interface CartItem {
  product:    Product;
  size:       string;
  color:      string;
  gender?:    string;
  quantity:   number;
  cartItemId: string;
}

interface CartContextType {
  items:           CartItem[];
  isOpen:          boolean;
  openCart:        () => void;
  closeCart:       () => void;
  addItem:         (product: Product, size: string, color: string, gender?: string) => void;
  removeItem:      (cartItemId: string) => void;
  updateQuantity:  (cartItemId: string, quantity: number) => void;
  clearCart:       () => void;
  totalItems:      number;
  totalPrice:      number;
  discount:        number;
  setDiscount:     (amount: number) => void;
  promoCode:       string;
  setPromoCode:    (code: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('sworn-in-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen,    setIsOpen]    = useState(false);
  const [discount,  setDiscount]  = useState(0);
  const [promoCode, setPromoCode] = useState('');

  /* Persist cart to localStorage on every change */
  useEffect(() => {
    try {
      localStorage.setItem('sworn-in-cart', JSON.stringify(items));
    } catch {
      // storage unavailable — fail silently
    }
  }, [items]);

  const openCart  = useCallback(() => setIsOpen(true),  []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((
    product: Product,
    size:    string,
    color:   string,
    gender?: string,
  ) => {
    const cartItemId = `${product.id}-${size}-${color}-${gender ?? ''}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, size, color, gender, quantity: 1, cartItemId }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(0);
    setPromoCode('');
    try { localStorage.removeItem('sworn-in-cart'); } catch { /* ignore */ }
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      items, isOpen, openCart, closeCart,
      addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice,
      discount, setDiscount,
      promoCode, setPromoCode,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
