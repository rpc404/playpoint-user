import React from "react";
import "./styles/style.css";

export default function TermsAndConditions() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
  return (
    <div className="termsAndConditions__container">
      <h1>Terms & Conditions</h1>

      <h3>last Updated: Dec27, 2022</h3>

      <p>
        Welcome to Playpoint, an online prediction pool platform based on
        real-time sporting events, supported by decentralized blockchain
        networks. These terms and conditions govern your use of our platform and
        related services. By accessing or using our platform, you agree to be
        bound by these terms and conditions. If you do not agree to these terms
        and conditions, you should not use our platform.
        <br />
        <br />
        <ol>
          <li>
            <span>Eligibility</span>. Our platform is intended for users who are
            18 years of age or older. By using our platform, you represent and
            warrant that you are 18 years of age or older and have the legal
            capacity to enter into a binding agreement.
          </li>
          <li>
            <span>Account registration</span>. In order to use certain features
            of our platform, you may be required to create an account. You must
            provide accurate and complete information when creating your
            account, and you are responsible for maintaining the confidentiality
            of your account credentials. You are solely responsible for all
            activities that occur under your account.
          </li>
          <li>
            <span>Participation in prediction pools</span>. Our platform allows
            you to participate in prediction pools, in which you try to
            accurately predict the outcome of certain sporting events. You are
            solely responsible for the accuracy and completeness of your
            predictions. We reserve the right to disqualify or invalidate any
            prediction that we believe to be fraudulent or in violation of these
            terms and conditions.
          </li>
          <li>
            <span>Fees and payments</span>. Some of our services may be offered
            for a fee, and we may change the fees for our services from time to
            time. If we change the fees for a service, we will provide you with
            advance notice of the change. We reserve the right to suspend or
            terminate your access to our services if you fail to pay any fees
            that are due.
          </li>
          <li>
            <span>Prohibited activities</span>. You may not use our platform or
            services for any illegal or fraudulent purpose, or in any way that
            could damage, disable, overburden, or impair our servers or
            networks. You may not attempt to gain unauthorized access to our
            servers or networks, or to any other user's account. You may not
            engage in any activity that could harm our reputation or the
            reputation of our users.
          </li>
          <li>
            <span>Intellectual property</span>. Our platform and the content and
            materials made available through our platform, including but not
            limited to text, graphics, logos, images, and software, are
            protected by intellectual property laws. You may not use our content
            or materials for any commercial purpose without our express written
            consent.
          </li>
          <li>
            <span>Disclaimer of warranties</span>. Our platform and services are
            provided on an "as is" and "as available" basis. We do not warrant
            that our platform or services will be uninterrupted or error-free.
            We make no representations or warranties of any kind, express or
            implied, regarding the use or the results of our platform or
            services in terms of accuracy, reliability, or otherwise.
          </li>
          <li>
            <span>Limitation of liability</span>. We will not be liable for any
            damages of any kind arising from the use of our platform or
            services, including but not limited to direct, indirect, incidental,
            punitive, and consequential damages.
          </li>
          <li>
            <span>Termination</span>. We reserve the right to terminate your
            access to our platform or services at any time, for any reason, and
            without notice.
          </li>
          <li>
            <span>Governing law</span>. These terms and conditions will be
            governed by and construed in accordance with the laws of the state
            of Delaware, and the federal laws of the United States.
          </li>
          <li>
            <span>Dispute resolution</span>. Any dispute arising out of or in
            connection with these terms and conditions will be resolved through
            binding arbitration in accordance with the rules of the American
            Arbitration Association.
          </li>
          <li>
            <span>Entire agreement</span>. These terms and conditions constitute
            the entire agreement between you and us with respect to our platform
            and services, and supersede all prior or contemporaneous
            communications and proposals, whether oral
          </li>
        </ol>
      </p>
    </div>
  );
}
