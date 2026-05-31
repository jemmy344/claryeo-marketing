import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type CurrencyInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange"
> & {
  value: string
  onValueChange: (value: string) => void
  locale?: string
}

export function normalizeCurrencyInput(value: string): string {
  const normalized = value.replace(/,/g, "").replace(/[^\d.]/g, "")

  if (normalized === "") {
    return ""
  }

  const [wholePartRaw = "", ...decimalParts] = normalized.split(".")
  const wholePart = wholePartRaw.replace(/^0+(?=\d)/, "") || "0"

  if (decimalParts.length === 0) {
    return wholePart
  }

  const decimalPart = decimalParts.join("").slice(0, 2)

  return `${wholePart}.${decimalPart}`
}

export function formatCurrencyInputValue(
  value: string,
  locale: string = "en-NG"
): string {
  const normalized = normalizeCurrencyInput(value)
  const parsed = Number.parseFloat(normalized)
  const amount = Number.isFinite(parsed) ? parsed : 0

  return amount.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function CurrencyInput({
  className,
  value,
  onValueChange,
  onBlur,
  onFocus,
  locale = "en-NG",
  ...props
}: CurrencyInputProps) {
  return (
    <Input
      {...props}
      value={value}
      inputMode="decimal"
      className={cn("text-right tabular-nums", className)}
      onChange={(event) => onValueChange(normalizeCurrencyInput(event.target.value))}
      onFocus={(event) => {
        onValueChange(normalizeCurrencyInput(event.target.value))
        onFocus?.(event)
      }}
      onBlur={(event) => {
        onValueChange(formatCurrencyInputValue(event.target.value, locale))
        onBlur?.(event)
      }}
    />
  )
}

export { CurrencyInput }
