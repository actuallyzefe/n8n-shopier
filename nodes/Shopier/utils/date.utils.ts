/**
 * Formats a date string to YYYY-MM-DDTHH:mm:ssZ format required by Shopier API
 * @param dateString - The date string from n8n dateTime field
 * @returns Formatted date string in YYYY-MM-DDTHH:mm:ssZ format
 */
export function formatDateForShopier(dateString: string): string {
	if (!dateString) return dateString;

	// If it's already in the correct format, return as is
	if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)) {
		return dateString;
	}

	// Parse the date and format it
	const date = new Date(dateString);

	// Check if date is valid
	if (isNaN(date.getTime())) {
		throw new Error(`Invalid date format: ${dateString}`);
	}

	// Format to YYYY-MM-DDTHH:mm:ssZ
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
