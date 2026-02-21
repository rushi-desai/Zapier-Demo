type HeroVideoProps = {
  className?: string;
};


export const HeroVideo=({className}:HeroVideoProps)=>{
return <div className={className}>
<video src="https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/c_scale,w_1920/v1745864783/aiworkflowshomepage.mp4" className="w-full h-auto object-cover" controls={true}/>
</div>

}