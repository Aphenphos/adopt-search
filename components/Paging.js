

export default function createPaging(root, { handlePaging }) {
    const selectSize = root.querySelector('select');
    const pageInfo = root.querySelector('.page-info');
    const [prev, next] = root.querySelectorAll('button');

    prev.addEventListener('click', () => {
        // *** call handlePaging with the page change and page size
        handlePaging(-1, selectSize.value);
    });

    next.addEventListener('click', () => {
        // *** call handlePaging with the page change and page size
        handlePaging(1, selectSize.value);
    });

    selectSize.addEventListener('change', () => {
        // *** call handlePaging with the page change and page size
        handlePaging(0, selectSize.value);
    });

    return ({ page, pageSize, totalPages }) => {
        // *** disable the prev or next button if on page 1 or totalPages
        selectSize.value = pageSize;
        prev.disabled = page === 1;
        next.disabled = page === totalPages;

        pageInfo.textContent = `Page ${page} of ${totalPages}`;
    };
}