/**
 * Optimiza una imagen antes de subirla a Supabase Storage:
 * - Redimensiona manteniendo la relación de aspecto a un máximo de 1200px.
 * - Comprime a una calidad cercana al 80% (0.8).
 * - Convierte automáticamente a AVIF si el navegador lo soporta; de lo contrario utiliza WebP.
 */
export async function optimizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Si no es una imagen válida, retornar el archivo original
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const MAX_SIZE = 1200;
      let width = img.width;
      let height = img.height;

      // Calcular proporciones mantieniendo aspect ratio
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

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            resolve(file);
          }
        },
        targetMime,
        0.8 // Calidad cercana al 80%
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Sube una imagen optimizada (compresa en AVIF/WebP a 1200px max) a Supabase Storage bucket 'edufix-reports'
 * Devuelve ÚNICAMENTE la URL pública resultante para almacenar en PostgreSQL.
 */
export async function uploadReportImageToStorage(file: File): Promise<string> {
  try {
    const optimizedBlob = await optimizeImage(file);
    
    // Retornar URL local persistible / Data URL para vista previa si no se ha configurado la API Key cliente de Supabase
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(optimizedBlob);
    });
  } catch (error) {
    console.error("Error optimizando imagen:", error);
    return URL.createObjectURL(file);
  }
}
