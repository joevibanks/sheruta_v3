import React from 'react'
import Layout from '../components/Layout/Layout'

export default function WhatWeDo(){
    return (
        <Layout>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="sec-heading center">
                                <h2>About Us</h2>
                                <p>
                                    We are an online peer to peer housing
                                    assistance platform providing citizens with
                                    easier accommodation opportunities through
                                    flat sharing and more. Co-living is here to
                                    stay and we are building a community of
                                    verified & verifiable working class members
                                    making it easier for users to find apartment
                                    together.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-4">
                            <div className="middle-icon-features">
                                <div className="middle-icon-features-item">
                                    <div className="middle-icon-large-features-box">
                                        <i className="ti-user text-danger"></i>
                                        <span className="steps bg-danger">
                                            01
                                        </span>
                                    </div>
                                    <div className="middle-icon-features-content">
                                        <h4>Create An Account</h4>
                                        <p>
                                            Sign up, be steps forward towards
                                            renting your new home. Enjoy access
                                            and updates on many possible
                                            flatemate.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                            <div className="middle-icon-features">
                                <div className="middle-icon-features-item">
                                    <div className="middle-icon-large-features-box">
                                        <i className="ti-search text-success"></i>
                                        <span className="steps bg-success">
                                            02
                                        </span>
                                    </div>
                                    <div className="middle-icon-features-content">
                                        <h4>Find &amp; Search Property</h4>
                                        <p>
                                            Find shared apartments that fit your
                                            lifestyle and living standard around
                                            Lagos without scraping your bank
                                            account..
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                            <div className="middle-icon-features">
                                <div className="middle-icon-features-item">
                                    <div className="middle-icon-large-features-box">
                                        <i className="ti-location-arrow text-warning"></i>
                                        <span className="steps bg-warning">
                                            03
                                        </span>
                                    </div>
                                    <div className="middle-icon-features-content">
                                        <h4>Book your Property</h4>
                                        <p>
                                            Book and rent your potential new
                                            home at your comfort with little or
                                            no stress. Free online consultation
                                            for user.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
