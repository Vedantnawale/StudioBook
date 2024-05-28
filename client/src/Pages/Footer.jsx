import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-black border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-100">
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-slate-100">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-slate-100">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://policies.google.com/terms?hl=en-US"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-100 hover:text-gray-700"
                                        to="https://developers.google.com/tag-platform/security/concepts/cookies#:~:text=Google%20tags%20set%20and%20read,uses%20cookies%20in%20various%20ways."
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer