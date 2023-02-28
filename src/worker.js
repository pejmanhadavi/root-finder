const a = (data) => (data);

// eslint-disable-next-line no-restricted-globals
addEventListener('message', e => {
    const result = a(e.data);
    postMessage(result);
});