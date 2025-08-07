"use client";
import React from "react";
import HomeFooter from "../(home)/footer";
import HomeNav from "../(home)/nav";

export default function PrivacyPolicy() {
    return (
        <div className="mx-auto min-h-full w-full overflow-auto bg-gray-100">
            <HomeNav />

            <div className="min-h-screen flex flex-col px-8 md:px-16 py-12 bg-white shadow-lg mx-auto max-w-4xl my-8 rounded-lg">
                
                <h1 className="text-4xl font-semibold text-center text-gray-800 py-6">Privacy Policy</h1>

                <p className="text-lg text-gray-600">
                    MeetPad (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://meetpad.app" className="text-blue-600 hover:underline">https://meetpad.app</a> (the &quot;Site&quot;) and use our services (collectively, the &quot;Service&quot;). By using the Site or Service, you consent to the practices described in this policy.
                </p>

                <div className="mt-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">1. Information We Collect</h2>
                        <p className="text-gray-600 mt-4">
                            We collect several types of information to provide and improve our Service to you:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-4">
                            <li><strong>Personal Information:</strong> Information you provide when creating an account, such as name, email address, payment details, and profile settings.</li>
                            <li><strong>Usage Information:</strong> Details about your interaction with our Service, including device information, IP address, and browsing activities.</li>
                            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience and analyze performance. You can control cookie preferences through your browser settings.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">2. How We Use Your Information</h2>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-4">
                            <li>Provide, operate, and improve our Service</li>
                            <li>Personalize your experience based on your preferences</li>
                            <li>Process payments and manage your subscriptions</li>
                            <li>Respond to inquiries, provide support, and communicate updates</li>
                            <li>Analyze and understand user behavior to improve functionality</li>
                            <li>Maintain security, detect fraud, and prevent abuse</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">3. How We Share Your Information</h2>
                        <p className="text-gray-600 mt-4">
                            We do not sell, trade, or rent your personal information to third parties. However, we may share your information under the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-4">
                            <li><strong>Service Providers:</strong> With trusted third parties who assist in operating the Service, such as payment processors and customer support providers.</li>
                            <li><strong>Legal Compliance:</strong> To comply with legal processes, protect our rights, and prevent fraud.</li>
                            <li><strong>Business Transfers:</strong> In case of a merger, acquisition, or asset sale, your information may be transferred, with prior notification of such transfer.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">4. Data Security</h2>
                        <p className="text-gray-600 mt-4">
                            We use commercially reasonable security measures, including encryption and monitoring, to protect your information. However, no transmission or storage method is entirely secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">5. Your Privacy Choices</h2>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-4">
                            <li><strong>Access, Update, or Delete:</strong> You may update or delete your information by logging into your account or contacting us. Some data may be retained for legal reasons or legitimate business purposes.</li>
                            <li><strong>Opt-Out of Marketing Communications:</strong> You can unsubscribe from marketing emails by following the instructions in the email or updating your account settings.</li>
                            <li><strong>Cookie Control:</strong> Manage cookies through your browser settings. Disabling cookies may impact certain functionalities.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">6. International Data Transfers</h2>
                        <p className="text-gray-600 mt-4">
                            Your data may be processed in countries outside your residence. By using our Service, you consent to international data transfers, with steps taken to ensure data protection.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">7. Children&apos;s Privacy</h2>
                        <p className="text-gray-600 mt-4">
                            MeetPad is not intended for children under 18, and we do not knowingly collect information from them. If we learn of any unintentional collection, we will delete the data promptly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">8. Third-Party Links and Services</h2>
                        <p className="text-gray-600 mt-4">
                            Our Site may contain links to third-party websites or services. We are not responsible for their content or practices. Please review their privacy policies independently.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">9. Changes to This Privacy Policy</h2>
                        <p className="text-gray-600 mt-4">
                            We may update this Privacy Policy to reflect changes in our practices or legal requirements. Material changes will be communicated on this page. Continued use of the Service after updates signifies your acceptance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">10. Contact Us</h2>
                        <p className="text-gray-600 mt-4">
                            For any questions or concerns regarding this Privacy Policy, please contact us at:
                            <br />
                            <strong>Email: <a href="mailto:privacy@meetpad.app" className="text-blue-600 hover:underline">privacy@meetpad.app</a></strong>
                        </p>
                    </section>
                </div>

                <p className="text-gray-600 text-sm text-center mt-10">
                    <strong>Effective Date:</strong> 03/09/2024
                </p>
            </div>

            <hr className="my-8 border-gray-200 sm:mx-auto lg:my-8" />
            <HomeFooter />
        </div>
    );
}
