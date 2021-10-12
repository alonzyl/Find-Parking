import React, { useEffect, useState } from 'react';
import { GoogleMap,DirectionsService,DirectionsRenderer, InfoWindow } from '@react-google-maps/api'; // google maps api 

export function FunctionName() {

    const [responsee,setResponse] = useState()
    const origin = {lat: 32.0853, lng: 34.78118}
    const destination = {lat: 32.079520, lng:  34.779778}


    const directionsCallback = (response) => {
    
        if (response !== null) {
          if (response.status === 'OK') {
            setResponse(response)
          } else {
            console.log('response: ', response)
          }
        }
      }
    return (
        <div>
             <GoogleMap
                // required
                id='direction-example'
                // required
                mapContainerStyle={{
                    width: '70vw',
                    height: '100vh'
                }}
                // required
                zoom={14}
                // required
                center={{
                    lat: 32.0853, lng: 34.78118
                }}
                >
                <DirectionsService
                  options={{ 
                    destination: destination,
                    origin: origin,
                    travelMode: "WALKING"
                  }} 
                  callback={directionsCallback}
                />
                {
                    responsee != null && (
                        <DirectionsRenderer
                        options={{ 
                            directions: responsee
                          }}
                        />
                    )
                }
            </GoogleMap>
        </div>
    )
}

export default FunctionName;