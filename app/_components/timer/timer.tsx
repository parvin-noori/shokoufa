"use client";

import { useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  if (completed) {
    return <span className="text-red-500">مهلت تخفیف به پایان رسید</span>;
  }

  return (
    <div className="flex gap-1 items-center text-lg font-bold" dir="ltr">
      <span>{String(hours).padStart(2, "0")}</span>
      <span>:</span>
      <span>{String(minutes).padStart(2, "0")}</span>
      <span>:</span>
      <span>{String(seconds).padStart(2, "0")}</span>
    </div>
  );
};

interface TimerProps {
  targetDate: string | number | Date;
}

export default function Timer({ targetDate }: TimerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // تا وقتی سمت کلاینت mount نشده، چیزی رندر نکن (یا یه اسکلت/لودینگ نشون بده)
  if (!mounted) {
    return null;
  }

  return <Countdown date={targetDate} renderer={renderer} daysInHours />;
}
