"use client";


import { useState, useEffect } from "react";
import styles from "./CookieBanner.module.css";
import { getLocalStorage, setLocalStorage } from "@/helper/localStorage";

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);
        console.log("Cookie Consent retrieved from storage: ", storedCookieConsent);
        setCookieConsent(storedCookieConsent);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (cookieConsent !== null) {
            setLocalStorage("cookie_consent", cookieConsent);
        }

        const newValue = cookieConsent ? "granted" : "denied";

        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: newValue,
            });
        }
    }, [cookieConsent]);

    if (isLoading || cookieConsent !== null) {
        return null;
    }

    return (
        <div className={styles.cookieBanner}>
            <div className={styles.blurBackground}></div>
            <div className={styles.content}>
                <h2>Cookie Consent</h2>
                <p>This site uses cookies to improve your browsing experience and provide personalized content.</p>
                <div className={styles.buttons}>
                    <button className={styles.declineButton} onClick={() => setCookieConsent(false)}>
                        Decline
                    </button>
                    <button className={styles.acceptButton} onClick={() => setCookieConsent(true)}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}