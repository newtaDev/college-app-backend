import qr from 'qrcode';

export const generateQr = (payload: string) => qr.toDataURL(payload);
