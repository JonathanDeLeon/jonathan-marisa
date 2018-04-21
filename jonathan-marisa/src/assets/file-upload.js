import * as axios from 'axios';

const BASE_URL = 'https://api.jonathan-marisa.com';

function upload(formData) {
  const url = `${BASE_URL}/api/images/`;
  return axios.post(url, formData)
  // get data
    .then(x => x.data)
    // // add url field
    // .then(x => x.map(img => Object.assign({},
    //   img, { url: `${BASE_URL}/files/media/${img.id}` })));
}

export { upload }
