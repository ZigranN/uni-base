import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = ({ footerData }) => {
    const { developer, socialLinks, clubInfo } = footerData;

    const renderIcon = (iconName) => {
        switch (iconName) {
            case "FaFacebookF":
                return <FaFacebookF />;
            case "FaInstagram":
                return <FaInstagram />;
            case "FaTwitter":
                return <FaTwitter />;
            default:
                return null;
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Информация о клубе */}
                <div className="footer-section club-info">
                    <h3>Контактная информация</h3>
                    <p>{clubInfo.address}</p>
                    <p>Телефон: {clubInfo.phone}</p>
                    <p>
                        Email: <a href={`mailto:${clubInfo.email}`}>{clubInfo.email}</a>
                    </p>
                </div>

                {/* Ссылки на соцсети */}
                <div className="footer-section social-links">
                    <h3>Мы в соцсетях</h3>
                    <div className="social-icons">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.platform}
                            >
                                {renderIcon(link.icon)}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Информация о разработчике */}
                <div className="footer-section developer-info">
                    <h3>Разработчик</h3>
                    <p>
                        {developer.name} &copy; {new Date().getFullYear()}
                    </p>
                    <p>
                        <a href={developer.website} target="_blank" rel="noopener noreferrer">
                            {developer.website}
                        </a>
                    </p>
                    <p>
                        Email: <a href={`mailto:${developer.email}`}>{developer.email}</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
