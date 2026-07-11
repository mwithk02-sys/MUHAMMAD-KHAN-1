/**
 * Saara Bashirkhel - Operational Telemetry & Dashboard Scripts
 * Handles dynamic price calculation and WhatsApp order routing.
 */

function updateDashboard() {
    const nameInput = document.getElementById('cust-name').value.trim();
    const serviceSelect = document.getElementById('service-select');
    const qtyInput = Math.max(1, parseInt(document.getElementById('item-quantity').value) || 1);
    const speedSelect = document.getElementById('urgent-delivery');

    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const basePrice = parseFloat(selectedOption.getAttribute('data-price'));
    
    // Fixed typo: changed 'speedSpeed' to 'speedSelect'
    const selectedSpeed = speedSelect.options[speedSelect.selectedIndex] || speedSelect.options[0];
    const extraCharge = parseFloat(selectedSpeed.getAttribute('data-extra')) || 0;

    const calculatedTotal = (basePrice * qtyInput) + extraCharge;

    // Update Telemetry Panel UI
    document.getElementById('summary-name').innerText = nameInput ? nameInput : "Valued Customer";
    document.getElementById('summary-service').innerText = selectedOption.text.split('(')[0].trim();
    document.getElementById('summary-qty').innerText = qtyInput;
    document.getElementById('summary-speed').innerText = speedSelect.value === 'urgent' ? "Urgent (+ Rs. 50)" : "Standard";
    document.getElementById('summary-total-val').innerText = "Rs. " + calculatedTotal;
}

/**
 * Automatically populates the dashboard when a user clicks 'Order Setup' on a product card
 * @param {string} type - The service option value matching the select element
 * @param {string} details - Product specific model data
 */
function selectProduct(type, details) {
    const serviceSelect = document.getElementById('service-select');
    serviceSelect.value = type;
    document.getElementById('order-instructions').value = "Selected Product Profile: " + details;
    updateDashboard();
}

/**
 * Formats the summary telemetry data into an encoded string and redirects to WhatsApp
 */
function sendOrderWhatsApp() {
    const name = document.getElementById('summary-name').innerText;
    const service = document.getElementById('summary-service').innerText;
    const qty = document.getElementById('summary-qty').innerText;
    const speed = document.getElementById('summary-speed').innerText;
    const total = document.getElementById('summary-total-val').innerText;
    const instructions = document.getElementById('order-instructions').value.trim();

    let textMessage = `*PRODUCTION TELEMETRY QUEUE - SAARA BASHIRKHEL*%0A%0A`;
    textMessage += `*Identity:* ${name}%0A`;
    textMessage += `*Matrix:* ${service}%0A`;
    textMessage += `*Volume:* ${qty}%0A`;
    textMessage += `*Speed:* ${speed}%0A`;
    if(instructions) {
        textMessage += `*Meta-Data:* ${instructions}%0A`;
    }
    textMessage += `%0A*Net Production Value:* ${total}`;

    const whatsappUrl = `https://wa.me/923157430208?text=${textMessage}`;
    window.open(whatsappUrl, '_blank');
}