export const IMAGE_EXTS = [
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg'
];


export function getExtension(fileName: string): string {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1 ? parts.pop()! : '';
}

export function isImageFile(file: File): boolean {
  const ext = getExtension(file.name);
  return IMAGE_EXTS.includes(ext);
}
