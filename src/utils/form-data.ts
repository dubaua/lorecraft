/* eslint-disable @typescript-eslint/ban-ts-comment */

// TODO отправлять файлы отдельными запросами, и не возиться с формдатой
function appendFormData(formData: FormData, data: Record<string, unknown>, parentKey?: string): void {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach((key) => {
      let resultKey = parentKey ? `${parentKey}[${key}]` : key;
      if (!Number.isNaN(parseInt(key, 10))) {
        resultKey = resultKey.replace(key, '');
      }
      // @ts-ignore
      appendFormData(formData, data[key], resultKey);
    });
  } else {
    const value = data == null ? '' : data;
    // @ts-ignore
    formData.append(parentKey, value);
  }
}

export function createFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();
  appendFormData(formData, obj);
  return formData;
}
