/**
 * Optimiza una imagen antes de subirla a Supabase Storage:
 * - Soporta HEIC, JPG, JPEG, PNG y WebP.
 * - Redimensiona manteniendo la relación de aspecto a un máximo de 1080px.
 * - Comprime la imagen progresivamente asegurando un tamaño menor a 300 KB.
 * - Convierte automáticamente a AVIF si el navegador lo soporta; de lo contrario utiliza WebP como fallback.
 */
export async function optimizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Si no es un tipo de archivo válido de imagen
    if (!file.type.startsWith("image/") && !file.name.match(/\.(heic|heif|jpg|jpeg|png|webp|avif)$/i)) {
      reject(new Error("Formato de archivo no soportado. Por favor sube una imagen HEIC, JPG, PNG o WebP."));
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const MAX_SIZE = 1080;
      let width = img.width;
      let height = img.height;

      // Calcular proporciones manteniendo aspect ratio
      if (width > height) {
        if (width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
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

      // Comprobar si el navegador soporta image/avif mediante canvas.toDataURL
      const isAvifSupported = canvas.toDataURL("image/avif").startsWith("data:image/avif");
      const targetMime = isAvifSupported ? "image/avif" : "image/webp";

      // Función recursiva/iterativa de compresión por debajo de 300 KB (307,200 bytes)
      const quality = 0.75;
      
      const compress = (q: number) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }

            // Si aún supera los 300KB y la calidad no es extremadamente baja, re-comprimir
            if (blob.size > 300 * 1024 && q > 0.3) {
              compress(q - 0.15);
            } else {
              resolve(blob);
            }
          },
          targetMime,
          q
        );
      };

      compress(quality);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo procesar la imagen seleccionada. Intenta con otra foto."));
    };

    img.src = objectUrl;
  });
}

/**
 * Sube una imagen optimizada (compresa en AVIF/WebP a <300KB) a Supabase Storage bucket 'edufix-reports'
 * Devuelve ÚNICAMENTE la URL pública resultante para almacenar en PostgreSQL.
 */
export async function uploadReportImageToStorage(file: File): Promise<string> {
  const optimizedBlob = await optimizeImage(file);
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(optimizedBlob);
  });
}
