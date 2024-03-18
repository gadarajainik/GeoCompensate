export const searchPlace = async textQuery => {
  return fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'X-Goog-Api-Key': 'AIzaSyDYz3RFD4pgo86K1kR3jfylUZJryoNVRPM',
      'X-Goog-FieldMask': '*',
    },
    body: JSON.stringify({textQuery}),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};
