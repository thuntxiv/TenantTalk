import React from 'react';
import Navbar from '../components/navbar.tsx';
import Footer from '../components/footer.tsx';
import '../styles/about.css';

const About: React.FC = () => {
    return (
        <div className="about-page-wrapper">
            {/* Header */}
            <Navbar />

            {/* Main content */}
            <div className="about-page">
                <h1>About TenantTalk</h1>
                <p>
                    TenantTalk is your one-stop platform for finding the perfect rental property.
                    Our mission is to simplify the rental process by providing comprehensive reviews,
                    up-to-date listings, and helpful resources tailored to your needs.
                </p>
                <p>
                    Whether you are a renter looking for a new apartment, a landlord wanting to promote your properties,
                    or someone exploring roommate options, TenantTalk offers a community-driven approach to make informed decisions.
                </p>
                <p>
                    Our team is dedicated to ensuring transparency, trust, and excellent customer service.
                    Join our community today and start your journey toward finding your dream home!
                </p>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;

