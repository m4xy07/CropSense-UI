"use client";

import React from "react";
import Image from "next/image";

const FeaturesBentoSec = () => {
    return (
        <section className="pb-12 mb-20 pt-4 bg-dark">
            <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[20px] max-w-[510px] text-center">
                            <h2 className="text-[3.5rem] pt-4 font-bold text-center tracking-normal effect-font-gradient">
                                Above and beyond
                            </h2>
                            <p className="text-white/70 text-xl font-inter text-center mt-4 tracking-tight">
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
