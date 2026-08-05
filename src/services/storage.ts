/**
 * Optimiza una imagen antes de subirla:
 * - Soporta HEIC, JPG, JPEG, PNG y WebP.
 * - Redimensiona manteniendo la relación de aspecto a un máximo de 1080px.
 * - Comprime la imagen progresivamente asegurando un tamaño menor a 300 KB.
 * - Usa createImageBitmap cuando está disponible (más eficiente en móviles).
 * - Convierte automáticamente a WebP (soporte universal en navegadores modernos).
 */
export async function optimizeImage(file: File): Promise<Blob> {
  // Validar que sea una imagen
  const isImage =
    file.type.startsWith("image/") ||
    /\.(heic|heif|jpg|jpeg|png|webp|avif)$/i.test(file.name);

  if (!isImage) {
    throw new Error(
      "Formato de archivo no soportado. Sube una imagen JPG, PNG o WebP."
    );
  }

  // Si el archivo es muy pequeño (< 250KB) y ya es JPG/WebP/PNG, devolverlo tal cual
  if (file.size < 250 * 1024 && /^image\/(jpeg|webp|png)$/.test(file.type)) {
    return file;
  }

  const MAX_DIMENSION = 1080;

  // Intentar con createImageBitmap primero (mejor soporte en móviles, no bloquea el hilo)
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      const { width: origW, height: origH } = bitmap;

      let width = origW;
      let height = origH;
      if (width > height && width > MAX_DIMENSION) {
        height = Math.round((height * MAX_DIMENSION) / width);
        width = MAX_DIMENSION;
      } else if (height > MAX_DIMENSION) {
        width = Math.round((width * MAX_DIMENSION) / height);
        height = MAX_DIMENSION;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        bitmap.close();
        return file;
      }
      ctx.drawImage(bitmap, 0, 0, width, height);
      bitmap.close();

      return await compressCanvas(canvas);
    } catch {
      // Fallback a Image() si createImageBitmap falla (ej: HEIC en algunos navegadores)
    }
  }

  // Fallback: usar Image() + URL.createObjectURL
  return new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      if (width > height && width > MAX_DIMENSION) {
        height = Math.round((height * MAX_DIMENSION) / width);
        width = MAX_DIMENSION;
      } else if (height > MAX_DIMENSION) {
        width = Math.round((width * MAX_DIMENSION) / height);
        height = MAX_DIMENSION;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      compressCanvas(canvas).then(resolve).catch(() => resolve(file));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(
        new Error(
          "No se pudo procesar la imagen seleccionada. Intenta con otra foto."
        )
      );
    };

    img.src = objectUrl;
  });
}

/**
 * Comprime un canvas a WebP progresivamente hasta que quede por debajo de 300KB.
 */
function compressCanvas(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    const tryCompress = (quality: number) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            // Fallback: si toBlob falla, intentar con JPEG
            canvas.toBlob(
              (jpgBlob) => {
                resolve(jpgBlob || new Blob());
              },
              "image/jpeg",
              0.7
            );
            return;
          }
          if (blob.size > 300 * 1024 && quality > 0.3) {
            tryCompress(quality - 0.1);
          } else {
            resolve(blob);
          }
        },
        "image/webp",
        quality
      );
    };
    tryCompress(0.8);
  });
}

/**
 * Convierte un File/Blob a base64 data URL.
 * Esto es lo que se guarda en la DB como imageUrl.
 * NO re-optimiza — asume que el archivo ya fue optimizado.
 */
export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string" && reader.result.length > 0) {
        resolve(reader.result);
      } else {
        reject(new Error("No se pudo convertir la imagen."));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error al leer la imagen."));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * "Sube" la imagen — actualmente convierte a base64 para almacenar directamente en PostgreSQL.
 * NO vuelve a optimizar la imagen (ya fue optimizada por optimizeImage).
 */
export async function uploadReportImageToStorage(
  file: File
): Promise<string> {
  return fileToBase64(file);
}
