

export function handlePoint (adress) {
    
    //change spaces to + signs 
    let adressAfterHandle =adress.replace(/\s/g, '+')
    
    console.log("adress after handle____",adressAfterHandle);


    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${adressAfterHandle}&key=AIzaSyCkmUyo0Nh8AGWrG_QSKmGVyiBuGA528cM`)
        .then(Response => Response.json())
        .then(newdata =>{
            console.log("sucsess in converting ", newdata); 
        })
        .catch((error) => console.log("errorr"))
}

export default handlePoint;