
const api_key = process.env.REACT_APP_API_KEY;

const Yelp = {

  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {headers: {Authorization: `Bearer ${api_key}`}
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
