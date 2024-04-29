import React from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

function CompareSlider({oldImage,newImage}) {
  return (
    <ReactCompareSlider
    itemTwo={<ReactCompareSliderImage src={oldImage} alt="New Image" />}
    itemOne={<ReactCompareSliderImage src={newImage} alt="Old Image" />}
    />  )
}

export default CompareSlider