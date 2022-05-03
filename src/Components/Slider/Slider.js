import React, {} from "react";
import styled from "styled-components";
import { CarouselProvider,Image,  Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';



export default (props) => {

    const left = props.left;

    return (
        <div className="col-span-2 hidden lg:flex md:hidden sm:hidden xs:hidden m-1">
            <CarouselProvider
                naturalSlideWidth={50}
                naturalSlideHeight={50}
                totalSlides={6}
                orientation={"vertical"}
                visibleSlides={3}
                isPlaying={true}
                interval={4000}
            >
                <div className="w-full flex justify-center">
                    <div className="mr-3"><ButtonBack className={"self-start"}>⏪Anterior</ButtonBack></div>
                    <div className="ml-3"><ButtonNext className={"self-end"}>Siguiente⏩</ButtonNext></div>
                </div>

                <Slider>
                    {/*<Slide index={0}><Image alt={"1.png"} src={"https://dipepsa.mx/my-assets/image/product/1.png"}/></Slide>*/}
                    {/*<Slide index={1}><Image alt={"2.png"} src={"https://dipepsa.mx/my-assets/image/product/2.png"}/></Slide>*/}
                    {/*<Slide index={2}><Image alt={"3.png"} src={"https://dipepsa.mx/my-assets/image/product/3.png"}/></Slide>*/}
                    {/*<Slide index={3}><Image alt={"4.png"} src={"https://dipepsa.mx/my-assets/image/product/4.png"}/></Slide>*/}
                    {/*<Slide index={4}><Image alt={"5.png"} src={"https://dipepsa.mx/my-assets/image/product/5.png"}/></Slide>*/}
                    {/*<Slide index={5}><Image alt={"6.png"} src={"https://dipepsa.mx/my-assets/image/product/6.png"}/></Slide>*/}
                    { left == "1" && <Slide index={1}><Image alt={"1.png"} src={"https://dipepsa.mx/my-assets/image/product/1.png"}/></Slide> }
                    { left == "1" && <Slide index={2}><Image alt={"2.png"} src={"https://dipepsa.mx/my-assets/image/product/2.png"}/></Slide> }
                    { left == "1" && <Slide index={3}><Image alt={"3.png"} src={"https://dipepsa.mx/my-assets/image/product/3.png"}/></Slide> }
                    { left == "1" && <Slide index={4}><Image alt={"4.png"} src={"https://dipepsa.mx/my-assets/image/product/4.png"}/></Slide> }
                    { left == "1" && <Slide index={5}><Image alt={"5.png"} src={"https://dipepsa.mx/my-assets/image/product/5.png"}/></Slide> }
                    { left == "1" && <Slide index={6}><Image alt={"6.png"} src={"https://dipepsa.mx/my-assets/image/product/6.png"}/></Slide> }
                    { left == "2" && <Slide index={1}><Image alt={"6.png"} src={"https://dipepsa.mx/my-assets/image/product/6.png"}/></Slide> }
                    { left == "2" && <Slide index={2}><Image alt={"5.png"} src={"https://dipepsa.mx/my-assets/image/product/5.png"}/></Slide> }
                    { left == "2" && <Slide index={3}><Image alt={"4.png"} src={"https://dipepsa.mx/my-assets/image/product/4.png"}/></Slide> }
                    { left == "2" && <Slide index={4}><Image alt={"3.png"} src={"https://dipepsa.mx/my-assets/image/product/3.png"}/></Slide> }
                    { left == "2" && <Slide index={5}><Image alt={"2.png"} src={"https://dipepsa.mx/my-assets/image/product/2.png"}/></Slide> }
                    { left == "2" && <Slide index={6}><Image alt={"1.png"} src={"https://dipepsa.mx/my-assets/image/product/1.png"}/></Slide> }
                </Slider>
            </CarouselProvider>
        </div>
    )
}