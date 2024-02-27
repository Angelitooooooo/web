import { Card , Button, Flex  } from 'antd';
import React, { useState,useEffect } from 'react';

const CardContent = ({size,ParkAlert,slot,UnparkAlert}) => {
    const [disabledCard, setDisabled] = useState(false);

    useEffect(() => {
        let tempVehicle = localStorage.getItem("VehicleSize")
        if(tempVehicle === 'M'){
            if(size.charAt(0).toUpperCase() === 'S'){
                setDisabled(true)
            }
        }
        if(tempVehicle === 'L'){
            if(size.charAt(0).toUpperCase() === 'S'){
                setDisabled(true)
            }
            if(size.charAt(0).toUpperCase() === 'M'){
                setDisabled(true)
            }
        }
    },[size]);
 
    return(
        <>
        <Card  title={`${size.charAt(0).toUpperCase() + size.slice(1) ? size.charAt(0).toUpperCase() + size.slice(1) : ''} Slots: ${slot}`} hoverable  style={{ width: "100%" }}>
            <div className="flex flex-col items-center">
                <Flex gap="small" wrap="wrap">
                    <Button onClick={() => ParkAlert(size)} disabled={disabledCard ? true : slot === 0 ? true : false}  type="primary">Park Large Vehicle</Button>
                    <Button onClick={() => UnparkAlert(size)} disabled={disabledCard ? true : slot === 1 ? true : false} type="primary">Unpark Large Vehicle</Button>
                </Flex>
            </div>
        </Card>
        </>
    )
}
export default CardContent;

