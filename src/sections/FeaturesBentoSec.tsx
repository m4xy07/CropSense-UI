"use client";

import React from "react";
import Image from "next/image";


const FeaturesBentoSec = () => {
    return (
        <section className="pb-12 mb-20 pt-4 bg-dark">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[20px] max-w-[750px] text-center">
                             <h2 className="text-[3.5rem] pt-4 font-bold text-center leading-tight tracking-normal effect-font-gradient">
                             Smart summaries for smarter decisions

                            </h2> 
                            <p className="text-white/70 text-xl font-inter text-center pt-[20px] pb-[20px] tracking-tight">
                                Next-level features to power your growth.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    id="features"
                    className="flex flex-col mt-10 gap-4 sm:mt-8 h-fit font-inter"
                >
                    {/* Real-time Farm Data */}
                    <div className="flex flex-row gap-4">
                        <div className="real-time-div overflow-hidden">
                            <div className="real-time-div-inner">
                                <Image
                                    src="/featuresgrid/Point1/features-dailyrank-light1.png"
                                    width={500}
                                    height={500}
                                    quality={100}
                                    alt="real-time"
                                    className="real-time-light1 pricing-grid-fade"
                                />
                                <Image
                                    src="/featuresgrid/Point1/features-dailyrank-light2.png"
                                    width={500}
                                    height={500}
                                    quality={100}
                                    alt="real-time"
                                    className="real-time-light2 pricing-grid-fade"
                                />
                                <Image
                                    src="/featuresgrid/Point1/features-dailyrank-light3.png"
                                    width={500}
                                    height={500}
                                    quality={100}
                                    alt="real-time"
                                    className="real-time-light3 pricing-grid-fade"
                                />
                                <Image
                                    src="/featuresgrid/Point1/features-dailyrank-chart.png"
                                    width={550}
                                    height={235}
                                    quality={100}
                                    alt="real-time"
                                    className="real-time-chart"
                                />
                                <Image
                                    src="/featuresgrid/Point1/features-dailyrank-wireframe.png"
                                    width={286}
                                    height={132}
                                    quality={100}
                                    alt="real-time"
                                    className="real-time-wireframe pricing-grid-fade"
                                />
                                <Image
                                    src="/featuresgrid/Point1/features-dailyrank-grid.png"
                                    width={286}
                                    height={132}
                                    quality={100}
                                    alt="real-time"
                                    className="real-time-grid"
                                />
                                <div className="real-time-icon1">
                                    <div className="real-time-icon1-outer">
                                        <div className="real-time-icon1-inner">
                                            <Image
                                                src="/featuresgrid/Point1/sun.svg"
                                                width={20}
                                                height={20}
                                                quality={100}
                                                alt="real-time"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="real-time-icon2">
                                    <div className="real-time-icon2-outer">
                                        <div className="real-time-icon2-inner">
                                            <Image
                                                src="/featuresgrid/Point1/moon.svg"
                                                width={20}
                                                height={20}
                                                quality={100}
                                                alt="real-time"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="real-time-content">
                                    <div className="real-time-content-heading">
                                        Real-time Farm Data with Sensor Network
                                    </div>
                                    <div className="real-time-content-description">
                                        Actual sensor setup on farms collects live
                                        data to power features like personalized
                                        alerts, optimized crop suggestions, and live
                                        analytics.
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className="real-time-div overflow-hidden">
                        <div className="real-time-div-inner">
                            <Image src="/featuresgrid/Point5/features-CSVImport-grid.png" width={500} height={500}  quality={100} alt="real-time" className="prediction-grid pricing-grid-fade" />
                            <Image src="/featuresgrid/Point5/features-CSVImport-light1.png"  width={500} height={500}  quality={100} alt="real-time" className="prediction-light1 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point5/features-CSVImport-light2.png"  width={500} height={500}  quality={100} alt="real-time" className="prediction-light2 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point5/features-CSVImport-files.png"  width={120} height={500}  quality={100} alt="real-time" className="prediction-import pricing-grid-fade" />
                            <Image src="/featuresgrid/Point5/features-CSVImport-papers.png"  width={210} height={500}  quality={100} alt="real-time" className="prediction-files pricing-grid-fade" />
                            <Image src="/featuresgrid/Point5/features-CSVImport-dashboard.png"  width={186} height={500}  quality={100} alt="real-time" className="prediction-dash pricing-grid-fade" />
                            
                            <Image src="/featuresgrid/Point5/features-dailyrank-grid.png" width={286} height={132} quality={100} alt="real-time" className="real-time-grid" />
                            
                            <div className="real-time-content">
                                <div className="real-time-content-heading">
                                    Crop & Price Prediction Engine
                                </div>
                                <div className="real-time-content-description">
                                Accurate harvest-time price predictions (retail + wholesale) along with required fertilizers, powered by verified datasets and trained on your own farm&apos;s data.
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>
                    
                    <div className="flex flex-row gap-4">
                    <div className="oobe-div overflow-hidden">
                        <div className="oobe-div-inner">
                            <Image
                                src="/featuresgrid/Point2/card-startup-img1.png"
                                width={32}
                                height={32}
                                quality={100}
                                alt="real-time"
                                className="avatar-1 pricing-grid-fade"
                            />
                            <Image
                                src="/featuresgrid/Point2/card-startup-img2.png"
                                width={32}
                                height={32}
                                quality={100}
                                alt="real-time"
                                className="avatar-2 pricing-grid-fade"
                            />
                            <Image
                                src="/featuresgrid/Point2/card-startup-img3.png"
                                width={32}
                                height={32}
                                quality={100}
                                alt="real-time"
                                className="avatar-3 pricing-grid-fade"
                            />
                            <Image
                                src="/featuresgrid/Point2/card-startup-img4.png"
                                width={32}
                                height={32}
                                quality={100}
                                alt="real-time"
                                className="avatar-4 pricing-grid-fade"
                            />
                            <Image
                                src="/featuresgrid/Point2/card-startup-img5.png"
                                width={32}
                                height={32}
                                quality={100}
                                alt="real-time"
                                className="avatar-5 pricing-grid-fade"
                            />
                            <div className="oobe-logo">
                                <Image
                                    src="/featuresgrid/Point2/card-cropsense.svg"
                                    width={40}
                                    height={24}
                                    quality={100}
                                    alt="real-time"
                                />
                            </div>
                            <Image
                                src="/featuresgrid/Point2/card-startup-grid.svg"
                                width={220}
                                height={220}
                                quality={100}
                                alt="real-time"
                                className="oobe-grid pricing-grid-fade"
                            />
                            <Image
                                src="/featuresgrid/Point2/sec2-exclusive-light2.png"
                                width={500}
                                height={500}
                                quality={100}
                                alt="real-time"
                                className="oobe-light1 pricing-grid-fade"
                            />
                            <Image
                                src="/featuresgrid/Point2/sec2-exclusive-light1.png"
                                width={500}
                                height={500}
                                quality={100}
                                alt="real-time"
                                className="oobe-light2 pricing-grid-fade"
                            />
                            <div className="real-time-content">
                                <div className="real-time-content-heading">
                                    Effortless Regional Onboarding
                                </div>
                                <div className="real-time-content-description">
                                    Farmer-friendly from the start with easy
                                    setup, regional language support, IVR, and
                                    intuitive workflows.
                                </div>
                            </div>
                        </div>
                    </div>
                        

                    <div className="detection-div">
                        <div className="detection-div-inner">
                            <Image
                                src="/featuresgrid/Point3/card-gridline.png"
                                width={364}
                                height={156}
                                quality={100}
                                alt="real-time"
                                className="detection-div-grid pricing-grid-fade"
                            />
                            <div className="card-animation">
                                <div className="card-animation-mobile">
                                    <div className="card-animation-mobile-chart-wrapper">
                                        <div className="card-animation-mobile-chart-inner">
                                            <img
                                                src="/featuresgrid/Point3/card-mobile-chart.png"
                                                alt="Example"
                                                className="pricing-grid-fade"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-animation-mobile-lights">
                                        <Image
                                            src="/featuresgrid/Point3/card-mobile-lights-1.png"
                                            fill={true}
                                            quality={100}
                                            alt="real-time"
                                            className="pricing-grid-fade"
                                        />
                                        <Image
                                            src="/featuresgrid/Point3/card-mobile-lights-2.png"
                                            fill={true}
                                            quality={100}
                                            alt="real-time"
                                            className="blur-xl"
                                        />
                                    </div>
                                    <div className="card-animation-mobile-high-season">
                                        <div className="card-animation-mobile-high-season-item">
                                            <span>Yield</span>
                                        </div>
                                        <div className="card-animation-mobile-high-season-item">
                                            <span>Health</span>
                                        </div>
                                    </div>
                                    <div className="card-animation-mobile-alert">
                                        <div className="card-animation-mobile-high-season-alert">
                                            <span>Alert!</span>
                                        </div>
                                    </div>
                                    <div className="card-animation-big-popup">
                                        <div className="card-animation-big-popup-title">
                                            <span>Mobile Issue</span>
                                        </div>
                                        <div className="card-animation-big-popup-description">
                                            <span>The landing page has mobile friendlyness issues. Focus on them to avoid problems.</span>
                                        </div>
                                        <div className="card-animation-big-popup-footer">
                                            <div className="card-animation-big-popup-footer-item">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5 13.5C5 13.2239 5.22386 13 5.5 13H11.5C11.7761 13 12 13.2239 12 13.5C12 13.7761 11.7761 14 11.5 14H5.5C5.22386 14 5 13.7761 5 13.5Z" fill="#713DFF"></path><path fillRule="evenodd" clipRule="evenodd" d="M5.97812 2H11.0219C11.7034 2 12.2454 1.99999 12.6827 2.03572C13.1305 2.07231 13.5123 2.14884 13.862 2.32698C14.4265 2.6146 14.8854 3.07354 15.173 3.63803C15.3512 3.98765 15.4277 4.36949 15.4643 4.81729C15.5 5.25458 15.5 5.79659 15.5 6.47811V7.52189C15.5 8.20341 15.5 8.74542 15.4643 9.18271C15.4277 9.63051 15.3512 10.0123 15.173 10.362C14.8854 10.9265 14.4265 11.3854 13.862 11.673C13.5123 11.8512 13.1305 11.9277 12.6827 11.9643C12.2454 12 11.7034 12 11.0219 12H5.97811C5.29659 12 4.75458 12 4.31729 11.9643C3.86949 11.9277 3.48765 11.8512 3.13803 11.673C2.57354 11.3854 2.1146 10.9265 1.82698 10.362C1.64884 10.0123 1.57231 9.63051 1.53572 9.18271C1.49999 8.74542 1.5 8.2034 1.5 7.52188V6.47812C1.5 5.7966 1.49999 5.25458 1.53572 4.81729C1.57231 4.36949 1.64884 3.98765 1.82698 3.63803C2.1146 3.07354 2.57354 2.6146 3.13803 2.32698C3.48765 2.14884 3.86949 2.07231 4.31729 2.03572C4.75458 1.99999 5.2966 2 5.97812 2ZM4.39872 3.0324C4.01276 3.06393 3.77717 3.12365 3.59202 3.21799C3.21569 3.40973 2.90973 3.71569 2.71799 4.09202C2.62365 4.27717 2.56393 4.51276 2.5324 4.89872C2.50039 5.29052 2.5 5.79168 2.5 6.5V7.5C2.5 8.20832 2.50039 8.70948 2.5324 9.10128C2.56393 9.48724 2.62365 9.72283 2.71799 9.90798C2.90973 10.2843 3.21569 10.5903 3.59202 10.782C3.77717 10.8764 4.01276 10.9361 4.39872 10.9676C4.79052 10.9996 5.29168 11 6 11H11C11.7083 11 12.2095 10.9996 12.6013 10.9676C12.9872 10.9361 13.2228 10.8764 13.408 10.782C13.7843 10.5903 14.0903 10.2843 14.282 9.90798C14.3764 9.72283 14.4361 9.48724 14.4676 9.10128C14.4996 8.70948 14.5 8.20832 14.5 7.5V6.5C14.5 5.79168 14.4996 5.29052 14.4676 4.89872C14.4361 4.51276 14.3764 4.27717 14.282 4.09202C14.0903 3.71569 13.7843 3.40973 13.408 3.21799C13.2228 3.12365 12.9872 3.06393 12.6013 3.0324C12.2095 3.00039 11.7083 3 11 3H6C5.29168 3 4.79052 3.00039 4.39872 3.0324Z" fill="#713DFF"></path></svg>
                                                <div className="card-animation-big-popup-footer-item-label">
                                                    Desktop
                                                </div>
                                                <div className="card-animation-big-popup-footer-item-value">
                                                    3
                                                </div>
                                            </div>
                                            <div className="card-animation-big-popup-footer-item">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7 3.5C7 3.22386 7.22386 3 7.5 3H9.5C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H7.5C7.22386 4 7 3.77614 7 3.5Z" fill="#FAAF46"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.47812 1.5H8.52188C9.2034 1.5 9.74542 1.49999 10.1827 1.53572C10.6305 1.57231 11.0123 1.64884 11.362 1.82698C11.9265 2.1146 12.3854 2.57354 12.673 3.13803C12.8512 3.48765 12.9277 3.86949 12.9643 4.31729C13 4.75458 13 5.29659 13 5.97811V10.0219C13 10.7034 13 11.2454 12.9643 11.6827C12.9277 12.1305 12.8512 12.5123 12.673 12.862C12.3854 13.4265 11.9265 13.8854 11.362 14.173C11.0123 14.3512 10.6305 14.4277 10.1827 14.4643C9.74542 14.5 9.20341 14.5 8.52189 14.5H8.47811C7.79659 14.5 7.25458 14.5 6.81729 14.4643C6.36949 14.4277 5.98765 14.3512 5.63803 14.173C5.07354 13.8854 4.6146 13.4265 4.32698 12.862C4.14884 12.5123 4.07231 12.1305 4.03572 11.6827C3.99999 11.2454 4 10.7034 4 10.0219V5.97812C4 5.2966 3.99999 4.75458 4.03572 4.31729C4.07231 3.86949 4.14884 3.48765 4.32698 3.13803C4.6146 2.57354 5.07354 2.1146 5.63803 1.82698C5.98765 1.64884 6.36949 1.57231 6.81729 1.53572C7.25458 1.49999 7.7966 1.5 8.47812 1.5ZM6.89872 2.5324C6.51276 2.56393 6.27717 2.62365 6.09202 2.71799C5.71569 2.90973 5.40973 3.21569 5.21799 3.59202C5.12365 3.77717 5.06393 4.01276 5.0324 4.39872C5.00039 4.79052 5 5.29168 5 6V10C5 10.7083 5.00039 11.2095 5.0324 11.6013C5.06393 11.9872 5.12365 12.2228 5.21799 12.408C5.40973 12.7843 5.71569 13.0903 6.09202 13.282C6.27717 13.3764 6.51276 13.4361 6.89872 13.4676C7.29052 13.4996 7.79168 13.5 8.5 13.5C9.20832 13.5 9.70948 13.4996 10.1013 13.4676C10.4872 13.4361 10.7228 13.3764 10.908 13.282C11.2843 13.0903 11.5903 12.7843 11.782 12.408C11.8764 12.2228 11.9361 11.9872 11.9676 11.6013C11.9996 11.2095 12 10.7083 12 10V6C12 5.29168 11.9996 4.79052 11.9676 4.39872C11.9361 4.01276 11.8764 3.77717 11.782 3.59202C11.5903 3.21569 11.2843 2.90973 10.908 2.71799C10.7228 2.62365 10.4872 2.56393 10.1013 2.5324C9.70948 2.50039 9.20832 2.5 8.5 2.5C7.79168 2.5 7.29052 2.50039 6.89872 2.5324Z" fill="#FAAF46"></path></svg>
                                                <div className="card-animation-big-popup-footer-item-label">
                                                    Mobile
                                                </div>
                                                <div className="card-animation-big-popup-footer-item-value">
                                                    14
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="detection-content">
                                <div className="real-time-content-heading">
                                    Disease Detection and Prevention
                                </div>
                                <div className="real-time-content-description">
                                Live camera-based disease prediction using AI detects early signs on leaves and prevents spread before it affects the whole farm.
                                </div>
                            </div>
                        </div>
                        </div>


                        <div className="oobe-div overflow-hidden">
                        <div className="oobe-div-inner">
                            
                            
                            <Image src="/featuresgrid/Point4/sec2-recurring-money.svg" width={138} height={220}   quality={100} alt="real-time" className="money1 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point4/sec2-recurring-money.svg" width={138} height={220}   quality={100} alt="real-time" className="money2 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point4/sec2-recurring-money.svg" width={138} height={220}   quality={100} alt="real-time" className="money3 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point4/sec2-recurring-money.svg" width={138} height={220}   quality={100} alt="real-time" className="money4 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point4/sec2-recurring-moneys.svg" width={172} height={220}   quality={100} alt="real-time" className="moneys pricing-grid-fade" />
                            <Image src="/featuresgrid/Point2/sec2-exclusive-light2.png" width={500} height={500}  quality={100} alt="real-time" className="oobe-light1 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point2/sec2-exclusive-light1.png"  width={500} height={500}  quality={100} alt="real-time" className="oobe-light2 pricing-grid-fade" />
                            <div className="real-time-content">
                                <div className="real-time-content-heading">
                                    Market, Rentals, & Community
                                </div>
                                <div className="real-time-content-description">
                                    Equipment renting, product marketplace, and active forums to connect with farmers and experts.
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Effortless Regional Onboarding */}
                   

                    {/* Disease Detection and Prevention */}
                    
                    <div className="flex flex-row gap-4">
                    <div className="weather-div overflow-hidden">
                        <div className="weather-div-inner">
                            <Image src="/featuresgrid/Point6/for-agencies-feature-4.png" width={500} height={500}  quality={100} alt="real-time" className="weather-image pricing-grid-fade" />
                            <div className="real-time-content">
                                <div className="real-time-content-heading">
                                Smart Weather and Calamity Forecasts
                                </div>
                                <div className="real-time-content-description">
                                Advanced weather predictions with calamity alerts so farmers can act in advance and protect their yields.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="weather-div overflow-hidden">
                        <div className="weather-div-inner">
                            <Image src="/featuresgrid/Point8/for-agencies-feature-1.png" width={500} height={500}  quality={100} alt="real-time" className="weather-image pricing-grid-fade" />
                            <div className="real-time-content">
                                <div className="real-time-content-heading">
                                Analytics Dashboard – Anywhere, Anytime
                                </div>
                                <div className="real-time-content-description">
                                Mobile/desktop dashboard to view analytics, sensor readings, predictions, alerts, and worker logs in one place, anytime.
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>    
                    
                    <div className="flex flex-row gap-4">
                    <div className="guidance-div overflow-hidden">
                        <div className="guidance-div-inner">
                            <div className="guidance-visuals">
                            <Image src="/featuresgrid/Point7/section3-dedicated-light1.png" width={500} height={500}  quality={100} alt="real-time" className="guidance-light1 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point7/section3-dedicated-light2.png" width={500} height={500}  quality={100} alt="real-time" className="guidance-light2 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point7/section3-dedicated-rectangle.svg" width={272} height={92}  quality={100} alt="real-time" className="guidance-text1 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point7/section3-dedicated-rectangle.svg" width={272} height={92}  quality={100} alt="real-time" className="guidance-text2 pricing-grid-fade" />
                           
                                
                            </div>
                            <div className="real-time-content">
                                <div className="real-time-content-heading">
                                Hyper-Personalized Guidance
                                </div>
                                <div className="real-time-content-description">
                                Personalized agricultural guides based on your specific farm data, including government schemes and insurance, specific to your region and crops.
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="analysis-div overflow-hidden">
                        <div className=" analysis-div-inner">
                            <Image src="/featuresgrid/Point9/features-pagespeed-lights1.png" width={500} height={500}  quality={100} alt="real-time" className="analysis-light pricing-grid-fade" />
                            <Image src="/featuresgrid/Point9/features-pagespeed-grid.png" width={500} height={500}  quality={100} alt="real-time" className="analysis-grid pricing-grid-fade" />
                            <Image src="/featuresgrid/Point9/features-pagespeed-graph.png" width={500} height={500}  quality={100} alt="real-time" className="analysis-graph pricing-grid-fade" />
                            <div className="real-time-content">
                                <div className="real-time-content-heading">
                                Automated Soil Analysis
                                </div>
                                <div className="real-time-content-description">
                                Say goodbye to annual soil tests—CropSense analyzes soil quality and nutrients automatically with just a tap. Get real-time insights so you can make data-driven decisions every day.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="guidance-div overflow-hidden">
                        <div className="guidance-div-inner">
                            <div className="guidance-visuals">
                            <Image src="/featuresgrid/Point11/section3-payouts-light1.png" width={500} height={500}  quality={100} alt="real-time" className="gov-light1 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point11/section3-payouts-light2.png" width={500} height={500}  quality={100} alt="real-time" className="gov-light2 pricing-grid-fade" />
                            <Image src="/featuresgrid/Point11/section3-payouts-grid.svg" width={358} height={208}  quality={100} alt="real-time" className="gov-grid pricing-grid-fade" />
                            
                           <div className="gov-items">
                                <div className="gov-item1">
                                    <Image src="/featuresgrid/Point11/section3-payouts-item1.svg" width={36} height={36}  quality={100} alt="real-time" className="gov-item1-img pricing-grid-fade" />
                                </div>
                                <div className="gov-item1">
                                    <Image src="/featuresgrid/Point11/section3-payouts-item2.svg" width={36} height={36}  quality={100} alt="real-time" className="gov-item1-img pricing-grid-fade" />
                                </div>
                                <div className="gov-item1">
                                    <Image src="/featuresgrid/Point11/section3-payouts-item3.svg" width={36} height={36}  quality={100} alt="real-time" className="gov-item1-img pricing-grid-fade" />
                                </div>
                            </div>    
                            </div>
                            <div className="real-time-content">
                                <div className="real-time-content-heading">
                                Government Tie-Ups & Support
                                </div>
                                <div className="real-time-content-description">
                                Faster government processes for farm inspections and scheme verifications, from partnerships with governments and agribusinesses.
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                    
                   
                    
                    <div className="monitoring-div overflow-hidden">
                    <div className="monitoring-div-inner">
                        <Image
                        src="/featuresgrid/Point10/features-migration-background.png"
                        width={1128}
                        height={132}
                        quality={100}
                        alt="real-time"
                        className="monitoring-gfx pricing-grid-fade"
                        />
                        <Image
                        src="/featuresgrid/Point10/features-migration-light1.png"
                        width={500}
                        height={500}
                        quality={100}
                        alt="real-time"
                        className="monitoring-light1 pricing-grid-fade"
                        />
                        <Image
                        src="/featuresgrid/Point10/features-migration-light2.png"
                        width={500}
                        height={500}
                        quality={100}
                        alt="real-time"
                        className="monitoring-light2 pricing-grid-fade"
                        />
                        <Image
                        src="/featuresgrid/Point10/features-migration-light3.png"
                        width={500}
                        height={500}
                        quality={100}
                        alt="real-time"
                        className="monitoring-light3 pricing-grid-fade"
                        />

                        <div className="monitoring-header">
                        <img
                            src="/featuresgrid/Point10/features-migration-header.png"
                            alt="real-time"
                            className="monitoring-header-img pricing-grid-fade"
                        />
                        
                            <div className="real-time-content-heading text-center">Worker Monitoring & Task Scheduler</div>
                            <div className="real-time-content-description text-center">
                            Ensure workers are performing key tasks (watering, fertilizing)  
                            </div>
                            <div className="real-time-content-description text-center">
                            and manage farm tasks with a built-in scheduler and reminder system.
                            </div>
                        
                        </div>
                    </div>
                    </div>

                    
                </div>
            </div>
        </section>
    );
};

export default FeaturesBentoSec;
