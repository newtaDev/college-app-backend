import qr from 'qrcode';

export const generateQr = (payload: object) =>
  qr.toDataURL(JSON.stringify(payload));
