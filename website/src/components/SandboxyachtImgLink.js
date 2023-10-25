import React, { useState } from "react"
import { Button } from "@mui/material"
import FullscreenBackdrop from './FullscreenBackdrop'


function SandboxyachtImgLink({ yachtTokenID }) {

  const [backdropActive, setBackdropActive] = useState(false)

    const imagesPng = {
        "36573846584833278925172985243645009649481595570072332284486852001384296880128": "https://apeharbour.mypinata.cloud/ipfs/QmRAf1U5LhRWAHGNys9mFcGHoe7ekxCPD7kGbwSwFg53sD/ape-harbour-sportsyacht-gen-one-silver.png",
        "36573846584833278925172985243645009649481595570072332284486852001384305264640": "https://apeharbour.mypinata.cloud/ipfs/QmRAf1U5LhRWAHGNys9mFcGHoe7ekxCPD7kGbwSwFg53sD/ape-harbour-sportsyacht-gen-one-red.png",
        "36573846584833278925172985243645009649481595570072332284486852001384296880129": "https://apeharbour.mypinata.cloud/ipfs/QmRAf1U5LhRWAHGNys9mFcGHoe7ekxCPD7kGbwSwFg53sD/ape-harbour-sportsyacht-gen-one-black.png",
      };

      const imagesGlb = {
        "36573846584833278925172985243645009649481595570072332284486852001384296880128": "https://apeharbour.mypinata.cloud/ipfs/QmRAf1U5LhRWAHGNys9mFcGHoe7ekxCPD7kGbwSwFg53sD/ape-harbour-sportsyacht-gen-one-silver.glb",
        "36573846584833278925172985243645009649481595570072332284486852001384305264640": "https://apeharbour.mypinata.cloud/ipfs/QmRAf1U5LhRWAHGNys9mFcGHoe7ekxCPD7kGbwSwFg53sD/ape-harbour-sportsyacht-gen-one-red.glb",
        "36573846584833278925172985243645009649481595570072332284486852001384296880129": "https://apeharbour.mypinata.cloud/ipfs/QmRAf1U5LhRWAHGNys9mFcGHoe7ekxCPD7kGbwSwFg53sD/ape-harbour-sportsyacht-gen-one-black.glb",
      }


      const handleClickPng = () => {
        setBackdropActive(true)
        const imageUrl = imagesPng[yachtTokenID]
        if (imageUrl) {
          window.open(imageUrl, '_blank')
        } else {
          alert('Invalid tokenID!')
        }
        setBackdropActive(false)
      };

      const handleClickGlb = () => {
        setBackdropActive(true)
        const imageUrl = imagesGlb[yachtTokenID]
        if (imageUrl) {
          window.open(imageUrl, '_blank')
        } else {
          alert('Invalid tokenID!')
        }
        setBackdropActive(false)
      };

    
      return (
        <>
        <Button 
        color="secondary"
        variant="outlined"
        // disabled={!selfOwned}
        onClick={handleClickPng}>
          TWITTER BANNER
        </Button>
        
        <Button 
        color="secondary"
        variant="outlined"
        // disabled={!selfOwned}
        onClick={handleClickGlb}>
          GLB FILE           
        </Button>

        <FullscreenBackdrop open={backdropActive} />

        </>
      )
    }
    
    export default SandboxyachtImgLink
