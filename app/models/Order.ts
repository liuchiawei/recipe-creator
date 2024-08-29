export const createOrderFormData = (order:Order, imageFile?:File) => {
    const formData = new FormData();
    formData.append('timeOfDay', order.timeOfDay || '');
    formData.append('genre', order.genre || '');
    formData.append('keywords', order.keywords || '');
    if (imageFile) {
        formData.append('image', imageFile);
    }
    return formData;
}

export const initOrder: Order = {
    timeOfDay: '',
    genre: '',
    keywords: '',
    image: null,
};
