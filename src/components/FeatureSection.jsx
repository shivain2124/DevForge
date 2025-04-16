import React from 'react'

// Video And Text  Side by Side on Homepage 
const FeatureSection = ({title,description,videoSrc,reverse,bgColor}) => {
  return (
    <section className={`w-full py-20 ${bgColor}`}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-x-16 px-6 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

        {/* Video */}
        <div className="w-full md:w-1/2 p-4">
        <video autoPlay loop muted className="rounded-xl w-full shadow-lg">
         <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
        </div>

        {/* Text */}
            <div className="w-full md:w-1/2 p-6">
                <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
                <p className="text-gray-300 text-lg">{description}</p>
            </div>
        </div>
    </section>
    
  )
}

export default FeatureSection