"use client";
import React from "react";
import HomeFooter from "../(home)/footer";
import HomeNav from "../(home)/nav";

export default function TermsOfUse() {
    return (
        <div className="mx-auto min-h-full w-full overflow-auto bg-gray-100">
            <HomeNav />

            <div className="min-h-screen flex flex-col px-8 md:px-16 py-12 bg-white shadow-lg mx-auto max-w-4xl my-8 rounded-lg">

                <h1 className="text-4xl font-semibold text-center text-gray-800 py-6">Terms of Use</h1>

                <p className="text-lg text-gray-600">
                    Welcome to MeetPad! These Terms of Use (&quot;Terms&quot;) govern your access and use of our online scheduling and consultation platform, located at <a href="https://meetpad.app" className="text-blue-600 hover:underline">https://meetpad.app</a> (the &quot;Site&quot;) and any services provided through it (collectively, the &quot;Service&quot;). Please read these Terms carefully, as they contain important information about your legal rights and obligations. By accessing or using MeetPad, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our Service.
                </p>

                <div className="mt-8 space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 mt-4">
                            By using or accessing MeetPad, you confirm that you have read, understood, and agree to these Terms. If you do not agree, please refrain from using our Service. MeetPad reserves the right to change or modify these Terms at any time. You are encouraged to periodically review these Terms for any updates.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">2. Eligibility</h2>
                        <p className="text-gray-600 mt-4">
                            MeetPad is intended for use by individuals who are 18 years or older. By using this Service, you confirm that you meet this eligibility requirement. If you are accessing or using the Service on behalf of a company or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">3. Description of Services</h2>
                        <p className="text-gray-600 mt-4">
                            MeetPad provides a platform for scheduling online consultations, managing appointments, and conducting video meetings. The Service includes features such as:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-4">
                            <li>Scheduling invitations and calendar integrations.</li>
                            <li>Public profiles to share your availability.</li>
                            <li>Availability calendar with customizable time slots.</li>
                            <li>Built-in video conferencing capabilities.</li>
                            <li>Time zone support and conversion tools.</li>
                            <li>Centralized meeting request management.</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            We reserve the right to add, modify, or discontinue any features or functionalities of the Service at any time without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">4. User Account and Security</h2>
                        <p className="text-gray-600 mt-4">
                            To access certain features, you may be required to create an account. When creating your account, you agree to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-4">
                            <li>Provide accurate and up-to-date information.</li>
                            <li>Maintain the security of your account by safeguarding your login credentials.</li>
                            <li>Notify MeetPad immediately of any unauthorized use of your account.</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            You are solely responsible for all activities conducted under your account, including any misuse that may occur due to failure to maintain security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">5. Subscription and Payment Terms</h2>
                        <p className="text-gray-600 mt-4">
                            Some features of MeetPad may require payment of subscription fees or other charges. By purchasing a subscription, you agree to pay the fees as specified, which may be billed on a recurring basis. All fees are non-refundable unless specified otherwise.
                        </p>
                        <p className="text-gray-600 mt-4"><strong>Automatic Renewal:</strong> By opting for a subscription, you authorize us to automatically renew your subscription at the end of each term unless you cancel before the renewal date.</p>
                        <p className="text-gray-600 mt-4"><strong>Payment Method:</strong> Payment methods and details, including credit or debit card information, are securely handled by our third-party payment processors. MeetPad does not store your payment information directly.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">6. Cancellation and Refund Policy</h2>
                        <p className="text-gray-600 mt-4"><strong>Cancellation:</strong> You may cancel your subscription at any time. However, cancellation will be effective at the end of the current billing period, and you will not receive a prorated refund. Your access to the subscription features will continue until the end of the paid period.</p>
                        <p className="text-gray-600 mt-4"><strong>Refunds:</strong> Refunds are only available as outlined in our refund policy, located in the Help section. For questions or disputes regarding charges, contact us at <a href="mailto:support@meetpad.app" className="text-blue-600 hover:underline">support@meetpad.app</a>.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">7. User Conduct</h2>
                        <p className="text-gray-600 mt-4">
                            You agree to use MeetPad responsibly and solely for lawful purposes. You will not:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-4">
                            <li>Misuse our Service or engage in fraudulent, abusive, or unlawful activity.</li>
                            <li>Share or post content that is defamatory, obscene, offensive, or illegal.</li>
                            <li>Impersonate another person or entity or misrepresent your identity or affiliation.</li>
                            <li>Attempt to gain unauthorized access to any portion of our Service, including servers or databases.</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            Violations may result in suspension or termination of your account and legal action if necessary.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">8. Privacy and Data Security</h2>
                        <p className="text-gray-600 mt-4">
                            Your privacy is of utmost importance to us. Please review our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> for information on how we collect, use, store, and protect your personal information. By using MeetPad, you consent to the collection and use of your data in accordance with the Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">9. Intellectual Property</h2>
                        <p className="text-gray-600 mt-4">
                            MeetPad and its entire contents, features, and functionality (including but not limited to all information, software, code, text, displays, images, video, and audio) are owned by MeetPad or its licensors. You may not reproduce, distribute, or create derivative works based on our intellectual property without our express permission. Any unauthorized use of our intellectual property may lead to civil or criminal liability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">10. Disclaimers and Limitation of Liability</h2>
                        <p className="text-gray-600 mt-4"><strong>Disclaimer of Warranties:</strong> MeetPad is provided on an as-is and as-available basis. We make no guarantees or warranties, express or implied, regarding the operation, reliability, availability, or security of our Service. Your use of MeetPad is at your own risk.</p>
                        <p className="text-gray-600 mt-4"><strong>Limitation of Liability:</strong> To the fullest extent permitted by law, MeetPad and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, or consequential damages, including but not limited to loss of revenue, data, or profits, arising out of or in connection with your use or inability to use the Service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">11. Indemnification</h2>
                        <p className="text-gray-600 mt-4">
                            You agree to indemnify and hold harmless MeetPad and its affiliates, officers, directors, employees, and agents from any claims, losses, liabilities, damages, costs, or expenses (including attorneys&apos; fees) arising out of or related to your use of the Service, your violation of these Terms, or any infringement of the rights of a third party.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">12. Third-Party Services and Links</h2>
                        <p className="text-gray-600 mt-4">
                            MeetPad may contain links to third-party websites or services. These links are provided for your convenience, and we do not endorse or assume responsibility for any third-party content. You access such sites at your own risk, and we encourage you to review their terms and policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">13. Modifications to the Terms of Use</h2>
                        <p className="text-gray-600 mt-4">
                            MeetPad reserves the right to modify these Terms at any time. If we make changes, we will post the updated Terms on this page and update the effective date. Continued use of the Service after changes constitutes your acceptance of the revised Terms. Please check this page regularly for updates.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">14. Termination of Service</h2>
                        <p className="text-gray-600 mt-4">
                            We may suspend or terminate your access to MeetPad at any time, without notice, if you violate these Terms or if we suspect misuse, fraud, or unauthorized access. Upon termination, you must cease all use of the Service, and any rights granted to you under these Terms will immediately cease.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">15. Governing Law and Dispute Resolution</h2>
                        <p className="text-gray-600 mt-4">
                            These Terms are governed by and construed in accordance with the laws of [Jurisdiction, e.g., United States, California], without regard to its conflict of laws principles. Any disputes arising from these Terms or your use of MeetPad shall be resolved through binding arbitration, conducted in [Jurisdiction, e.g., California]. Each party will bear its own costs in arbitration.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-700">16. Contact Information</h2>
                        <p className="text-gray-600 mt-4">
                            For any questions regarding these Terms, or to report a breach, please contact us at:
                            <br />
                            <strong>Email: <a href="mailto:support@meetpad.app" className="text-blue-600 hover:underline">support@meetpad.app</a></strong>
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
