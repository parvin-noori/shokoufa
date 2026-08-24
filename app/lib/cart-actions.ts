"use server";

import { auth } from "@/auth";
import prisma from "./prisma";

export async function AddToCart(productId: string, quantity: number = 1) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "ابتدا وارد حساب کاربری شوید",
      };
    }

    const userId = session.user.id;

    const cart = await prisma.cart.upsert({
      where: {
        userId,
      },
      update: {},
      create: { userId },
    });

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return {
        error: "محصول پیدا نشد.",
      };
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        return {
          error: "موجودی محصول کافی نیست.",
        };
      }

      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });

      return {
        success: "تعداد محصول افزایش پیدا کرد.",
        quantity: newQuantity,
      };
    }
    if (quantity > product.stock) {
      return {
        error: "موجودی محصول کافی نیست.",
      };
    }

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
    return {
      success: "محصول با موفقیت به سبد خرید اضافه شد.",
      quantity,
    };
  } catch (error) {
    console.error("Add to cart error:", error);

    return {
      error: "خطایی در افزودن محصول به سبد خرید رخ داد.",
    };
  }
}

export async function getCart() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  return cart;
}

export async function getCartItemQuantity(productId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return 0;
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
    },
  });

  if (!cart) {
    return 0;
  }

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    select: {
      quantity: true,
    },
  });

  return item?.quantity ?? 0;
}



export async function DecreaseFromCart(productId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "ابتدا وارد حساب کاربری شوید",
      };
    }

    const userId = session.user.id;

    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      return {
        error: "سبد خرید پیدا نشد.",
      };
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (!cartItem) {
      return {
        error: "این محصول در سبد خرید وجود ندارد.",
      };
    }

    if (cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;

      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });

      return {
        success: "تعداد محصول کاهش پیدا کرد.",
        quantity: newQuantity,
      };
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return {
      success: "محصول از سبد خرید حذف شد.",
      quantity: 0,
    };
  } catch (error) {
    console.error("Decrease cart error:", error);

    return {
      error: "خطایی در کاهش تعداد محصول رخ داد.",
    };
  }
}