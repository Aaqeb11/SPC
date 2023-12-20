document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const scanButton = document.getElementById('scanButton');

    let barcodeScanner;

    // Request camera access
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
            video.srcObject = stream;
            barcodeScanner = new BarcodeDetector();
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });

    // Add event listener for the scan button
    scanButton.addEventListener('click', async () => {
        try {
            const barcodes = await barcodeScanner.detect(video);

            if (barcodes.length > 0) {
                const scannedBarcode = barcodes[0].rawValue;
                alert(`Scanned Barcode: ${scannedBarcode}`);
            } else {
                alert('No barcode detected');
            }
        } catch (error) {q
            console.error('Barcode scanning error:', error);
        }
    });
});
