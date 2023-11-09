export default function prepareImageFileForUpload(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(new Error('File reading failed'));
    fr.onload = (e) => {
      const img = document.createElement('img');
      img.onload = function () {
        const MAX_WIDTH = 512;
        const MAX_HEIGHT = 512;

        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = false;

          ctx.drawImage(img, 0, 0, width, height);

          const dataURL = canvas.toDataURL(file.type);
          resolve(dataURL);
        } else {
          reject(
            new Error('2D context not supported or canvas already initialized')
          );
        }
      };
      img.src = e?.target?.result?.toString() || '';
    };
    fr.readAsDataURL(file);
  });
}
