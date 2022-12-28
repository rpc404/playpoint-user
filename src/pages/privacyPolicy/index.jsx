import React from "react";
import "./styles/style.css";

export default function PrivacyPolicy() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
  return (
    <div className="privacyPolicy__container">
      <h1>Privacy Policy</h1>

      <h3>last Updated: Dec27, 2022</h3>

      <p>
        At Playpoint, we are committed to protecting the privacy of our users.
        This privacy policy applies to the information we collect when you use
        our online prediction pool platform and related services.
        <br />
        <br /> We collect personal information when you create an account,
        participate in prediction pools, or interact with our platform or
        services in other ways. This information may include your name, email
        address, and any other information you choose to provide.
        <br />
        <br /> We use this information to provide and improve our services, to
        communicate with you, and to customize your experience on our platform.
        We may also use this information for research and analytics purposes, or
        to enforce our terms of service.
        <br />
        <br /> We take steps to protect your personal information from
        unauthorized access, use, or disclosure. We use secure servers and other
        measures to protect your personal information, and we require our
        service providers to do the same.
        <br />
        <br /> We may share your personal information with third parties in
        certain circumstances, such as when required by law or to enforce our
        terms of service. We may also share non-personal information, such as
        aggregated or anonymized data, with third parties for research or
        marketing purposes.
        <br />
        <br /> We may update this privacy policy from time to time. We will post
        any changes on this page and encourage you to review our privacy policy
        regularly.
        <br />
        <br /> If you have any questions or concerns about our privacy
        practices, please contact us using the contact information provided on
        our platform.
      </p>
    </div>
  );
}
