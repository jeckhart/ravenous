const clientID = 'h67lwlZSeKAHCm2GPJ9X4A';
const secret = 'CiA7tz5o5YohT4AA8PwIgjUnr5WhGo9wryopWfFw6zIczU9KMtdKfe2K7ijXCIXS';
let accessToken;


const Yelp = {
  getAccessToken() {
    if(accessToken) {
      return new Promise(resolve =>
      resolve(accessToken));
    }

    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientID}&client_secret=${secret}`,
    {method: 'POST'}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {headers: {Authorization: `Bearer${accessToken}`}
      });
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.address1,
          city: business.city,
          state: business.state,
          zipCode:  business.zip_code,
          category: business.categories,
          rating: business.rating,
          reviewCount: business.review_count
        })
      )}
    })
  }
}

export default Yelp;
