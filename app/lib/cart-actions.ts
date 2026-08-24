"use server";

import { Color, Size } from "@/app/generated/prisma/enums";
import { auth } from "@/auth";
import prisma from "./prisma";

export async function AddToCart(
  productId: string,
  size: Size,
  colors: Color[],
  quantity: number = 1,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "ابتدا وارد حساب کاربری شوید",
      };
    }

    if (!size) {
      return {
        error: "لطفاً سایز محصول را انتخاب کنید.",
      };
    }

    if (colors.length === 0) {
      return {
        error: "لطفاً حداقل یک رنگ انتخاب کنید.",
      };
    }

    const userId = session.user.id;

    const cart = await prisma.cart.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
      },
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

    // size checking
    if (!product.sizes.includes(size)) {
      return {
        error: "این سایز برای محصول موجود نیست.",
      };
    }

    //  colors checking
    const invalidColor = colors.some(
      (color) => !product.colors.includes(color),
    );

    if (invalidColor) {
      return {
        error: "یکی از رنگ‌های انتخاب شده موجود نیست.",
      };
    }

    if (quantity > product.stock) {
      return {
        error: "موجودی محصول کافی نیست.",
      };
    }

    const normalizedColors = [...colors].sort();

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        size,
        colors: {
          equals: normalizedColors,
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

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        size,
        colors: normalizedColors,
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

  if (!cart) {
    return null;
  }

  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const totalDiscount = cart.items.reduce((total, item) => {
    const itemTotal = item.product.price * item.quantity;

    const discountAmount =
      itemTotal * (item.product.discount / 100);

    return total + discountAmount;
  }, 0);

  const finalPrice = totalPrice - totalDiscount;

  return {
    ...cart,
    summary: {
      totalPrice,
      totalDiscount,
      finalPrice,
    },
  };
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

  const result = await prisma.cartItem.aggregate({
    where: {
      cartId: cart.id,
      productId,
    },
    _sum: {
      quantity: true,
    },
  });

  return result._sum.quantity ?? 0;
}

export async function DecreaseFromCart(cartItemId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "ابتدا وارد حساب کاربری شوید",
      };
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId: session.user.id,
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

export async function getCartQuantity() {
  const session = await auth();

  if (!session?.user?.id) {
    return 0;
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      items: {
        select: {
          quantity: true,
        },
      },
    },
  });

  if (!cart) {
    return 0;
  }

  return cart.items.reduce((total, item) => total + item.quantity, 0);
}
