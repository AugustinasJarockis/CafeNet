import { CreateOrderItemRequest } from '@/types/dto/create-order-request';
import { CreatePaymentRequest } from '@/types/dto/create-payment-request';
import { PaymentMethod } from '@/types/enum/payment-method';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Action =
  | { type: 'SET_TOTAL_PRICE'; totalPrice: number }
  | { type: 'SET_USED_CREDITS'; usedCredits: number }
  | { type: 'SET_METHOD'; method: PaymentMethod }
  | { type: 'SET_USER_ID'; userId: number }
  | { type: 'SET_LOCATION_ID'; locationId: number }
  | { type: 'SET_DISCOUNT_ID'; discountId: number }
  | { type: 'ADD_ORDER_ITEM'; item: CreateOrderItemRequest }
  | { type: 'REMOVE_ORDER_ITEM'; index: number }
  | { type: 'UPDATE_ORDER_ITEM_QUANTITY'; index: number; quantity: number }
  | { type: 'RESET' };

const initialState: CreatePaymentRequest = {
  totalPrice: 0,
  usedCredits: 0,
  method: PaymentMethod.Cash,
  userId: 0,
  locationId: 0,
  discountId: 0,
  orderItems: [],
};

function paymentReducer(
  state: CreatePaymentRequest,
  action: Action
): CreatePaymentRequest {
  switch (action.type) {
    case 'SET_TOTAL_PRICE':
      return { ...state, totalPrice: action.totalPrice };
    case 'SET_USED_CREDITS':
      return { ...state, usedCredits: action.usedCredits };
    case 'SET_METHOD':
      return { ...state, method: action.method };
    case 'SET_USER_ID':
      return { ...state, userId: action.userId };
    case 'SET_LOCATION_ID':
      return { ...state, locationId: action.locationId };
    case 'SET_DISCOUNT_ID':
      return { ...state, discountId: action.discountId };
    case 'ADD_ORDER_ITEM':
      return { ...state, orderItems: [...state.orderItems, action.item] };
    case 'REMOVE_ORDER_ITEM':
      return {
        ...state,
        orderItems: state.orderItems.filter((_, i) => i !== action.index),
      };
    case 'UPDATE_ORDER_ITEM_QUANTITY':
      return {
        ...state,
        orderItems: state.orderItems.map((item, i) =>
          i === action.index ? { ...item, quantity: action.quantity } : item
        ),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface PaymentContextType {
  state: CreatePaymentRequest;
  dispatch: React.Dispatch<Action>;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  return (
    <PaymentContext.Provider value={{ state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
