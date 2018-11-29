
function upload(context, formData) {
  return context.$http.post('/api/images/', formData)
  // get data
    .then(x => x.data)
    // // add url field
    // .then(x => x.map(img => Object.assign({},
    //   img, { url: `${BASE_URL}/files/media/${img.id}` })));
}

export { upload }
