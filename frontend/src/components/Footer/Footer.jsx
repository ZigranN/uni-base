import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = ({ footerData }) => {
    if (!footerData) return null;

    const { developer, socialLinks, siteInfo } = footerData;

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
                <div className="footer-section site-info">
                    <h3>Контактная информация</h3>
                    <p>{siteInfo?.address || "Адрес не указан"}</p>
                    <p>Телефон: {siteInfo?.phone || "Телефон не указан"}</p>
                    <p>
                        Email: <a href={`mailto:${siteInfo?.email || ""}`}>{siteInfo?.email || "Email не указан"}</a>
                    </p>
                </div>

                <div className="footer-section social-links">
                    <h3>Мы в соцсетях</h3>
                    <div className="social-icons">
                        {socialLinks?.map((link, index) => (
                            <a
                                key={index}
                                href={link.url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.platform}
                            >
                                {renderIcon(link.icon)}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-section developer-info">
                    <h3>Разработчик</h3>
                    <p>{developer?.name || "Имя разработчика"}</p>
                    <p>
                        <a href={developer?.website || "#"} target="_blank" rel="noopener noreferrer">
                            {developer?.website || "Сайт разработчика"}
                        </a>
                    </p>
                    <p>
                        Email: <a href={`mailto:${developer?.email || ""}`}>{developer?.email || "Email не указан"}</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
