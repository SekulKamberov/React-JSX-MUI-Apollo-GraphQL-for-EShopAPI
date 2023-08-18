const CURRENCY_FORMATER = 
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })

export function formatCurrency(number) {
	CURRENCY_FORMATER.format(number)
} 
