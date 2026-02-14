import React from "react";
import Link from "next/link";

export default function Resume() {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-10">
                <Link href="/" className="text-xl font-medium hover:underline">
                    ← Back to Home
                </Link>
            </header>

            <main className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">BENJAMIN DREYER</h1>
                <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-6">SOFTWARE ENGINEER</h2>

                <div className="flex flex-wrap justify-between items-center mb-8">
                    <div>
                        <p>+1 (303)-656-6110</p>
                        <p>bendreyer21@gmail.com</p>
                    </div>
                </div>

                <section className="mb-8">
                    <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">EDUCATION</h3>
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                        <div>
                            <h4 className="font-bold">Santa Clara University</h4>
                            <p>Computer Science B.S</p>
                        </div>
                        <p className="text-gray-600">2017 - 2021</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div>
                            <h4 className="font-bold">Nanyang Technological University</h4>
                            <p>Study Abroad - Computer Engineering (Singapore)</p>
                        </div>
                        <p className="text-gray-600">2019</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">EXPERTISE</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>Backend Development</div>
                        <div>System Design and Architecture</div>
                        <div>Experimentation & A/B Tests</div>
                        <div>Data Analysis</div>
                        <div>iOS (Swift)</div>
                        <div>C++</div>
                        <div>Object Oriented Design</div>
                        <div>Testing and Safety</div>
                    </div>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">EXPERIENCE</h3>
                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                            <div>
                                <h4 className="font-bold"><span><span style={{color: '#4285F4'}}>G</span><span style={{color: '#EA4335'}}>o</span><span style={{color: '#FBBC04'}}>o</span><span style={{color: '#4285F4'}}>g</span><span style={{color: '#34A853'}}>l</span><span style={{color: '#EA4335'}}>e</span></span></h4>
                                <p className="italic">Software Engineer - App Ads (Backend) - Mountain View, CA</p>
                            </div>
                            <p className="text-gray-600">Oct 2021 - Present</p>
                        </div>
                        <p className="mb-2">
                            Software Engineer on the AdWords App Campaigns team, developing backend systems that power <span><span style={{color: '#4285F4'}}>G</span><span style={{color: '#EA4335'}}>o</span><span style={{color: '#FBBC04'}}>o</span><span style={{color: '#4285F4'}}>g</span><span style={{color: '#34A853'}}>l</span><span style={{color: '#EA4335'}}>e</span></span>'s mobile app advertising infrastructure.
                            Working with C++ and distributed systems to build sophisticated ad targeting and personalization features that leverage app event data
                            to deliver relevant app advertisements to users.
                        </p>

                        <h5 className="font-bold mt-4 mb-2">Projects @ <span><span style={{color: '#4285F4'}}>G</span><span style={{color: '#EA4335'}}>o</span><span style={{color: '#FBBC04'}}>o</span><span style={{color: '#4285F4'}}>g</span><span style={{color: '#34A853'}}>l</span><span style={{color: '#EA4335'}}>e</span></span></h5>

                        <div className="mb-4">
                            <h6 className="font-bold">Beyond the Install</h6>
                            <p>
                                Beyond the Install influences users to engage with promoted apps they have already installed but never opened.
                                We find users much more likely to convert on impressions for apps they are already familiar with but have not yet engaged with.
                                BTI was launched on AdMob, Play Store, YouTube and Search app ad networks earning approximately $700M ARR.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h6 className="font-bold">Project Melee</h6>
                            <p>
                                Project Melee is an effort to allow PC and Console gaming advertisers to promote their games on the <span><span style={{color: '#4285F4'}}>G</span><span style={{color: '#EA4335'}}>o</span><span style={{color: '#FBBC04'}}>o</span><span style={{color: '#4285F4'}}>g</span><span style={{color: '#34A853'}}>l</span><span style={{color: '#EA4335'}}>e</span></span> app ads network.
                                Normally, these advertisers would create Search (web) campaigns to promote their game. Melee creates a fake app for the promoted game,
                                unlocking the entire mobile app ad network for otherwise unreached engagement opportunity. Melee is in alpha and has been adopted by customers
                                such as Riot Games, EA, Tencent and more. Melee earns around $15M ARR in early alpha.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h6 className="font-bold">SCG P13n</h6>
                            <p>
                                Historically, the app ads personalization (p13n) system has been reserved for safe, non-sensitive apps. However,
                                with improvements to <span><span style={{color: '#4285F4'}}>G</span><span style={{color: '#EA4335'}}>o</span><span style={{color: '#FBBC04'}}>o</span><span style={{color: '#4285F4'}}>g</span><span style={{color: '#34A853'}}>l</span><span style={{color: '#EA4335'}}>e</span></span>'s app classification and certificate process, Social Casino Game apps have been approved for p13n.
                                Including these apps required a significant change to the app event collection infrastructure and its policy filtering.
                                Enablement of p13n on the ~3k SCG apps has earned approximately $100M ARR for <span><span style={{color: '#4285F4'}}>G</span><span style={{color: '#EA4335'}}>o</span><span style={{color: '#FBBC04'}}>o</span><span style={{color: '#4285F4'}}>g</span><span style={{color: '#34A853'}}>l</span><span style={{color: '#EA4335'}}>e</span></span> App Ads.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">INTERNSHIPS</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between">
                            <div>
                                <h4 className="font-bold">CrowdStrike</h4>
                                <p>Sales Engineering Intern</p>
                                <p className="text-gray-600">Sunnyvale, CA</p>
                            </div>
                            <p>Jun 2020 - Sep 2020</p>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <h4 className="font-bold">Convercent (now EQS Group)</h4>
                                <p>Software Engineering Intern</p>
                                <p className="text-gray-600">Denver, CO</p>
                            </div>
                            <p>Jun 2018 - Sep 2018</p>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <h4 className="font-bold">Vail Resorts</h4>
                                <p>Software Development Intern</p>
                                <p className="text-gray-600">Broomfield, CO</p>
                            </div>
                            <p>Jun 2019 - Sep 2019</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">PROJECTS</h3>
                    <p className="mb-4">I like software, so much so that I work on apps on nights and weekends. Here's some apps I've made recently:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold">Lectura</h4>
                            <p className="italic mb-1">
                                iOS App [<a href="https://apps.apple.com/us/app/lectura-university-lectures/id6740043004" className="text-blue-600 dark:text-blue-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">On the App Store</a>]
                            </p>
                            <p>Watch lectures from Stanford, Harvard, MIT and more for free with AI resources to help you learn.</p>
                        </div>

                        <div>
                            <h4 className="font-bold">The Daily Short</h4>
                            <p className="italic mb-1">
                                iOS App [<a href="https://apps.apple.com/us/app/the-daily-short/id6630364426" className="text-blue-600 dark:text-blue-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">On the App Store</a>]
                                [<a href="https://github.com/bdreyerr/Writing" className="text-blue-600 dark:text-blue-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">Github</a>]
                            </p>
                            <p>Daily creative writing practice application, powered by artificial intelligence.</p>
                        </div>

                        <div>
                            <h4 className="font-bold">Dreamrs</h4>
                            <p className="italic mb-1">
                                iOS App [<a href="https://apps.apple.com/us/app/dreamrs/id6473683619" className="text-blue-600 dark:text-blue-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">On the App Store</a>]
                                [<a href="https://github.com/bdreyerr/Dreamrs" className="text-blue-600 dark:text-blue-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">Github</a>]
                            </p>
                            <p>Artificial Intelligence based Dream Journal. Built with OpenAI and Stable Diffusion.</p>
                        </div>

                        <div>
                            <h4 className="font-bold">Radiant</h4>
                            <p className="italic mb-1">
                                iOS App [<a href="https://apps.apple.com/us/app/radiant/id6464150947" className="text-blue-600 dark:text-blue-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">On the App Store</a>]
                                [<a href="https://github.com/bdreyerr/Radiant" className="text-blue-600 dark:text-blue-400 underline hover:no-underline" target="_blank" rel="noopener noreferrer">Github</a>]
                            </p>
                            <p>Mood tracker with daily reflections & goal setting.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
} 