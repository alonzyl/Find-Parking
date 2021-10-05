


export function handlePoint (adress) {
    

    //change spaces to + signs 
    let adressAfterHandle =adress.replace(/\s/g, '+')
    var finalGeo;


    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${adressAfterHandle}&key=AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM`)
        // .then(Response => Response.json())
        .then(newdata =>{
            finalGeo= {lat: newdata.results[0] ,lng:newdata.results[0].geometry.location.lng}
            console.log("inside the geo",finalGeo)
            return finalGeo
        })
        .catch((error) => console.log("errorr"))
    // console.log("the final geo is",finalGeo)
    // return finalGeo
    }       

export default handlePoint;