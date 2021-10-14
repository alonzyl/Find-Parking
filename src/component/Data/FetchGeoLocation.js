import Geocode from "react-geocode";

export async function   getgeo  (adress) {

  let lat = null
  let lng = null
  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey("AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");
  if (adress!=null) {


  Geocode.fromAddress(adress).then(
      (response) => {
        lat = response.results[0].geometry.location.lat
        lng = response.results[0].geometry.location.lng
        console.log("im printing from here",lat, lng);
        return "fuck"
      },
      (error) => {
        console.error(error);
      }
    );
  }
  if (lat !== null){
    return "fuck"

  }

}
export default getgeo;
