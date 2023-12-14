export const fetchQuery = `*[_type == 'Products'] | order(_createdAt desc){
    _id,
    title,
    productType,
    mainImage {
      asset => {
        url
      }
    },
    bgImage {
      asset => {
        url
      }
    },
    shortDscription,
    description,
    price,
    categories[] -> {
      _id,
      title,
      mainImage {
      asset => {
        url
      }
    }
    }
  }`