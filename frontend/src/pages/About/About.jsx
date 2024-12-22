import React from "react";
import "./About.css";

const About = ({ aboutData }) => {
    if (!aboutData) return <div>Данные о клубе временно недоступны</div>;

    const { history, team } = aboutData;

    return (
        <div className="about-page">
            <section className="club-history">
                <h1>История клуба</h1>
                <p>{history}</p>
            </section>

            <section className="team">
                <h2>Наша команда</h2>
                <div className="team-grid">
                    {team.map((member, index) => (
                        <div key={index} className="team-member">
                            <img src={member.photo} alt={member.name} />
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                            <p>{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
