export const getMaxId = (items) => {
    const ids = items.map((item) => item.id);
    const maxId = Math.max(...ids);

    return maxId + 1;
};