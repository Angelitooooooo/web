import React, { useState } from 'react';
import moment from 'moment'
import Card from './Cards'
import Swal from 'sweetalert2'

function Content({hours}) {
  const [smallSlots, setSmallSlots] = useState(1);
  const [mediumSlots, setMediumSlots] = useState(1);
  const [largeSlots, setLargeSlots] = useState(1);
  const [timeSlots, setTimeSlots] = useState([]);
 
  const addTimeSlots = (size,slot) => {
    setTimeSlots( current => [...current, {size,parkTime:moment().format("YYYY-MM-DD H:ss"),parkSlot:slot}] )
  }
const ParkAlert =  ( size ) => {
    Swal.fire({
        title: `Do you want to park at ${size.charAt(0).toUpperCase() + size.slice(1) ? size.charAt(0).toUpperCase() + size.slice(1) : ''} Slot?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          parkVehicle(size)
          Swal.fire({
            title: "Parked!",
            text: "You successfully park.",
            icon: "success"
          });
        }
    });
}
const UnparkAlert =  ( size ) => {
  Swal.fire({
      title: `Do you want to unpark at ${size.charAt(0).toUpperCase() + size.slice(1) ? size.charAt(0).toUpperCase() + size.slice(1) : ''} Slot?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
       let cb =  await unparkVehicle(size)
        Swal.fire({
          title: "Unparked!",
          text: `Your Parking Fee is ${cb} PHP`,
          icon: "success"
        });
      }
  });
}
  const parkVehicle = async(size) => {
      if (size === 'small' && smallSlots > 0) {
        setSmallSlots(smallSlots - 1);
        addTimeSlots(size,'S')
      } else if (size === 'small' && mediumSlots > 0) {
        setMediumSlots(mediumSlots - 1);
        addTimeSlots(size,'M')
      } else if (size === 'small' && largeSlots > 0) {
        setLargeSlots(largeSlots - 1);
        addTimeSlots(size,'L')
      } else if (size === 'medium' && mediumSlots > 0) {
        setMediumSlots(mediumSlots - 1);
        addTimeSlots(size,'M')
  
      } else if (size === 'medium' && largeSlots > 0) {
        setLargeSlots(largeSlots - 1);
        addTimeSlots(size,'M')
      } else if (size === 'large' && largeSlots > 0) {
        setLargeSlots(largeSlots - 1);
        addTimeSlots(size,'L')
      } 

  };
  const unparkVehicle = async (size) => {
    if (size === 'small' && smallSlots >= 0) {
      setSmallSlots(smallSlots + 1);
    } else if (size === 'medium' && mediumSlots >= 0) {
      setMediumSlots(mediumSlots + 1);
    } else if (size === 'large' && largeSlots >= 0) {
      setLargeSlots(largeSlots + 1);
    } 
     return await computeParkingFee(size)
  };

  function differenceInMinutes(dateStr1, dateStr2) {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const diffInMs = Math.abs(date2 - date1);
    const minutes = Math.floor(diffInMs / (1000 * 60));

    return minutes;
}

  const computeParkingFee = async (size  ) => {
    let dateNow = moment().add(hours,'hours').format("YYYY-MM-DD H:ss")
    const flatRate = 40;
    const exceedingRate = {
        'S': 20,
        'M': 60,
        'L': 100
      };
      const unpark = timeSlots.filter(rec=> size === rec.size)
      const timeDuration = Math.round(differenceInMinutes(unpark[0].parkTime,dateNow) / 60)
      let index =  timeSlots.indexOf(unpark[0])
      if(index !== -1){
        setTimeSlots( current =>  current.filter((r,i)=> i !== index))
      }
      if(timeDuration <= 3){
        return flatRate
      }else{
        if(timeDuration >= 24){
            let day =  Math.trunc(timeDuration / 24)
            return((( timeDuration - ( day * 24) ) * exceedingRate[unpark[0].parkSlot])+(day * 5000))

        }else{
            return((timeDuration - 3) * exceedingRate[unpark[0].parkSlot])
        }
      }
    }   
    return(
      <>
      <div style={{ 
      }}>
        <div style={{ 
              display: 'inline-flex',

            }}
            >
          <Card 
          style={{ 
            margin: 'auto 50% auto 50%',
          }}
          size='small'
          ParkAlert={ParkAlert}
          slot={smallSlots}
          UnparkAlert={UnparkAlert}
          />
          <Card 
          size='medium'
          ParkAlert={ParkAlert}
          slot={mediumSlots}
          UnparkAlert={UnparkAlert}
          disabled={true}
          />

        <Card 
          size='large'
          ParkAlert={ParkAlert}
          slot={largeSlots}
          UnparkAlert={UnparkAlert}
          />
        </div>
      </div>
      </>
    )
}
export default Content;

