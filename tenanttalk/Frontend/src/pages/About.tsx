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

                <section className="about-section">
                    <p>
                        TenantTalk is the campus‑centric housing platform built specifically for college students. We understand
                        that finding—and keeping—great housing can be challenging when you’re juggling classes, clubs, and social
                        life. That’s why we bring you a space where you can connect directly with fellow students looking for
                        roommates or subleases, share honest reviews of local landlords, and discover rentals that fit both your
                        budget and your lifestyle.
                    </p>
                </section>

                <section className="mission-section">
                    <h2>Our Mission</h2>
                    <p>
                        Our goal is to streamline the entire rental experience for students at every stage. From your first search
                        through move‑in day and beyond, TenantTalk exists to:
                    </p>
                    <ul>
                        <li><strong>Empower Decisions</strong> by aggregating in-depth, student-written reviews of landlords and properties.</li>
                        <li><strong>Foster Connections</strong> through a vibrant forum for finding roommates, suitemates, and short-term subleases.</li>
                        <li><strong>Promote Transparency</strong> with community-driven ratings and up-to-date listings across campuses nationwide.</li>
                    </ul>
                </section>

                <section className="how-it-works-section">
                    <h2>How It Works</h2>
                    <ol>
                        <li>
                            <strong>Browse Campus Listings:</strong> Filter by school, neighborhood, rent range, and amenities
                            to discover apartments, houses, and rooms posted by landlords or fellow students.
                        </li>
                        <li>
                            <strong>Read & Write Reviews:</strong> Before signing a lease, read candid feedback from peers who’ve
                            rented in your area. After move‑in, share your own experience to help future students.
                        </li>
                        <li>
                            <strong>Post & Connect:</strong> Create your own listing to find roommates or sublettors. Use our
                            built‑in messaging to discuss logistics, schedule viewings, and plan move‑ins—all without leaving
                            the platform.
                        </li>
                    </ol>
                </section>

                <section className="community-section">
                    <h2>Our Community</h2>
                    <p>
                        At TenantTalk, community is at the heart of everything we do. We partner with student organizations
                        and campus housing offices to keep listings accurate and relevant. Whether you’re a freshman looking
                        for your first off‑campus apartment or a graduating senior subletting for the summer, you’ll find a
                        supportive network of peers ready to help and share advice.
                    </p>
                </section>

                <section className="values-section">
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Student‑First</strong>: Designed by students, for students—our features and policies reflect your real-world needs.</li>
                        <li><strong>Integrity</strong>: Honest, moderated reviews ensure landlords and roommates are held to clear standards.</li>
                        <li><strong>Safety</strong>: We enforce verified profiles, secure messaging, and clear reporting tools so every interaction is protected.</li>
                        <li><strong>Innovation</strong>: We continuously evolve our tools—mobile alerts, map-based search, roommate matching algorithms—to streamline your housing journey.</li>
                    </ul>
                </section>

            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;

